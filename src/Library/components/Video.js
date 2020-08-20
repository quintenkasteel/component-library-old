import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Vimeo from '@vimeo/player';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
  > div {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  iframe {
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
  }
`;

// function useHookWithRefCallback() {
//   const ref = useRef(null)
//   const setRef = useCallback(node => {
//     if (ref.current) {
//       // Make sure to cleanup any events/references added to the last instance
//     }

//     if (node) {
//       // Check if a node is actually passed. Otherwise node would be null.
//       // You can now do what you need to, addEventListeners, measure, etc.
//     }

//     // Save a reference to the node
//     ref.current = node
//   }, [])

//   return [setRef]
// }

const Video = ({
  title,
  verticalAlign,
  horizontalAlign,
  video,
  target,
  playIcon,
  play = false,
  aspectRatio,
  lazy,
  width,
  onEnded = () => {},
  onPlay = () => {},
  controls = false,
  autoplay = false,
  muted = false,
  getTime = true,
  setTime = null,
}) => {
  const [state, setState] = useState({
    placeholder: '',
    play: false,
    provider: '',
    component: null,
    elapsed: null,
  });
  const [ready, setReady] = useState(false);
  const [noVideo, setNoVideo] = useState(false);

  // const videoRef = useCallback(node => {
  //   if (node !== null) {
  //     node.appendChild(container.current);
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get(`https://noembed.com/embed?url=${video}`)
      .then(res => {
        setState({
          ...state,
          placeholder: res.data.thumbnail_url,
          provider: res.data.provider_name.toLowerCase(),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const ref = useCallback(node => {
    if (node !== null && state.component === null) {
      const player = new Vimeo(node);
      return  (
        setState({ ...state, component: player })
      )
    }
  });

  useEffect(() => {
    if (getTime && state.component !== null) {
      const interval = setInterval(() => {
        state.component.getCurrentTime().then(secs => {
          console.log(secs);
          setState({ ...state, elapsed: secs })
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  });

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
    (video.includes('vimeo') && vimeo_parser(video)) ||
    null;

  const lazyLoad =
    state.placeholder && lazy 
      ? `
        <style>
          * { padding:0; margin:0; overflow:hidden }
          html,body{height:100% }
          img, span { position:absolute; width:100%; top:0; bottom:0; margin:auto }
          span{ height:1.5em; text-align:center; font:48px/1.5 sans-serif; color:white; text-shadow:0 0 0.5em black }
        </style>
        <a href=${videoLink}?autoplay=1>
          <img ${title ? `title=${title}` : ''} src=${state.placeholder} 
            alt=${title || ''}
            >
          <span>${playIcon ? playIcon : '▶'}</span>
        </a>
      `
      : null;

  if (!video) return null;
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
        <iframe
          id="id"
          src={videoLink}
          srcDoc={lazyLoad}
          ref={ref}
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


// var onPlay = function(data) {
//   console.log("play")
// };

// var onPause = function(data) {
//   console.log("pause")
// };

// player.addEvent('play', onPlay);
// player.addEvent('pause', onPause);