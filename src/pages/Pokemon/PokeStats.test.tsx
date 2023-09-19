import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeStats from './PokeStats';
import { MemoryRouter } from 'react-router-dom';

// https://pokemondb.net/pokebase/6506/there-formula-for-working-pokemons-highest-possible-stats
// https://pokemondb.net/pokebase/8855/what-are-hindering-neutral-beneficial-natures
const stats = [
  { prop: { name: 'hp', value: 45 } , min: 200, max: 294 },
  { prop: { name: 'attack', value: 49 }, min: 92, max:  218 },
  { prop: { name: 'defense', value: 49 }, min:  92, max:  218 },
  { prop: { name: 'special-attack', value: 65 }, min:  121, max:  254 },
  { prop: { name: 'special-defense', value: 65 }, min:  121, max:  254 },
  { prop: { name: 'speed', value: 45 }, min:  85, max:  210 }
];

describe('PokeStats', () => {
  stats.forEach((stat) => {
    describe(stat.prop.name, () => {
      it('shows the base stat value', () => {
        render(<MemoryRouter>
          <PokeStats stats={[stat.prop]} />
        </MemoryRouter>);

        const element = screen.getByText(stat.prop.value);
        expect(element).toBeInTheDocument();
      });

      it('shows the expected minimum value', () => {
        render(<MemoryRouter>
          <PokeStats stats={[stat.prop]} />
        </MemoryRouter>);

        const element = screen.getByText(stat.min);
        expect(element).toBeInTheDocument();
      });

      it('shows the expected maximum value', () => {
        render(<MemoryRouter>
          <PokeStats stats={[stat.prop]} />
        </MemoryRouter>);

        const element = screen.getByText(stat.max);
        expect(element).toBeInTheDocument();
      });
    });
  });
});
