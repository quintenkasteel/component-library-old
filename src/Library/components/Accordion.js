import React, { Component } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

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
  cursor: ${(props) => (props.disabled ? 'disabled' : 'pointer')};
`;
const AccordionBody = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  padding: 0.625rem 0;
`;

const AccordionTitle = styled.h3``;

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { label, disabled, children } = this.props;
    const open = this.state.open ? 'open' : '';

    return (
      <React.Fragment>
        <AccordionContainer disabled={disabled} className={`accordion-container ${open}`}>
          <AccordionTitle className="accordion-title" onClick={() => this.handleChange()}>
            {label}
          </AccordionTitle>
          <AccordionBody open={this.state.open} className="accordion-body">
            {children}
          </AccordionBody>
        </AccordionContainer>
      </React.Fragment>
    );
  }
}

Accordion.propTypes = {
  children: propTypes.node,
  label: propTypes.string,
  disabled: propTypes.bool,
};

export default Accordion;
