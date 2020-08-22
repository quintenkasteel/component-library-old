import styled from 'styled-components';

const RangeHeader = styled.div`
display: flex;
justify-content: space-between;
`;

const StyledRange = styled.div`
position: relative;
border-radius: 3px;
background: #dddddd;
height: 15px;
`;

const StyledRangeProgress = styled.div`
border-radius: 3px;
position: absolute;
height: 100%;
opacity: 0.5;
background: #823eb7;
`;

const StyledThumb = styled.div`
width: 10px;
height: 25px;
border-radius: 3px;
position: relative;
top: -5px;
opacity: 0.5;
background: #823eb7;
cursor: pointer;
`;

export {StyledRange, StyledRangeProgress, StyledThumb}