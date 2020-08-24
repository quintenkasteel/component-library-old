import React from 'react';
import data from './countries.json';

const Phone = ({
  continent = null,
  showFlags = true,
  showDialCode = true,
  showName = true,
  showCurrency = false,
  showIso2 = false,
  showIso3 = false,
  sort = ['countryName', 'dialCode', 'icon'],
}) => {
  const DropDown = (data, sort) => {
    return data.map((country, i) => {
      return sort.map((item, i) => {
          console.log(country[`${item}`])
        return country[`${item}`] ? <div key={i}>{country[`${item}`]}</div> : null;
        }
      );
    });
  };
  return (
    <>
      <div className="country-selector">
        <span>selected</span>
        <div className="dropdown">{DropDown(data, sort)}</div>
      </div>

      <input type="text" />
    </>
  );
};

export default Phone;
