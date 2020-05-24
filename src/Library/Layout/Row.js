import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  background: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.backgroundGradient
      ? props.backgroundGradient
      : props.backgroundImage
      ? props.backgroundImage
      : ''};
  text-align: ${(props) =>
    props.textAlign == 'center'
      ? 'center'
      : props.textAlign == 'left'
      ? 'left'
      : props.textAlign == 'right'
      ? 'right'
      : ''};
  align-items: ${(props) =>
    props.verticalAlign == 'center'
      ? 'center'
      : props.verticalAlign == 'top'
      ? 'flex-start'
      : props.verticalAlign == 'bottom'
      ? 'flex-end'
      : ''};
`;

const Row = ({
  stretched,
  backgroundImage,
  backgroundGradient,
  backgroundColor,
  inverted,
  textAlign,
  verticalAlign,
  children,
}) => {
  const rowClasses = `row ` + `${stretched ? `stretched ` : ``}`;

  return (
    <StyledRow
      verticalAlign={verticalAlign}
      textAlign={textAlign}
      backgroundColor={backgroundColor}
      backgroundGradient={backgroundGradient}
      backgroundImage={backgroundImage}
      className={rowClasses}>
      {children}
    </StyledRow>
  );
};

export default Row;
