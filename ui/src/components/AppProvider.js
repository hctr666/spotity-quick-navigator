import React, { useReducer } from 'react';
import { AppContext } from '../contexts/AppContext';
import appReducer from '../reducers/appReducer';

const initialState = {
  hasAccessToken: false,
  currentProfile: null,
  currentlyPlaying: null
};

const AppProvider = ({ children }) => (
  <AppContext.Provider value={useReducer(appReducer, initialState)}>
    {children}
  </AppContext.Provider>
);

export default AppProvider;
