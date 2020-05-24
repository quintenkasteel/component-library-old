import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import leftArrow from "../../../images/arrow-left.svg"
import rightArrow from "../../../images/arrow-right.svg"

class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      translate: 0,
      transition: 0.45,
      windowWidth: 0,
    }

    this.prevSlide = () => this.prevSlide.bind(this)
    this.nextSlide = () => this.nextSlide.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  slideWidth = () =>
    this.state.windowWidth < 768 ? 100 : 100 / this.props.showCount

  render() {
    const { transition, activeIndex, translate, windowWidth } = this.state
    const { showCount, slideCount, children } = this.props

    const getShowCount = showCount ? showCount : 3
    const getSlideCount = slideCount ? slideCount : 1
    const isMobile = window.innerWidth < 768
    const slidesToShow = windowWidth >= isMobile ? getShowCount : 1
    const slideWidth = () => (isMobile ? 100 : 100 / getShowCount)
    const itemCount = children.length

    const prevSlide = () => {
      if (activeIndex === 0) {
        this.setState(props => ({
          translate: (children.length - getSlideCount) * slideWidth(),
          activeIndex: children.length - getSlideCount,
        }))
      }
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex - slideCount,
        translate: (prevState.activeIndex - slideCount) * slideWidth(),
      }))
    }

    const nextSlide = () => {
      if (activeIndex === children.length - 1) {
        this.setState(() => ({
          activeIndex: 0,
          translate: 0,
        }))
      } else if (
        activeIndex + getSlideCount >
        children.length - getSlideCount
      ) {
        this.setState(() => ({
          activeIndex: 0,
          translate: 0,
        }))
      }
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex + slideCount,
        translate: (prevState.activeIndex + slideCount) * slideWidth(),
      }))
    }

    const sliderContainerStyle = {
      height: `100%`,
      width: `100%`,
      display: `flex`,
      position: `relative`,
      overflow: `hidden`,
    }

    const sliderStyle = {
      transform: `translateX(-${translate}%)`,
      transition: `transform ease-in-out ${transition}s`,
      display: `flex`,
      flexWrap: `nowrap`,
      position: `relative`,
      width: `100%`,
    }

    const Slide = styled.div`
      min-height: 300px;
      min-width: ${slideWidth()}%;
      max-width: ${slideWidth()}%;
      background: red;
      box-shadow: 0 0 10px #000;
      position: relative;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `

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
    `

    const ArrowRight = styled(ArrowLeft)`
      left: auto;
      right: 25px;
    `

    return (
      <React.Fragment>
        <div className="slider-container" style={sliderContainerStyle}>
          <div style={sliderStyle} className="slider-wrapper">
            {React.Children.map(children, child => (
              <Slide>{child}</Slide>
            ))}
          </div>
          <ArrowLeft onClick={() => prevSlide()}>
            <img src={leftArrow} />
          </ArrowLeft>
          <ArrowRight onClick={() => nextSlide()}>
            <img src={rightArrow} />
          </ArrowRight>
        </div>
      </React.Fragment>
    )
  }
}

export default Slider
