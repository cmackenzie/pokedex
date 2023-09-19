import React from 'react';
import { capitalize } from '@mui/material';
import { PokePaper } from '../../components/PokePaper';
import styled from '@emotion/styled';
import { MAX_DIGITS } from '../../constants';

const HeaderPaper = styled(PokePaper)`
  text-align: center;
`;
const Header = styled.h1`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding-bottom: 0;
  letter-spacing: .1em;
`;

const Label = styled.label`
  font-size: 24px;
  color: #777;
  letter-spacing: 0em;
`;

interface PokeHeaderProps {
  name: string
  id: number
}

function PokeHeader(props: PokeHeaderProps) {
  const { name, id } = props;

  return (
    <HeaderPaper elevation={2} py={1}>
      <Header>
        {capitalize(name)}
        <Label>#{String(id).padStart(MAX_DIGITS, '0')}</Label>
      </Header>
    </HeaderPaper>
  );
}

export default PokeHeader;
