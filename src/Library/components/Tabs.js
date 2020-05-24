import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const TabsContainer = styled.div`
  width: 100%;
`;

const TabsHeader = styled.div`
  display: inline-flex;
  list-style: none;
  width: 50%;
  justify-content: space-around;
`;

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
`;

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.preSelected || 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {
    const { children } = this.props;
    const { selected } = this.state;

    return children ? (
      <TabsContainer className="tabs">
        <TabsHeader className="tabs-header">
          {children.map((content, index) => {
            const selectedTab = index === selected ? 'selected' : '';
            return (
              <Tab
                className={`tab ${selectedTab}`}
                key={index}
                onClick={this.handleChange.bind(this, index)}>
                {content.props.title}
              </Tab>
            );
          })}
        </TabsHeader>
        <div className="tab-content">{children[this.state.selected]}</div>
      </TabsContainer>
    ) : null;
  }
}

Tabs.propTypes = {
  children: propTypes.node,
  preSelected: propTypes.number,
};

export default Tabs;
