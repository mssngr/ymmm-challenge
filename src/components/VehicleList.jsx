import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {get, isEmpty} from 'lodash'
import styled from 'styled-components'
import {Card, CardTitle} from 'react-materialize'

import PlaceholderData from '../constants/PlaceholderData'
import Actions from '../state/actions'

const VehiclesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
`

const VehicleListing = styled.div`
  width: 25vw;
  height: 25vw;
  max-width: 400px;
  max-height: 400px;
`

const vehicleEndpoint = 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json'

class VehicleList extends React.Component {
  state = {
    // The vehicle list is considered "loading" if vehicle data has not yet populated
    loading: isEmpty(this.props.vehicleData),
  }

  componentDidMount () {
    // If the vehicle data has not yet been loaded, access the endpoint
    if (this.state.loading) {
      const {populateVehicles} = this.props
      axios.get(vehicleEndpoint)
        .then(response => {
          // If a response was received from the endpoint...
          if (response) {
            // And that response has data...
            const vehicleData = get(response, 'data')
            if (vehicleData) {
              // Populate Redux with the response data
              populateVehicles(vehicleData)
            } else {
              // Otherwise, throw an error about the response not having data
              throw new Error('Response does not contain vehicle data.')
            }
          } else {
            // Or, if no response was received at all, throw an error for that
            throw new Error('Received an invalid response from the vehicle data endpoint.')
          }
        })
        // Log any errors
        .catch(error => console.log(error))
    }
  }

  componentDidUpdate (prevProps) {
    const {vehicleData} = this.props
    // If vehicle data was updated, update the list's loading state
    if (prevProps.vehicleData !== vehicleData) {
      this.setState({loading: isEmpty(vehicleData)})
    }
  }

  render () {
    const {vehicleData} = this.props
    const {loading} = this.state
    const vehicles = loading ? PlaceholderData : vehicleData
    console.log(vehicles)
    return (
      <VehiclesContainer>
        {vehicles.map((vehicle, index) => (
          <VehicleListing>
            <Card
              key={`Vehicle-${index}`}
              title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              header={<CardTitle reveal image={vehicle.image_url} waves='light'/>}
              reveal={(
                <p>Here is some more information about this product that is only revealed once clicked on.</p>
              )}
            >
              <p><a href="#">This is a link</a></p>
            </Card>
          </VehicleListing>
        ))}
      </VehiclesContainer>
    )
  }
}

const mapState = state => ({
  vehicleData: state.vehicles,
})

const mapActions = {
  populateVehicles: Actions.populateVehicles,
}

export default connect(mapState, mapActions)(VehicleList)
