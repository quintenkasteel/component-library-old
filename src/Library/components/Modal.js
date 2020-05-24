import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Modal = ({ children, open }) => {
  const ModalContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: black;
    opacity: 0.7;
    visibility: hidden;
    z-index: -1;

    &.open {
      visibility: visible;
      z-index: 2000;
    }
  `
  return (
    <ModalContainer className={`modal-container ${open ? "open" : ""}`}>
      {children}
    </ModalContainer>
  )
}

export default Modal
