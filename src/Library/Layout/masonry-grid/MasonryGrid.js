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
  const getColumnsLarge = colLg || 4;
  const getColumnsMedium = colMd || (colLg ? Math.round({ colLg } * 0.75) : 2);

  return (
    <React.Fragment>
      {children ? (
        <MasonryGridContainer className="masonry-grid-container">
          <InnerMasonryGrid
            tabletColumns={getColumnsMedium}
            colLg={getColumnsLarge}
            className="masonry-grid-wrapper">
            {React.Children.map(children, (child) => (
              <MasonryGridItem
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                colTablet={getColumnsMedium}
                colLg={getColumnsLarge}
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
