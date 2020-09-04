import React from 'react';
import PropTypes from 'prop-types';
import { XAxis, YAxis } from './Axis.js';
import { HorizontalGuides, VerticalGuides } from './Guides.js';
import {polyLineRounded} from "../../Utils.js"


const STROKE = 1;

const LineChart = ({
  data,
  height,
  width,
  horizontalGuides,
  verticalGuides,
  precision,
}) => {
  const fontSize = width / 50;
  const maximumXFromData = Math.max(...data.map(e => e.x));
  const maximumYFromData = Math.max(...data.map(e => e.y));

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (fontSize + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data
    .map(element => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis
        height={height}
        padding={padding}
        fontSize={fontSize}
        chartWidth={chartWidth}
        maximumXFromData={maximumXFromData}
        data={data}
        width={width}
      />
      <YAxis
        height={height}
        horizontalGuides={horizontalGuides}
        fontSize={fontSize}
        padding={padding}
        precision={precision}
        maximumYFromData={maximumYFromData}
        data={data}
        chartHeight={chartHeight}
      />

      <VerticalGuides
        verticalGuides={verticalGuides}
        data={data}
        padding={padding}
        width={width}
        height={height}
      />

      <HorizontalGuides
        padding={padding}
        horizontalGuides={horizontalGuides}
        chartHeight={chartHeight}
        width={width}
      />

      <polyline
        fill="none"
        stroke="#0074d9"
        strokeWidth={STROKE}
       
        points={points}
      />
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2,
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  horizontalGuides: PropTypes.number,
  verticalGuides: PropTypes.number,
  precision: PropTypes.number,
};

export default LineChart;
