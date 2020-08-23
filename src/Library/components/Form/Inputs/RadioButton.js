import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledRadioButton,
  StyledRadioButtonContainer,
} from '../../../styles/RadioButton.js';

const RadioButton = ({ label, size, disabled, toggle, selected, index, onSelect = () => {} }) => {
  const icon = selected ? <div className="bullet"></div> : null;

  return (
    <StyledRadioButtonContainer
      onClick={!disabled ? onSelect : null}
      key={index}
      className={`radio-container ${disabled ? 'disabled' : ''}
          ${selected ? 'checked' : ''}`}>
      <StyledRadioButton toggle={toggle} checked={selected} className={`radio`}>
        {icon}
      </StyledRadioButton>
      <input type="radio" disabled={disabled} checked={selected} onChange={(e) => {console.log(e.target.value)}}/>
      {label ? label : ''}
    </StyledRadioButtonContainer>
  );
};

const RadioGroup = ({ label, children, selected }) => {
  const [state, setState] = useState({
    selected: selected || 0,
  });

  const handleChange = index => {
    setState({selected: index });
  };

  return (
    <>
      <div>{label}</div>
      {children.map((child, i) => {
        const selected = i === state.selected && !child.props.disabled ? true : false;

        return (
            <RadioButton
              key={i}
              label={child.props.label}
              size={child.props.size}
              disabled={child.props.disabled}
              toggle={child.props.toggle}
              index={i}
              selected={selected}
              onSelect={() => handleChange(i)}></RadioButton>
        );
      })}
    </>
  );
};

export { RadioGroup, RadioButton };
