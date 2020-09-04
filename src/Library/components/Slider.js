import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import leftArrow from '../../../images/arrow-left.svg';
import rightArrow from '../../../images/arrow-right.svg';

const SliderContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
  margin: 40px 0;
  position: relative;
  min-height: 500px;
  margin: 40px auto;
  perspective: 1000px;
`;

const SliderRow = styled.div`
  /* transform: ${props => `translateX(-${props.translate}%)`};
  transition: ${props => `transform ease-in-out ${props.transition}s`}; */
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transform: translateZ(-${props => props.sliderTranslation}px);
  transform-style: preserve-3d;
  transition: transform 1s;
`;

const Slide = styled.div`
  /* min-width: ${props => props.slideWidth}%;
  max-width: ${props => props.slideWidth}%; */

  border: 1px solid black;
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

  ${props =>
    props.styled === 'normal' &&
    `
  box-shadow: 0 0 10px #000;
  position: relative;
  min-height: 300px;

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
  }`}

  ${props =>
    props.styled === 'caroussel' &&
    `
    position: absolute;
    width: 300px;
    height: 120px;

    transform: rotateY(${props.index * props.carouselDegrees -
      props.activeIndex * props.carouselDegrees}deg)  translateZ(${
      props.carouselTranslation
    }px); 
    transition: transform ease-in 0.1s;
  
  `}
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

  img {
    position: absolute;
    height: 50%;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 25px;
`;

const Slider = ({
  showCount,
  slideCount,
  children,
  styled = 'normal',
  loop = false,
}) => {
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
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const getShowCount = showCount ? showCount : 3;
  const getSlideCount = slideCount ? slideCount : 1;
  const mobileWidth = 768;
  const slidesToShow = windowWidth >= mobileWidth ? getShowCount : 1;
  const slideWidth = () => 100 / slidesToShow;
  const itemCount = children.length;
  const cellSize = 300;
  const carouselDegrees = 360 / itemCount;
  const translateCarousel =
    Math.round(cellSize / 2 / Math.tan(Math.PI / itemCount)) + 20;

  const prevSlide = () => {
    return setState({
      ...state,
      translate: (activeIndex - getSlideCount) * slideWidth(),
      activeIndex: activeIndex - getSlideCount,
    });
  };

  const nextSlide = () => {
    if (
      (loop && activeIndex === itemCount - getShowCount) ||
      (loop && activeIndex + getSlideCount > itemCount - getSlideCount)
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
          sliderTranslation={translateCarousel}
          styled={styled}
          className="slider-wrapper">
          {children.map((child, i) => (
            <Slide
              key={i}
              itemCount={itemCount}
              index={i}
              styled={styled}
              slideWidth={slideWidth()}
              carouselTranslation={translateCarousel}
              carouselDegrees={carouselDegrees}
              activeIndex={activeIndex}>
              {child}
            </Slide>
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
