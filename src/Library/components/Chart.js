import React from 'react';
import LineChart from './charts/Line.js';
import PieChart from './charts/Pie.js';

const Chart = ({
  type = 'line',
  width,
  height,
  data,
  horizontalGuides,
  showHorizontalGuides,
  precision,
  verticalGuides,
  showVerticalGuides,
  radius
}) => {
  switch (type.toLowerCase()) {
    case 'line':
      return (
        <LineChart
          width={width}
          height={height}
          data={data}
          horizontalGuides={horizontalGuides}
          showHorizontalGuides={showHorizontalGuides}
          precision={precision}
          verticalGuides={verticalGuides}
          showVerticalGuides={showVerticalGuides}
        />
      );
    case 'pie':
      return <PieChart width={width} data={data}/>;
    case 'heatmap':
          return <PieChart width={width} data={data} />;
    default:
      return null;
  }
};

export default Chart;
