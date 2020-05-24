import React from "react"
import styled from "styled-components"

const Button = ({
  to,
  children,
  style,
  activeClassName,
  partiallyActive,
  inverse,
  primary,
  secundairy,
  disabled,
  light,
  width,
  textAlign,
  verticalAlign,
  horizontalAlign,
  ...props
}) => {

  const Btn = styled.div`
    padding: 10px;
    width: ${width ? width : "auto"};
    display: inline-flex;
    background: ${primary & !disabled
      ? "blue"
      : secundairy & !disabled
      ? "red"
      : disabled
      ? "grey"
      : ""};

    a {
      height: 100%;
      width: 100%;
      display: flex;
      text-decoration: none;
      user-select: ${disabled ? "none" : ""};
      cursor: ${disabled ? "no-drop" : "pointer"};
      color: ${primary & !disabled
        ? "white"
        : secundairy & !disabled
        ? "white"
        : disabled
        ? "#959393"
        : ""};
      text-align: ${textAlign == "center"
        ? "center"
        : textAlign == "left"
        ? "left"
        : textAlign == "right"
        ? "right"
        : "center"};
      align-items: ${verticalAlign == "center"
        ? "center"
        : verticalAlign == "top"
        ? "flex-start"
        : verticalAlign == "bottom"
        ? "flex-end"
        : "center"};
      justify-content: ${horizontalAlign == "center"
        ? "center"
        : horizontalAlign == "left"
        ? "flex-start"
        : horizontalAlign == "right"
        ? "flex-end"
        : "center"};
    }
  `

  return (
    <Btn className={`btn`} href={to} {...props}>
      <a href={to}>{children}</a>
    </Btn>
  )
}

export default Button
