import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {get, isEmpty, fill} from 'lodash'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import LoadingSpinner from 'react-md-spinner'

import carIcon from '../assets/svg/carIcon.svg'
import Actions from '../state/actions'

/* STYLES */
const VehiclesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  @media (min-width: 1280px) {
    max-width: 900px;
  }
`

const VehicleListing = styled.div`
  width: 100vw;
  height: 100vw;
  padding: 15px;

  @media (min-width: 600px) {
    width: 300px;
    height: 300px;
  }
`

const VehicleCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #92a0ab;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14), 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 10px 0 rgba(0, 0, 0, 0.2);
  transition-property: opacity;
  transition-duration: 200ms;
  cursor: ${props => props.loading ? 'auto' : 'pointer'};

  :hover {
    opacity: 0.7;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 30%;
  padding: 15px;
`

const CardTitle = styled.h3`
  font-size: 14px;
  color: black;
  text-align: left;
`

const VehicleImage = styled.div`
  width: 100%;
  height: 70%;
  background: no-repeat center/cover url(${props => props.src}), no-repeat center/cover url(${carIcon});
`

const SpinnerContainer = styled.div`
  position: fixed;
  top: calc(50vh + 60px);
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
`

/* PRESENTATION/LOGIC */
const vehicleEndpoint = 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json'

class VehicleList extends React.Component {
  state = {
    // The vehicle list is considered "loading" if vehicle data has not yet populated
    loading: isEmpty(this.props.unfilteredVehicleData),
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
    const {unfilteredVehicleData} = this.props
    // If the unfiltered vehicle data went from empty to filled, update the list's loading state
    if (isEmpty(prevProps.unfilteredVehicleData) && !isEmpty(unfilteredVehicleData)) {
      this.setState({loading: false})
    }
  }

  updateCurrentVehicle = vehicle => () => {
    const {updateCurrentVehicle} = this.props
    const {loading} = this.state
    // As long as the vehicles aren't loading, allow vehicle detail clicks
    // to update the current vehicle in Redux
    !loading && updateCurrentVehicle(vehicle)
  }

  render () {
    const {unfilteredVehicleData, vehicleData, itemsPerPage, currentPage} = this.props
    const {loading} = this.state

    // There are no search results if the filtered vehicleData is empty, but unfiltered data is not
    const noSearchResults = isEmpty(vehicleData) && !isEmpty(unfilteredVehicleData)

    // Using the items allotted per page, calculate the index of the first and last items
    const lastItem = currentPage * itemsPerPage
    const firstItem = lastItem - itemsPerPage

    // If the vehicle data is still loading, fill 'vehicles' with a blank array
    // Otherwise, fill 'vehicles' with the appropriate number of items per page from 'vehicleData'
    const vehicles = loading ? fill(Array(12), '') : vehicleData.slice(firstItem, lastItem)
    return (
      <Fragment>
        {/* If loading, show a spinner */}
        {loading && <SpinnerContainer><LoadingSpinner singleColor="#007aff" size={300} /></SpinnerContainer>}
        <VehiclesContainer>
          {/* If there are no search results, show an apology statement */}
          {noSearchResults && <h3>Sorry. <span role="img" aria-label="Sad face">🙁</span>️<br />We couldn’t locate any vehicles for you.</h3>}
          {/* If there are vehicles to show, show the listings */}
          {!noSearchResults && vehicles.map((vehicle, index) => (
            <VehicleListing key={`Vehicle-${index}`}>
              <VehicleCard loading={loading} onClick={this.updateCurrentVehicle(vehicle)}>
                <VehicleImage src={vehicle.image_url} />
                <CardContent>
                  <CardTitle>{`${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`}</CardTitle>
                  <p>
                    <NumberFormat
                      value={vehicle.mileage}
                      suffix=" mi"
                      displayType="text"
                      thousandSeparator
                    />
                  </p>
                </CardContent>
              </VehicleCard>
            </VehicleListing>
          ))}
        </VehiclesContainer>
      </Fragment>
    )
  }
}

const mapState = state => ({
  unfilteredVehicleData: get(state, 'vehicles.unfiltered'),
  vehicleData: get(state, 'vehicles.filtered'),
  itemsPerPage: get(state, 'pages.itemsPerPage'),
  currentPage: get(state, 'pages.currentPage'),
})

const mapActions = {
  populateVehicles: Actions.populateVehicles,
  updateCurrentVehicle: Actions.updateCurrentVehicle,
}

export default connect(mapState, mapActions)(VehicleList)
