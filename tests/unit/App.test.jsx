// MemoryRouter.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function Dummy() {
  return <div>Dummy Page</div>;
}

test('MemoryRouter renders Dummy route', () => {
  render(
    <MemoryRouter initialEntries={['/dummy']}>
      <Routes>
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Dummy Page')).toBeInTheDocument();
});
