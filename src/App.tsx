import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import routes from './routes';

function App() {
  const content = useRoutes(routes);

  return (
    <HelmetProvider>
      <Helmet title='Pokedex' />
      {content}
    </HelmetProvider>
  );
}

export default App;
