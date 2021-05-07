import React from 'react';
import { withRouter } from 'react-router-dom';

import { useAppContext } from '../contexts/AppContext';
import useHasAccessToken from '../hooks/useHasAccessToken';
import useFetchProfile from '../hooks/useFetchProfile';
import useFetchCurrentlyPlaying from '../hooks/useFetchCurrentlyPlaying';

import SessionHasExpired from './SessionHasExpired';

const ConfigWrapper = ({ children }) => {
  const [{ hasAccessToken }]= useAppContext();

  useHasAccessToken();
  useFetchProfile();
  useFetchCurrentlyPlaying({ immediateFetch: true });

  if (!hasAccessToken) {
    return <SessionHasExpired />;
  }

  return children;
};

export default withRouter(ConfigWrapper);
