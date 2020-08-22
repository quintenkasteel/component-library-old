import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 0.625rem;
`;

const InputLabel = styled.label`
  display: flex;
  flex-basis: 100%;
  width: 100%;
  margin-bottom: 0.35rem;
`;

const InputField = styled.input`
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

const ErrorMessage = styled.span`
  color: red;
`;

const Input = (
  initialValue,
  error,
  disabled,
  initialActive,
  type,
  placeholder
) => {
  const [state, setState] = useState({
    active: (disabled && initialActive) || false,
    value: initialValue || '',
    error: props.error || '',
    label: props.label || 'Label',
  });

  const changeValue = e => {
    const value = e.target.value;
    setState({ ...state, value: e.target.value, error: '' });
  };

  const handleKeyPress = e => {
    if (e.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  };

  const fieldClassName =
    `input ${type ? type : ''}` +
    `${error ? ' error' : this.props.error ? ' error' : ''}` +
    `${active ? ' active' : ''}` +
    `${disabled ? ' disabled' : ''}`;

  return (
    <InputContainer className={fieldClassName}>
      {label ? (
        <InputLabel htmlFor={1} className={error && 'error'}>
          {label}
        </InputLabel>
      ) : null}

      <InputField
        type={type || 'text'}
        error={error}
        disabled={disabled}
        value={value && !state.value ? value : state.value}
        placeholder={placeholder || label || 'placeholder'}
        onChange={e => changeValue(e)}
        onFocus={() => setState({ active: true })}
        onBlur={() => setState({ active: false })}
      />

      {props.error ? (
        <ErrorMessage className={`error-message`}>{props.error}</ErrorMessage>
      ) : null}
    </InputContainer>
  );
};

export default Input;
