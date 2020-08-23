import React from 'react';
import CustomVideo from '../Library/components/Video/Custom/Video'
const VideoPage = () => {
  return (
    <CustomVideo onPlay={console.log("onplay")} url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
  );
};

export default VideoPage;
