import React from 'react';
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
  transform: ${(props) => `translateX(-${props.translate}%)`};
  transition: ${(props) => `transform ease-in-out ${props.transition}s`};
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 100%;
`;

const Slide = styled.div`
  min-height: 300px;
  min-width: ${(props) => props.slideWidth}%;
  max-width: ${(props) => props.slideWidth}%;
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

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      translate: 0,
      transition: 0.45,
      windowWidth: 0,
    };

    this.prevSlide = () => this.prevSlide.bind(this);
    this.nextSlide = () => this.nextSlide.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  slideWidth = () => (this.state.windowWidth < 768 ? 100 : 100 / this.props.showCount);

  render() {
    const { transition, activeIndex, translate, windowWidth } = this.state;
    const { showCount, slideCount, children } = this.props;

    const getShowCount = showCount ? showCount : 3;
    const getSlideCount = slideCount ? slideCount : 1;
    const isMobile = window.innerWidth < 768;
    const slidesToShow = windowWidth >= isMobile ? getShowCount : 1;
    const slideWidth = () => (isMobile ? 100 : 100 / slidesToShow);
    const itemCount = children.length;

    const prevSlide = () => {
      if (activeIndex === 0) {
        this.setState(() => ({
          translate: (itemCount - getSlideCount) * slideWidth(),
          activeIndex: itemCount - getSlideCount,
        }));
      }
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex - slideCount,
        translate: (prevState.activeIndex - slideCount) * slideWidth(),
      }));
    };

    const nextSlide = () => {
      if (activeIndex === itemCount - getShowCount) {
        this.setState(() => ({
          activeIndex: 0,
          translate: 0,
        }));
      } else if (activeIndex + getSlideCount > itemCount - getSlideCount) {
        this.setState(() => ({
          activeIndex: 0,
          translate: 0,
        }));
      }
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex + slideCount,
        translate: (prevState.activeIndex + slideCount) * slideWidth(),
      }));
    };

    return (
      <React.Fragment>
        <SliderContainer className="slider-container">
          <SliderRow translate={translate} transition={transition} className="slider-wrapper">
            {React.Children.map(children, (child) => (
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
      </React.Fragment>
    );
  }
}

Slider.PropTypes = {
  showCount: PropTypes.number,
  slideCount: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Slider;
