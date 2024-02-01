import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InboxPage from '../Components/Inbox';

describe('InboxPage Component', () => {
  beforeEach(() => {
    // Mock localStorage getItem method
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'test@example.com'), // Set a mock email address
      },
      writable: true,
    });
  });

  test('renders Inbox page with Compose button', async () => {
    render(<InboxPage />);

    // Assert that Inbox heading and Compose button are rendered
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByText('Compose')).toBeInTheDocument();
  });

  test('fetches emails and renders them correctly', async () => {
    // Mock the fetch request
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        email1: { id: 'email1', subject: 'Test Subject 1', content: 'Test Content 1', read: false },
        email2: { id: 'email2', subject: 'Test Subject 2', content: 'Test Content 2', read: true },
      }),
    });

    render(<InboxPage />);

    // Wait for emails to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Test Subject 1')).toBeInTheDocument();
      expect(screen.getByText('Test Subject 2')).toBeInTheDocument();
    });
  });

  test('updates message status when clicked', async () => {
    // Mock the fetch request
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        email1: { id: 'email1', subject: 'Test Subject 1', content: 'Test Content 1', read: false },
      }),
    });

    render(<InboxPage />);

    // Wait for email to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Test Subject 1')).toBeInTheDocument();
    });

    // Click on the email card
    fireEvent.click(screen.getByText('Test Subject 1'));

    // Wait for the message status to be updated
    await waitFor(() => {
      expect(screen.queryByTestId('blue-dot')).not.toBeInTheDocument(); // Blue dot should not be visible
    });
  });
});
