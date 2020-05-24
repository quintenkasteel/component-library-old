import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

/* eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved */
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../../assets/stylesheets/abstracts.scss');
/* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <main>{children}</main>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
