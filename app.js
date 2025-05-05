// if you add these imports, you will get an error
// Error: Browser scripts cannot have imports or exports.
// We need to add type="module" to the script tag in the html file
import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import ModalButton from './components/ModalButton';

// React.createElement => ReactElement (JS object) => HTMLElement(render)
const heading = React.createElement('h1', { id: "heading" }, 'React "create element" rendered heading');

// JSX - JSX is not HTML inside javascript, it is HTML like syntax inside javascript files
// JSX is not valid pure es6 javascript, javascript engine cannot understand it
// JSX is transpiled before it reaches the javascript engine
// Parcel has Babel inside it which transpiles the JSX code
// Babel: Babel is a JavaScript compiler.

   // (Babel's job)
// JSX  => React.createElement => ReactElement (JS object) => HTMLElement(render)
// which is why class in html is written as className in jsx, tabindex in html is written as tabIndex in jsx
// React Element
const jsxHeading = <h1 id="heading">JSX rendered heading</h1>

// React Component
// Class based components - OLD
// Functional components - NEW

// React Functional Component
const HeadingComponent = () => {
    <div>
        <h1>React Functional Component</h1>
    </div>
};

const App = () => {
  return (
    <div className="app" data-testid="app-component">
      <Navbar />
      <ModalButton />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;