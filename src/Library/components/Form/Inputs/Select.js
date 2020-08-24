import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { onClickOutSide } from '../../../Utils.js';

const dummyData = [
  {
    optionLabel: 'Option 1',
    icon: '',
  },
  {
    optionLabel: 'Option 2',
    icon: '',
  },
  {
    optionLabel: 'Option 3',
    icon: '',
  },
  {
    optionLabel: 'Option 4',
    icon: '',
  },
  {
    optionLabel: 'Option 5',
    icon: '',
  },
  {
    optionLabel: 'Option 6',
    icon: '',
  },
  {
    optionLabel: 'Option 7',
    icon: '',
  },
  {
    optionLabel: 'Option 8',
    icon: '',
  },
  {
    optionLabel: 'Option 9',
    icon: '',
  },
];
const DropdownContainer = styled.div`
  margin-bottom: 0.625rem;
  position: relative;
`;

const DropdownButton = styled.div`
  position: relative;
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;

  .dropdown.open & {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    /* + .dropdown-list {
      display: block;
    } */
  }
`;

const DropdownListContainer = styled.div`
  /* display: none; */
  position: absolute;
  top: 100%;

  left: 0;
  border: 1px solid #cacaca;
  border-top: 0;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;
const DropdownList = styled.ul`
  padding: 10px;
  overflow: auto;
  max-height: calc(
    ${props =>
      props.showCount
        ? `${props.showCount} * 1rem + (1.25rem * ${props.showCount}))`
        : `6 * 1rem + (1.25rem * 6)`}
  );
`;

const DropdownSearch = styled.input`
  position: relative;
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;

const Select = ({
  multiselect,
  data = dummyData,
  searchable,
  labelSort = ['optionLabel', 'icon'],
  select = 'optionLabel',
  title,
  onSelect = () => {},
}) => {
  const [state, setState] = useState({
    displayMenu: false,
    selected: [],
    filter: '',
  });
  const ref = useRef();


  const showDropdownMenu = event => {
    event.preventDefault();
    setState({ ...state, displayMenu: !state.displayMenu });
  };

  // hideDropdownMenu() {
  //   this.setState({ displayMenu: false }, () => {
  //     document.removeEventListener("click", this.hideDropdownMenu)
  //   })
  // }

  const onItemSelect = data => {
    /*eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }]*/

    (multiselect &&
      state.selected.indexOf(data[`${select}`]) == -1 &&
      setState({
        ...state,
        selected: state.selected.concat(data[`${select}`]),
      })) ||
      (multiselect &&
        state.selected.length > 1 &&
        setState({
          ...state,
          selected: state.selected.filter(e => e !== data[`${select}`]),
        })) ||
      setState({
        ...state,
        selected: data[`${select}`],
        displayMenu: false,
      });

    // onSelect(data);
  };

  const handleSearch = event => {
    setState({ ...state, filter: event.target.value });
  };

  const lowercasedFilter = state.filter ? state.filter.toLowerCase() : "";

  const filteredData = data.filter(item => {
    return Object.keys(item).some(key =>
      item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  return (
    <DropdownContainer
      ref={ref}
      className={`dropdown ${state.displayMenu ? `open` : ``}`}>
      <DropdownButton onClick={showDropdownMenu}>
        {state.selected.length === 0 ? title : state.selected}
      </DropdownButton>

      <DropdownListContainer className="dropdown-list">
        {searchable ? (
          <DropdownSearch
            type="text"
            value={state.filter}
            onChange={handleSearch}
          />
        ) : null}
        <DropdownList>
          {Object.entries(filteredData).length === 0 ? (
            <li>Nothing found</li>
          ) : (
            filteredData.map((data, i) => {
              return (
                <div key={i} onClick={() => onItemSelect(data)}>
                  {labelSort.map((item, i) => {
                    return <div key={i}>{data[`${item}`]}</div>;
                  })}
                </div>
              );
            })
          )}
        </DropdownList>
      </DropdownListContainer>
    </DropdownContainer>
  );
};

export default Select;
