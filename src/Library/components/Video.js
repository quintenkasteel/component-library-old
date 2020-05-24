import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vimeoPlaceholder: '',
    };

    this.props = {
      alt,
      verticalAlign,
      horizontalAlign,
      video,
      target,
      to,
      aspectRatio,
      width,
    };
  }

  getVideoInfo = () => {
    axios
      .get(`http://vimeo.com/api/v2/video/${videoID}.json`)
      .then((response) => {
        this.setState({
          vimeoPlaceholder: data[0].thumbnail_large,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getVideoInfo();
  }

  youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  dailymotion_parser = (url) => {
    var regExp = /^(?:(?:http|https):\/\/)?(?:www.)?(dailymotion\.com|dai\.ly)\/((video\/([^_]+))|(hub\/([^_]+)|([^\/_]+)))$/;
    var match = url.match(regExp);
    return match !== null && match[4] !== undefined ? match[4] : match !== null ? match[2] : null;
  };

  vimeo_parser = (url) => {
    var regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    var match = url.match(regExp);
    return match ? match[3] : null;
  };

  videoID = video.includes('youtube')
    ? youtube_parser(video)
    : video.includes('daily')
    ? dailymotion_parser(video)
    : video.includes('vimeo')
    ? vimeo_parser(video)
    : null;

  videoPlaceholder =
    video.includes('youtube') && videoID
      ? `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`
      : video.includes('daily') && videoID
      ? `https://www.dailymotion.com/thumbnail/video/${videoID}`
      : video.includes('vimeo') && videoID
      ? vimeoPlaceholder
      : null;

  videoUrl =
    video.includes('youtube') && videoID
      ? `https://www.youtube.com/embed/${videoID}`
      : video.includes('daily') && videoID
      ? `https://www.dailymotion.com/embed/video/${videoID}`
      : video.includes('vimeo') && videoID
      ? `https://player.vimeo.com/video/${videoID}`
      : null;

  videoLink =
    video.includes('youtube') && videoUrl
      ? `https://www.youtube.com/embed/${videoID}?autoplay=1`
      : video.includes('daily') && videoUrl
      ? `https://www.dailymotion.com/embed/video/${videoID}?autoplay=1`
      : video.includes('vimeo') && videoUrl
      ? `https://player.vimeo.com/video/${videoID}?autoplay=1`
      : null;

  render() {
    // const {
    //   alt,
    //   verticalAlign,
    //   horizontalAlign,
    //   video,
    //   target,
    //   to,
    //   aspectRatio,
    //   width,
    // } = this.props

    const StyledVideo = styled.div`
      align-items: ${(this.props.verticalAlign = 'center'
        ? 'center'
        : (this.props.verticalAlign = 'top'
            ? 'flex-start'
            : (this.props.verticalAlign = 'bottom' ? 'flex-end' : '')))};
      justify-content: ${(this.props.horizontalAlign = 'center'
        ? 'center'
        : (this.props.horizontalAlign = 'left'
            ? 'flex-start'
            : (this.props.horizontalAlign = 'right' ? 'flex-end' : '')))};
    `;

    const StyledInnerVideo = styled.div`
      align-items: ${(this.props.verticalAlign = 'center'
        ? 'center'
        : (this.props.verticalAlign = 'top'
            ? 'flex-start'
            : (this.props.verticalAlign = 'bottom' ? 'flex-end' : '')))};
      justify-content: ${(this.props.horizontalAlign = 'center'
        ? 'center'
        : (this.props.horizontalAlign = 'left'
            ? 'flex-start'
            : (this.props.horizontalAlign = 'right' ? 'flex-end' : '')))};
      width: ${this.props.width ? this.props.width : '100%'};
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    `;

    const StyledIframe = styled((props) => <iframe {...props} />)`
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
    return (
      <StyledVideo className="media-video">
        <StyledInnerVideo className="media-video-wrapper">
          <StyledIframe
            src={this.videoUrl}
            srcDoc={`
            <style>
              * { padding:0; margin:0; overflow:hidden }
              html,body{height:100% }
              img, span { position:absolute; width:100%; top:0; bottom:0; margin:auto }
              span{ height:1.5em; text-align:center; font:48px/1.5 sans-serif; color:white; text-shadow:0 0 0.5em black }
            </style>
            <a href=${this.videoLink}>
              <img src=${this.videoPlaceholder} 
                alt=${this.props.alt || 'alt'}>
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
  }
}

export default Video;

// const Video = ({ alt, verticalAlign, horizontalAlign, video, target, to, aspectRatio, width}) => {
//   const { vimeoPlaceholder } = useState("");

//   function getVideoInfo() {
//     axios.get(`http://vimeo.com/api/v2/video/${videoID}.json`).then((response) => {

//         this.setState({
//             vimeoPlaceholder: data[0].thumbnail_large
//         });
//     }).catch((error) => {
//         console.log(error);
//     });
//   };

//   useEffect(() => {
//     getVideoInfo();
//   });

//   //video ID cleanup functions
//   function youtube_parser(url){
//     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//     var match = url.match(regExp);
//     return (match&&match[7].length==11)? match[7] : false;
//   }

//   function dailymotion_parser(url) {
//     var regExp = /^(?:(?:http|https):\/\/)?(?:www.)?(dailymotion\.com|dai\.ly)\/((video\/([^_]+))|(hub\/([^_]+)|([^\/_]+)))$/
//     var match = url.match(regExp);
//     return (match !== null && match[4] !== undefined)? match[4] : match !== null ? match[2] : null;
//   }

//   function vimeo_parser(url) {
//     var regExp = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
//     var match = url.match(regExp);
//     return match ? match[3] : null;
//   }

//   const videoID =
//     video.includes("youtube") ? youtube_parser(video) :
//     video.includes("daily") ? dailymotion_parser(video) :
//     video.includes("vimeo") ? vimeo_parser(video) : null;

//   const videoPlaceholder =
//     video.includes("youtube") && videoID ?`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg` :
//     video.includes("daily") && videoID ? `https://www.dailymotion.com/thumbnail/video/${videoID}` :
//     video.includes("vimeo") && videoID ? vimeoPlaceholder : null;

//   const videoUrl =
//     video.includes("youtube") && videoID ? `https://www.youtube.com/embed/${videoID}`:
//     video.includes("daily") && videoID ? `https://www.dailymotion.com/embed/video/${videoID}`:
//     video.includes("vimeo") && videoID ? `https://player.vimeo.com/video/${videoID}`: null;

//   const videoLink =
//     video.includes("youtube") && videoUrl ? `https://www.youtube.com/embed/${videoID}?autoplay=1`:
//     video.includes("daily") && videoUrl ? `https://www.dailymotion.com/embed/video/${videoID}?autoplay=1`:
//     video.includes("vimeo") && videoUrl ? `https://player.vimeo.com/video/${videoID}?autoplay=1`:
//     null;

//   //styles
//   const StyledVideo = styled.div`
//     align-items: ${verticalAlign = "center" ? "center" : verticalAlign = "top" ? "flex-start" : verticalAlign = "bottom" ? "flex-end" : ""};
//     justify-content: ${horizontalAlign = "center" ? "center" : horizontalAlign = "left" ? "flex-start" : horizontalAlign = "right" ? "flex-end" : ""};
//     `

//   const StyledInnerVideo = styled.div`
//     align-items: ${verticalAlign = "center" ? "center" : verticalAlign = "top" ? "flex-start" : verticalAlign = "bottom" ? "flex-end" : ""};
//     justify-content: ${horizontalAlign = "center" ? "center" : horizontalAlign = "left" ? "flex-start" : horizontalAlign = "right" ? "flex-end" : ""};
//     width: ${width ? width : '100%'};
//     position: relative;
//     padding-bottom: 56.25%;
//     height: 0;
//     overflow: hidden;
//     `

//   const StyledIframe = styled(props => <iframe {...props}/>)`
//     top: 0;
//     left: 0;
//     position: absolute;
//     height: 100%;
//     width: 100%;

//     *{
//       padding:0;
//       margin:0;
//       overflow:hidden
//     }
//       html,body{
//         height:100%
//       }
//       img,span{
//         position:absolute;
//         width:100%;
//         top:0;
//         bottom:0;
//         margin:auto
//       }
//       span{
//         height:1.5em;
//         text-align:center;
//         font:48px/1.5 sans-serif;
//         color:white;
//         text-shadow:0 0 0.5em black
//       }
//     `
//       return (
//         <StyledVideo className="media-video">
//       <StyledInnerVideo className="media-video-wrapper">
//       <StyledIframe
//           src={videoUrl}
//           srcDoc={`
//             <style>
//               * { padding:0; margin:0; overflow:hidden }
//               html,body{height:100% }
//               img, span { position:absolute; width:100%; top:0; bottom:0; margin:auto }
//               span{ height:1.5em; text-align:center; font:48px/1.5 sans-serif; color:white; text-shadow:0 0 0.5em black }
//             </style>
//             <a href=${videoLink}>
//               <img src=${videoPlaceholder}
//                 alt=${alt || "alt"}>
//               <span>▶</span>
//             </a>
//           `}
//           loading="lazy"
//           frameBorder='0'
//           allowFullScreen={true}
//           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//           webkitallowfullscreen="true"
//           mozallowfullscreen="true"
//           width="100%"
//           height="100%"
//         />
//       </StyledInnerVideo>
//     </StyledVideo>
//       )
//   }

// export default Video
