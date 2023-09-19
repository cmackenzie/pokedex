import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeSprites from './PokeSprites';
import { MemoryRouter } from 'react-router-dom';

describe('PokeSprites', () => {
  beforeEach(() => {
    render(<MemoryRouter>
      <PokeSprites sprites={[{ url: 'http://foo.com/' }]} />
    </MemoryRouter>);
  });

  it('sets the image source to the sprite url', () => {
    const image = screen.getByAltText('sprite');
    expect((image as HTMLImageElement).src).toBe('http://foo.com/');
  });
});
