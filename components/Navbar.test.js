
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  test('renders without errors', () => {
    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar-component');
    expect(navbarElement).toBeInTheDocument();
  });

  test('displays the logo', () => {
    render(<Navbar />);
    const logoElement = screen.getByText('My App');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Navbar />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const contactLink = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test('navbar has correct background color', () => {
    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar-component');
    expect(navbarElement).toHaveStyle('background-color: #333');
  });

  test('navigation links have correct text color', () => {
      render(<Navbar />);
      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveStyle('color: white');
  });
});
