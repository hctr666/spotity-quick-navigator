import { useState, useEffect } from 'react';

import './App.scss';

import Button from 'react-bulma-components/lib/components/button';

import Box from 'react-bulma-components/lib/components/box';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Icon from 'react-bulma-components/lib/components/icon';

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

const { api: service } = window;

function App() {
  const [profile, setProfile] = useState();
  const [currentlyPlaying, setCurrentlyPlaying] = useState();

  const refresh = () => service.getCurrentlyPlaying().then(setCurrentlyPlaying);

  const postPlaybackAction = async (action) => {
    const actionMap = {
      pause: service.pause,
      resume: service.playOrResume,
      next: service.playNext,
      previous: service.playPrevious
    }
    return await actionMap[action]();
  }

  const onPlayNext = () => {
    postPlaybackAction('next')
      .then(refresh);
  };

  const onPlayPrevious = () => {
    postPlaybackAction('previous')
      .then(refresh);
  };

  const onPlayOrResume = () => {
    postPlaybackAction(currentlyPlaying?.isPlaying ? 'pause' : 'resume')
      .then(refresh);
  };

  const renderIcon = (icon) => (
    <Icon>
      <FontAwesomeIcon icon={icon} />
    </Icon>
  )

  useEffect(() => {
    service.getProfile().then(setProfile);
    service.getCurrentlyPlaying().then(setCurrentlyPlaying);
  }, []);

  return (
    <div className="App">
      {currentlyPlaying ? (
        <Box>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                marginRight: 10
              }}
            >
              <Image
                size={currentlyPlaying.album.images[2].width}
                alt={currentlyPlaying.album.name}
                src={currentlyPlaying.album.images[2].url}
                width={currentlyPlaying.album.images[2].width}
                height={currentlyPlaying.album.images[2].height}
              />
            </div>
            <Content>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <p
                  style={{
                    display: 'inherit',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: 0,
                    marginRight: 12
                  }}
                >
                  <strong>{currentlyPlaying.name}</strong>
                  <small>by: {currentlyPlaying.artists[0]?.name}</small>
                  <small>album: {currentlyPlaying.album.name}</small>
                </p>
                <div>
                  <Button.Group
                    size={{ small: 'small' }}
                  >
                    <Button
                      renderAs="span"
                      rounded={true}
                      onClick={onPlayPrevious}
                    >
                      {renderIcon(faStepBackward)}
                    </Button>
                    <Button
                      renderAs="span"
                      onClick={onPlayOrResume}
                      rounded={true}
                    >
                      {renderIcon(currentlyPlaying.isPlaying ? faPause : faPlay)}
                    </Button>
                    <Button
                      renderAs="span"
                      onClick={onPlayNext}
                      rounded={true}
                    >
                      {renderIcon(faStepForward)}
                    </Button>
                    <span style={{ marginRight: 12 }}></span>
                    <Button
                      renderAs="span"
                      onClick={refresh}
                      rounded={true}
                    >
                      {renderIcon(faRedo)}
                    </Button>
                    <Button
                      onClick={service.signOut}
                      color="danger"
                      rounded={true}
                      renderAs="span"
                    >
                      {renderIcon(faSignOutAlt)}
                    </Button>
                  </Button.Group>
                </div>
              </div>
            </Content>
          </div>
        </Box>
      ) : (
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Your session has expired, sign in again
          <Button
            onClick={service.signOut}
            color="danger"
            rounded={true}
            renderAs="span"
          >
            {renderIcon(faSignInAlt)}
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
