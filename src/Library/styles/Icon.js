import styled from "styled-components";

const StyledIcon = styled.img`
  filter: invert(1);
  cursor: pointer;
  width: ${props => props.size ? props.size : "20px"};
  height: ${props => props.size ? props.size : "20px"};
`

export default StyledIcon