import React from 'react';
import { Grid } from '@mui/material';
import { PokePaper } from '../../components/PokePaper';
import styled from '@emotion/styled';

const SpritePaper = styled(PokePaper)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface PokeAvatarProps {
  sprites: { url: string }[]
}

function PokeSprites(props: PokeAvatarProps) {
  const { sprites } = props;

  return (
    <Grid container>
      {sprites.map(sprite =>
        <Grid item key={sprite.url} xs={6} sm={3} md={2} pr={2} py={1}>
          <SpritePaper elevation={2}>
            <img src={sprite.url} alt='sprite' style={{ width: '75%' }}/>
          </SpritePaper>
        </Grid>)}
    </Grid>
  );
}

export default PokeSprites;
