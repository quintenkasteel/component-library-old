import React from "react"
import styled from "styled-components"

class Sticky extends React.Component {
  state = {
    scrollPostion: 0,
    stuck: false,
  }

  listenToScrollEvent = () => {
    document.addEventListener("scroll", () => {
      requestAnimationFrame(() => {
        this.calculateScrollDistance()
      })
    })
  }

  calculateScrollDistance = () => {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop // how much the user has scrolled by

    this.setState({
      scrollPostion: scrollTop,
    })
  }

  componentDidMount() {
    this.listenToScrollEvent()
  }

  render() {
    const {
      children,
      offset,
      from,
      top,
      left,
      bottom,
      right,
      fillHorizontal,
      fillVertical,
      background,
      sticky,
      fixed,
      borderRadius,
      margin
    } = this.props

    const { stuck, scrollPostion } = this.state

    const fixedFrom = scrollPostion >= from ? "fixed" : null

    const StickyContainer = styled.div`
      position: ${sticky
        ? "sticky"
        : fixed && from
        ? fixedFrom
        : fixed
        ? "fixed"
        : "sticky"};
      display: flex;
      flex-flow: column wrap;
      padding: 0.625rem;
      margin: ${margin ? margin : `0.625rem`};
      z-index: 1000;
      border-radius: ${borderRadius ? borderRadius : ""};
      background: ${background ? background : "white"};
      top: ${top && offset ? offset : top ? "0" : "auto"};
      left: ${left && offset ? offset : left ? "0" : "auto"};
      right: ${right && offset ? offset : right ? "0" : "auto"};
      bottom: ${bottom && offset ? offset : bottom ? "0" : "auto"};
      flex: ${fillVertical && fillHorizontal
        ? "1 1 auto"
        : fillVertical
        ? "1 0 auto"
        : fillHorizontal
        ? "0 1 auto"
        : "0 0 auto"};
    `
    return (
      <StickyContainer className="sticky-scontainer">
        {children}
      </StickyContainer>
    )
  }
}

export default Sticky
