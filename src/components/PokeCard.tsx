import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, capitalize } from '@mui/material';
import { PokePaper } from './PokePaper';
import styled from '@emotion/styled';
import { MAX_DIGITS } from '../constants';


const AdvancedPokePaper = styled(PokePaper)`
  height: 100%;
  cursor: pointer;
`;

const PokeGrid = styled(Grid)`
  height: 100%;
`;

const PokeNameLabel = styled.div`
  font-weight: 800;
  letter-spacing: .1em;
`;

const PokeNumberLabel = styled.div`
  font-weight: 800;
  color: #999;
`;

const PoppableGrid = styled(Grid)`
  text-align: center;
`;

const PokeNameGrid = styled(Grid)`
  justify-content: end;
  display: flex;
  flex-direction: column;
`;
const fontSizes:{ [index: string]: string[] } = {
  small: ['11px', '8px', '0em'],
  medium: ['14px', '11px', '.1em'],
  large: ['18px', '12px', '.1em']
};

interface PokeCardProps {
  id: number
  name: string
  avatar: string
  size?: 'small' | 'medium' | 'large'
}

function PokeCard(props: PokeCardProps) {
  const { id, avatar, name, size = 'large' } = props;

  const navigate = useNavigate();
  const [nameFontSize, numberFontSize, letterSpacing] = fontSizes[size];
  return (
    <AdvancedPokePaper elevation={3}
      onClick={() => navigate(`/pokemon/${name}`)}
    >
      <PokeGrid container spacing={0}>
        <PoppableGrid item xs={12} p={2}>
          <img src={avatar} alt='avatar' style={{ width:'100%', maxWidth:'300px' }} />
        </PoppableGrid>
        <PokeNameGrid item xs={12} p={2}>
          <PokeNumberLabel style={{fontSize: numberFontSize }} >
            #{String(id).padStart(MAX_DIGITS, '0')}
          </PokeNumberLabel>
          <PokeNameLabel style={{ fontSize: nameFontSize, letterSpacing }}>{capitalize(name)}</PokeNameLabel>
        </PokeNameGrid>
      </PokeGrid>
    </AdvancedPokePaper>
  );
}

export default PokeCard;
