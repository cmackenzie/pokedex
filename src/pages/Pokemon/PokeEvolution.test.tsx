import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeEvolution from './PokeEvolution';
import { MemoryRouter } from 'react-router-dom';
import { EvolutionChain } from '../../services/Pokemon/Model';

const evolution:EvolutionChain = {
  'pokemonInChain': 4,
  'evolvesTo': [
    {
      'id': 280,
      'avatar':
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/280.png',
      'species': {
        'name': 'ralts',
        'url': 'https://pokeapi.co/api/v2/pokemon-species/280/'
      },
      'triggers': [],
      'evolvesTo': [
        {
          'id': 281,
          'avatar':
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/281.png',
          'species': {
            'name': 'kirlia',
            'url': 'https://pokeapi.co/api/v2/pokemon-species/281/'
          },
          'triggers': [
            {
              'trigger': 'use-item',
              'details': [
                {
                  'name': 'gender',
                  'value': '2'
                },
                {
                  'name': 'item',
                  'value': {
                    'name': 'dawn-stone'
                  }
                },
                {
                  'name': 'needs_overworld_rain',
                  'value': 'false'
                },
                {
                  'name': 'trigger',
                  'value': {
                    'name': 'use-item'
                  }
                },
                {
                  'name': 'turn_upside_down',
                  'value': 'false'
                }
              ]
            }
          ],
          'evolvesTo': [
            {
              'id': 282,
              'avatar':
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png',
              'species': {
                'name': 'gardevoir',
                'url': 'https://pokeapi.co/api/v2/pokemon-species/282/'
              },
              'triggers': [
                {
                  'trigger': 'trade',
                  'details': [
                    {
                      'name': 'needs_overworld_rain',
                      'value': 'false'
                    },
                    {
                      'name': 'trigger',
                      'value': {
                        'name': 'trade'
                      }
                    },
                    {
                      'name': 'turn_upside_down',
                      'value': 'false'
                    }
                  ]
                }
              ],
              'evolvesTo': []
            },
            {
              'id': 475,
              'avatar':
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/475.png',
              'species': {
                'name': 'gallade',
                'url': 'https://pokeapi.co/api/v2/pokemon-species/475/'
              },
              'triggers': [
                {
                  'trigger': 'level-up',
                  'details': [
                    {
                      'name': 'min_level',
                      'value': '20'
                    },
                    {
                      'name': 'needs_overworld_rain',
                      'value': 'false'
                    },
                    {
                      'name': 'turn_upside_down',
                      'value': 'false'
                    }
                  ]
                }
              ],
              'evolvesTo': []
            }
          ]
        }
      ]
    }
  ]
};

const noEvolutions: EvolutionChain = {
  pokemonInChain: 1,
  evolvesTo: []
};

describe('PokeEvolution', () => {

  describe('when there are no evolutions', () => {
    beforeEach(() => {
      render(<MemoryRouter>
        <PokeEvolution evolution={noEvolutions} />
      </MemoryRouter>);
    });

    it('does not show any evolution data', () => {
      const element = screen.getByText('This pokemon is not part of an evolution chain.');
      expect(element).toBeInTheDocument();
    });
  });

  describe('when there are multiple evolution paths', ()=> {
    beforeEach(() => {
      render(<MemoryRouter>
        <PokeEvolution evolution={evolution} />
      </MemoryRouter>);
    });

    it('shows every pokemon in a chain at least once', () => {
      const [ralts] = screen.getAllByText(/ralts/i);
      const [kirlia] = screen.getAllByText(/kirlia/i);
      const gardevoir = screen.getByText(/gardevoir/i);
      const gallade = screen.getByText(/gallade/i);

      expect(ralts).toBeInTheDocument();
      expect(kirlia).toBeInTheDocument();
      expect(gardevoir).toBeInTheDocument();
      expect(gallade).toBeInTheDocument();
    });

    it('duplicates pokemon in multiple chains', () => {
      const ralts = screen.getAllByText(/ralts/i);
      const kirlia = screen.getAllByText(/kirlia/i);

      expect(ralts.length).toBe(2);
      expect(kirlia.length).toBe(2);
    });
  });

  describe('evolving', ()=> {
    beforeEach(() => {
      render(<MemoryRouter>
        <PokeEvolution evolution={evolution} />
      </MemoryRouter>);
    });

    describe('leveling up', ()=> {
      it('shows the level up trigger', () => {
        const level = screen.getByText(/level up/i);
        expect(level).toBeInTheDocument();
      });

      it('shows the level requirement', () => {
        const levelUp = screen.getByText(/reach level 20/i);
        expect(levelUp).toBeInTheDocument();
      });

    });

    it('shows the use item trigger', () => {
      const useItems = screen.getAllByText(/use item/i);

      expect(useItems.length).toBe(2);
      useItems.forEach(u => expect(u).toBeInTheDocument());
    });

    it('shows the trade trigger', () => {
      const trade = screen.getByText(/trade/i);
      expect(trade).toBeInTheDocument();
    });
  });
});



