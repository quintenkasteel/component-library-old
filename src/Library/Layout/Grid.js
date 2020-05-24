import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const GridContainer = styled.div`
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
	max-width: ${props => props.theme.baseWidth};
	width: 100%;
	margin: 0 auto;
`;

const InnerGrid = styled.div`
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
	width: 100%;
`;

const Grid = ({
	children,
	padded,
	columns,
	relaxed,
	backgroundImage,
	backgroundGradient,
	backgroundColor,
	centered,
	celled,
	divided,
	horizontalAlign,
	textAlign,
	verticalAlign
}) => {
	const gridClasses =
		`grid ` +
		`${padded ? `padded ` : ``}` +
		`${columns ? `columns-${columns} ` : ``}` +
		`${relaxed ? `relaxed ` : ``}` +
		`${centered ? `centered ` : ``}` +
		`${
			divided == `vertical `
				? `divided-vertical `
				: divided == `horizontal` || divided
				? `divided-horizontal `
				: ``
		}` +
		`${
			celled == `external`
				? `celled-external `
				: celled == `internal` || celled
				? `celled-internal `
				: ``
		}`;
	return (
		<GridContainer
			verticalAlign={verticalAlign}
			horizontalAlign={horizontalAlign}
			className={gridClasses}>
			<InnerGrid
				horizontalAlign={horizontalAlign}
				verticalAlign={verticalAlign}
				className="grid-wrapper">
				{children}
			</InnerGrid>
		</GridContainer>
	);
};

Grid.propTypes = {
	children: PropTypes.node.isRequired,
	padded: PropTypes.bool,
	columns: PropTypes.number,
	relaxed: PropTypes.bool,
	centered: PropTypes.bool,
	divided: PropTypes.bool,
	celled: PropTypes.bool,
	backgroundImage: PropTypes.string,
	backgroundGradient: PropTypes.string,
	backgroundColor: PropTypes.string,
	horizontalAlign: PropTypes.string,
	textAlign: PropTypes.string,
	verticalAlign: PropTypes.string
};

export default Grid;
