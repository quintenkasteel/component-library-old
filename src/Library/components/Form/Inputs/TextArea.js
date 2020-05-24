import React from 'react';

class TextArea extends React.Component {
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
      `field` + `${active ? ' active' : ''}` + `${disabled ? ' disabled' : ''}`;

    return (
      <React.Fragment>
        {label ? (
          <label htmlFor={1} className={error && 'error'}>
            {error || label}
          </label>
        ) : null}

        <textarea
          value={this.props.value && !value ? this.props.value : value}
          className={fieldClassName}
          placeholder={placeholder || label || 'placeholder'}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
      </React.Fragment>
    );
  }
}

export default TextArea;
