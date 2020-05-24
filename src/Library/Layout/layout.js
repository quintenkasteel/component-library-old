import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../assets/stylesheets/abstracts.scss');

const Layout = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<main>{children}</main>
		</ThemeProvider>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
