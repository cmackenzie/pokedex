import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Helmet } from 'react-helmet-async';
import PokemonService from '../../services/Pokemon';
import { setPokemon, selectPokemon, selectLoadFailed } from '../../slices/PokemonSlice';
import { useParams } from 'react-router-dom';
import { Box, Grid, capitalize } from '@mui/material';
import { LinearWithValueLabel } from '../../components/LinearProgressWithLabel';
import { NavLink } from 'react-router-dom';
import { Send } from '@mui/icons-material';
import PokeStats from './PokeStats';
import PokeInfo from './PokeInfo';
import PokeHeader from './PokeHeader';
import PokeMoves from './PokeMoves';
import PokeSprites from './PokeSprites';
import PokeEvolution from './PokeEvolution';
import PokeCard from '../../components/PokeCard';
import styled from '@emotion/styled';

const LoadingIndicatorBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  align-items: center;
`;

const LoadingBoldLabel = styled.label`
  font-weight: 800;
`;

const PokedexLink = styled(NavLink)`
  display: flex;
  font-size: 12px;
  color: #333;
  font-weight: 900;
`;

const SendIcon = styled(Send)`
  font-size: 14px;
`;

function Pokemon() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(selectPokemon);
  const loadFailed = useAppSelector(selectLoadFailed);

  useEffect(() => {
    // Loading a different pokemon, clear out the existing pokemon
    dispatch(setPokemon({ item: null, success: true }));

    PokemonService.getPokemon(id as string).then((result) => {
      dispatch(setPokemon({ item: result.resource, success: result.resource !== null }));
    });
  }, [id]);

  if(!pokemon) {
    const formattedId = <LoadingBoldLabel>{id}</LoadingBoldLabel>;
    const text = loadFailed ? 'failed to load' : (isNaN(Number(id)) ? 'loading' : 'loading pokemon');
    return <LoadingIndicatorBox>
      <label>{text} {formattedId}</label>
      <LinearWithValueLabel />
      <PokedexLink to='/'>back to the pokedex&nbsp;<SendIcon/>
      </PokedexLink>
    </LoadingIndicatorBox>;
  }

  return (
    <div>
      <Helmet title={`Pokedex | ${capitalize(pokemon.name)}`} />
      <Grid container spacing={0}>
        <Grid item xs={12} p={2}><PokeHeader name={pokemon.name} id={pokemon.id} /></Grid>
        <Grid item xs={12} sm={6} p={2}>
          <PokeCard {...pokemon} />
        </Grid>
        <Grid item xs={12} sm={6} p={2}>
          <PokeInfo {...pokemon} />
        </Grid>
        <Grid item xs={12} p={2}>
          <h2>Base Stats</h2>
          <PokeStats stats={pokemon.stats} />
        </Grid>
        <Grid item xs={12} p={2}>
          <h2>Evolution Chain</h2>
          <PokeEvolution evolution={pokemon.evolution} />
        </Grid>
        <Grid item xs={12} p={2}>
          <h2>Sprites</h2>
          <PokeSprites sprites={pokemon.sprites} />
        </Grid>
        <Grid item xs={12} p={2}>
          <h2>Available Moves</h2>
          <p>Selecting a move will take you to an external site (pokemondb.net) where you may read more about it.</p>
          <PokeMoves moves={pokemon.moves} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Pokemon;
