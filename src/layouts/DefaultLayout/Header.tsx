import React from 'react';
import { spacing, Box } from '@mui/system';
import styled from '@emotion/styled';
import Search from './Search';

const Dot = styled.div`
  border-radius: 50%;
  display: inline-block;
  border: 2px solid #333;
`;

const BlueDot = styled(Dot)`
  height: 50px;
  width: 50px;
  background-color: rgb(43, 218, 255);
`;

const WhiteDot = styled(Dot)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  background-color: #fff;
  margin-right: 10px;
`;

const RedDot = styled(Dot)`
  height: 15px;
  width: 15px;
  background-color: rgb(200, 33, 85);
  margin-right: 10px;
`;

const YellowDot = styled(Dot)`
  height: 15px;
  width: 15px;
  background-color: rgb(233, 249, 64);
  margin-right: 10px;
`;

const GreenDot = styled(Dot)`
  height: 15px;
  width: 15px;
  background-color: rgb(0, 255, 37);
  margin-right: 10px;
`;

const DotBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`;

const PokeHeaderSpacing = styled.header(spacing);
const PokeHeader = styled(PokeHeaderSpacing)`
  display: flex;
  justify-content: space-between;
  border-bottom: 10px solid #333;
`;


function Header() {
  return (
    <PokeHeader p={2}>
      <DotBox>
        <WhiteDot>
          <BlueDot />
        </WhiteDot>
        <RedDot />
        <YellowDot />
        <GreenDot />
      </DotBox>
      <Search />
    </PokeHeader>
  );
}

export default Header;
