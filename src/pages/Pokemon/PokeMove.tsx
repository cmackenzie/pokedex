import React from 'react';
import { Box, Chip, capitalize } from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import { OpenInNew } from '@mui/icons-material';

const TypeBoxSpacing = styled(Box)(spacing);
const TypeBox = styled(TypeBoxSpacing)`
  display: inline-block;
`;

const TypeChip = styled(Chip)`
  color: #fff;
  font-weight: 800;
`;

interface PokeMoveProps {
  name: string
}

function PokeMove(props: PokeMoveProps) {
  const { name } = props;

  return (
    <TypeBox mr={1} mb={1}>
      <a href={`https://pokemondb.net/move/${name}`} target='_blank' rel='noreferrer'>
        <TypeChip
          label={capitalize(name.replace('-', ' '))}
          color='primary'
          icon={<OpenInNew sx={{ fontSize: '16px'}} />}
          clickable
          size='medium'/>
      </a>
    </TypeBox>
  );
}

export default PokeMove;
