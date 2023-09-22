import React from 'react';
import { Paper } from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';

const PaperStatSpacing = styled(Paper)(spacing);
const PaperStat = styled(PaperStatSpacing)`
  background-color: #ccc;
  line-height: 30px;
  font-size: 12px;
`;

const FlexedDiv = styled(styled.div`
  display: flex;
`)(spacing);


const ThresholdLabelContainer = styled(FlexedDiv)`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const ThresholdLabel = styled(FlexedDiv)`
  font-weight: 500;
`;

// https://pokemondb.net/pokebase/6506/there-formula-for-working-pokemons-highest-possible-stats
// https://pokemondb.net/pokebase/8855/what-are-hindering-neutral-beneficial-natures
const MAX_EV = 63;
const MAX_IV = 31;
const STAT_BONUS = 5;
const HP_STAT_BONUS = 110;
const HINDERING_NATURE = .9;

const hpStrength = (value: number) => {
  const minValue = Math.floor(((value * 2) + HP_STAT_BONUS));
  const maxValue = Math.floor((value * 2) + HP_STAT_BONUS + MAX_EV + MAX_IV);

  // Midpoint between high and low is a good benchmark
  const averageValue = minValue + ((maxValue - minValue) / 2);
  return [Math.floor((value / averageValue) * 100), minValue, maxValue];
};

const strength = (name: string, value: number) => {
  if(name === 'hp') {
    return hpStrength(value);
  }
  const minValue = Math.floor(((value * 2) + STAT_BONUS) * HINDERING_NATURE);
  const maxValue = Math.floor(((value * 2) + STAT_BONUS + MAX_EV + MAX_IV) / HINDERING_NATURE);

  // Midpoint between high and low is a good benchmark
  const averageValue = minValue + ((maxValue - minValue) / 2);
  return [Math.floor((value / averageValue) * 100), minValue, maxValue];
};



interface PokeStatsProps {
  name: string
  statValue: number
}

// Hopefully the links above are enough to explain what's going on here
// But if it isn't -
// This calculates how "strong" a pokemons base stat is compared to it's minimum and maximum values
// We take the midpoint between the min and max value as a benchmark.
function PokeStatBar(props: PokeStatsProps) {
  const { name, statValue } = props;
  const [strengthValue, minValue, maxValue] = strength(name, statValue);
  return (
    <FlexedDiv>
      <PaperStat elevation={2} sx={{ width: `${strengthValue}%` }}>&nbsp;</PaperStat>
      <ThresholdLabelContainer>
        <ThresholdLabel>{minValue}</ThresholdLabel>
        <ThresholdLabel px={2}>{maxValue}</ThresholdLabel>
      </ThresholdLabelContainer>
    </FlexedDiv>
  );
}

export default PokeStatBar;
