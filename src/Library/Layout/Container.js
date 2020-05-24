import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  background: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.backgroundGradient
      ? props.backgroundGradient
      : props.backgroundImage
      ? props.backgroundImage
      : ''};
  align-items: ${(props) =>
    props.verticalAlign === 'center'
      ? 'center'
      : props.verticalAlign === 'top'
      ? 'flex-start'
      : props.verticalAlign === 'bottom'
      ? 'flex-end'
      : ''};
  justify-content: ${(props) =>
    props.horizontalAlign == 'center'
      ? 'center'
      : props.horizontalAlign === 'left'
      ? 'flex-start'
      : props.horizontalAlign === 'right'
      ? 'flex-end'
      : ''};
`;

const Container = ({
  children,
  backgroundImage,
  backgroundGradient,
  backgroundColor,
  verticalAlign,
  horizontalAlign,
}) => {
  return (
    <StyledContainer
      backgroundColor={backgroundColor}
      backgroundGradient={backgroundGradient}
      backgroundImage={backgroundImage}
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
      className="section container">
      {children}
    </StyledContainer>
  );
};

export default Container;
