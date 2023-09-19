import React from 'react';
import PokeMove from './PokeMove';
import { PokePaper } from '../../components/PokePaper';

interface PokeMovesProps {
  moves: {
    name: string
  }[]
}

function PokeMoves(props: PokeMovesProps) {
  const { moves } = props;

  // Make a copy so we don't mutate state by sorting in place
  const sorted = [...moves]
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PokePaper elevation={2} p={2} sx={{ textAlign: 'left'}}>
      {sorted.map(move =>
        <PokeMove key={move.name} {...move} /> )}
    </PokePaper>
  );
}

export default PokeMoves;
