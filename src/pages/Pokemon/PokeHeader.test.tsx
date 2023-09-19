import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeHeader from './PokeHeader';
import { MemoryRouter } from 'react-router-dom';

describe('PokeHeader', () => {

  beforeEach(() => {
    render(<MemoryRouter>
      <PokeHeader id={1} name='bulbasaur' />
    </MemoryRouter>);
  });

  it('displays the pokemon name', () => {
    const element = screen.getByText(/bulbasaur/i);
    expect(element).toBeInTheDocument();
  });

  it('properly formats the pokemon number', () => {
    const element = screen.getByText(/#0001/i);
    expect(element).toBeInTheDocument();
  });
});
