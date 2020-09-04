import React from 'react';
import Chart from '../library/components/Chart.js';
import HeatMap from "../library/components/charts/HeatMap.js";
import BarChart from '../library/components/charts/Bar.js';

const LineData = [
  { label: 'S', x: 0, y: 0 },
  { label: 'M', x: 1, y: 400 },
  { label: 'T', x: 2, y: 300 },
  { label: 'W', x: 3, y: 100 },
  { label: 'TH', x: 4, y: 400 },
  { label: 'F', x: 5, y: 500 },
  { label: 'S', x: 6, y: 400 },
  { label: 'S', x: 7, y: 400 },
  { label: 'S', x: 8, y: 0 },
  { label: 'M', x: 9, y: 400 },
  { label: 'T', x: 10, y: 300 },
  { label: 'W', x: 11, y: 100 },
  { label: 'TH', x: 12, y: 400 },
  { label: 'F', x: 13, y: 500 },
  { label: 'S', x: 14, y: 400 },
  { label: 'S', x: 15, y: 400 },
];

const pieData = [6, 2, 1, 8, 10, 4, 5, 2, 7, 8, 12];

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

// Display only even labels
const xLabelsVisibility = new Array(24)
  .fill(0)
  .map((_, i) => (i % 2 === 0 ? true : false));

const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );

const ChartPage = () => {
  return (
    <>
      <div style={{ width: '700px' }}>
        <Chart
          type="line"
          width={500}
          height={300}
          data={LineData}
          horizontalGuides={5}
          precision={2}
          verticalGuides={5}
        />
      </div>
      <div style={{ width: '700px' }}>
        <Chart type="pie" radius={100} data={pieData} />
      </div>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        xLabelsLocation={'bottom'}
        xLabelsVisibility={xLabelsVisibility}
        xLabelWidth={50}
        data={data}
        squares
        onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(12, 160, 244, ${1 - (max - value) / (max - min)})`,
          fontSize: '11px',
          fontFamily: 'Arial',
        })}
        cellRender={value => value && `${value}%`}
        title={(value, unit, index) => value && `${value}-${xLabels[index]}`}
      />
      <BarChart />
    </>
  );
};

export default ChartPage;





  