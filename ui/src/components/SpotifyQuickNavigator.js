import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './AppProvider';
import ConfigWrapper from './ConfigWrapper';
import ConfigureRoutes from './ConfigureRoutes';

const SpotifyQuickNavigator = () => {
  return (
    <AppProvider>
      <Router>
        <ConfigWrapper>
          <ConfigureRoutes />
        </ConfigWrapper>
      </Router>
    </AppProvider>
  )
};

export default SpotifyQuickNavigator;
