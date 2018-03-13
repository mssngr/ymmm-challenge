import {combineReducers} from 'redux'
import {get} from 'lodash'

import {types as ActionTypes} from './actions'

const vehicles = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.POPULATE_VEHICLES:
      return get(action, 'payload.vehicleData', state)
    default:
      return state
  }
}

export default combineReducers({
  vehicles,
})
