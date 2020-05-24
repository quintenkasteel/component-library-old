import React from "react"
import { SketchPicker } from "react-color"
import Input from "./Input"
import styled from "styled-components"

const ColorPickerContainer = styled.div`
  position: relative;
`

const ColorPickerSelector = styled.div`

input[type="text"] {
    position: relative;
    border: 1px solid #CACACA;
    border-radius: 5px;
    line-height: 25px;
    padding: 0.5rem;
    width: 100%;
    outline: none;
  }
`

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    // this.handleClose = this.handleClose.bind(this)

    this.state = {
      activeColor: "#fff",
      chosenColor: "",
      displayColorPicker: false,
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleChange = color => {
    this.setState({ activeColor: color.hex })
  }

  handleClick = () => {
    this.setState({ displayColorPicker: true })
  }

  handleClose = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ displayColorPicker: false })
    }
  }

  handleChangeComplete = (color, event) => {
    this.setState({ chosenColor: color.hex })
  }

  render() {
    const { activeColor, chosenColor, displayColorPicker } = this.state

    const ColorPickerPopup = styled.div`
      display: ${displayColorPicker ? "block" : "none"};
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
    `

    return (
      <ColorPickerContainer
        className={`colorpicker-container ${
          displayColorPicker ? "visible" : "hidden"
        }`}
      >
        <ColorPickerSelector onClick={this.handleClick} ref={this.setWrapperRef}>
          <Input type="text" placeholder="ColorPicker" value={chosenColor} />
        </ColorPickerSelector>
        <ColorPickerPopup className={`colorpicker`}>
          <SketchPicker
            color={activeColor}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplete}
          />
        </ColorPickerPopup>
      </ColorPickerContainer>
    )
  }
}

export default ColorPicker
