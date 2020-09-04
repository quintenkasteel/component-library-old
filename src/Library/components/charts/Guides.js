import React from 'react';

export const HorizontalGuides = ({
  padding,
  horizontalGuides,
  chartHeight,
  width
}) => {
  const startX = padding;
  const endX = width - padding;

  return new Array(horizontalGuides).fill(0).map((_, index) => {
    const ratio = (index + 1) / horizontalGuides;

    const yCoordinate = chartHeight - chartHeight * ratio + padding;

    return (
      <React.Fragment key={index}>
        <polyline
          fill="none"
          stroke={'#ccc'}
          strokeWidth=".5"
          points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
        />
      </React.Fragment>
    );
  });
};

export const VerticalGuides = ({
  verticalGuides,
  data,
  padding,
  width,
  height
}) => {
  const guideCount = verticalGuides || data.length - 1;

  const startY = padding;
  const endY = height - padding;

  return new Array(guideCount).fill(0).map((_, index) => {
    const ratio = (index + 1) / guideCount;

    const xCoordinate = padding + ratio * (width - padding * 2);

    return (
      <React.Fragment key={index}>
        <polyline
          fill="none"
          stroke="#ccc"
          strokeWidth=".5"
          points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
        />
      </React.Fragment>
    );
  });
};
