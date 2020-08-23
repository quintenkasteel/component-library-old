import React from 'react';
import CustomVideo from '../Library/components/Video/Custom/Video';
const VideoPage = () => {
  return (
    <CustomVideo
      onPause={() => console.log('pause')}
      onStart={() => console.log('start')}
      onPlay={() => console.log('play')}
      onProgress={(currentTime) => console.log(currentTime)}
      onDuration={e => console.log(e)}
      url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    />
  );
};

export default VideoPage;
