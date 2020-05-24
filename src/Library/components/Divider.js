import React from 'react';

const Divider = ({ children, direction, weight }) => {
  return (
    <div className={`divider ` + `${direction} ` + `weight-${weight} `}>
      <div className="divider-text">{children}</div>
    </div>
  );
};

export default Divider;
