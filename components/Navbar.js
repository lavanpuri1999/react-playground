import React from 'react';

const Navbar = () => {
  return (
    <nav 
      className="navbar"
      data-testid="navbar-component"
      style={{
        backgroundColor: '#333',
        padding: '1rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        My App
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '1rem' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar; 