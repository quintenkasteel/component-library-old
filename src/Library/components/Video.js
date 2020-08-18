import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

const StyledVideo = styled.div`
  align-items: ${props =>
    (props.verticalAlign = 'center'
      ? 'center'
      : (props.verticalAlign = 'top'
          ? 'flex-start'
          : (props.verticalAlign = 'bottom' ? 'flex-end' : '')))};
  justify-content: ${props =>
    (props.horizontalAlign = 'center'
      ? 'center'
      : (props.horizontalAlign = 'left'
          ? 'flex-start'
          : (props.horizontalAlign = 'right' ? 'flex-end' : '')))};
`;

const StyledInnerVideo = styled.div`
  align-items: ${props =>
    (props.verticalAlign = 'center'
      ? 'center'
      : (props.verticalAlign = 'top'
          ? 'flex-start'
          : (props.verticalAlign = 'bottom' ? 'flex-end' : '')))};
  justify-content: ${props =>
    (props.horizontalAlign = 'center'
      ? 'center'
      : (props.horizontalAlign = 'left'
          ? 'flex-start'
          : (props.horizontalAlign = 'right' ? 'flex-end' : '')))};
  width: ${props => (props.width ? props.width : '100%')};
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
`;

const StyledIframe = styled(props => <iframe {...props} />)`
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  width: 100%;

  * {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  html,
  body {
    height: 100%;
  }
  img,
  span {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  span {
    height: 1.5em;
    text-align: center;
    font: 48px/1.5 sans-serif;
    color: white;
    text-shadow: 0 0 0.5em black;
  }
`;

const Video = ({
  alt,
  verticalAlign,
  horizontalAlign,
  video,
  target,
  to,
  aspectRatio,
  width,
}) => {
  const [placeholder, setPlaceHolder] = useState('');

  useEffect(() => {
    axios
      .get(`https://noembed.com/embed?url=${video}`)
      .then(res => {
        console.log(res);
        return setPlaceHolder(res.data.thumbnail_url);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  console.log(placeholder);

  const youtube_parser = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoID = match && match[7].length == 11 ? match[7] : false;
    const link = videoID ? `https://www.youtube.com/embed/${videoID}` : null;

    return link;
  };

  const dailymotion_parser = url => {
    const regExp = /^(?:(?:http|https):\/\/)?(?:www.)?(dailymotion\.com|dai\.ly)\/((video\/([^_]+))|(hub\/([^_]+)|([^\/_]+)))$/;
    const match = url.match(regExp);
    const videoID =
      match !== null && match[4] !== undefined
        ? match[4]
        : match !== null
        ? match[2]
        : null;
    const link = videoID
      ? `https://www.dailymotion.com/embed/video/${videoID}`
      : null;
    return link;
  };

  const vimeo_parser = url => {
    const regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    const videoID = match ? match[3] : null;
    const link = videoID ? `https://player.vimeo.com/video/${videoID}` : null;

    return link;
  };

  const videoLink =
    (video.includes('youtube') && youtube_parser(video)) ||
    (video.includes('daily') && dailymotion_parser(video)) ||
    (video.includes('vimeo') && vimeo_parser(video)) || null;

  // const videoUrl = () =>
  //   video.includes('youtube') && videoID
  //     ? `https://www.youtube.com/embed/${videoID}`
  //     : video.includes('daily') && videoID
  //     ? `https://www.dailymotion.com/embed/video/${videoID}`
  //     : video.includes('vimeo') && videoID
  //     ? `https://player.vimeo.com/video/${videoID}`
  //     : null;

  return (
    <StyledVideo
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      className="media-video"
    >
      <StyledInnerVideo
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
        width={width}
        className="media-video-wrapper"
      >
        <StyledIframe
          src={videoLink}
          srcDoc={`
            <style>
              * { padding:0; margin:0; overflow:hidden }
              html,body{height:100% }
              img, span { position:absolute; width:100%; top:0; bottom:0; margin:auto }
              span{ height:1.5em; text-align:center; font:48px/1.5 sans-serif; color:white; text-shadow:0 0 0.5em black }
            </style>
            <a href=${videoLink}?autoplay=1>
              <img src=${placeholder} 
                alt=${alt || 'alt'}>
              <span>▶</span>
            </a>
          `}
          loading="lazy"
          frameBorder="0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          width="100%"
          height="100%"
        />
      </StyledInnerVideo>
    </StyledVideo>
  );
};

export default Video;
