import styled from 'styled-components';

const StyledCheckboxContainer = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.625rem;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

const StyledCheckBox = styled.div`
  margin-right: 0.625rem;

  &:before {
    background: ${props => (props.checked ? 'blue' : 'rgba(0, 0, 0, 0.05)')};
    display: block;
    position: relative;
    content: '';
    z-index: 1;
    -webkit-transform: none;
    transform: none;
    border: none;
    top: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    width: ${props => props.toggle ? '3.5rem' : '1.5rem'};
    height: ${props => props.toggle ? '1.75rem' : '1.5rem'};
    border-radius: ${props => props.toggle ? '50rem' : '5px'};
  }

  &:after {
    position: absolute;
    content: ${props => props.checked || props.toggle ? `""` : null};
    z-index: 2;
    border: none;
    width: ${props => props.toggle ? '1.75rem' : '0.8rem'};
    height: ${props => props.toggle ? '1.75rem' : '0.8rem'};
    top: ${props => props.toggle ? '0' :'50%'};
    left: ${props => props.toggle ? '0' : '50%'};
    left: ${props => props.toggle && props.checked ? '1.76rem' : null};
    transform: ${props => !props.toggle ? 'translate(-50%, -50%)' : null};
    border-radius: 500rem;
    transition: background 0.3s ease, left 0.3s ease;  
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15), 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
    background: white;
  }
`

export {StyledCheckBox, StyledCheckboxContainer}