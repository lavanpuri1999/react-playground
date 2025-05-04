// if you add these imports, you will get an error
// Error: Browser scripts cannot have imports or exports.
// We need to add type="module" to the script tag in the html file
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 
 * <div id="parent">
 *  <div id="child">
 *      <h1>I am an h1 tag</h1>
 *  </div>
 * </div>
 * 
 */

// the id: 'heading' will be added as an attribute to the h1 element
// React.createElement returns a javascript object not an h1 DOM element
const heading = React.createElement('h1', { id: 'heading', random: 'random' }, 'Hello World'); 

// the third argument (children) can be an array of elements or a single element
// since this becomes very messy to read, we can use JSX to make it more readable
const parent = React.createElement('div', { id: 'parent' }, 
    React.createElement('div', { id: 'child' }, [
        React.createElement('h1', {}, 'I am an h1 tag'),
        React.createElement('h2', {}, 'I am an h2 tag')
    ])
);

// ReactDOM.createRoot is a function that creates a new root
// React will only work inside the root element
// Elements above and below the root element will still be visible in the browser
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);