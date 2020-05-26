import React from 'react';
import propTypes from 'prop-types';
import { MasonryGridContainer, MasonryGridItem, InnerMasonryGrid } from './Styles';

const MasonryGrid = ({
  children,
  // padded,
  // relaxed,
  // backgroundImage,
  // backgroundGradient,
  // backgroundColor,
  // centered,
  // celled,
  // divided,
  horizontalAlign,
  textAlign,
  verticalAlign,
  colMd,
  colLg,
}) => {
  const getColumnsLg = colLg || 4;
  const getColumnsMd = colMd || (getColumnsLg ? Math.round({ getColumnsLg } * 0.75) : 2);

  return (
    <React.Fragment>
      {children ? (
        <MasonryGridContainer className="masonry-grid-container">
          <InnerMasonryGrid
            tabletColumns={getColumnsMd}
            colLg={getColumnsLg}
            className="masonry-grid-wrapper">
            {React.Children.map(children, (child) => (
              <MasonryGridItem
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                colTablet={getColumnsMd}
                colLg={getColumnsLg}
                textAlign={textAlign}>
                {child}
              </MasonryGridItem>
            ))}
          </InnerMasonryGrid>
        </MasonryGridContainer>
      ) : null}
    </React.Fragment>
  );
};

MasonryGrid.propTypes = {
  children: propTypes.node.isRequired,
  padded: propTypes.bool,
  columns: propTypes.number,
  relaxed: propTypes.bool,
  backgroundImage: propTypes.string,
  backgroundGradient: propTypes.string,
  backgroundColor: propTypes.string,
  centered: propTypes.bool,
  celled: propTypes.bool,
  divided: propTypes.bool,
  horizontalAlign: propTypes.string,
  textAlign: propTypes.string,
  verticalAlign: propTypes.string,
  colMd: propTypes.number,
  colLg: propTypes.number,
  props: propTypes.any,
};

export default MasonryGrid;
