import React from "react"
import styled from 'styled-components'


const Container = ({ 
  children, 
  backgroundImage, 
  backgroundGradient, 
  backgroundColor,
  verticalAlign,
  horizontalAlign }) => {

  const StyledContainer = styled.section`
  background: ${backgroundColor ? backgroundColor : backgroundGradient ? backgroundGradient : backgroundImage ? backgroundImage : ""};
  align-items: ${verticalAlign == "center" ? "center" : verticalAlign == "top" ? "flex-start" : verticalAlign == "bottom" ? "flex-end" : ""};
  justify-content: ${horizontalAlign == "center" ? "center" : horizontalAlign == "left" ? "flex-start" : horizontalAlign == "right" ? "flex-end" : ""};
  `
    
    return (
    <StyledContainer className="section container">
      {children}
    </StyledContainer>
    )
  }

export default Container