/* needs improving of the following : 
  - remove refs as much as possible, by adding it to styled components
  - remove immutabilities with let 
  - improve styling
*/

import React, { useLayoutEffect } from 'react';
import {
  StyledRange,
  StyledRangeProgress,
  StyledThumb,
} from '../../../styles/RangeSlider.js';

const getPercentage = (current, min, max) =>
  ((current - min) / (max - min)) * 100;

const getValue = (percentage, min, max) =>
  ((max - min) / 100) * percentage + min;

const getLeft = percentage => `calc(${percentage}% - 5px)`;

const getWidth = percentage => `${percentage}%`;

const RangeSlider = ({
  initial,
  min = 0,
  max,
  formatFn = number => number.toFixed(0),
  onChange,
}) => {
  const initialPercentage = getPercentage(initial, min, max);

  const rangeRef = React.useRef();
  const rangeProgressRef = React.useRef();
  const thumbRef = React.useRef();
  const currentRef = React.useRef();

  const diff = React.useRef();

  const handleUpdate = React.useCallback(
    (value, percentage) => {
      thumbRef.current.style.left = getLeft(percentage);
      rangeProgressRef.current.style.width = getWidth(percentage);
      currentRef.current.textContent = formatFn(value);
    },
    [formatFn]
  );

  const handleMouseMove = event => {
    let newX =
      event.clientX -
      diff.current -
      rangeRef.current.getBoundingClientRect().left;

    const end = rangeRef.current.offsetWidth - thumbRef.current.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, start, end);
    const newValue = getValue(newPercentage, min, max);

    handleUpdate(newValue, newPercentage);

    onChange(newValue);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = event => {
    diff.current =
      event.clientX - thumbRef.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useLayoutEffect(() => {
    handleUpdate(initial, initialPercentage);
  }, [initial, initialPercentage, handleUpdate]);

  return (
    <>
      <RangeHeader>
        <div>{formatFn(min)}</div>
        <div>
          <strong ref={currentRef} />
          &nbsp;/&nbsp;
          {formatFn(max)}
        </div>
      </RangeHeader>
      <StyledRange ref={rangeRef}>
        <StyledRangeProgress ref={rangeProgressRef} />
        <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown} />
      </StyledRange>
    </>
  );
};

export default RangeSlider