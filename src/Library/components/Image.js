import React from "react";
import Link from "./Link";

const Image = ({ alt, target, src, to }) => {
	if (to) {
		return (
			<Link to={to} target={target}>
				<div className="media-image">
					<img src={src} alt={alt || ""} />
				</div>
			</Link>
		);
	} else {
		return (
			<div className="media-image">
				<img src={src} alt={alt || ""} />
			</div>
		);
	}
};

export default Image;
