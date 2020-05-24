import React from "react"
import styled from "styled-components"
import Input from "./Input.js"

const DropdownContainer = styled.div`
  margin-bottom: 0.625rem;
  position: relative;
`

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

    + .dropdown-list {
      display: block;
    }
  }
`

const DropdownListContainer = styled.div`
  display: none;
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
`
const DropdownList = styled.ul`
  max-height: calc( ${props => props.showCount ? 
  `props.showCount * 1rem + (1.25rem * props.showCount))` : 
  `6 * 1rem + (1.25rem * 6)`})
`

const DropdownSearch = styled.input`
  position: relative;
  border: 1px solid #cacaca;
  border-radius: 5px;
  line-height: 25px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`

class Select extends React.Component {
  constructor() {
    super()

    this.state = {
      displayMenu: false,
      selected: [],
      filter: "",
    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    // this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
    this.onItemSelect = this.onItemSelect.bind(this)
  }

  showDropdownMenu(event) {
    event.preventDefault()
    this.setState({ displayMenu: !this.state.displayMenu })
  }

  // hideDropdownMenu() {
  //   this.setState({ displayMenu: false }, () => {
  //     document.removeEventListener("click", this.hideDropdownMenu)
  //   })
  // }

  onItemSelect = data => {
    /*eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }]*/
    return this.props.multiselect &&
      this.state.selected.indexOf(data.optionLabel) == -1
      ? this.setState({
          selected: this.state.selected.concat(data.optionLabel),
        })
      : this.props.multiselect && this.state.selected.length > 1
      ? this.setState({
          selected: this.state.selected.filter(e => e !== data.optionLabel),
        })
      : this.setState({
          selected: [data.optionLabel],
        })
  }

  handleSearch = event => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const data = [
      {
        optionLabel: "Option 1",
        icon: "",
      },
      {
        optionLabel: "Option 2",
        icon: "",
      },
      {
        optionLabel: "Option 3",
        icon: "",
      },
      {
        optionLabel: "Option 4",
        icon: "",
      },
      {
        optionLabel: "Option 5",
        icon: "",
      },
      {
        optionLabel: "Option 6",
        icon: "",
      },
      {
        optionLabel: "Option 7",
        icon: "",
      },
      {
        optionLabel: "Option 8",
        icon: "",
      },
      {
        optionLabel: "Option 9",
        icon: "",
      }
    ]

    const { filter } = this.state
    const lowercasedFilter = filter.toLowerCase()

    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      )
    })

    return (
      <DropdownContainer
        className={`dropdown ${this.state.displayMenu ? `open` : ``}`}
      >
        <DropdownButton onClick={this.showDropdownMenu}>
          {this.state.selected.length === 0
            ? this.props.title
            : this.state.selected}
        </DropdownButton>
        <DropdownListContainer className="dropdown-list">
          
            {this.props.searchable ? (
              <DropdownSearch
                type="text"
                value={filter}
                onChange={this.handleSearch}
              />
            ) : null}
<DropdownList>
            {Object.entries(filteredData).length === 0 ? (
              <li>Nothing found</li>
            ) : (
              filteredData.map(data => {
                return (
                  <li
                    key={data.optionLabel}
                    onClick={() => this.onItemSelect(data)}
                  >
                    {data.icon} {data.optionLabel}
                  </li>
                )
              })
            )}
        </ DropdownList>
        </ DropdownListContainer>
      </DropdownContainer>
    )
  }
}

export default Select
