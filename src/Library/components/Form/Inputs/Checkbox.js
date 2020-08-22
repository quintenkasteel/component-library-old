import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledCheckBox,
  StyledCheckboxContainer,
} from '../../../styles/Checkbox.js';

const Checkbox = ({ label, size, disabled, toggle }) => {
  const [state, setState] = useState({
    checked: false,
  });

  const handleChange = () => {
    setState({ ...state, checked: !state.checked });
  };

  const icon = state.checked ? <div className="checkmark"></div> : null;

  const { checked } = state;

  return (
    <StyledCheckboxContainer
      className={`checkbox-container ${disabled ? 'disabled' : ''}
        ${checked ? 'checked' : ''}`}>
      <StyledCheckBox checked={checked} toggle={toggle} className={`checkbox`}>
        {icon}
      </StyledCheckBox>
      <input type="checkbox" onChange={handleChange} checked={checked} />
      {label ? label : ''}
    </StyledCheckboxContainer>
  );
};

export default Checkbox;
