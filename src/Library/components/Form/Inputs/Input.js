import React, {useState} from 'react';

import {
  StyledErrorMessage,
  StyledInputContainer,
  StyledInputField,
  StyledInputLabel,
} from '../../../styles/Input.js';

const Input = (
  {initialValue,
  error,
  label,
  disabled,
  initialActive,
  type,
  placeholder,
  onChange= () => {}}
) => {
  const [state, setState] = useState({
    active: (disabled && initialActive) || false,
    value: initialValue || '',
    error: error || '',
    label: label || 'Label',
  });

  const changeValue = e => {
    setState({ ...state, value: e.target.value, error: '' });

    onChange(e.target.value);
  };

  const fieldClassName =
    `input ${type ? type : ''}` +
    `${error ? ' error' : error ? ' error' : ''}` +
    `${initialActive ? ' active' : ''}` +
    `${disabled ? ' disabled' : ''}`;

  return (
    <StyledInputContainer className={fieldClassName}>
      {label ? (
        <StyledInputLabel htmlFor={1} className={error && 'error'}>
          {label}
        </StyledInputLabel>
      ) : null}

      <StyledInputField
        type={type || 'text'}
        error={error}
        disabled={disabled}
        value={initialValue && !state.value ? initialValue : state.value}
        placeholder={placeholder || label || 'placeholder'}
        onChange={e => changeValue(e)}
        onFocus={() => setState({...state, active: true })}
        onBlur={() => setState({...state, active: false })}
      />

      {state.error ? (
        <StyledErrorMessage className={`error-message`}>{state.error}</StyledErrorMessage>
      ) : null}
    </StyledInputContainer>
  );
};

export default Input;
