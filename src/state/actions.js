import keyMirror from 'keymirror'

export const types = keyMirror({
  POPULATE_VEHICLES: null,
})

const populateVehicles = vehicleData => ({
  type: types.POPULATE_VEHICLES,
  payload: {vehicleData},
})

export default {
  populateVehicles,
}
