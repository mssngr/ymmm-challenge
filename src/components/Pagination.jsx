import React from 'react'
import styled, {css} from 'styled-components'
import {fill} from 'lodash'
import PropTypes from 'prop-types'

import arrow from '../assets/svg/arrow.svg'

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

class Pagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    onSelect: PropTypes.func,
    totalPages: PropTypes.number,
  }

  state = {
    // Each page number set represents 8 pages.
    // Every time the page number set is incremented or decremented,
    // the page numbers available increase or decrease by a multiple of 8
    pageNumberSet: 1,
  }

  handleIncrementPage = () => {
    const {currentPage, onSelect, totalPages} = this.props
    if (currentPage !== totalPages) {
      onSelect(currentPage + 1)
    }
  }

  handleDecrementPage = () => {
    const {currentPage, onSelect} = this.props
    if (currentPage !== 1) {
      onSelect(currentPage - 1)
    }
  }

  handlePageChange = pageNum => () => {
    this.props.onSelect(pageNum)
  }

  componentWillUpdate (nextProps) {
    const {pageNumberSet} = this.state
    const lastPageInSet = pageNumberSet * 8
    const firstPageInSet = lastPageInSet - 7
    // If the next page exceeds the last page of the set, increment the page number set
    if (nextProps.currentPage > lastPageInSet) {
      this.setState({pageNumberSet: pageNumberSet + 1})
    // If the new current page is before the first page in the set, decrement the page number set
    } else if (nextProps.currentPage < firstPageInSet) {
      this.setState({pageNumberSet: pageNumberSet - 1})
    }
  }

  render () {
    const {totalPages, currentPage} = this.props
    const {pageNumberSet} = this.state
    const totalPagesArray = fill(Array(totalPages), '')
    const lastPageInSet = pageNumberSet * 8
    const firstPageInSet = lastPageInSet - 8
    const currentPages = totalPagesArray.slice(firstPageInSet, lastPageInSet)
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
      return null
    }
  }
}

export default Pagination
