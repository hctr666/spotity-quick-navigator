import { useEffect, useCallback } from 'react';

import { useAppContext } from '../contexts/AppContext';

const useFetchCurrentlyPlaying = (initialState = {}) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useAppContext();
  const { immediateFetch } = initialState;

  const fetchCurrentlyPlaying = useCallback(() => (
    window.api.getCurrentlyPlaying()
      .then(data => {
        if (!data.error) {
          dispatch({
            type: 'SET_CURRENTLY_PLAYING',
            currentlyPlaying: data
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'SET_CURRENTLY_PLAYING',
          currentlyPlaying: null
        });
      })
  ), [dispatch]);

  useEffect(() => {
    if (immediateFetch) {
      fetchCurrentlyPlaying();
    }
  }, [fetchCurrentlyPlaying, immediateFetch]);

  return fetchCurrentlyPlaying;
};

export default useFetchCurrentlyPlaying;
