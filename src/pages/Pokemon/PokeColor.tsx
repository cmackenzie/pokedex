import React from 'react';
import { Box, Chip } from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';

const TypeBoxSpacing = styled(Box)(spacing);
const TypeBox = styled(TypeBoxSpacing)`
  display: inline-block;
`;

const TypeChip = styled(Chip)`
  color: #fff;
  font-weight: 800;
`;

const chipLookup:{ [index: string]: React.ReactNode } = {
  red: <TypeChip label='Red' size='medium' sx={{ backgroundColor: 'red' }} />,
  blue: <TypeChip label='Blue' size='medium' sx={{ backgroundColor: 'blue' }} />,
  yellow: <TypeChip label='Yellow' size='medium' sx={{ backgroundColor: 'yellow' }} />,
  green: <TypeChip label='Green' size='medium' sx={{ backgroundColor: 'green' }} />,
  black: <TypeChip label='Black' size='medium' sx={{ backgroundColor: 'black', color: '#fff' }} />,
  brown: <TypeChip label='Brown' size='medium' sx={{ backgroundColor: 'brown' }} />,
  purple: <TypeChip label='Purple' size='medium' sx={{ backgroundColor: 'purple' }} />,
  gray: <TypeChip label='Gray' size='medium' sx={{ backgroundColor: 'gray' }} />,
  white: <TypeChip label='White' size='medium' sx={{ backgroundColor: '#eee' }} />,
  pink: <TypeChip label='Pink' size='medium' sx={{ backgroundColor: 'pink' }} />,
};

interface PokeTypeProps {
  color: string
}

function PokeColor(props: PokeTypeProps) {
  const { color } = props;

  return (
    <TypeBox mr={1}>
      {chipLookup[color]}
    </TypeBox>
  );
}

export default PokeColor;
