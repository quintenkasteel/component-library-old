import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon.js';

import {
  StyledVideoControlsOverlay,
  StyledFullScreen,
  StyledPlayBackRateOption,
  StyledPlayBackRateOptionsContainer,
  StyledPlayBackRate,
  StyledPlayBackRateContainer,
  StyledElapsedTime,
  StyledSeek,
  StyledVolume,
  StyledVolumeOpen,
  StyledVolumeContainer,
  StyledPlayMain,
  StyledBottomBar,
  StyledMute,
  StyledFastForward,
  StyledRewind,
  StyledPlayFloat,
  StyledVideoControlsContainer,
} from '../../../styles/Video.js';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <div open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </div>
  );
}

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      hovering,
      // onBookmark,
    },
    ref
  ) => {
    const [state, setState] = useState({
      openPlayBackRate: false,
      openVolume: false,
    });

    const handleOpenPlayBackRate = () => {
      setState({
        ...state,
        openPlayBackRate: !state.openPlayBackRate,
        openVolume: false,
      });
    };

    const handleOpenVolume = () => {
      setState({ ...state, openPlayBackRate: false, openVolume: !openVolume });
    };

    const handleClose = () => {
      setState({ ...state, openPlayBackRate: false, openVolume: false });
    };

    const id = open ? 'simple-popover' : undefined;

    return (
      <StyledVideoControlsContainer showControls={hovering} ref={ref}>
        <StyledVideoControlsOverlay>
          <StyledRewind onClick={onRewind} aria-label="rewind">
            <Icon name={'Rewind'} size={'40px'} />
          </StyledRewind>
          <StyledPlayFloat onClick={onPlayPause}>
            {playing ? (
              <Icon name={'Pause'} size={'100px'} />
            ) : (
              <Icon name={'Play'} size={'100px'} />
            )}
          </StyledPlayFloat>
          <StyledFastForward onClick={onFastForward} aria-label="forward">
            <Icon name={'FastForward'} size={'40px'} />
          </StyledFastForward>
        </StyledVideoControlsOverlay>

        <StyledBottomBar>
          <StyledPlayMain onClick={onPlayPause}>
            {playing ? <Icon name={'pause'} /> : <Icon name={'play'} />}
          </StyledPlayMain>
          <StyledMute>
            <div onClick={onMute} >
              {muted || volume === 0 ? (
                <Icon name={'Mute'} />
              ) : volume < 0.5 ? (
                <Icon name={'VolumeLow'}/>
              ) : (
                <Icon name={'VolumeHigh'} />
              )}
            </div>

            <StyledVolumeContainer>
              <StyledVolume
                OpenVolume={state.openVolume}
                className={'volume-range'}
                type="range"
                min={0}
                max={100}
                value={volume * 100}
                onChange={onVolumeChange}
                aria-labelledby="input-slider"
                onMouseDown={onSeekMouseDown}
                onMouseUp={onVolumeSeekDown}
              />
            </StyledVolumeContainer>
          </StyledMute>

          <StyledSeek
            type="range"
            min={0}
            max={100}
            step={1}
            aria-label="custom thumb label"
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            // onDuration={onDuration}
          />
          <StyledElapsedTime onClick={onChangeDispayFormat}>
            {elapsedTime}/{totalDuration}
          </StyledElapsedTime>
          <StyledPlayBackRateContainer onClick={handleOpenPlayBackRate}>
            <StyledPlayBackRate>{playbackRate}X</StyledPlayBackRate>

            <StyledPlayBackRateOptionsContainer
              container={ref.current}
              isOpen={state.openPlayBackRate}
              id={id}
              onClose={handleClose}>
              {[0.5, 1, 1.5, 2].map((rate, i) => (
                <StyledPlayBackRateOption
                  key={rate}
                  onClick={() => onPlaybackRateChange(rate)}>
                  {rate}X
                </StyledPlayBackRateOption>
              ))}
            </StyledPlayBackRateOptionsContainer>
          </StyledPlayBackRateContainer>

          <StyledFullScreen onClick={onToggleFullScreen}>
            <Icon name={'FullScreen'} />
          </StyledFullScreen>
        </StyledBottomBar>
      </StyledVideoControlsContainer>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
