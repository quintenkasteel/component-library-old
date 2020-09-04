import React from 'react';

const Axis = ({ points }) => (
  <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
);

const LabelsXAxis = ({
  height,
  padding,
  fontSize,
  chartWidth,
  maximumXFromData,
  data
}) => {
  const y = height - padding + fontSize * 2;

  return data.map((element, index) => {
    const x =
      (element.x / maximumXFromData) * chartWidth + padding - fontSize / 2;
    return (
      <text
        key={index}
        x={x}
        y={y}
        style={{
          fill: '#808080',
          fontSize: fontSize,
          fontFamily: 'Helvetica',
        }}>
        {element.label}
      </text>
    );
  });
};

const LabelsYAxis = ({
  horizontalGuides,
  fontSize,
  padding,
  precision,
  maximumYFromData,
  chartHeight
}) => {
  return new Array(horizontalGuides + 1).fill(0).map((_, index) => {
    const ratio = index / horizontalGuides;

    const yCoordinate =
      chartHeight - chartHeight * ratio + padding + fontSize / 2;
    return (
      <text
        key={index}
        x={fontSize}
        y={yCoordinate}
        style={{
          fill: '#808080',
          fontSize: fontSize,
          fontFamily: 'Helvetica',
        }}>
        {parseFloat(
          maximumYFromData * (index / horizontalGuides)
        ).toFixed(precision)}
      </text>
    );
  });
};

export const XAxis = ({
  padding,
  height,
  width,
  fontSize,
  chartWidth,
  maximumXFromData,
  data,
}) => (
  <>
    <Axis
      points={`${padding},${height - padding} ${width - padding},${height -
        padding}`}
    />
    <LabelsXAxis
      height={height}
      padding={padding}
      fontSize={fontSize}
      chartWidth={chartWidth}
      maximumXFromData={maximumXFromData}
      data={data}
    />
  </>
);

export const YAxis = ({
  padding,
  height,
  horizontalGuides,
  fontSize,
  precision,
  maximumYFromData,
  chartHeight
}) => (
  <>
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
    <LabelsYAxis
      horizontalGuides={horizontalGuides}
      fontSize={fontSize}
      padding={padding}
      precision={precision}
      maximumYFromData={maximumYFromData}
      chartHeight={chartHeight}
    />
  </>
);
