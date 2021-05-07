import React from 'react';

import '../App.scss';

import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';

import Icon from './Icon';

import { useAppContext } from '../contexts/AppContext';
import useFetchCurrentlyPlaying from '../hooks/useFetchCurrentlyPlaying';

const { api: service } = window;

function Home() {
  const [{ currentProfile, currentlyPlaying }] = useAppContext();
  const fetchCurrentlyPlaying = useFetchCurrentlyPlaying();

  const refresh = () => fetchCurrentlyPlaying();

  const doPlaybackAction = async (action) => {
    const actionMap = {
      pause: service.pause,
      resume: service.playOrResume,
      next: service.playNext,
      previous: service.playPrevious
    }
    return await actionMap[action]();
  }

  const onPlayNext = () => {
    doPlaybackAction('next')
      .then(refresh);
  };

  const onPlayPrevious = () => {
    doPlaybackAction('previous')
      .then(refresh);
  };

  const onPlayOrResume = () => {
    doPlaybackAction(currentlyPlaying?.isPlaying ? 'pause' : 'resume')
      .then(refresh);
  };

  if (!currentlyPlaying) return 'No current track playing'

  return (
    <div className="App">
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
                    <Icon name="stepBackward" />
                  </Button>
                  <Button
                    renderAs="span"
                    onClick={onPlayOrResume}
                    rounded={true}
                  >
                    <Icon name={currentlyPlaying.isPlaying ? 'pause' : 'play'} />
                  </Button>
                  <Button
                    renderAs="span"
                    onClick={onPlayNext}
                    rounded={true}
                  >
                    <Icon name="stepForward" />
                  </Button>
                  <span style={{ marginRight: 12 }}></span>
                  <Button
                    renderAs="span"
                    onClick={refresh}
                    rounded={true}
                  >
                    <Icon name="redo" />
                  </Button>
                  <Button
                    onClick={service.signOut}
                    color="danger"
                    rounded={true}
                    renderAs="span"
                  >
                    <Icon name="signOutAlt" />
                  </Button>
                </Button.Group>
              </div>
            </div>
          </Content>
        </div>
      </Box>
    </div>
  );
}

export default Home;
