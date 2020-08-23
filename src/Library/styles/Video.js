import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ripple = keyframes`
  80% {
    transform: translate(-100%, -100%) scale(2);
  }
  100% {
    transform: translate(-100%, -100%) scale(2);
    opacity: 0;
  }
`;

const StyledVideoContainer = styled.div`
  height: 0;
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`;

const StyledVideo = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const StyledVideoControlsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  /* opacity: ${props => (props.showControls ? 1 : 0)}; */

  &:before {
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: black;
    opacity: 0.3;
    z-index: -1;
  }
`;

const StyledBottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  align-items: flex-end;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const StyledVideoControlsOverlay = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledRewind = styled.div`
  font-size: 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPlayFloat = styled.div`
  font-size: 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus,
  &:active {
    &:before {
      background-color: $shocking-pink;
      width: 100px;
      height: 100px;
      position: absolute;
      border-radius: 50%;
      content: '';
      top: 50%;
      left: 50%;
      opacity: 0;
      background: red;
      transform: translateX(-50%) translateY(-50%);
      mix-blend-mode: screen;
      animation: ${ripple} 1250ms ease-out forwards,
        ${fade} 1500ms ease-out forwards;
    }
  }
`;
const StyledFastForward = styled.div`
  font-size: 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPlayMain = styled.div`
  color: white;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMute = styled.div`
  color: white;
  width: 5%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 130px;

  &:hover,
  &:active,
  &:focus {
    .volume-range {
      display: block;
    }
  }
  .volume-range {
    display: none;
    position: absolute;
    bottom: 80px;
    left: 0;
    transform: translatex(-58%) rotate(-90deg);
  }
`;
const StyledVolumeContainer = styled.div`
  color: white;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledVolumeOpen = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledVolume = styled.input``;
const StyledSeek = styled.input`
  flex: 1 0 auto;
`;

const StyledElapsedTime = styled.div`
  color: white;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPlayBackRateContainer = styled.div`
  color: white;
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPlayBackRate = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;
const StyledPlayBackRateOptionsContainer = styled.div`
  color: white;

  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
`;
const StyledPlayBackRateOption = styled.div`
  color: white;
  display: flex;
  padding: 5px 0;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  white-space: nowrap;
`;
const StyledFullScreen = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
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
  StyledVideo,
  StyledPlayFloat,
  StyledVideoContainer,
  StyledVideoControlsContainer,
};
