import {combineReducers} from 'redux'
import {get, sortBy} from 'lodash'

import {types as ActionTypes} from './actions'

const vehiclesInitState = {
  // "unfiltered" is for reference of the vehicle data untouched by filtering
  unfiltered: [],
  // "filtered" is the vehicle data that is free to be filtered or otherwise irreversibly altered
  filtered: [],
  // The currently displaying vehicle details
  currentVehicle: null,
}

const vehicles = (state = vehiclesInitState, action) => {
  switch (action.type) {
    case ActionTypes.POPULATE_VEHICLES:
      return {
        unfiltered: get(action, 'payload.vehicleData', state.unfiltered),
        filtered: get(action, 'payload.vehicleData', state.filtered),
      }
    case ActionTypes.UPDATE_CURRENT_VEHICLE:
      return {
        ...state,
        currentVehicle: get(action, 'payload.vehicle', state.currentVehicle)
      }
    case ActionTypes.SORT_BY_RECENTLY_ADDED:
      return {
        unfiltered: sortBy(state.unfiltered, ['created_at']).reverse(),
        filtered: sortBy(state.filtered, ['created_at']).reverse(),
      }
    case ActionTypes.SORT_BY_YEAR_NEWEST_OLDEST:
      return {
        unfiltered: sortBy(state.unfiltered, ['year']).reverse(),
        filtered: sortBy(state.filtered, ['year']).reverse(),
      }
    case ActionTypes.SORT_BY_YEAR_OLDEST_NEWEST:
      return {
        unfiltered: sortBy(state.unfiltered, ['year']),
        filtered: sortBy(state.filtered, ['year']),
      }
    case ActionTypes.SORT_BY_MILEAGE_LOW_HIGH:
      return {
        unfiltered: sortBy(state.unfiltered, ['mileage']),
        filtered: sortBy(state.filtered, ['mileage']),
      }
    case ActionTypes.SORT_BY_MILEAGE_HIGH_LOW:
      return {
        unfiltered: sortBy(state.unfiltered, ['mileage']).reverse(),
        filtered: sortBy(state.filtered, ['mileage']).reverse(),
      }
    case ActionTypes.FILTER:
      return {
        ...state,
        filtered: get(action, 'payload.filtered', state.filtered),
      }
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
