import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

class Accordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { label, labeltype, icon, disabled, children } = this.props
    const open = this.state.open ? "open" : ""

    const AccordionContainer = styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      width: 100%;
      position: relative;
      border: 1px solid #cacaca;
      border-radius: 5px;
      line-height: 25px;
      padding: 0.5rem;
      width: 100%;
      outline: none;
      margin-bottom: 0.625rem;
    `
    const AccordionBody = styled.div`
      display: ${this.state.open ? "block" : "none"};
      padding: 0.625rem 0;
    `

    const AccordionTitle = styled.h3`
      
    `

    return (
      <React.Fragment>
        <AccordionContainer className={`accordion-container ${open}`}>
          <AccordionTitle
            className="accordion-title"
            onClick={() => this.handleChange()}
          >
            {label}
          </AccordionTitle>
          <AccordionBody className="accordion-body">{children}</AccordionBody>
        </AccordionContainer>
      </React.Fragment>
    )
  }
}

export default Accordion
