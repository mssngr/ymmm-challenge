import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import arrow2 from '../assets/svg/arrow2.svg'
import Actions from '../state/actions'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: white;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
`

const SortBy = styled.select`
  /* Remove default select appearance */
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
  width: 200px;
  max-width: 40%;
  height: 30px;
  padding: 0 10px;
  background: no-repeat 95%/10px url(${arrow2}), white;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`

class Header extends React.Component {
  setSorting = e => {
    const method = e.target.value
    method && this.props[method]()
  }

  render () {
    return (
      <HeaderContainer>
        <SortBy onChange={this.setSorting}>
          <option value=""></option>
          <option value="sortByRecentlyAdded">Recently Added</option>
          <option value="sortByYearNewestOldest">Year: Newest-Oldest</option>
          <option value="sortByYearOldestNewest">Year: Oldest–Newest</option>
          <option value="sortByMileageLowHigh">Mileage: Low-High</option>
          <option value="sortByMileageHighLow">Mileage: High–Low</option>
        </SortBy>
      </HeaderContainer>
    )
  }
}

const mapActions = {
  sortByRecentlyAdded: Actions.sortByRecentlyAdded,
  sortByYearNewestOldest: Actions.sortByYearNewestOldest,
  sortByYearOldestNewest: Actions.sortByYearOldestNewest,
  sortByMileageLowHigh: Actions.sortByMileageLowHigh,
  sortByMileageHighLow: Actions.sortByMileageHighLow,
}

export default connect(null, mapActions)(Header)
