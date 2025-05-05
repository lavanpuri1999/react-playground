
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalButton from '../components/ModalButton';

describe('ModalButton Component', () => {
  test('renders the modal button', () => {
    render(<ModalButton />);
    const modalButtonComponent = screen.getByTestId('modalbutton-component');
    expect(modalButtonComponent).toBeInTheDocument();
  });

  test('renders the "Open Modal" button', () => {
    render(<ModalButton />);
    const openModalButton = screen.getByText('Open Modal');
    expect(openModalButton).toBeInTheDocument();
  });

  test('opens the modal when the "Open Modal" button is clicked', () => {
    render(<ModalButton />);
    const openModalButton = screen.getByText('Open Modal');
    fireEvent.click(openModalButton);
    const modalOverlay = screen.getByClassName('modal-overlay');
    expect(modalOverlay).toBeInTheDocument();
  });

  test('renders the modal content when the modal is open', () => {
    render(<ModalButton />);
    const openModalButton = screen.getByText('Open Modal');
    fireEvent.click(openModalButton);
    const modalTitle = screen.getByText('Modal Title');
    const modalContent = screen.getByText('This is the modal content. Click outside to close.');
    const closeModalButton = screen.getByText('Close');

    expect(modalTitle).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
    expect(closeModalButton).toBeInTheDocument();
  });

  test('closes the modal when the "Close" button is clicked', () => {
    render(<ModalButton />);
    const openModalButton = screen.getByText('Open Modal');
    fireEvent.click(openModalButton);
    const closeModalButton = screen.getByText('Close');
    fireEvent.click(closeModalButton);
    const modalOverlay = screen.queryByClassName('modal-overlay');
    expect(modalOverlay).not.toBeInTheDocument();
  });

  test('closes the modal when clicking outside the modal content', () => {
    render(<ModalButton />);
    const openModalButton = screen.getByText('Open Modal');
    fireEvent.click(openModalButton);
    const modalOverlay = screen.getByClassName('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(modalOverlay).not.toBeInTheDocument();
  });
});
