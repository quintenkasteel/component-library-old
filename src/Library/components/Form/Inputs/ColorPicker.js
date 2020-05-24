import React from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import Input from './Input';

const ColorPickerContainer = styled.div`
  position: relative;
`;

const ColorPickerSelector = styled.div`
  input[type='text'] {
    position: relative;
    border: 1px solid #cacaca;
    border-radius: 5px;
    line-height: 25px;
    padding: 0.5rem;
    width: 100%;
    outline: none;
  }
`;

const ColorPickerPopup = styled.div`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
`;

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeColor: '#fff',
      chosenColor: '',
      displayColorPicker: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleChange = (color) => {
    this.setState({ activeColor: color.hex });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({ displayColorPicker: true });
    } else {
      this.setState({ displayColorPicker: false });
    }
  };

  handleChangeComplete = (color, event) => {
    this.setState({ chosenColor: color.hex });
  };

  render() {
    const { activeColor, chosenColor, displayColorPicker } = this.state;

    return (
      <ColorPickerContainer
        className={`colorpicker-container ${displayColorPicker ? 'visible' : 'hidden'}`}
        ref={(node) => (this.node = node)}
        onClick={this.handleClick}>
        <ColorPickerSelector>
          <Input type="text" placeholder="ColorPicker" value={chosenColor} />
        </ColorPickerSelector>
        <ColorPickerPopup isVisible={displayColorPicker} className={`colorpicker`}>
          <SketchPicker
            ref={(picker) => (this.picker = picker)}
            color={activeColor}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplete}
          />
        </ColorPickerPopup>
      </ColorPickerContainer>
    );
  }
}

export default enhanceWithClickOutside(ColorPicker);
