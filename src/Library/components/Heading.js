import React from 'react';
import propTypes from 'prop-types';

const Heading = ({ children, heading }) => {
  const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
  const safeHeading = heading ? heading.toLowerCase() : '';
  const Title = validHeadingLevels.includes(safeHeading) ? safeHeading : 'div';

  return <Title>{children}</Title>;
};

Heading.propTypes = {
  children: propTypes.node,
  heading: propTypes.string,
};

export default Heading;