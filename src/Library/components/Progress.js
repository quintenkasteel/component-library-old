import React from "react"
import styled from "styled-components"

const Progress = ({
  children,
  percent,
  color,
  width,
  height,
  borderRadius,
}) => {
  const ProgressBarContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: ${width ? width : "100%"};
    height: ${height ? height : "0.5rem"};
    border-radius: ${borderRadius ? borderRadius : "50rem"};
    background: white;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: ${color ? color : "grey"};
      opacity: 0.05;
      height: 100%;
      width: 100%;
    }
  `

  const ProgressBar = styled.div`
    width: ${percent}%;
    background: ${color ? color : "grey"};
    border-radius: 50rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  `
  return (
    <ProgressBarContainer className="progress-bar-container">
      <ProgressBar className="progress-bar">{children}</ProgressBar>
    </ProgressBarContainer>
  )
}

export default Progress
