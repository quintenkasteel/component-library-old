import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertRGBtoHSL, throttle } from '../../../../Utils.js';
import Svg from './Svg';
import {
  SquareWrapper,
  Cross,
} from '../../../../styles/ColorPicker.js';

const Square = ({
  hue,
  squareXY,
  animate,
  setSquare,
  offsetTop,
  offsetLeft,
  setSquareXY,
  setAnimate,
  squareSize,
  barSize,
  crossSize,
  inputSize,
  setRGB,
  delay,
}) => {
  const square = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, squareSize, squareSize);
    const gradientWhite = ctx.createLinearGradient(0, 0, squareSize, 0);
    gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`);
    gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0, 0, squareSize, squareSize);
    const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareSize);
    gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`);
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0, 0, squareSize, squareSize);
  }, [canvas, hue]);

  useEffect(() => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext('2d');

    function computePosition(e) {
      const x = Math.max(
        crossSize / -2,
        Math.min(
          e.clientX - offsetLeft + squareSize / 2 - crossSize / 2,
          squareSize - crossSize / 2
        )
      );
      const y = Math.max(
        crossSize / -2,
        Math.min(
          (e.clientY -
            offsetTop + ((squareSize / barSize * 15) / 10) ) +
            (squareSize / 2 +
            barSize / 2 +
            inputSize / 2 -
            crossSize / 2),
          squareSize - crossSize / 2
        )
      );

      return [x, y];
    }

    function changeColor(e) {
      const [x, y] = computePosition(e);
      const x1 = Math.min(x + crossSize / 2, squareSize - 1);
      const y1 = Math.min(y + crossSize / 2, squareSize - 1);
      const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data;
      const [h, s, l] = convertRGBtoHSL([r, g, b]);
      setRGB([r, g, b])
      setSquare([s, l]);
      setSquareXY([x, y]);
    }

    const onMouseMove = throttle(e => {
      changeColor(e);
    }, delay);

    function onMouseUp(e) {
      changeColor(e);
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseDown(e) {
      setAnimate(true);
      changeColor(e);
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
    }

    canvasRef.addEventListener('mousedown', onMouseDown);

    return () => {
      canvasRef.removeEventListener('mousedown', onMouseDown);
    };
  }, [offsetTop, offsetLeft, setSquare, setSquareXY, setAnimate]);

  return (
    <SquareWrapper squareSize={squareSize} ref={square}>
      <Cross
        crossSize={crossSize}
        top={squareXY[1]}
        barSize={barSize}
        left={squareXY[0]}
        animate={animate}>
        <Svg name="cross" />
      </Cross>
      <canvas width={squareSize} height={squareSize} ref={canvas} />
    </SquareWrapper>
  );
};

export default Square;
