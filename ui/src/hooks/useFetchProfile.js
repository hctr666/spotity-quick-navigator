import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const useFetchProfile = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useAppContext();

  useEffect(() => {
    window.api.getProfile()
      .then(data => {
        if (!data.error) {
          dispatch({
            type: 'SET_CURRENT_PROFILE',
            currentProfile: data
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'SET_CURRENT_PROFILE',
          currentProfile: null
        });
      });
  }, [dispatch]);

  return null;
};

export default useFetchProfile;
