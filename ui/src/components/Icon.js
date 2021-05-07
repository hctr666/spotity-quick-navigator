import React from 'react';
import BaseIcon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faSignOutAlt,
  faRedo,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  play: faPlay,
  pause: faPause,
  stepForward: faStepForward,
  stepBackward: faStepBackward,
  signOutAlt: faSignOutAlt,
  redo: faRedo,
  signInAlt: faSignInAlt
}

const Icon = ({ name }) => {
  return (
    <BaseIcon>
      <FontAwesomeIcon icon={iconMap[name]} />
    </BaseIcon>
  )
}

export default Icon;
