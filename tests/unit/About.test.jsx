import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../src/About';

describe('About Component', () => {
  test('renders heading and description paragraphs', () => {
    render(<About />);

    // Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('About This App');

    // First paragraph content
    expect(
      screen.getByText(/This simple React application demonstrates basic routing/i)
    ).toBeInTheDocument();

    // Technologies mentioned
    const reactText = screen.getByText(/React 19/i);
    expect(reactText).toBeInTheDocument();

    const viteMatches = screen.getAllByText(/Vite/i);
    expect(viteMatches.length).toBeGreaterThanOrEqual(1);
  });
});
