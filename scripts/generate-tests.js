const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to configure git for GitHub Actions
function configureGit() {
  try {
    // Set git user for the commit
    execSync('git config --global user.name "github-actions[bot]"');
    execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');
  } catch (error) {
    console.error('Error configuring git:', error.message);
  }
}

// Function to commit generated test files
function commitTestFiles() {
  try {
    // Get the current branch name from GitHub Actions environment variable
    const branchName = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME;
    if (!branchName) {
      throw new Error('Could not determine branch name');
    }

    // Add all test files
    execSync('git add components/*.test.js');
    
    // Check if there are any changes to commit
    const status = execSync('git status --porcelain').toString();
    if (status.trim()) {
      // Commit the changes
      execSync('git commit -m "added unit tests for code changes"');
      
      // Push the changes to the PR branch using the branch name
      execSync(`git push origin HEAD:${branchName}`);
      
      console.log('Successfully committed and pushed test files');
    } else {
      console.log('No test files to commit');
    }
  } catch (error) {
    console.error('Error committing test files:', error.message);
  }
}

// Function to check if test file exists and get its content
function getExistingTestFile(filePath) {
  const fileName = path.basename(filePath);
  const testFileName = `${fileName.split('.')[0]}.test.js`;
  const testFilePath = path.join(path.dirname(filePath), testFileName);

  if (fs.existsSync(testFilePath)) {
    const content = fs.readFileSync(testFilePath, 'utf8');
    return {
      exists: true,
      path: testFilePath,
      content: content
    };
  }

  return {
    exists: false,
    path: testFilePath,
    content: null
  };
}

// Function to get changed files between main and current branch
function getChangedFiles() {
  try {
    // Get the list of changed files
    const changedFiles = execSync('git diff --name-only origin/main...HEAD')
      .toString()
      .split('\n')
      .filter(file => file.trim() !== '');

    return changedFiles;
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    process.exit(1);
  }
}

// Function to get changes for a specific file
function getFileChanges(filePath) {
  try {
    const changes = execSync(`git diff origin/main...HEAD -- ${filePath}`)
      .toString();
    return changes;
  } catch (error) {
    console.error(`Error getting changes for ${filePath}:`, error.message);
    return '';
  }
}

async function callModelToWriteTestsForFile(fileName, fileChanges, existingTests) {
    const model = await ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const basePrompt = `
         You are a test writer for a react component.
         Here are the new code changes to the file: ${fileChanges}
         Write tests for the file: ${fileName}
         Give me the code for the whole test file, if the prompt contains existing tests for the file, add them to the test file. 
         Also do not modify tests or parts of the test file which is not related to the new code changes.
         Otherwise, write the tests from scratch.
         Do not add any other text to the response, just the code for the test file.
         The reponse you generate should start with import statements and end with the closing tag of the test file.
     `;
    const existingTestPrompt = `Here are the existing tests for the file: ${existingTests}`
    const prompt = existingTests.exists ? `${basePrompt}\n${existingTestPrompt}` : basePrompt;
    const response = await model.generateContent(prompt);
    return response.response.text();
}

// Function to create a test file
function createTestFile(filePath, testContent) {
  const fileName = path.basename(filePath);
  const testFileName = `${fileName.split('.')[0]}.test.js`;
  const testFilePath = path.join(path.dirname(filePath), testFileName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(path.dirname(testFilePath))) {
    fs.mkdirSync(path.dirname(testFilePath), { recursive: true });
  }

  // Write test file
  testContent = testContent.replace('```javascript', '').replace('```', '');
  fs.writeFileSync(testFilePath, testContent);
  console.log(`Created test file: ${testFilePath}`);
}

// Main function
async function generateTests() {
  const changedFiles = getChangedFiles();
  const jsFiles = changedFiles.filter(file => 
    file.endsWith('.js') && 
    !file.endsWith('.test.js') &&
    !file.includes('__tests__') &&
    file.startsWith('components')
  );

  if (jsFiles.length === 0) {
    console.log('No JavaScript files changed between main and current branch.');
    return;
  }

  // Configure git for GitHub Actions
  configureGit();

  // Generate tests for each file
  for (const file of jsFiles) {
    const changes = getFileChanges(file);
    const existingTestFile = getExistingTestFile(file);
    const testContent = await callModelToWriteTestsForFile(file, changes, existingTestFile);
    createTestFile(file, testContent);
  }

  // Commit the generated test files
  commitTestFiles();

  console.log(`\nGenerated ${jsFiles.length} test files for changed JavaScript files`);
}

// Run the script
generateTests();