import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeColor from './PokeColor';
import { MemoryRouter } from 'react-router-dom';
import { capitalize } from '@mui/material';

const colors = ['red', 'blue','yellow','green','black','brown','purple','gray','pink'];

describe('PokeColor', () => {
  colors.forEach(color =>
    describe(color, () => {
      it(`shows the ${color} color capitalized`, () => {
        render(<MemoryRouter>
          <PokeColor color={color} />
        </MemoryRouter>);

        const element = screen.getByText(capitalize(color));

        expect(element).toBeInTheDocument();
      });

      it(`sets the background ${color}`, () => {
        render(<MemoryRouter>
          <PokeColor color={color} />
        </MemoryRouter>);

        const element = screen.getByText(capitalize(color));

        expect(element.parentElement).toHaveStyle(`background-color: ${color}`);
      });
    }));
});
