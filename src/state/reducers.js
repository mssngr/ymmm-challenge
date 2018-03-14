import {combineReducers} from 'redux'
import {get, sortBy} from 'lodash'

import {types as ActionTypes} from './actions'

const vehicles = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.POPULATE_VEHICLES:
      return get(action, 'payload.vehicleData', state)
    case ActionTypes.SORT_BY_RECENTLY_ADDED:
      return sortBy(state, ['created_at']).reverse()
    case ActionTypes.SORT_BY_YEAR_NEWEST_OLDEST:
      return sortBy(state, ['year']).reverse()
    case ActionTypes.SORT_BY_YEAR_OLDEST_NEWEST:
      return sortBy(state, ['year'])
    case ActionTypes.SORT_BY_MILEAGE_LOW_HIGH:
      return sortBy(state, ['mileage'])
    case ActionTypes.SORT_BY_MILEAGE_HIGH_LOW:
      return sortBy(state, ['mileage']).reverse()
    default:
      return state
  }
}

const pagesInitState = {
  itemsPerPage: 30,
  currentPage: 1,
}

const pages = (state = pagesInitState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: get(action, 'payload.newPage', 1),
      }
    default:
      return state
  }
}

export default combineReducers({
  vehicles,
  pages,
})
