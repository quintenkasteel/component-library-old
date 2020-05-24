import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

class Tabs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.selected || 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(index) {
    this.setState({ selected: index })
  }

  render() {
    const TabsContainer = styled.div`
      width: 100%;
    `
    const TabsHeader = styled.div`
      display: inline-flex;
      list-style: none;
      width: 50%;
      justify-content: space-around;
    `
    const Tab = styled.div`
      position: relative;
      border: 1px solid #cacaca;
      text-align: center;
      line-height: 25px;
      padding: 0.5rem;
      width: 100%;
      outline: none;
      margin-bottom: 0.625rem;

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      &.selected {
        border-bottom: 2px solid blue;
      }
    `
    return this.props.children ? (
      <TabsContainer className="tabs">
        <TabsHeader className="tabs-header">
          {this.props.children.map((content, index) => {
            let selected = index == this.state.selected ? "selected" : ""
            return (
              <Tab
                className={`tab ${selected}`}
                key={index}
                onClick={this.handleChange.bind(this, index)}
              >
                {content.props.title}
              </Tab>
            )
          })}
        </TabsHeader>
        <div className="tab-content">
          {this.props.children[this.state.selected]}
        </div>
      </TabsContainer>
    ) : null
  }
}

export default Tabs
