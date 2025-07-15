// Contact.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../src/Contact';

describe('Contact Component', () => {
  test('renders heading and contact information', () => {
    render(<Contact />);

    // Check heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact Us');

    // Check paragraph
    expect(
      screen.getByText(/For any inquiries or feedback/i)
    ).toBeInTheDocument();

    // Check contact details
    expect(screen.getByText(/info@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/\+1-234-567-8901/)).toBeInTheDocument();
    expect(screen.getByText(/123 Main Street/)).toBeInTheDocument();
  });
});
