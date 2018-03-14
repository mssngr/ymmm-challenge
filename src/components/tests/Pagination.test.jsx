import React from 'react'
import renderer from 'react-test-renderer'
import Pagination from '../Pagination'

describe('components/Pagination', () => {
  let currentPage = 1
  const onSelect = newCurrentPage => currentPage = newCurrentPage
  const pagination = () => renderer.create(
    <Pagination
      currentPage={currentPage}
      totalPages={50}
      onSelect={onSelect}
    />
  )
  test('pageNumberSet increments if the current page exceeds the last page in set', () => {
    // pageNumberSets should be in sets of 8, so starting the current page
    // at 16 means a single page increment will put it into a new set
    currentPage = 16
    let paginationInstance = pagination().getInstance()
    expect(paginationInstance.state.pageNumberSet).toBe(2)

    paginationInstance.handleIncrementPage()
    paginationInstance = pagination().getInstance()
    expect(paginationInstance.state.pageNumberSet).toBe(3)
  })


  test('pageNumberSet decrements if the current page goes below the first page in set', () => {
    // pageNumberSets should be in sets of 8, so starting the current page
    // at 9 means a single page decrement will put it into a new set
    currentPage = 9
    let paginationInstance = pagination().getInstance()
    expect(paginationInstance.state.pageNumberSet).toBe(2)

    paginationInstance.handleDecrementPage()
    paginationInstance = pagination().getInstance()
    expect(paginationInstance.state.pageNumberSet).toBe(1)
  })
})
