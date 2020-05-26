import React from 'react';
import propTypes from 'prop-types';

const Text = ({ children }) => {
  return <div className="text-block">{children}</div>;
};

Text.propTypes = {
  children: propTypes.node.isRequired,
};

export default Text;
