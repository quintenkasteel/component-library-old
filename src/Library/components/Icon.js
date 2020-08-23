import React from 'react';
import VolumeLow from '../../../Icons/volume-low.png';
import VolumeHigh from '../../../Icons/volume-high.png';
import Stop from '../../../Icons/stop.png';
import Rewind from '../../../Icons/rewind.png';
import Play from '../../../Icons/play.png';
import Resume from '../../../Icons/resume.png';
import Pause from '../../../Icons/pause.png';
import Mute from '../../../Icons/mute.png';
import FastForward from '../../../Icons/fast-forward.png';
import FullScreen from '../../../Icons/full-screen.png';

import StyledIcon from '../styles/Icon.js';

const Icon = ({ name, size }) => {
  switch (name) {
    case 'VolumeLow':
      return <StyledIcon src={VolumeLow} size={size} />;
    case 'VolumeHigh':
      return <StyledIcon src={VolumeHigh} size={size} />;
    case 'Stop':
      return <StyledIcon src={Stop} size={size} />;
    case 'Rewind':
      return <StyledIcon src={Rewind} size={size} />;
    case 'Play':
      return <StyledIcon src={Play} size={size} />;
    case 'Resume':
      return <StyledIcon src={Resume} size={size} />;
    case 'Pause':
      return <StyledIcon src={Pause} size={size} />;
    case 'Mute':
      return <StyledIcon src={Mute} size={size} />;
    case 'FastForward':
      return <StyledIcon src={FastForward} size={size} />;
    case 'FullScreen':
      return <StyledIcon src={FullScreen} size={size} />;
    default:
      return null;
  }
};

export default Icon;
