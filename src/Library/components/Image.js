import React from 'react';
import propTypes from 'prop-types';
import Link from './Link';

const Image = ({ alt, target, src, to }) => {
  if (to) {
    return (
      <Link to={to} target={target}>
        <div className="media-image">
          <img src={src} alt={alt || ''} />
        </div>
      </Link>
    );
  }
  return (
    <div className="media-image">
      <img src={src} alt={alt || ''} />
    </div>
  );
};

Image.propTypes = {
  alt: propTypes.string,
  target: propTypes.string,
  src: propTypes.string,
  to: propTypes.string.isRequired,
};

export default Image;
