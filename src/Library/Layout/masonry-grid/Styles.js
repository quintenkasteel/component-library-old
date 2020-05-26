import styled from 'styled-components';
import breakpoint from '../Breakpoints';

export const MasonryGridContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(props) => props.theme.baseWidth};
  margin: 0 auto;
`;

export const InnerMasonryGrid = styled.div`
  display: grid;
  -moz-grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  -webkit-grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  -webkit-row-gap: ${(props) => props.theme.defaultGridGutter};
  -moz-row-gap: ${(props) => props.theme.defaultGridGutter};
  grid-gap: ${(props) => props.theme.defaultGridGutter};
  grid-auto-rows: 1fr;

  &:before {
    content: '';
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
    -moz-grid-template-columns: repeat(${(props) => props.colMd}, 1fr);
    -webkit-grid-template-columns: repeat(${(props) => props.colMd}, 1fr);
    grid-template-columns: repeat(${(props) => props.colMd}, 1fr);
    -webkit-column-gap: ${(props) => props.theme.defaultGridGutter};
    -moz-column-gap: ${(props) => props.theme.defaultGridGutter};
    column-gap: ${(props) => props.theme.defaultGridGutter};
    grid-auto-flow: dense;
  `}

  ${breakpoint.mdLg`
    -moz-grid-template-columns: repeat(${(props) => props.colLg}, 1fr);
    -webkit-grid-template-columns: repeat(${(props) => props.colLg}, 1fr);
    grid-template-columns: repeat(${(props) => props.colLg}, 1fr);
  `}
`;

export const MasonryGridItem = styled.div`
  display: flex;
  align-items: ${(props) =>
    (props.verticalAlign === 'top' && 'flex-start') ||
    (props.verticalAlign === 'center' && 'center') ||
    (props.verticalAlign === 'bottom' && 'flex-end') ||
    ''};
  justify-items: ${(props) =>
    (props.horizontalAlign === 'left' && 'flex-start') ||
    (props.horizontalAlign === 'center' && 'center') ||
    (props.horizontalAlign === 'right' && 'flex-end') ||
    ''};
  text-align: ${(props) =>
    (props.textAlign === 'left' && 'left') ||
    (props.textAlign === 'center' && 'center') ||
    (props.textAlign === 'right' && 'right') ||
    ''};
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
  grid-column: 1 / span ${(props) => props.colMd};
  grid-row: 1 / 1;
  `}

    ${breakpoint.mdLg`
  grid-column: 1 / span ${(props) => Math.round(props.colLg / 2)};
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
`;
