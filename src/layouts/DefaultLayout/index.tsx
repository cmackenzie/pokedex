import React from 'react';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import Header from './Header';

import './DefaultLayout.css';


const ContentBox = styled(Box)`
  border-right: 5px solid #333;
  border-left: 5px solid #333;
  border-bottom: 5px solid #333;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  height: 87vh;
  overflow: auto;
`;

interface DefaultLayoutType {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutType> = ({ children }) => {

  return (
    <div className="DefaultLayout">
      <Header />
      <ContentBox mx={3} mb={3} id='ScrollableArea'>
        <Online>{children}</Online>
        <Offline>This pokedex requires the internet, please connect!</Offline>
        <Outlet />
      </ContentBox>
    </div>
  );
};

export default DefaultLayout;
