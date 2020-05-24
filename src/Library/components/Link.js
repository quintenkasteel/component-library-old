import React from 'react';
import propTypes from 'prop-types';

const Link = ({ children, to, target, activeClassName, partiallyActive, ...props }) => {
  return (
    <a href={to} target={target || null} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

Link.propTypes = {
  children: propTypes.node,
  to: propTypes.string,
  target: propTypes.string,
  activeClassName: propTypes.string,
  partiallyActive: propTypes.string,
};

export default Link;
