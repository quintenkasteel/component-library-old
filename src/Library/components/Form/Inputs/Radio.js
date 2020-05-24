import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      active: false,
    };

    this.icon = this.icon.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  icon() {
    return this.state.checked ? <div className="bullet"></div> : null;
  }

  render() {
    const { label, size, disabled, toggle, name } = this.props;
    const { checked } = this.state;

    const RadioContainer = styled.label`
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

    const Radio = styled.div`
      margin-right: 0.625rem;

      .checked & {
        &:before {
          background: blue;
        }
      }
      ${!toggle &&
      `
        &:before {
            display: block;
            position: relative;
            content: "";
            z-index: 1;
            -webkit-transform: none;
            transform: none;
            border: none;
            top: 0;
            background: rgba(0, 0, 0, 0.05);
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 500rem;
          }

          &:after {
            background: #fff -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.05)));
            background: #fff -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.05));
            background: #fff linear-gradient(transparent, rgba(0, 0, 0, 0.05));
            position: absolute;
            content: "";
            opacity: 0;
            z-index: 2;
            border: none;
            -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15),
              0 0 0 1px rgba(34, 36, 38, 0.15) inset;
            box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15),
              0 0 0 1px rgba(34, 36, 38, 0.15) inset;
            width: 0.8rem;
            height: 0.8rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 500rem;
            -webkit-transition: background 0.3s ease, left 0.3s ease;
            transition: background 0.3s ease, left 0.3s ease;
          }

          .checked & {
            &:after {
              opacity: 1;
            }
          }
          `}

      ${toggle &&
      `
        &:before {
            display: block;
            position: relative;
            content: "";
            z-index: 1;
            -webkit-transform: none;
            transform: none;
            border: none;
            top: 0;
            background: rgba(0, 0, 0, 0.05);
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 3.5rem;
            height: 1.5rem;
            border-radius: 500rem;
          }

          &:after {
            background: #fff -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.05)));
            background: #fff -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.05));
            background: #fff linear-gradient(transparent, rgba(0, 0, 0, 0.05));
            position: absolute;
            content: "";
            opacity: 1;
            z-index: 2;
            border: none;
            -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15),
              0 0 0 1px rgba(34, 36, 38, 0.15) inset;
            box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15),
              0 0 0 1px rgba(34, 36, 38, 0.15) inset;
            width: 1.5rem;
            height: 1.5rem;
            top: 0;
            left: 0;
            border-radius: 500rem;
            -webkit-transition: background 0.3s ease, left 0.3s ease;
            transition: background 0.3s ease, left 0.3s ease;
          }
          .checked & {
            &:after {
              left: 2.15rem;
            }
          }
          `}
    `;

    return (
      <RadioContainer
        className={`radio-container ${disabled ? 'disabled' : ''}
          ${checked ? 'checked' : ''}`}>
        <Radio className={`radio`}>{this.icon()}</Radio>
        <input
          type="radio"
          name={name}
          onChange={this.handleChange.bind(this)}
          onFocus={() => !disabled && this.setState({ active: true })}
          onBlur={() => !disabled && this.setState({ active: false })}
        />
        {label || ''}
      </RadioContainer>
    );
  }
}

export default RadioButton;
