import React from 'react';
import propTypes from 'prop-types';

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

  render() {
    const { active, value, error } = this.state;
    const { disabled, locked, label, placeholder } = this.props;
    const fieldClassName = `field ${active ? ' active' : ''} ${disabled ? ' disabled' : ''}`;

    return (
      <React.Fragment>
        {label ? (
          <label htmlFor={1} className={error && 'error'}>
            {error || label}
          </label>
        ) : null}

        <textarea
          value={value}
          className={fieldClassName}
          placeholder={placeholder || label || 'placeholder'}
          onChange={this.changeValue.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
      </React.Fragment>
    );
  }
}

TextArea.propTypes = {
  disabled: propTypes.bool,
  locked: propTypes.bool,
  label: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  active: propTypes.bool,
  error: propTypes.string,
};

export default TextArea;
