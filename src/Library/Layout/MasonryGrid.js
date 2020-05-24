import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import breakpoint from "./Breakpoints"

const MasonryGrid = ({
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
  verticalAlign,
  colTablet,
  colDesktop,
  props,
}) => {
  const tabletColumns = colTablet
    ? colTablet
    : colDesktop
    ? Math.round({ colDesktop } * 0.75)
    : 2
  const desktopColumns = colDesktop ? colDesktop : 4

  const MasonryGridContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: ${props => props.theme.baseWidth};
    margin: 0 auto;
  `
  const InnerMasonryGrid = styled.div`
    display: grid;
    -moz-grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    -webkit-grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    -webkit-row-gap: ${props => props.theme.defaultGridGutter};
    -moz-row-gap: ${props => props.theme.defaultGridGutter};
    grid-gap: ${props => props.theme.defaultGridGutter};
    grid-auto-rows: 1fr;
    

    &:before {
      content: "";
      height: 0;
      width: 200%;
      padding-bottom: 56.25%;
      grid-column: 1 / 1;
      grid-row: 1 / 1;

      ${breakpoint.smMd`
        width: 100%;
        padding-bottom: 100%;
      `}
    }

    ${breakpoint.smMd`
    -moz-grid-template-columns: repeat(${tabletColumns}, 1fr);
      -webkit-grid-template-columns: repeat(${tabletColumns}, 1fr);
      grid-template-columns: repeat(${tabletColumns}, 1fr);
      -webkit-column-gap: ${props => props.theme.defaultGridGutter};
    -moz-column-gap: ${props => props.theme.defaultGridGutter};
    column-gap: ${props => props.theme.defaultGridGutter};
    grid-auto-flow: dense;
   `}

    ${breakpoint.mdLg`
      -moz-grid-template-columns: repeat(${desktopColumns}, 1fr);
      -webkit-grid-template-columns: repeat(${desktopColumns}, 1fr);
      grid-template-columns: repeat(${desktopColumns}, 1fr);
   `}
  `
  const MasonryGridItem = styled.div`
    display: flex;
    align-items: ${(verticalAlign = "center"
      ? "center"
      : (verticalAlign = "top"
          ? "flex-start"
          : (verticalAlign = "bottom" ? "flex-end" : "")))};
    justify-content: ${(horizontalAlign = "center"
      ? "center"
      : (horizontalAlign = "left"
          ? "flex-start"
          : (horizontalAlign = "right" ? "flex-end" : "")))};
    background: red;
    padding: 1em;
    width: 100%;
    height: 100%;
    box-shadow: 2px 2px 4px 0 #ccc;
    grid-column: span 1;

    &:first-child {
      grid-column: 1 / 1;
      grid-row: 1 / 1;

      ${breakpoint.smMd`
      grid-column: 1 / span ${tabletColumns};
      grid-row: 1 / 1;
      `}

      ${breakpoint.mdLg`
      grid-column: 1 / span ${Math.round(desktopColumns / 2)};
      grid-row: 1 / 1;
      `}
    }

    &:nth-child(4n) {
      background: orange;

      ${breakpoint.mdLg`
        grid-row: span 2;
      `}
    }

    &:nth-child(3n),
    &:nth-child(7n) {
      background: blue;

      ${breakpoint.mdLg`
        grid-column: span 1;
        grid-row: span 1;
      `}
    }

    &:nth-child(5n) {
      background: green;

      ${breakpoint.mdLg`
        grid-column: span 2;
      `}
    }
  `

  return (
    <React.Fragment>
      {children ? (
        <MasonryGridContainer className="masonry-grid-container">
          <InnerMasonryGrid className="masonry-grid-wrapper">
            {React.Children.map(children, child => (
              <MasonryGridItem>{child}</MasonryGridItem>
            ))}
          </InnerMasonryGrid>
        </MasonryGridContainer>
      ) : null}
    </React.Fragment>
  )
}

MasonryGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MasonryGrid
