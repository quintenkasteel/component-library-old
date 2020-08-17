import React from 'react';
import styled from 'styled-components';
const ProgressBarContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '0.5rem')};
  border-radius: ${props =>
    props.borderRadius ? props.borderRadius : '50rem'};
  background: white;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: ${props => (props.color ? props.color : 'grey')};
    opacity: 0.05;
    height: 100%;
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  width: ${props => props.percent}%;
  background: ${props => (props.color ? props.color : 'grey')};
  border-radius: ${props =>
    props.borderRadius ? props.borderRadius : '50rem'};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Progress = ({
  children,
  percent,
  color,
  width,
  height,
  borderRadius,
}) => {
  return (
    <ProgressBarContainer
      width={width}
      height={height}
      color={color}
      borderRadius={borderRadius}
      className="progress-bar-container"
    >
      <ProgressBar
        percent={percent}
        borderRadius={borderRadius}
        color={color}
        className="progress-bar"
      >
        {children}
      </ProgressBar>
    </ProgressBarContainer>
  );
};

export default Progress;
