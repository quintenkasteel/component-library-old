import styled from 'styled-components';

const Btn = styled.div`
  padding: 10px;
  width: ${(props) => props.width || 'auto'};
  display: inline-flex;
  background: ${(props) =>
    (props.primary && !props.disabled && 'blue') ||
    (props.secundairy && !props.disabled && 'red') ||
    (props.disabled && 'grey') ||
    ''};

  a {
    height: 100%;
    width: 100%;
    display: flex;
    text-decoration: none;
    user-select: ${(props) => (props.disabled ? 'none' : '')};
    cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
    color: ${(props) =>
      (props.primary && !props.disabled && 'white') ||
      (props.secundairy && !props.disabled && 'white') ||
      (props.disabled && '#959393') ||
      ''};
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
  }
`;

export default Btn;
