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
  sort = ['dialCode', 'countryName', 'icon'],
}) => {
  const DropDown = (data, sort) => {
    return data.map((country, i) => {
      return sort.map((item, i) => {
        switch (item) {
          case 'icon':
            return <div key={i}>{country.icon}</div>;

          case 'dialCode':
            return <div key={i}>{country.dialCode}</div>;

          case 'countryName':
            return <div key={i}>{country.countryName}</div>;

          case 'currency':
            return <div key={i}>{country.currency}</div>;

          case 'iso2':
            return <div key={i}>{country.iso2}</div>;

          case 'iso3':
            return <div key={i}>{country.iso3}</div>;

          case 'continent':
            return <div key={i}>{country.continent}</div>;

          case 'continent':
            return <div key={i}>{country.capital}</div>;

          default:
            null;
        }
      });
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
