import React from 'react';
import { Grid, Paper } from '@mui/material';
import PokeStat from './PokeStat';

interface PokeStatsProps {
  stats: {
    name: string
    value: number
  }[]
}

function PokeStats(props: PokeStatsProps) {
  const { stats } = props;

  return (
    <Paper elevation={2}>
      <Grid container spacing={0} py={2}>
        {stats.map(stat =>
          <PokeStat key={stat.name} {...stat} /> )}
      </Grid>
    </Paper>
  );
}

export default PokeStats;
