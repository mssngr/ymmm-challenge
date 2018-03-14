import React from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'
import styled from 'styled-components'
import SearchInput, {createFilter} from 'react-search-input'

import Actions from '../state/actions'

const VehicleSearch = styled(SearchInput)`
  width: 200px;
  max-width: 47%;

  input {
    /* Remove default input appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    :focus {
      outline: none !important;
    }

    /* Add custom styles */
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background: white;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const KEYS_TO_FILTERS = ['year', 'make', 'model']

class Search extends React.Component {
  state = {
    searchTerm: '',
  }

  updateSearchTerm = searchTerm => {
    const {vehicleData, filter} = this.props
    // Update local state with the new search term, then filter vehicle data with that term
    this.setState({searchTerm}, () => {
      filter(vehicleData.filter(createFilter(searchTerm, KEYS_TO_FILTERS)))
    })

  }

  render () {
    return <VehicleSearch onChange={this.updateSearchTerm} fuzzy sortResults />
  }
}

const mapState = state => ({
  vehicleData: get(state, 'vehicles.unfiltered'),
})

const mapActions = {
  filter: Actions.filter,
}

export default connect(mapState, mapActions)(Search)
