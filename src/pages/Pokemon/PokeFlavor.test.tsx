import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeFlavor from './PokeFlavor';
import { MemoryRouter } from 'react-router-dom';

describe('PokeFlavor', () => {

  beforeEach(() => {
    render(<MemoryRouter>
      <PokeFlavor flavorText='this is great' />
    </MemoryRouter>);
  });

  it('displays the flavor text', () => {
    const element = screen.getByText(/this is great/i);
    expect(element).toBeInTheDocument();
  });

});
