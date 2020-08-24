import styled from 'styled-components';

const StyledIcon = styled.div`
  cursor: pointer;
  mask-image: ${props => (props.ImageSrc ? `url('${props.ImageSrc}')` : null)};
  width: ${props => (props.size ? props.size : '20px')};
  height: ${props => (props.size ? props.size : '20px')};
  background: ${props => (props.fill && props.type === "outline" ? props.fill : '')};
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

export default StyledIcon;
