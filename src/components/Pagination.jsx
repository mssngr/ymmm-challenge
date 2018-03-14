import React from 'react'
import styled, {css} from 'styled-components'
import {fill} from 'lodash'
import PropTypes from 'prop-types'

import arrow from '../assets/svg/arrow.svg'

/* STYLES */
const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`

const Arrow = styled.img`
  height: 20px;
  cursor: pointer;
  transform: rotate(${props => props.right ? '0deg' : '180deg'});
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 200ms;

  :hover {
    opacity: 1;
  }
`

export const PageNumber = styled.a`
  margin: 0 7.5px;
  cursor: pointer;

  :hover {
    color: #007aff;
  }

  ${props => props.active && css`
    color: #007aff;
  `}
`

/* PRESENTATION/LOGIC */
class Pagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onSelect: PropTypes.func, // The function fired when an option is selected
  }

  state = {
    // Each page number set represents 8 pages.
    // Every time the page number set is incremented or decremented,
    // the page numbers available increase or decrease by a multiple of 8
    pageNumberSet: Math.ceil((this.props.currentPage / this.props.totalPages) / (8 / this.props.totalPages)),
  }

  handleIncrementPage = () => {
    const {currentPage, onSelect, totalPages} = this.props
    // As long as we aren't on the last page, go ahead and increment
    if (currentPage !== totalPages) {
      onSelect(currentPage + 1)
    }
  }

  handleDecrementPage = () => {
    const {currentPage, onSelect} = this.props
    // As long as we aren't on the first page, go ahead and decrement
    if (currentPage !== 1) {
      onSelect(currentPage - 1)
    }
  }

  handlePageChange = pageNum => () => {
    this.props.onSelect(pageNum)
  }

  componentWillUpdate (nextProps) {
    const {pageNumberSet} = this.state
    // Determine the last and first pages in the current set
    const lastPageInSet = pageNumberSet * 8
    const firstPageInSet = lastPageInSet - 7

    // If total pages updates, update the page number set calculation
    if (this.props.totalPages !== nextProps.totalPages) {
      this.setState({pageNumberSet: Math.ceil((nextProps.currentPage / nextProps.totalPages) / (8 / nextProps.totalPages))})
    }

    // If the next page exceeds the last page of the set, update the page number set calculation
    if (nextProps.currentPage > lastPageInSet) {
      this.setState({pageNumberSet: Math.ceil((nextProps.currentPage / nextProps.totalPages) / (8 / nextProps.totalPages))})
    // If the new current page is before the first page in the set, update the page number set calculation
    } else if (nextProps.currentPage < firstPageInSet) {
      this.setState({pageNumberSet: Math.ceil((nextProps.currentPage / nextProps.totalPages) / (8 / nextProps.totalPages))})
    }
  }

  render () {
    const {totalPages, currentPage} = this.props
    const {pageNumberSet} = this.state

    // Create an array that can be sliced and mapped over
    const totalPagesArray = fill(Array(totalPages), '')
    // Determine the first and last pages in the set
    const lastPageInSet = pageNumberSet * 8
    const firstPageInSet = lastPageInSet - 8
    // Determine the current pages by taking a slice of the total pages
    // using the calculated first and last pages in the set
    const currentPages = totalPagesArray.slice(firstPageInSet, lastPageInSet)

    // If there is more than one page, show pagination
    if (totalPages > 1) {
      return (
        <PaginationContainer>
          <Arrow src={arrow} onClick={this.handleDecrementPage} />
          {currentPages.map((page, index) => {
            const truePageNum = firstPageInSet + index + 1
            return (
              <PageNumber
                key={`PageNumber${truePageNum}`}
                onClick={this.handlePageChange(truePageNum)}
                active={currentPage === truePageNum}
              >
                {truePageNum}
              </PageNumber>
            )
          })}
          <Arrow right src={arrow} onClick={this.handleIncrementPage} />
        </PaginationContainer>
      )
    } else {
      // Otherwise, show nothing
      return null
    }
  }
}

export default Pagination
