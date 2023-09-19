import React from 'react';
import { Grid, capitalize } from '@mui/material';
import PokeType from './PokeType';
import PokeColor from './PokeColor';
import PokeFlavor from './PokeFlavor';
import { PokePaper } from '../../components/PokePaper';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import { MAX_DIGITS } from '../../constants';

const GridSpacing = styled(Grid)(spacing);
const StatGridItemRight = styled(GridSpacing)`
  text-align: right;
  line-height: 30px;
  font-size: 12px;
  font-weight: 800;
  padding-bottom: 3px;
`;

const StatGridItemLeft = styled(GridSpacing)`
  text-align: left;
  padding-bottom: 3px;
`;
const GridContainer = styled(GridSpacing)`
  align-items: center;
`;

const FEET_PER_DECIMETER = 0.3281;
const INCHES_PER_FEET = 12;
const HECTOGRAMS_PER_POUND = 0.220462;

const dmToFeet = (dm: number) => {
  const rawFeet = dm * FEET_PER_DECIMETER;
  return `${Math.floor(rawFeet)}' ${Math.round((rawFeet % 1) * INCHES_PER_FEET)}"`;
};

const hectogramsToPounds = (hectograms: number) =>
  `${Math.round((hectograms * HECTOGRAMS_PER_POUND) * 10) / 10} lbs`;

interface PokeInfoProps {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  flavorText: string
  color: { name: string }
  shape: { name: string }
  growth: { name: string }
  abilities: { name: string }[]
}

function PokeInfo(props: PokeInfoProps) {
  const { id, name, height, weight, types, growth, shape, color, abilities, flavorText } = props;
  return (
    <PokePaper elevation={2}>
      <GridContainer container spacing={0} py={2}>
        <PokeFlavor flavorText={flavorText} />
        <StatGridItemRight item xs={2}>#</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>
          {String(id).padStart(MAX_DIGITS, '0')}
        </StatGridItemLeft>
        <StatGridItemRight item xs={2}>Name</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>{capitalize(name)}</StatGridItemLeft>
        <StatGridItemRight item xs={2}>Height</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>{dmToFeet(height)}</StatGridItemLeft>
        <StatGridItemRight item xs={2}>Weight</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>{hectogramsToPounds(weight)}</StatGridItemLeft>
        <StatGridItemRight item xs={2}>Growth</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>{capitalize(growth.name.replace('-', ' '))}</StatGridItemLeft>
        <StatGridItemRight item xs={2}>Shape</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>{capitalize(shape.name)}</StatGridItemLeft>
        <StatGridItemRight item xs={2}>Color</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}><PokeColor color={color.name} /></StatGridItemLeft>
        <StatGridItemRight item xs={2}>Types</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>
          {types.map(type => <PokeType key={type} type={type} />)}
        </StatGridItemLeft>
        <StatGridItemRight item xs={2}>Abilities</StatGridItemRight>
        <StatGridItemLeft item xs={10} px={4}>
          {abilities.map(a => <div key={a.name}>
            <a
              href={`https://pokemondb.net/ability/${a.name}`}
              target='_blank'
              rel='noreferrer'>
              {capitalize(a.name.replaceAll('-' , ' '))}
            </a>
          </div>)}
        </StatGridItemLeft>
      </GridContainer>
    </PokePaper>
  );
}

export default PokeInfo;
