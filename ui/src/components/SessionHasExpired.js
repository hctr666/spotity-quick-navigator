import React from 'react';
import Button from 'react-bulma-components/lib/components/button';

import Icon from './Icon';

const style = {
  marginTop: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const SessionHasExpired = () => (
  <div style={style}>
    Your session has expired, sign back in
    <Button
      onClick={window.api?.signOut}
      color="danger"
      rounded={true}
      renderAs="span"
    >
      <Icon name="signInAlt" />
    </Button>
  </div>
)

export default SessionHasExpired;
