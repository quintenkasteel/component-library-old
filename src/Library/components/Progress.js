import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Progress = ({ children, percent, color, width, height, borderRadius }) => {
  const ProgressBarContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: ${width || '100%'};
    height: ${height || '0.5rem'};
    border-radius: ${borderRadius || '50rem'};
    background: white;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: ${color || 'grey'};
      opacity: 0.05;
      height: 100%;
      width: 100%;
    }
  `;

  const ProgressBar = styled.div`
    width: ${percent}%;
    background: ${color || 'grey'};
    border-radius: 50rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  `;
  return (
    <ProgressBarContainer className="progress-bar-container">
      <ProgressBar className="progress-bar">{children}</ProgressBar>
    </ProgressBarContainer>
  );
};

Progress.propTypes = {
  children: propTypes.any,
  percent: propTypes.number,
  color: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
  borderRadius: propTypes.string,
};

export default Progress;
