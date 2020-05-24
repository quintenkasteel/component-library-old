import React from "react"
import styled from 'styled-components'

const Col = ({ 
  children, 
  backgroundColor,
  backgroundImage,
  backgroundGradient, 
  float,
  horizontalAlign,
  textAlign,
  verticalAlign,
  width
  }) => {

  // const colStyle = {
  //   "background": `${backgroundColor ? backgroundColor : backgroundGradient ? backgroundGradient : backgroundImage ? backgroundImage : null}`,
  //   "textAlign": `${textAlign = "center" ? "center" : textAlign = "left" ? "left" : textAlign = "right" ? "right" : null}`,
  // };

  const StyledCol = styled.div`
  background: ${backgroundColor ? backgroundColor : backgroundGradient ? backgroundGradient : backgroundImage ? backgroundImage : ""};
  text-align: ${textAlign == "center" ? "center" : textAlign == "left" ? "left" : textAlign == "right" ? "right" : ""};
  flex-flow: column wrap;
  `

  const StyledInnerCol = styled.div`
  align-items: ${verticalAlign == "center" ? "center" : verticalAlign == "top" ? "flex-start" : verticalAlign == "bottom" ? "flex-end" : ""};
  justify-content: ${horizontalAlign == "center" ? "center" : horizontalAlign == "left" ? "flex-start" : horizontalAlign == "right" ? "flex-end" : ""};
`;

  const colClasses = 
  `col ` +
  `${float ? `float-${float} ` : ``}` +
  `${width ? `col-${width} ` : ""} `;

  return (
    <StyledCol className={colClasses}>
      <StyledInnerCol className="inner-col">
        {children}
      </StyledInnerCol>
    </StyledCol>
  )}

export default Col