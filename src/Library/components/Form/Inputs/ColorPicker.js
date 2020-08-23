import React from "react";
// import { SketchPicker } from "react-color";
import Input from "./Input";
import styled from "styled-components";
import Picker from "./colorpicker/Picker.js"
// import enhanceWithClickOutside from "react-click-outside";

const ColorPicker = () => {
  return (
    <Picker />
  )
}

export default ColorPicker



// class ColorPicker extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			activeColor: "#fff",
// 			chosenColor: "",
// 			displayColorPicker: false
// 		};
// 	}

// 	componentDidMount() {
// 		document.addEventListener("mousedown", this.handleClick, false);
// 	}

// 	componentWillUnmount() {
// 		document.removeEventListener("mousedown", this.handleClick, false);
// 	}

// 	handleChange = color => {
// 		this.setState({ activeColor: color.hex });
// 	};

// 	handleClick = e => {
// 		if (this.node.contains(e.target)) {
// 			this.setState({ displayColorPicker: true });
// 		} else {
// 			this.setState({ displayColorPicker: false });
// 		}
// 	};

// 	handleChangeComplete = (color, event) => {
// 		this.setState({ chosenColor: color.hex });
// 	};

// 	render() {
// 		const { activeColor, chosenColor, displayColorPicker } = this.state;

// 		return (
// 			<ColorPickerContainer
// 				className={`colorpicker-container ${
// 					displayColorPicker ? "visible" : "hidden"
// 				}`}
// 				ref={node => (this.node = node)}
// 				onClick={this.handleClick}>
// 				<ColorPickerSelector>
// 					<Input type="text" placeholder="ColorPicker" value={chosenColor} />
// 				</ColorPickerSelector>
// 				<ColorPickerPopup
// 					isVisible={displayColorPicker}
// 					className={`colorpicker`}>
// 					<SketchPicker
// 						ref={picker => (this.picker = picker)}
// 						color={activeColor}
// 						onChange={this.handleChange}
// 						onChangeComplete={this.handleChangeComplete}
// 					/>
// 				</ColorPickerPopup>
// 			</ColorPickerContainer>
// 		);
// 	}
// }

// export default enhanceWithClickOutside(ColorPicker);


