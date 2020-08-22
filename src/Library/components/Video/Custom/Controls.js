import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

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
      // onBookmark,
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div ref={ref}>
        <div>
          <div>
            <div>
              <div>Video Title</div>
            </div>
            <div>
              {/* <button
                onClick={onBookmark}
                // variant="contained"
                // color="primary"
                // startIcon={<BookmarkIcon />}
              >
                Bookmark
              </button> */}
            </div>
          </div>
          <div>
            <button onClick={onRewind} aria-label="rewind">
              <div>Rewind 10 sec</div>
            </button>
            <button onClick={onPlayPause} aria-label="play">
              {playing ? <div>pause</div> : <div>play</div>}
            </button>
            <button onClick={onFastForward} aria-label="forward">
              <div>Fast forward 10 sec</div>
            </button>
          </div>
          {/* bottom controls */}
          <div>
            <div>
              <input
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
            </div>

            <div>
              <div>
                <button onClick={onPlayPause}>
                  {playing ? <div>pause</div> : <div>play</div>}
                </button>

                <button
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}>
                  {muted ? <div>muted</div> : <div>turn volume up</div>}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  onMouseDown={onSeekMouseDown}
                  onMouseUp={onVolumeSeekDown}
                />
                <button
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }>
                  <div>
                    {elapsedTime}/{totalDuration}
                  </div>
                </button>
              </div>
            </div>

            <div>
              <button onClick={handleClick} aria-describedby={id}>
                <div>{playbackRate}X</div>
              </button>

              <div
                container={ref.current}
                open={open}
                id={id}
                onClose={handleClose}
                // anchorOrigin={{
                //   vertical: "top",
                //   horizontal: "left",
                // }}
                // transformOrigin={{
                //   vertical: "bottom",
                //   horizontal: "left",
                // }}
              >
                <div>
                  {[0.5, 1, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      //   onClick={() => setState({ ...state, playbackRate: rate })}
                      onClick={() => onPlaybackRateChange(rate)}
                      variant="text">
                      <div
                        color={rate === playbackRate ? 'secondary' : 'inherit'}>
                        {rate}X
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={onToggleFullScreen}>
                <div>full screen</div>
              </button>
            </div>
          </div>
        </div>
      </div>
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
