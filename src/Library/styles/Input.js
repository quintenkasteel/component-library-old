import styled from 'styled-components';

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 0.625rem;
`;

const StyledInputLabel = styled.label`
  display: flex;
  flex-basis: 100%;
  width: 100%;
  margin-bottom: 0.35rem;
`;

const StyledInputField = styled.input`
  display: flex;
  flex-basis: 100%;
  width: 100%;
  position: relative;
  border: 1px solid ${props => (props.error ? '#ff0000a6' : '#cacaca')};
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
  box-shadow: ${props => (props.error ? '0 0 5px #ff0000a6' : null)};
  
`;

const StyledErrorMessage = styled.span`
  color: red;
`;

export {StyledErrorMessage, StyledInputContainer, StyledInputField, StyledInputLabel}