import React from 'react';
import { Grid } from '@mui/material';
import PokeStatBar from './PokeStatBar';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';

const DivSpacing = styled.div(spacing);
const StatLabel = styled(DivSpacing)`
  width: 15%;
  max-width: 100px;
  color: #777;
  text-align: right;
  line-height: 30px;
  font-size: 12px;
  font-weight: 800;
`;

const StatValueLabel = styled(DivSpacing)`
  width: 5%;
  max-width: 50px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-weight: 800;
`;

const StatBar = styled(DivSpacing)`
  width: 80%;
  text-align: right;
  line-height: 30px;
  font-size: 12px;
  font-weight: 800;
`;

const formattedStatNames:{ [index: string]: string } = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP. ATK',
  'special-defense': 'SP. DEF',
  speed: 'SPD'
};

const formatStatName = (stat:string) => {
  if(formattedStatNames[stat] !== undefined) {
    return formattedStatNames[stat];
  }

  return stat;
};

interface PokeStatsProps {
  name: string
  value: number
}

function PokeStat(props: PokeStatsProps) {
  const { name, value } = props;

  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <StatLabel my={1} pr={1}>
        {formatStatName(name)}
      </StatLabel>
      <StatValueLabel my={1} pr={1}>
        {value}
      </StatValueLabel>
      <StatBar my={1}>
        <PokeStatBar name={name} statValue={value} />
      </StatBar>
    </Grid>
  );
}

export default PokeStat;
