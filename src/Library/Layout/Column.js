import React from "react";
import styled from "styled-components";

const StyledCol = styled.div`
	background: ${props =>
		props.backgroundColor
			? props.backgroundColor
			: props.backgroundGradient
			? props.backgroundGradient
			: props.backgroundImage
			? props.backgroundImage
			: ""};
	text-align: ${props =>
		props.textAlign == "center"
			? "center"
			: props.textAlign == "left"
			? "left"
			: props.textAlign == "right"
			? "right"
			: ""};
	flex-flow: column wrap;
`;

const StyledInnerCol = styled.div`
	align-items: ${props =>
		props.verticalAlign == "center"
			? "center"
			: props.verticalAlign == "top"
			? "flex-start"
			: props.verticalAlign == "bottom"
			? "flex-end"
			: ""};
	justify-content: ${props =>
		props.horizontalAlign == "center"
			? "center"
			: props.horizontalAlign == "left"
			? "flex-start"
			: props.horizontalAlign == "right"
			? "flex-end"
			: ""};
`;

const Col = ({
	children,
	backgroundColor,
	backgroundImage,
	backgroundGradient,
	float,
	horizontalAlign,
	textAlign,
	verticalAlign,
	width
}) => {
  
	const colClasses =
		`col ` +
		`${float ? `float-${float} ` : ``}` +
		`${width ? `col-${width} ` : ""} `;

	return (
		<StyledCol
			backgroundColor={backgroundColor}
			backgroundImage={backgroundImage}
			backgroundGradient={backgroundGradient}
			textAlign={textAlign}
			className={colClasses}>
			<StyledInnerCol
				verticalAlign={verticalAlign}
				horizontalAlign={horizontalAlign}
				className="inner-col">
				{children}
			</StyledInnerCol>
		</StyledCol>
	);
};

export default Col;
