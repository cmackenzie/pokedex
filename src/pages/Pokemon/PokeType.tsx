import React from 'react';
import { Box, Chip, capitalize } from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import { TYPE_COLORS } from '../../constants';

const TypeBoxSpacing = styled(Box)(spacing);
const TypeBox = styled(TypeBoxSpacing)`
  display: inline-block;
`;

const TypeChip = styled(Chip)`
  color: #fff;
  font-weight: 800;
`;

const DEFAULT_COLOR = '#ccc';

const getTypeColor = (type: string) => {
  if(TYPE_COLORS[type]) {
    return TYPE_COLORS[type];
  }

  return DEFAULT_COLOR;
};

interface PokeTypeProps {
  type: string
}

function PokeType(props: PokeTypeProps) {
  const { type } = props;

  return (
    <TypeBox mr={1}>
      <TypeChip
        label={capitalize(type)}
        size='medium'
        sx={{ backgroundColor: getTypeColor(type) }} />
    </TypeBox>
  );
}

export default PokeType;
