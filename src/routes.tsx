import React from 'react';

import DefaultLayout from './layouts/DefaultLayout';

import Dashboard from './pages/Dashboard';
import Pokemon from './pages/Pokemon';

export default [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '',  element: <Dashboard /> },
      { path: 'pokemon/:id',  element: <Pokemon /> },
      // Route all bad routes to the dashboard
      // In larger projects this could/should be an error/404 page
      { path: '*',  element: <Dashboard /> }
    ],
  }
];
