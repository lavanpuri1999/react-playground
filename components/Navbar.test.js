
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('should render the navbar component', () => {
    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar-component');
    expect(navbarElement).toBeInTheDocument();
  });

  it('should display the logo', () => {
    render(<Navbar />);
    const logoElement = screen.getByText('My App');
    expect(logoElement).toBeInTheDocument();
  });

  it('should display the navigation links', () => {
    render(<Navbar />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const contactLink = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it('should have the correct styling', () => {
    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar-component');
    expect(navbarElement).toHaveStyle('background-color: #333');
    expect(navbarElement).toHaveStyle('color: white');
    expect(navbarElement).toHaveStyle('display: flex');
    expect(navbarElement).toHaveStyle('justify-content: space-between');
    expect(navbarElement).toHaveStyle('align-items: center');
    expect(navbarElement).toHaveStyle('padding: 1rem');

    const logoElement = screen.getByText('My App');
    expect(logoElement).toHaveStyle('font-size: 1.5rem');
    expect(logoElement).toHaveStyle('font-weight: bold');

    const navLinks = screen.getByRole('link', {name: 'Home'}).parentNode;
    expect(navLinks).toHaveStyle('display: flex');
    expect(navLinks).toHaveStyle('gap: 1rem');

    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveStyle('color: white');
    expect(homeLink).toHaveStyle('text-decoration: none');
  });
});
