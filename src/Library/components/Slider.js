import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import leftArrow from '../../../images/arrow-left.svg';
import rightArrow from '../../../images/arrow-right.svg';

const SliderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const SliderRow = styled.div`
  transform: ${props => `translateX(-${props.translate}%)`};
  transition: ${props => `transform ease-in-out ${props.transition}s`};
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 100%;
`;

const Slide = styled.div`
  min-height: 300px;
  min-width: ${props => props.slideWidth}%;
  max-width: ${props => props.slideWidth}%;
  box-shadow: 0 0 10px #000;
  position: relative;

  div {
    height: 100%;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

const ArrowLeft = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 25px;
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;

  img {
    position: absolute;
    height: 50%;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 25px;
`;

const Slider = ({ showCount, slideCount, children }) => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45,
    windowWidth: 0,
  });

  const { translate, transition, activeIndex, windowWidth } = state;

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      return setState({
        ...state,
        windowWidth: window.innerWidth,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const getShowCount = showCount ? showCount : 3;
  const getSlideCount = slideCount ? slideCount : 1;
  const mobileWidth = 768
  const slidesToShow = windowWidth >= mobileWidth ? getShowCount : 1;
  const slideWidth = () => (100 / slidesToShow);
  const itemCount = children.length;

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (itemCount - getSlideCount) * slideWidth(),
        activeIndex: itemCount - getSlideCount,
      });
    }
    return setState({
      ...state,
      translate: (activeIndex - getSlideCount) * slideWidth(),
      activeIndex: activeIndex - getSlideCount,
    });
  };

  const nextSlide = () => {
    if (
      activeIndex === itemCount - getShowCount ||
      activeIndex + getSlideCount > itemCount - getSlideCount
    ) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }
    return setState({
      ...state,
      translate: (activeIndex + getSlideCount) * slideWidth(),
      activeIndex: activeIndex + getSlideCount,
    });
  };

  return (
    <>
      <SliderContainer className="slider-container">
        <SliderRow
          translate={translate}
          transition={transition}
          className="slider-wrapper"
        >
          {React.Children.map(children, child => (
            <Slide slideWidth={slideWidth()}>{child}</Slide>
          ))}
        </SliderRow>
        <ArrowLeft onClick={() => prevSlide()}>
          <img src={leftArrow} />
        </ArrowLeft>
        <ArrowRight onClick={() => nextSlide()}>
          <img src={rightArrow} />
        </ArrowRight>
      </SliderContainer>
    </>
  );
};

export default Slider;
