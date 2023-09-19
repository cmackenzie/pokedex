import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeMoves from './PokeMoves';
import { MemoryRouter } from 'react-router-dom';

describe('PokeMoves', () => {

  beforeEach(() => {
    render(<MemoryRouter>
      <PokeMoves moves={[
        { name: 'jump' },
        { name: 'kick' },
        { name: 'scream' }
      ]} />
    </MemoryRouter>);
  });

  it('displays all of the moves', () => {
    const jump = screen.getByText(/jump/i);
    const kick = screen.getByText(/kick/i);
    const scream = screen.getByText(/scream/i);

    expect(jump).toBeInTheDocument();
    expect(kick).toBeInTheDocument();
    expect(scream).toBeInTheDocument();
  });

  it('provides an external link for each move', () => {
    expect(screen.getByRole('link', { name: 'Jump' }))
      .toHaveAttribute('href', 'https://pokemondb.net/move/jump');

    expect(screen.getByRole('link', { name: 'Kick' }))
      .toHaveAttribute('href', 'https://pokemondb.net/move/kick');

    expect(screen.getByRole('link', { name: 'Scream' }))
      .toHaveAttribute('href', 'https://pokemondb.net/move/scream');
  });
});
