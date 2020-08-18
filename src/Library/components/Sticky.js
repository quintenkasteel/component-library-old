import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StickyContainer = styled.div`
  position: ${props =>
    props.sticky
      ? 'sticky'
      : props.fixed && props.from
      ? props.fixedFrom
      : props.fixed
      ? 'fixed'
      : 'sticky'};
  display: flex;
  flex-flow: column wrap;
  padding: 0.625rem;
  margin: ${props => (props.margin ? props.margin : `0.625rem`)};
  z-index: 1000;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '')};
  background: ${props => (props.background ? props.background : 'white')};
  top: ${props =>
    props.top && props.offset ? props.offset : props.top ? '0' : 'auto'};
  left: ${props =>
    props.left && props.offset ? props.offset : props.left ? '0' : 'auto'};
  right: ${props =>
    props.right && props.offset ? props.offset : props.right ? '0' : 'auto'};
  bottom: ${props =>
    props.bottom && props.offset ? props.offset : props.bottom ? '0' : 'auto'};
  flex: ${props =>
    props.fillVertical && props.fillHorizontal
      ? '1 1 auto'
      : props.fillVertical
      ? '1 0 auto'
      : props.fillHorizontal
      ? '0 1 auto'
      : '0 0 auto'};
`;

const Sticky = ({
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
  margin,
}) => {
  const [state, setState] = useState({
    scrollPostion: 0,
  });

  const listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        calculateScrollDistance();
      });
    });
  };

  const calculateScrollDistance = () => {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop; // how much the user has scrolled by

    return setState({
      scrollPostion: scrollTop,
    });
  };

  useEffect(() => {
    listenToScrollEvent();
  }, []);

  const fixedFrom = state.scrollPostion >= from ? 'fixed' : null;

  return (
    <StickyContainer
      margin={margin}
      from={from}
      fillHorizontal={fillHorizontal}
      fillVertical={fillVertical}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      from={from}
      fixedFrom={fixedFrom}
      sticky={sticky}
      fixed={fixed}
      borderRadius={borderRadius}
      offset={offset}
      background={background}
      className="sticky-container"
    >
      {children}
    </StickyContainer>
  );
};

export default Sticky;
