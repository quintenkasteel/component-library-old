import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenful from 'screenfull';
import Controls from './Controls';
import {StyledVideo, StyledVideoContainer} from "../../../styles/Video.js"

const format = seconds => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date
    .getUTCSeconds()
    .toString()
    .padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const CustomVideo = ({
  url,
  lazy,
  progressInterval = 1000,
  playIcon,
  playsInline,
  controls=true,
  playbackRate=1,
  posterImage,
  config,
  startFrom = 0,
  onReady = () => {},
  onStart = () => {},
  onPlay = () => {},
  onPause = () => {},
  onProgress = () => {},
  onDuration = () => {},
  onBuffer = () => {},
  onBufferEnd = () => {},
  onSeek = () => {},
  onEnded = () => {},
  onError = () => {},
  onEnablePIP = () => {},
  onDisablePIP = () => {},
  getCurrentTime = () => {},
  getSecondsLoaded = () => {},
  getDuration = () => {},
  getPosterImage = () => {},
}) => {
  const [state, setState] = useState({
    pip: false,
    playing: false,
    autoplay: false,
    muted: false,
    played: 0,
    duration: 0,
    currentTime: startFrom,
    playbackRateState: playbackRate,
    timeDisplayFormat: 'normal',
    volume: 1,
    loop: false,
    seeking: false,
    hovering: false
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    muted,
    loop,
    playbackRateState,
    timeDisplayFormat,
    duration,
    played,
    currentTime,
    seeking,
    volume,
    autoplay,
    hovering
  } = state;

  const handlePlayPause = () => {
    playing ? playerRef.current.pause() : playerRef.current.play();
    playing ? onPause() : currentTime === 0 ? onStart() : onPlay();

    setState({ ...state, playing: !playing });
  };

  const handleRewind = () => {
    playerRef.current.currentTime = playerRef.current.currentTime - 10;
    setState({
      ...state,
      played: parseFloat(
        playerRef.current.currentTime / playerRef.current.duration
      ),
      currentTime: playerRef.current.currentTime,
    });
  };

  const handleFastForward = () => {
    playerRef.current.currentTime = playerRef.current.currentTime + 10;
    setState({
      ...state,
      played: parseFloat(
        playerRef.current.currentTime / playerRef.current.duration
      ),
      currentTime: playerRef.current.currentTime,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playing && !seeking) {
        const p = parseFloat(
          playerRef.current.currentTime / playerRef.current.duration
        );

        setState({
          ...state,
          volume: volume,
          muted: muted,
          currentTime: playerRef.current.currentTime,
          played: p,
        });
        onProgress({
          playedSeconds: playerRef.current.currentTime,
          playedPercentage: p,
        });
      }
    }, progressInterval);
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    const videoDuration = () => {
      setState({ ...state, duration: playerRef.current.duration });
    };
    playerRef.current.addEventListener('loadedmetadata', videoDuration);
    playerRef.current.duration ? onDuration(playerRef.current.duration) : null;

    return () => {
      playerRef.current.removeEventListener('loadedmetadata', videoDuration);
    };
  }, [duration]);

  const handleSeekChange = e => {
    const current = parseFloat(
      (playerRef.current.duration / 100) * e.target.value
    );
    setState({
      ...state,
      currentTime: current,
      played: parseFloat(e.target.value / 100),
    });
    playerRef.current.currentTime = current;
  };

  const handleSeekMouseDown = e => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = e => {
    setState({ ...state, seeking: false });
  };

  const handleDuration = duration => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = e => {
    setState({
      ...state,
      seeking: false,
      volume: parseFloat(e.target.value / 100),
    });

    playerRef.current.volume = parseFloat(e.target.value / 100);
  };

  const handleVolumeChange = e => {
    setState({
      ...state,
      volume: parseFloat(e.target.value / 100),
      muted: e.target.value !== 0 ? false : muted,
    });
    playerRef.current.volume = parseFloat(e.target.value / 100);
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    setState({...state, hovering: true})
    count = 0;
  };

  const handleMouseLeave = () => {
    setState({...state, hovering: false})
    count = 0;
  };

  const handleDisplayFormat = () => {
    setState({
      ...state,
      timeDisplayFormat:
        timeDisplayFormat === 'normal' ? 'remaining' : 'normal',
    });
  };

  const handlePlaybackRate = rate => {
    setState({ ...state, playbackRateState: rate });
    playerRef.current.playbackRate = rate;
  };

  const handleMute = () => {
    setState({
      ...state,
      muted: !state.muted,
      volume: !state.muted === true ? 0 : 1,
    });
  };

  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  console.log(hovering)
  return (
    <>
      <StyledVideoContainer
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={playerContainerRef}>
        <StyledVideo
          preload={'auto'}
          ref={playerRef}
          width="100%"
          height="100%"
          autoPlay={autoplay}
          controls={false}
          muted={muted}
          loop={loop}
          volume={volume}>
          <source src={url} type="video/mp4"></source>
        </StyledVideo>
      {controls ? 
        <Controls
          ref={controlsRef}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onDuration={handleDuration}
          onRewind={handleRewind}
          onPlayPause={handlePlayPause}
          onFastForward={handleFastForward}
          playing={playing}
          played={played}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onMute={handleMute}
          muted={muted}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          onChangeDispayFormat={handleDisplayFormat}
          playbackRate={playbackRateState}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          volume={volume}
          hovering={hovering}
        /> : null }
      </StyledVideoContainer>
    </>
  );
};

export default CustomVideo;
