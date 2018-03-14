import keyMirror from 'keymirror'

export const types = keyMirror({
  POPULATE_VEHICLES: null,
  SORT_BY_RECENTLY_ADDED: null,
  SORT_BY_YEAR_NEWEST_OLDEST: null,
  SORT_BY_YEAR_OLDEST_NEWEST: null,
  SORT_BY_MILEAGE_LOW_HIGH: null,
  SORT_BY_MILEAGE_HIGH_LOW: null,
  SET_CURRENT_PAGE: null,
})

const populateVehicles = vehicleData => ({
  type: types.POPULATE_VEHICLES,
  payload: {vehicleData},
})

const sortByRecentlyAdded = () => ({
  type: types.SORT_BY_RECENTLY_ADDED,
})

const sortByYearNewestOldest = () => ({
  type: types.SORT_BY_YEAR_NEWEST_OLDEST,
})

const sortByYearOldestNewest = () => ({
  type: types.SORT_BY_YEAR_OLDEST_NEWEST,
})

const sortByMileageLowHigh = () => ({
  type: types.SORT_BY_MILEAGE_LOW_HIGH,
})

const sortByMileageHighLow = () => ({
  type: types.SORT_BY_MILEAGE_HIGH_LOW,
})

const setCurrentPage = newPage => ({
  type: types.SET_CURRENT_PAGE,
  payload: {newPage},
})

export default {
  populateVehicles,
  sortByRecentlyAdded,
  sortByYearNewestOldest,
  sortByYearOldestNewest,
  sortByMileageLowHigh,
  sortByMileageHighLow,
  setCurrentPage,
}
