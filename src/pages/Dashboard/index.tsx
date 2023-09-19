import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Helmet } from 'react-helmet-async';
import PokemonService from '../../services/Pokemon';
import { setPokemonList, selectCount, selectItems, selectNext } from '../../slices/PokemonSlice';
import { resetSearch } from '../../slices/SearchSlice';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import PokeCard from '../../components/PokeCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LinearWithValueLabel } from '../../components/LinearProgressWithLabel';

const CenteredMessage = styled.div`
  text-align: center;
`;

function Dashboard() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const next = useAppSelector(selectNext);
  const count = useAppSelector(selectCount);

  const hasMore = items.length < count;

  const fetchData = () => PokemonService.listPokemon(next || null).then(result => {
    const { resources: newItems, next:newNext, previous: newPrevious, count } = result;
    dispatch(setPokemonList({
      items: [...items, ...newItems],
      next: newNext,
      previous: newPrevious,
      count
    }));
  });

  useEffect(() => {
    dispatch(resetSearch());
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<CenteredMessage>
        Loading more pokemon
        <LinearWithValueLabel />
      </CenteredMessage>}
      scrollableTarget='ScrollableArea'
      endMessage={
        <CenteredMessage>
          <b>Congratulations, you caught em all!</b>
        </CenteredMessage>
      }
    >
      <Grid container spacing={0} >
        <Helmet title='Pokedex | Search' />
        {items.map(i =>
          <Grid item xs={6} sm={4} md={3} p={2}  key={i.id}>
            <PokeCard {...i} />
          </Grid>)}
      </Grid>
    </InfiniteScroll>
  );
}

export default Dashboard;
