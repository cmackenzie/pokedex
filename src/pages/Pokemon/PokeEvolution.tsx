import React from 'react';
import { Grid, Paper } from '@mui/material';
import { EvolutionChain, EvolutionLink } from '../../services/Pokemon/Model';
import PokeCard from '../../components/PokeCard';
import PokeEvolutionTriggers from './PokeEvolutionTriggers';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';

const NoEvolutionParagraph = styled(styled.p`
  text-align: center;
`)(spacing);

// Recursively traverses the evolution chain and creates a grid of pokemon.
// If it finds evolution forks, it forks the parent elements and creates a copy.
// This in effect creates a chain for each distinct evolution path a pokemon can have.
// Eevee has like 7 chains.
const displayEvoChains = (
  gridSize: number,
  workingLinks: React.ReactNode[],
  currentLink: EvolutionLink): React.ReactNode[][] => {

  const currentEvolution = <Grid key={currentLink.id} item xs={gridSize} py={2}>
    <PokeCard
      id={currentLink.id}
      avatar={ currentLink.avatar}
      name={currentLink.species.name}
      size='small'/>
  </Grid>;

  const evolutionDetails = <PokeEvolutionTriggers key={`trigger_${currentLink.id}`} triggers={currentLink.triggers} />;

  workingLinks.push(evolutionDetails, currentEvolution);

  if(currentLink.evolvesTo.length === 0) {
    return [workingLinks];
  }

  const evolutionChains:React.ReactNode[][] = [];

  currentLink.evolvesTo.forEach(evo => {
    const results = displayEvoChains(gridSize, [...workingLinks], evo);
    evolutionChains.push(...results);
  });

  return evolutionChains;
};

// Calculates the maximum number of evolutions in a single evolution path a pokemon can have
// This is necessary so we know how many grid slots to allocate (MaterialUI grid)
const getEvolutionDepth = (currentDepth: number, evolutions: EvolutionLink[]):number => {
  const results = evolutions.map(evo => 1 + getEvolutionDepth(currentDepth, evo.evolvesTo));
  if(results.length === 0) {
    return 0;
  }

  return Math.max(...results);
};

// Some pokemon are simply best the way they were born.
const noChain = <NoEvolutionParagraph p={4}>
  This pokemon is not part of an evolution chain.
</NoEvolutionParagraph>;

interface PokeEvolutionProps {
  evolution: EvolutionChain
}

function PokeEvolution(props: PokeEvolutionProps) {
  const { evolution } = props;

  // Calculate how long the maximum chain for this pokemon is
  // And allocate a grid size for it that has an item for each poke and evolution
  const evolutionDepth = getEvolutionDepth(0, evolution.evolvesTo);
  const gridSize = Math.floor(12 / ((evolutionDepth * 2) - 1));

  const evolutionChains = evolution.pokemonInChain == 1 ? noChain : evolution.evolvesTo.map(evo => {
    const chains = displayEvoChains(gridSize, [], evo);
    return chains.map((chain, idx) =>
      <Grid key={`chain_${idx}`} container sx={{ justifyContent: 'space-around' }}>
        {chain}
      </Grid>);
  });

  return (
    <Paper elevation={2}>
      {evolutionChains}
    </Paper>
  );
}

export default PokeEvolution;
