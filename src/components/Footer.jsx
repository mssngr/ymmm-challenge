import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {get} from 'lodash'

import Actions from '../state/actions'
import Pagination from './Pagination'

/* STYLES */
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: white;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`

/* PRESENTATION/LOGIC */
class Footer extends React.Component {
  render () {
    const {vehicleData, setCurrentPage, currentPage, itemsPerPage} = this.props
    // Total pages is the total number of vehicles divided by the allotted number of items per page
    const totalPages = Math.round(vehicleData.length / itemsPerPage)
    return (
      <FooterContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onSelect={setCurrentPage}
        />
      </FooterContainer>
    )
  }
}

const mapState = state => ({
  vehicleData: get(state, 'vehicles.filtered'),
  currentPage: get(state, 'pages.currentPage'),
  itemsPerPage: get(state, 'pages.itemsPerPage'),
})

const mapActions = {
  setCurrentPage: Actions.setCurrentPage,
}

export default connect(mapState, mapActions)(Footer)
