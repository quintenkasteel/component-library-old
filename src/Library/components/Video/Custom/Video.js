import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenful from 'screenfull';
import Controls from './Controls';

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

const CustomVideo = ({url, lazy}) => {
  console.log(url)
  const [state, setState] = useState({
    pip: false,
    playing: false,
    controls: false,
    light: false,
    autoplay: false,
    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    timeDisplayFormat: 'normal',
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    muted,
    loop,
    playbackRate,
    timeDisplayFormat,
    played,
    seeking,
    volume,
    autoplay,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });

    playing ? playerRef.current.pause() : playerRef.current.play();
  };

  const handleRewind = () => {
    playerRef.current.currentTime = playerRef.current.currentTime - 10;
  };

  const handleFastForward = () => {
    playerRef.current.currentTime = playerRef.current.currentTime + 10;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playing && !seeking) {
        setState({
          ...state,
          volume: volume,
          muted: muted,
          played: parseFloat(
            playerRef.current.currentTime / playerRef.current.duration
          ),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  // useEffect(() => {
  //   if (playerRef.current.duration) {
  //     setState({
  //       ...state,
  //       duration: playerRef.current.duration,
  //     });
  //   }
  // });

  // const handleProgress = changeState => {
  //   if (count > 3) {
  //     controlsRef.current.style.visibility = 'hidden';
  //     count = 0;
  //   }
  //   if (controlsRef.current.style.visibility == 'visible') {
  //     count += 1;
  //   }
  //   if (!state.seeking) {
  //     setState({ ...state, ...changeState });
  //   }
  // };

  const handleSeekChange = e => {
    setState({ ...state, played: parseFloat(e.target.value / 100) });
    playerRef.current.currentTime = parseFloat(
      (playerRef.current.duration / 100) * e.target.value
    );
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
    // controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  const handleMouseLeave = () => {
    // controlsRef.current.style.visibility = 'hidden';
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
    setState({ ...state, playbackRate: rate });
    playerRef.current.playbackRate = rate;
  };

  const handleMute = () => {
    setState({
      ...state,
      muted: !state.muted,
      volume: !state.muted === true ? 0 : volume,
    });
  };

  // const addBookmark = () => {
  //   const canvas = canvasRef.current;
  //   canvas.width = 160;
  //   canvas.height = 90;
  //   const ctx = canvas.getContext('2d');

  //   ctx.drawImage(
  //     playerRef.current.getInternalPlayer(),
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );
  //   const dataUri = canvas.toDataURL();
  //   canvas.width = 0;
  //   canvas.height = 0;
  //   const bookmarksCopy = [...bookmarks];
  //   bookmarksCopy.push({
  //     time: playerRef.current.currentTime(),
  //     display: format(playerRef.current.currentTime()),
  //     image: dataUri,
  //   });
  //   setBookmarks(bookmarksCopy);
  // };

  const currentTime =
    playerRef && playerRef.current ? playerRef.current.currentTime : '00:00';

  const duration =
    playerRef && playerRef.current ? playerRef.current.duration : '00:00';
  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  console.log(url)
  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={playerContainerRef}>
        <video
          ref={playerRef}
          width="100%"
          height="100%"
          autoPlay={autoplay}
          controls={false}
          muted={muted}
          loop={loop}
          volume={volume}>
          <source src={url} type="video/mp4"></source>
        </video>

        {/* <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            pip={pip}
            playing={playing}
            controls={false}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
          /> */}

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
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          volume={volume}
          // onBookmark={addBookmark}
        />
      </div>

      {/* <div>
          {bookmarks.map((bookmark, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlsRef.current.style.visibility = 'visible';

                  setTimeout(() => {
                    controlsRef.current.style.visibility = 'hidden';
                  }, 1000);
                }}>
                <img crossOrigin="anonymous" src={bookmark.image} />
                <div>bookmark at {bookmark.display}</div>
              </div>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} />
      </div> */}
    </>
  );
}

export default CustomVideo;
