import React from 'react';
import PropTypes from 'prop-types';

const FixedBox = ({ children, width }) => {
  return <div style={{ flex: `0 0 ${width}px` }}> {children} </div>;
};

FixedBox.defaultProps = {
  children: ' ',
};

FixedBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  width: PropTypes.number.isRequired,
};


function XLabels({ labels, width, labelsVisibility, squares, height, yWidth }) {
  return (
    <div style={{ display: 'flex' }}>
      <FixedBox width={yWidth} />
      {labels.map((x, i) => (
        <div
          key={i}
          style={{
            flex: squares ? 'none' : 1,
            textAlign: 'center',
            width: squares ? `${height + 1}px` : width,
            visibility:
              labelsVisibility && !labelsVisibility[i] ? 'hidden' : 'visible',
          }}>
          {x}
        </div>
      ))}
    </div>
  );
}

XLabels.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  labelsVisibility: PropTypes.arrayOf(PropTypes.bool),
  width: PropTypes.number.isRequired,
  squares: PropTypes.bool,
  height: PropTypes.number,
};

XLabels.defaultProps = {
  labelsVisibility: null,
  squares: false,
  height: 30,
};

const DataGrid = ({
  xLabels,
  yLabels,
  data,
  xLabelWidth,
  yLabelWidth,
  background,
  height,
  yLabelTextAlign,
  unit,
  displayYLabels,
  onClick,
  cursor,
  squares,
  cellRender,
  cellStyle,
  title,
}) => {
  const flatArray = data.reduce((i, o) => [...o, ...i], []);
  const max = Math.max(...flatArray);
  const min = Math.min(...flatArray);

  return (
    <div>
      {yLabels.map((y, yi) => (
        <div key={yi} style={{ display: 'flex' }}>
          <FixedBox width={yLabelWidth}>
            <div
              style={{
                position: 'absolute',
                textAlign: yLabelTextAlign,
                paddingRight: '5px',
                paddingTop: `${height / 3.7}px`,
                width: `${yLabelWidth}px`,
              }}>
              {displayYLabels && y}
            </div>
          </FixedBox>
          {xLabels.map((x, xi) => {
            const value = data[yi][xi];
            const style = Object.assign(
              {
                cursor: `${cursor}`,
                margin: '1px 1px 0 0',
                height,
                width: squares ? `${height}px` : undefined,
                flex: squares ? 'none' : 1,
                textAlign: 'center',
              },
              cellStyle(background, value, min, max, data, xi, yi)
            );
            return (
              <div
                onClick={onClick.bind(this, xi, yi)}
                title={title(value, unit, xi, yi)}
                key={`${xi}_${yi}`}
                style={style}>
                <div style={{ paddingTop: `${height / 3.7}px` }}>
                  {cellRender(value, x, y)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

DataGrid.propTypes = {
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  background: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  xLabelWidth: PropTypes.number.isRequired,
  yLabelWidth: PropTypes.number.isRequired,
  yLabelTextAlign: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  displayYLabels: PropTypes.bool,
  onClick: PropTypes.func,
  cursor: PropTypes.string,
  squares: PropTypes.bool,
  cellRender: PropTypes.func.isRequired,
  cellStyle: PropTypes.func.isRequired,
  title: PropTypes.func,
};

DataGrid.defaultProps = {
  displayYLabels: true,
  cursor: '',
  onClick: () => {},
  squares: false,
  title: (value, unit) => (value || value === 0) && `${value} ${unit}`,
};

function HeatMap({
  xLabels,
  yLabels,
  data,
  background,
  height,
  xLabelWidth,
  yLabelWidth,
  xLabelsLocation,
  yLabelTextAlign,
  xLabelsVisibility,
  unit,
  displayYLabels,
  onClick,
  squares,
  cellRender,
  cellStyle,
  title,
}) {
  let cursor = '';
  if (onClick !== undefined) {
    cursor = 'pointer';
  }
  const xLabelsEle = (
    <XLabels
      labels={xLabels}
      width={xLabelWidth}
      labelsVisibility={xLabelsVisibility}
      height={height}
      squares={squares}
      yWidth={yLabelWidth}
    />
  );
  return (
    <div>
      {xLabelsLocation === 'top' && xLabelsEle}
      <DataGrid
        {...{
          xLabels,
          yLabels,
          data,
          background,
          height,
          xLabelWidth,
          yLabelWidth,
          yLabelTextAlign,
          unit,
          xLabelsLocation,
          displayYLabels,
          onClick,
          cursor,
          squares,
          cellRender,
          cellStyle,
          title,
        }}
      />
      {xLabelsLocation === 'bottom' && xLabelsEle}
    </div>
  );
}

HeatMap.propTypes = {
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  background: PropTypes.string,
  height: PropTypes.number,
  xLabelWidth: PropTypes.number,
  yLabelWidth: PropTypes.number,
  xLabelsLocation: PropTypes.oneOf(['top', 'bottom']),
  xLabelsVisibility: PropTypes.arrayOf(PropTypes.bool),
  yLabelTextAlign: PropTypes.string,
  displayYLabels: PropTypes.bool,
  unit: PropTypes.string,
  onClick: PropTypes.func,
  squares: PropTypes.bool,
  cellRender: PropTypes.func,
  cellStyle: PropTypes.func,
  title: PropTypes.func,
};

HeatMap.defaultProps = {
  background: '#329fff',
  height: 30,
  xLabelWidth: 60,
  yLabelWidth: 40,
  yLabelTextAlign: 'right',
  unit: '',
  xLabelsLocation: 'top',
  xLabelsVisibility: null,
  displayYLabels: true,
  onClick: undefined,
  squares: false,
  cellRender: () => null,
  cellStyle: (background, value, min, max) => ({
    background,
    opacity: (value - min) / (max - min) || 0,
  }),
};

export default HeatMap;
