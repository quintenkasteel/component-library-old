import React from 'react';
import RangeSlider from '../RangeSlider';
import { OpacityWrapper } from '../../../../styles/ColorPicker';

const Opacity = ({ rgbColor, onChange = () => {} }) => {
  const r = rgbColor[0];
  const g = rgbColor[1];
  const b = rgbColor[2];

  return (
    <OpacityWrapper>
      <RangeSlider
        initial={100}
        min={0}
        max={100}
        background={`linear-gradient(90deg, rgba(${r}, ${g}, ${b},0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%);`}
        backgroundProgress={'transparent'}
        formatFn={number => number.toFixed(0)}
        onChange={e => {
          onChange(e);
        }}
      />
    </OpacityWrapper>
  );
};

export default Opacity;
