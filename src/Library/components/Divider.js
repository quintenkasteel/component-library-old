import React from 'react';
import propTypes from 'prop-types';

const Divider = ({ children, direction, weight }) => {
  return (
    <div className={`divider ${direction} weight-${weight} `}>
      <div className="divider-text">{children}</div>
    </div>
  );
};

Divider.propTypes = {
  children: propTypes.node,
  direction: propTypes.string,
  weight: propTypes.number,
};

export default Divider;
