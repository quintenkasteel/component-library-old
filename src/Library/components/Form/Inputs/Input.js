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
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;

  ${(props) =>
    props.error &&
    `
    border-color: #ff0000a6;
    box-shadow:0 0 5px #ff0000a6;
  `}
`;
const ErrorMessage = styled.span`
  color: red;
`;

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || '',
      error: props.error || '',
      label: props.label || 'Label',
    };
  }

  changeValue(event) {
    const { value } = event.target;
    this.setState({ value, error: '' });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error } = this.state;
    const { disabled, locked, label, type, placeholder } = this.props;
    const fieldClassName =
      `input ${type || ''}` +
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
          error={this.props.error}
          value={this.props.value && !value ? this.props.value : value}
          placeholder={placeholder || label || 'placeholder'}
          onChange={this.changeValue.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        {this.props.error ? (
          <ErrorMessage className={`error-message`}>{this.props.error}</ErrorMessage>
        ) : null}
      </InputContainer>
    );
  }
}

export default Input;
