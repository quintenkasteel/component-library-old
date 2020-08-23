import styled from 'styled-components';

const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledRange = styled.div`
  position: relative;
  border-radius: 3px;
  background: ${props => (props.background ? props.background : `blue`)};
  height: 10px;
  width: 100%;
`;

const StyledRangeProgress = styled.div`
  border-radius: 3px;
  position: absolute;
  height: 100%;
  opacity: 0.5;
  background: ${props => (props.backgroundProgress ? props.backgroundProgress : `black`)};
`;

const StyledThumb = styled.div`
  width: 10px;
  height: 100%;
  border-radius: 50px;
  position: relative;
  top: 0px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
  left: calc(${props => props.percentage}% - 5px);
`;

export { StyledRange, StyledRangeProgress, StyledThumb, RangeHeader };
