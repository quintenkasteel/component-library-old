import React from "react"
import styled from 'styled-components'

const Row = ({ 
  stretched, 
  backgroundImage, 
  backgroundGradient, 
  backgroundColor, 
  inverted, 
  textAlign, 
  verticalAlign, 
  children}) => {

    const StyledRow = styled.div`
    background: ${backgroundColor ? backgroundColor : backgroundGradient ? backgroundGradient : backgroundImage ? backgroundImage : ""};
    text-align: ${textAlign == "center" ? "center" : textAlign == "left" ? "left" : textAlign == "right" ? "right" : ""};
    align-items: ${verticalAlign == "center" ? "center" : verticalAlign == "top" ? "flex-start" : verticalAlign == "bottom" ? "flex-end" : ""};
    `
  // const rowStyle = {
  //   "background": `${backgroundColor ? backgroundColor : backgroundGradient ? backgroundGradient : backgroundImage ? backgroundImage : null}`,
  //   "textAlign": `${textAlign = "center" ? "center" : textAlign = "left" ? "left" : textAlign = "right" ? "right" : null}`,
  //   "alignItems": `${verticalAlign = "center" ? "center" : verticalAlign = "top" ? "flex-start" : verticalAlign = "bottom" ? "flex-end" : null}`,
  // };

  const rowClasses = 
  `row ` +
  `${stretched ? `stretched ` : ``}`;

  return (
    <StyledRow className={rowClasses}>
      {children}
    </StyledRow>
  )}

export default Row