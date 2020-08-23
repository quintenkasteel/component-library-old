import styled from 'styled-components';

export const HueWrapper = styled.div`
  position: relative;
  width: ${props => props.squareSize + 'px'};
  height: ${props => props.barSize + 'px'};
  cursor: ew-resize;
`;

export const Handle = styled.div`
  left: ${props => props.left + 'px'};
  transition: ${props => (props.animate ? 'left .1s ease-out' : '0s')};
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${props => props.barSize}px;
  height: ${props => props.barSize}px;
  pointer-events: none;
  z-index: 1;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  padding: 0 10px 0 10px;
  width: ${props => props.width ? props.width : "auto"};

  label {
    font-size: 11px;
    margin-right: 5px;
  }

  input {
    width: ${props => props.width ? "100%": "48px"};
    text-align: center;
    border: 1px solid #ddd;
    outline: 0;
    font-family: monospace;
    font-size: 10px;
    padding: 4px 4px;
    user-select: none;
    &:focus {
      background: #fafafa;
    }
    &::selection {
      background: #ddd;
    }
  }
`;

export const PickerWrapper = styled.div`
  user-select: none;
  .swatch {
    width: 100px;
    height: 50px;
    background: ${props => props.color};
  }
`;

export const PickerOuter = styled.div`
  width: ${props => props.squareSize + 20}px;
  display: grid;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
`;

export const PickerInner = styled.div`
  display: grid;
  grid-template-rows: ${props => props.squareSize + 20}px ${props =>
      props.barSize}px ${props => props.inputSize}px;
  align-items: center;
  justify-items: center;
`;

export const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-bottom: 10px;
`;

export const StyledChangeType = styled.div`
  width: 20px;
  text-align: center;
  border: 1px solid #ddd;
  background: white;
  border-radius: 0;
  outline: 0;
  font-family: monospace;
  font-size: 10px;
  padding: 4px 4px;
  user-select: none;
`;

export const StyledChangeTypeCharacter = styled.div`
  transform: rotate(-90deg);
`

export const SquareWrapper = styled.div`
  position: relative;
  width: ${props => props.squareSize + 'px'};
  height: ${props => props.squareSize + 'px'};
  cursor: crosshair;
`;

export const Canvas = styled.canvas`
  width: ${props => props.squareSize};
  height: ${props => props.squareSize};
`;

export const Cross = styled.div`
  top: ${props => props.top + 'px'};
  left: ${props => props.left + 'px'};
  width: ${props => props.crossSize + 'px'};
  height: ${props => props.crossSize + 'px'};
  transition: ${props =>
    props.animate ? 'top 50ms ease-out, left 50ms ease-out' : '0s'};
  z-index: 1;
  position: absolute;
  display: grid;
  justify-items: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Swatch = styled.div`
  position: relative;
  background: ${props => props.backgroundColor};
  height: 25px;
  width: 25px;
  border-radius: 50px;
  box-shadow: 0 0 4px 0 #00000059;
  z-index: 1;
`;

export const SwatchFallBack = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: ${props => (props.opacity ? 1 - props.opacity : null)};
  bottom: 0px;
  left: 0px;
  z-index: 0;
  border-radius: 50px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)
    left center;
`;

export const OpacityWrapper = styled.div`
  width: 100%;
  padding: 10px;
`