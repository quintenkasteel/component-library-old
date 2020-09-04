import React from 'react';

const Slice = props => {
  const { angle, radius, ...rest } = props;
  const r = radius; // for brevity
  const dx = r * Math.sin(angle);
  const dy = r * (1 - Math.cos(angle));

  return <path {...rest} d={`M${r} ${r}V0a${r} ${r} 0 0 1 ${dx} ${dy}z`} />;
};

const PieChart = ({ data, width = 500 }) => {
  const radius = width / 2;
  const total = data.reduce((a, b) => a + b, 0);

  let rotate = 0.5 * Math.PI;

  return (
    <svg viewBox={`0 0 ${width} ${width}`}>
      {data.map((value, i) => {
        const angle = (2 * Math.PI * value) / total;

        const fill = `hsl(${70 * i}, 100%, 50%)`;
        const transform = `rotate(${rotate}rad)`;
        const transformOrigin = `${radius}px ${radius}px`;

        rotate += angle;

        return (
          <Slice
            key={i}
            angle={angle}
            radius={radius}
            style={{ fill, transform, transformOrigin }}
          />
        );
      })}
    </svg>
  );
};

PieChart.defaultProps = {
  width: 500,
};

export default PieChart;
