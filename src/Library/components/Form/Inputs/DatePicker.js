// month only
// day only
// year only
// Start date
//

import React, { Component } from "react"
import DatePicker from "react-datepicker"
import styled from "styled-components"


const DatePickerContainer = styled.div`
  position: relative;
  margin-bottom: 10px;

  > div {
    width: 100%;
  }

  input[type="text"] {
    position: relative;
    border: 1px solid #CACACA;
    border-radius: 5px;
    line-height: 25px;
    padding: 0.5rem;
    width: 100%;
    outline: none;
  }
  .react-datepicker-popper {
    transform: none !important;
  }
`

class DateSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    })
  }

  render() {
    return (
      <DatePickerContainer>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
        />
      </DatePickerContainer>
    )
  }
}

export default DateSelect
