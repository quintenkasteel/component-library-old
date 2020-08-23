import React, { useRef } from "react"
import styled from "styled-components"
import {InputWrapper } from '../../../../styles/ColorPicker.js';


const Input = ({ label, value, max, min, defaultValue, setValue }) => {
  const input = useRef(null)

  function onBlur(e) {
    if (e.target.value === "") {
      setValue(defaultValue)
    } else if (e.target.value < min) {
      setValue(min)
    }
  }

  function onChange(e) {
    const isDigit = /^\d*$/
    var newValue
    if (isDigit.test(e.target.value)) {
      if (Number(e.target.value) > max) {
        newValue = max
      } else {
        newValue = Number(e.target.value)
      }
    } else {
      newValue = defaultValue
    }
    setValue(newValue)
  }

  return (
    <InputWrapper>
      <label>{label}</label>
      <input
        ref={input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={false}
      />
    </InputWrapper>
  )
}

export default Input
