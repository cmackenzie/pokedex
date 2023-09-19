import React from 'react';
import { Box, Divider } from '@mui/material';
import styled from '@emotion/styled';

const ContainerBox = styled(Box)`
  width: 100%;
`;

const FlavorBox = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  text-align: justify;
`;

interface PokeSpeciesProps {
  flavorText: string
}

export default function PokeFlavor(props: PokeSpeciesProps) {
  const { flavorText } = props;

  return (
    <ContainerBox pb={1}>
      <FlavorBox pt={2} px={2} mb={2}>
        {flavorText}
      </FlavorBox>
      <Divider variant='middle' sx={{backgroundColor: '#333'}} />
    </ContainerBox>
  );
}

