import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeCard from './PokeCard';
import { MemoryRouter } from 'react-router-dom';
import { OFFICIAL_ARTWORK_URL } from '../constants';

describe('PokeCard', () => {
  const avatarUrl = OFFICIAL_ARTWORK_URL.replace('[id]', '1');

  beforeEach(() => {
    render(<MemoryRouter>
      <PokeCard id={1} name={'bulbasaur'} avatar={avatarUrl} />
    </MemoryRouter>);
  });

  it('renders the pokemon name', () => {
    const element = screen.getByText(/Bulbasaur/i);
    expect(element).toBeInTheDocument();
  });

  it('properly formats the pokemon number', () => {
    const element = screen.getByText(/#0001/i);
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon avatar', () => {
    const image = screen.getByAltText('avatar');
    expect((image as HTMLImageElement).src).toBe(avatarUrl);
  });
});
