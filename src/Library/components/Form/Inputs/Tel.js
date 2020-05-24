import React from "react"
import axios from "axios"

import PhoneInput from "react-phone-input-2"
import styled from "styled-components"

const TelContainer = styled.div`
  position: relative;
  margin-bottom: 10px;

  input[type="tel"] {
    position: relative;
    border: 1px solid #cacaca;
    border-radius: 5px;
    line-height: 25px;
    padding: 0.5rem;
    height: unset;
    padding-left: 46px;
    width: 100%;
    outline: none;
  }

  .react-tel-input {
    .country-list {
      .search {
        z-index: 1;
      }
    }
  }
`

class Tel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      phone: "",
      countryCode: "",
    }
  }

  getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then(response => {
        let data = response.data
        this.setState({
          countryCode: data.country_code,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.getGeoInfo()
  }

  render() {
    const {
      placeholder,
      searchPlaceholder,
      inputProps,
      containerStyle,
      inputStyle,
      buttonStyle,
      dropdownStyle,
      searchStyle,
      containerClass,
      inputClass,
      dropdownClass,
      searchClass,
      autoFormat,
      disabled,
      disableDropdown,
      disableCountryCode,
      enableAreaCodes,
      enableTerritories,
      enableLongNumbers,
      countryCodeEditable,
      enableSearch,
      disableSearchIcon,
      country,
      onlyCountries,
      preferredCountries,
      excludeCountries,
    } = this.props

    return (
      <TelContainer>
        <PhoneInput
          //Basics
          value={this.state.phone}
          onChange={phone => this.setState({ phone })}
          placeholder={placeholder ? placeholder : "PhoneNumber"}
          searchPlaceholder={searchPlaceholder ? searchPlaceholder : "Search"}
          inputProps={inputProps ? inputProps : ""}
          //Styles
          containerStyle={containerStyle ? containerStyle : {}}
          inputStyle={inputStyle ? inputStyle : {}}
          buttonStyle={buttonStyle ? buttonStyle : {}}
          dropdownStyle={dropdownStyle ? dropdownStyle : {}}
          searchStyle={searchStyle ? searchStyle : {}}
          // //Classes
          containerClass={
            containerClass
              ? `react-tel-input ${containerClass}`
              : "react-tel-input"
          }
          inputClass={inputClass ? inputClass : ""}
          dropdownClass={dropdownClass ? dropdownClass : ""}
          searchClass={searchClass ? searchClass : ""}
          // //Booleans
          autoFormat={autoFormat ? autoFormat : true}
          disabled={disabled ? disabled : false}
          disableDropdown={disableDropdown ? disableDropdown : false}
          disableCountryCode={disableCountryCode ? disableCountryCode : false}
          enableAreaCodes={enableAreaCodes ? enableAreaCodes : false}
          enableTerritories={enableTerritories ? enableTerritories : false}
          enableLongNumbers={enableLongNumbers ? enableLongNumbers : false}
          countryCodeEditable={
            countryCodeEditable ? countryCodeEditable : false
          }
          enableSearch={enableSearch ? enableSearch : true}
          disableSearchIcon={disableSearchIcon ? disableSearchIcon : false}
          // //Strings
          country={country ? country : this.state.countryCode.toLowerCase()}
          onlyCountries={onlyCountries ? onlyCountries : ""}
          preferredCountries={preferredCountries ? preferredCountries : ""}
          excludeCountries={excludeCountries ? excludeCountries : ""}
        />
      </TelContainer>
    )
  }
}

export default Tel
