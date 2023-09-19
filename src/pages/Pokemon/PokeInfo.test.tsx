import React from 'react';
import { render, screen } from '@testing-library/react';
import PokeInfo from './PokeInfo';
import { MemoryRouter } from 'react-router-dom';

const info = {
  id: 1,
  name: 'bulbasaur',
  height: 100, // 32' 10"
  weight: 100, // 22 lbs
  types: ['poison'],
  flavorText: 'delicious',
  color: { name: 'green' },
  shape: { name: 'rectangular' },
  growth: { name: 'wanting' },
  abilities: [{ name: 'face-punch' }],
};

describe('PokeInfo', () => {
  beforeEach(() => {
    render(<MemoryRouter>
      <PokeInfo {...info} />
    </MemoryRouter>);
  });

  it('converts height in decimeters to feet and inches', () => {
    const heightElement = screen.getByText(/32' 10"/i);
    expect(heightElement).toBeInTheDocument();
  });

  it('converts weight in hectograms to pounds', () => {
    const weightElement = screen.getByText(/22 lbs/i);
    expect(weightElement).toBeInTheDocument();
  });

  it('displays delicious flavor text', () => {
    const element = screen.getByText(/delicious/i);
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon type', () => {
    const element = screen.getByText('Poison');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon color', () => {
    const element = screen.getByText('Green');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon shape', () => {
    const element = screen.getByText('Rectangular');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon growth', () => {
    const element = screen.getByText('Wanting');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon abilties', () => {
    const element = screen.getByText('Face punch');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon name', () => {
    const element = screen.getByText('Bulbasaur');
    expect(element).toBeInTheDocument();
  });

  it('displays the pokemon number', () => {
    const element = screen.getByText('0001');
    expect(element).toBeInTheDocument();
  });
});
