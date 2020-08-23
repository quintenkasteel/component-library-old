import React, { useRef, useEffect } from 'react';
import {throttle} from "./Utils.js";
import Svg from './Svg';
import { HueWrapper, Handle } from '../../../../styles/ColorPicker.js';

const Hue = ({
  hueX,
  offsetLeft,
  animate,
  setHueX,
  setHue,
  setAnimate,
  squareSize,
  barSize,
  delay,
}) => {
  const bar = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.rect(0, 0, squareSize, barSize);

    const gradient = ctx.createLinearGradient(0, 0, squareSize, 0);
    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [canvas]);

  useEffect(() => {
    function computePosition(e) {
      return Math.max(
        barSize / -2,
        Math.min(
          e.clientX - offsetLeft + squareSize / 2 - barSize / 2,
          squareSize - barSize / 2
        )
      );
    }

    function computeHue(x) {
      return Math.round((x + barSize / 2) * (360 / squareSize));
    }

    const onMouseMove = throttle(e => {
      const x = computePosition(e);
      const hue = computeHue(x);

      setHueX(x);
      setHue(hue);
    }, delay);

    function onMouseUp(e) {
      const x = computePosition(e);
      const hue = computeHue(x);
      setHueX(x);
      setHue(hue);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseDown(e) {
      setAnimate(true);
      const x = computePosition(e);
      const hue = computeHue(x);

      setHueX(x);
      setHue(hue);

      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
    }

    const barRef = bar.current;
    barRef.addEventListener('mousedown', onMouseDown);

    return () => {
      barRef.removeEventListener('mousedown', onMouseDown);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, [offsetLeft, setHue, setHueX, setAnimate]);

  return (
    <HueWrapper barSize={barSize} squareSize={squareSize} ref={bar}>
      <Handle
        barSize={barSize}
        squareSize={squareSize}
        left={hueX}
        animate={animate}>
        <Svg name="handle" />
      </Handle>
      <canvas width={squareSize} height={barSize} ref={canvas} />
    </HueWrapper>
  );
};

export default Hue;
