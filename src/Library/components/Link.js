import React from "react";

const Link = ({
	children,
	to,
	target,
	activeClassName,
	partiallyActive,
	...props
}) => {
	return (
		<a href={to} target={target || null} rel="noopener noreferrer" {...props}>
			{children}
		</a>
	);
};
export default Link;
