import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import Hue from './Hue';
import Square from './Square';
import Input from './Input';
import Opacity from './Opacity';
import { rgba2hex, convertRGBtoHSL, hex2hsl, hex2rgb, hsl2rgb } from './Utils.js';

import {
  PickerWrapper,
  PickerOuter,
  PickerInner,
  Inputs,
  Swatch,
  SwatchFallBack,
  StyledChangeType,
  StyledChangeTypeCharacter,
  InputWrapper
} from '../../../../styles/ColorPicker.js';

const AcceptedTypes = ['rgb', 'hex', 'hsl'];

const Picker = ({
  squareSize = 300,
  barSize = 20,
  crossSize = 15,
  inputSize = 40,
  delay = 0,
  type = 'hsl',
  styling = 'photoshop',
  hslValue = () => {},
  hexValue = () => {},
  rgbValue = () => {},
  onChange = () => {}
}) => {
  const [show, setShow] = useState(true);
  const [hue, setHue] = useState(180);
  const [hueX, setHueX] = useState(() => squareSize / 2 - barSize / 2);
  const [square, setSquare] = useState([100, 50]);
  const [rgb, setRGB] = useState([0, 255, 255]);
  const [hsl, setHsl] = useState([180, 100, 50]);
  const [squareXY, setSquareXY] = useState(() => [
    squareSize - crossSize / 2,
    crossSize / -2,
  ]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [color, setColor] = useState(`hsla(180, 100%, 50%, 1)`);
  const [animate, setAnimate] = useState(false);
  const [state, setState] = useState({
    opacity: 1,
    type: type,
    typeIndex: AcceptedTypes.indexOf(type),
    hex: '#ffffff',
  });
  const modal = useRef(null);

  function computeHueX(h) {
    return Math.round((squareSize / 360) * h - barSize / 2);
  }

  function computeSquareXY(s, l) {
    const t = (s * (l < 50 ? l : 100 - l)) / 100;
    const s1 = Math.round((200 * t) / (l + t)) | 0;
    const b1 = Math.round(t + l);
    const x = (squareSize / 100) * s1 - crossSize / 2;
    const y = squareSize - (squareSize / 100) * b1 - crossSize / 2;
    return [x, y];
  }

  useEffect(() => {
    function setOffsets() {
      setOffsetTop(modal.current.offsetTop);
      setOffsetLeft(modal.current.offsetLeft);
    }
    if (show) {
      setOffsets();
      window.addEventListener('resize', setOffsets);
    } else {
      window.removeEventListener('resize', setOffsets);
    }

    return () => {
      window.removeEventListener('resize', setOffsets);
    };
  }, [show]);

  useEffect(() => {
    setHsl([hue, square[0], square[1]]);
     console.log("hsl2rgb", hsl2rgb(hue, square[0], square[1]))
    setRGB(hsl2rgb(hue, square[0], square[1]));
    
    setState({
      ...state,
      hex: '#' + rgba2hex(`rgb(${rgb}, ${state.opacity})`),
    });
    setColor(`hsla(${hue}, ${square[0]}%, ${square[1]}%, ${state.opacity})`);
  }, [hue, square, state.opacity]);

  function onHueChange(n) {
    setAnimate(true);
    setHue(n);
    setHueX(computeHueX(n));
  }

  function onOpacityChange(n) {
    setAnimate(true);
    setState({ ...state, opacity: n / 100 });
  }

  function onSaturationChange(n) {
    setAnimate(true);
    setSquare([n, square[1]]);
    setSquareXY(computeSquareXY(n, square[1]));
  }

  function onLightnessChange(n) {
    setAnimate(true);
    setSquare([square[0], n]);
    setSquareXY(computeSquareXY(square[0], n));
  }

  function ChangeType() {
    const newIndex =
      state.typeIndex + 1 < AcceptedTypes.length ? state.typeIndex + 1 : 0;
    setState({
      ...state,
      typeIndex: newIndex,
      type: AcceptedTypes[newIndex],
    });
  }

  function OnHexChange(e) {
    console.log(e.target.value);
    setState({ ...state, hex: e.target.value });
    const validHex = /^#[0-9A-F]{6}$/i.test(e.target.value);

    if (validHex) {
      const newrgb = hex2rgb(e.target.value);
      const newhsl = convertRGBtoHSL(newrgb);
      
      const h = newhsl[0];
      const s = newhsl[1];
      const l = newhsl[2];

      const r = newrgb[0];
      const g = newrgb[1];
      const b = newrgb[2];

      setHsl([h, s, l]);
      setRGB([r, g, b]);
      setSquare([s, l]);
      setHue(h)
      setHueX(computeHueX(h)) 
      setColor(`hsla(${h}, ${s}%, ${l}%, ${state.opacity})`);
      setSquareXY(computeSquareXY(s, l))
    }
  }

  return (
    <>
      <PickerWrapper color={color} className="1">
        <div className="swatch" onClick={() => setShow(true)} />
        <Modal modal={modal} show={show} onClose={() => setShow(false)}>
          <PickerOuter squareSize={squareSize}>
            <PickerInner
              className="2"
              squareSize={squareSize}
              barSize={barSize}
              inputSize={inputSize}>
              <Square
                className="3"
                hue={hue}
                squareXY={squareXY}
                offsetTop={offsetTop}
                offsetLeft={offsetLeft}
                animate
                setSquare={setSquare}
                setSquareXY={setSquareXY}
                setAnimate={setAnimate}
                setRGB={setRGB}
                squareSize={squareSize}
                barSize={barSize}
                crossSize={crossSize}
                inputSize={inputSize}
                delay={delay}
              />
              <Hue
                className="4"
                hueX={hueX}
                offsetLeft={offsetLeft}
                animate
                setHueX={setHueX}
                setHue={setHue}
                setAnimate={setAnimate}
                squareSize={squareSize}
                barSize={barSize}
                delay={delay}
              />
              <Opacity onChange={e => onOpacityChange(e)} rgbColor={rgb} />
              <Inputs className="5">
              <Swatch backgroundColor={color}>
                <SwatchFallBack opacityStyle={state.opacity} />{' '}
              </Swatch>
                {state.type === 'hsl' || state.type === 'rgb' ? (
                    <>
                    <Input
                      className="6"
                      label={state.type === 'hsl' ? 'H' : 'R'}
                      value={state.type === 'hsl' ? hue : rgb[0]}
                      min={0}
                      max={state.type === 'hsl' ? 360 : 255}
                      defaultValue={state.type === 'hsl' ? hue : rgb[0]}
                      setValue={onHueChange}
                    />
                    <Input
                      className="7"
                      label={state.type === 'hsl' ? 'S' : 'G'}
                      value={state.type === 'hsl' ? square[0] : rgb[1]}
                      min={0}
                      max={state.type === 'hsl' ? 100 : 255}
                      defaultValue={state.type === 'hsl' ? square[0] : rgb[1]}
                      setValue={onSaturationChange}
                    />
                    <Input
                      label={state.type === 'hsl' ? 'L' : 'B'}
                      value={state.type === 'hsl' ? square[1] : rgb[2]}
                      min={0}
                      max={state.type === 'hsl' ? 100 : 255}
                      defaultValue={state.type === 'hsl' ? square[1] : rgb[2]}
                      setValue={onLightnessChange}
                    />
                  </>
                ) : null}

                {state.type === 'hex' ? (
                  <InputWrapper width={"225px"}>
                  <label>Hex</label>
                    <input
                      label={'hex'}
                      value={state.hex}
                      placeholder={'#000000'}
                      onChange={e => OnHexChange(e)}
                      onBlur={e => OnHexChange(e)}
                    />
                  </InputWrapper>
                ) : null}
                <StyledChangeType onClick={() => ChangeType()}>
                  <StyledChangeTypeCharacter>{'<>'}</StyledChangeTypeCharacter>
                </StyledChangeType>
              </Inputs>

              
              
            </PickerInner>
          </PickerOuter>
        </Modal>
      </PickerWrapper>
    </>
  );
};

export default Picker;
