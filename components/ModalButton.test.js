
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalButton from '../components/ModalButton';

describe('ModalButton Component', () => {
  test('renders the "Open Modal" button', () => {
    render(<ModalButton />);
    const openButton = screen.getByText('Open Modal');
    expect(openButton).toBeInTheDocument();
  });

  test('opens the modal when the "Open Modal" button is clicked', () => {
    render(<ModalButton />);
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);
    const modalTitle = screen.getByText('Modal Title');
    expect(modalTitle).toBeInTheDocument();
  });

  test('closes the modal when the "Close" button inside the modal is clicked', () => {
    render(<ModalButton />);
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    const modalTitle = screen.queryByText('Modal Title');
    expect(modalTitle).not.toBeInTheDocument();
  });

  test('closes the modal when clicking outside the modal content', () => {
    render(<ModalButton />);
    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);
    const modalOverlay = screen.getByClassName('modal-overlay');
    fireEvent.click(modalOverlay);
    const modalTitle = screen.queryByText('Modal Title');
    expect(modalTitle).not.toBeInTheDocument();
  });

  test('renders the component inside a container with data-testid', () => {
    render(<ModalButton />);
    const componentContainer = screen.getByTestId('modalbutton-component');
    expect(componentContainer).toBeInTheDocument();
  });
});
