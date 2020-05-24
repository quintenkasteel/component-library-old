import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledCol = styled.div`
  background: ${(props) =>
    (props.backgroundColor && `${props.backgroundColor}`) ||
    (props.backgroundGradient && `${props.backgroundGradient}`) ||
    (props.backgroundImage && `${props.backgroundImage}`) ||
    ''};
  text-align: ${(props) =>
    (props.textAlign === 'center' && 'center') ||
    (props.textAlign === 'left' && 'left') ||
    (props.textAlign === 'right' && 'right') ||
    ''};
  flex-flow: column wrap;
`;

const StyledInnerCol = styled.div`
  align-items: ${(props) =>
    (props.verticalAlign === 'top' && 'flex-start') ||
    (props.verticalAlign === 'center' && 'center') ||
    (props.verticalAlign === 'bottom' && 'flex-end') ||
    ''};

  justify-content: ${(props) =>
    (props.horizontalAlign === 'left' && 'flex-start') ||
    (props.horizontalAlign === 'center' && 'center') ||
    (props.horizontalAlign === 'right' && 'flex-end') ||
    ''};
`;

const Col = ({
  children,
  backgroundColor,
  backgroundImage,
  backgroundGradient,
  float,
  horizontalAlign,
  textAlign,
  verticalAlign,
  width,
}) => {
  const colClasses = `col ${float ? `float-${float} ` : ``} ${width ? `col-${width} ` : ''}`;

  return (
    <StyledCol
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      backgroundGradient={backgroundGradient}
      textAlign={textAlign}
      className={colClasses}>
      <StyledInnerCol
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
        className="inner-col">
        {children}
      </StyledInnerCol>
    </StyledCol>
  );
};

Col.propTypes = {
  children: propTypes.node,
  backgroundColor: propTypes.string,
  backgroundImage: propTypes.string,
  backgroundGradient: propTypes.string,
  float: propTypes.string,
  horizontalAlign: propTypes.string,
  textAlign: propTypes.string,
  verticalAlign: propTypes.string,
  width: propTypes.number,
};

export default Col;
