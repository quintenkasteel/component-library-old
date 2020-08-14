import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
`;
const AccordionBody = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  padding: 0.625rem 0;
`;

const AccordionTitle = styled.h3``;

const Accordion = ({label, labeltype, icon, disabled, children}) => {
  const [open, setOpen] = useState(false);
  const isOpen = open ? "open" : "";

  return (
    <React.Fragment>
      <AccordionContainer className={`accordion-container ${isOpen}`}>
        <AccordionTitle
          className="accordion-title"
          onClick={() => setOpen(!open)}
        >
          {label}
        </AccordionTitle>
        <AccordionBody show={open} className="accordion-body">
          {children}
        </AccordionBody>
      </AccordionContainer>
    </React.Fragment>
  );
};

export default Accordion;
