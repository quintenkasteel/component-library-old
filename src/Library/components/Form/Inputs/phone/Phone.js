import React, { useState, useEffect } from 'react';
import data from './countries.json';
import styled from 'styled-components';
const Input = styled.input`
  border: 1px solid black;
`;

const DropDownContainer = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-flow: column nowrap;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 10px;
  border-bottom: 1px solid black;
`;
const Phone = ({
  continent = null,
  showFlags = true,
  showDialCode = true,
  showName = true,
  showCurrency = false,
  showIso2 = false,
  showIso3 = false,
  select = 'icon',
  sort = ['icon', 'dialCode', 'countryName'],
  initialCountry = 'netherlands',
}) => {
  const Initial = data.filter(
    country =>
      country.iso2.toUpperCase() === initialCountry.toUpperCase() ||
      country.countryName.toUpperCase() === initialCountry.toUpperCase()
  );

  const [state, setState] = useState({
    country: Initial[0],
    phoneNumber: '',
    open: false,
    loaded: false,
  });

  const DropDown = (data, sort) => {
    return data.map((country, i) => {
      const countryClass = country.countryName.toLowerCase().replace(/ /g, '-');
      return (
        <OptionContainer
          className={`country ${countryClass}`}
          key={i}
          onClick={() => setState({ ...state, country: country })}>
          {sort.map((item, i) => {
            return country[`${item}`] ? (
              <div key={i}>{country[`${item}`]}</div>
            ) : null;
          })}
        </OptionContainer>
      );
    });
  };

  return (
    <>
      <div className="country-selector">
        <span onClick={() => setState({ ...state, open: !state.open })}>
          {state.country !== {} ? state.country[`${select}`] : `selected`}
        </span>
        <Input
          onChange={e =>
            setState({
              ...state,
              phoneNumber: e.target.value,
            })
          }
          value={`${state.phoneNumber}`}
        />
        <DropDownContainer isOpen={state.open} className="dropdown">
          {DropDown(data, sort)}
        </DropDownContainer>
      </div>

      <input type="text" />
    </>
  );
};

export default Phone;
