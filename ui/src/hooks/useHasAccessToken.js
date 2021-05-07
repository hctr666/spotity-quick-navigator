import { useEffect } from 'react';

import { useAppContext } from '../contexts/AppContext';

const useHasAccessToken = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useAppContext();

  useEffect(() => {
    window.api.checkAccessToken()
      .then(hasToken => {
        if (hasToken) {
          dispatch({
            type: 'HAS_ACCESS_TOKEN'
          });
        }
      });
  }, [dispatch])
};

export default useHasAccessToken;
