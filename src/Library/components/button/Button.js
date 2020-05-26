import React from 'react';
import propTypes from 'prop-types';
import Btn from './Styles';

const Button = ({
  to,
  children,
  style,
  activeClassName,
  inverse,
  primary,
  secundairy,
  disabled,
  light,
  width,
  textAlign,
  verticalAlign,
  horizontalAlign,
  ...props
}) => {
  return (
    <Btn
      primary={primary}
      secundairy={secundairy}
      disabled={disabled}
      light={light}
      width={width}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
      className={`btn ${activeClassName || 'active'}`}
      href={to}
      {...props}>
      <a href={to}>{children}</a>
    </Btn>
  );
};

Button.propTypes = {
  to: propTypes.string,
  children: propTypes.node,
  style: propTypes.string,
  activeClassName: propTypes.string,
  inverse: propTypes.bool,
  primary: propTypes.bool,
  secundairy: propTypes.bool,
  disabled: propTypes.bool,
  light: propTypes.bool,
  width: propTypes.number,
  textAlign: propTypes.string,
  verticalAlign: propTypes.string,
  horizontalAlign: propTypes.string,
};

export default Button;
