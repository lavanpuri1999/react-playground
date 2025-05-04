const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Function to create a test file
function createTestFile(filePath) {
  const fileName = path.basename(filePath);
  const testFileName = `${fileName.split('.')[0]}.test.js`;
  const testDir = path.join(path.dirname(filePath), '__tests__');
  const testFilePath = path.join(testDir, testFileName);

  // Create __tests__ directory if it doesn't exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // Generate test content
  const testContent = `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${fileName.split('.')[0]} from '../${fileName}';

describe('${fileName}', () => {
  it('should render without crashing', () => {
    render(<${fileName.split('.')[0]} />);
    expect(screen.getByTestId('${fileName.split('.')[0].toLowerCase()}-component')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
`;

  // Write test file
  fs.writeFileSync(testFilePath, testContent);
  console.log(`Created test file: ${testFilePath}`);
}

// Main function
function generateTests() {
  const changedFiles = getChangedFiles();
  const jsFiles = changedFiles.filter(file => 
    file.endsWith('.js') && 
    !file.endsWith('.test.js') &&
    !file.includes('__tests__') 
  );

  if (jsFiles.length === 0) {
    console.log('No JavaScript files changed between main and current branch.');
    return;
  }

  jsFiles.forEach(file => {
    createTestFile(file);
  });

  console.log(`Generated ${jsFiles.length} test files for changed JavaScript files`);
}

// Run the script
generateTests();