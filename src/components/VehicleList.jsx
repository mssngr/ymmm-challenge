import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {get, isEmpty, fill} from 'lodash'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import LoadingSpinner from 'react-md-spinner'

import carIcon from '../assets/svg/carIcon.svg'
import Actions from '../state/actions'

const VehiclesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 60px;

  @media (min-width: 1280px) {
    max-width: 900px;
  }
`

const VehicleListing = styled.div`
  width: 100vw;
  height: 100vw;
  padding: 15px;

  @media (min-width: 720px) {
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
`

const VehicleImage = styled.div`
  width: 100%;
  height: 70%;
  background: no-repeat center/cover url(${props => props.src}), no-repeat center/cover url(${carIcon});
`

// const VehiclePagination = styled(Pagination)`
//   li.waves-effect.active {
//     background-color: #007aff;
//   }
// `

const vehicleEndpoint = 'https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json'

class VehicleList extends React.Component {
  state = {
    // The vehicle list is considered "loading" if vehicle data has not yet populated
    loading: isEmpty(this.props.vehicleData),
    // The current "page" of vehicles
    currentPage: 1,
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

  setPage = newPage => {
    this.setState({currentPage: newPage})
  }

  setSorting = e => {
    const method = e.target.value
    method && this.props[method]()
  }

  render () {
    const {vehicleData, itemsPerPage, currentPage} = this.props
    const {loading} = this.state
    const lastItem = currentPage * itemsPerPage
    const firstItem = lastItem - itemsPerPage
    const vehicles = loading ? fill(Array(itemsPerPage), '') : vehicleData.slice(firstItem, lastItem)
    return (
      <VehiclesContainer>
        {vehicles.map((vehicle, index) => (
          <VehicleListing key={`Vehicle-${index}`}>
            <VehicleCard>
              {loading
                ? <LoadingSpinner singleColor="#007aff" size={100} />
                : (
                  <Fragment>
                    <VehicleImage src={vehicle.image_url} />
                    <CardContent>
                      <CardTitle>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</CardTitle>
                      <p>
                        <NumberFormat
                          value={vehicle.mileage}
                          suffix=" mi"
                          displayType="text"
                          thousandSeparator
                        />
                      </p>
                    </CardContent>
                  </Fragment>
                )
              }
            </VehicleCard>
          </VehicleListing>
        ))}
      </VehiclesContainer>
    )
  }
}

const mapState = state => ({
  vehicleData: get(state, 'vehicles'),
  itemsPerPage: get(state, 'pages.itemsPerPage'),
  currentPage: get(state, 'pages.currentPage'),
})

const mapActions = {
  populateVehicles: Actions.populateVehicles,
}

export default connect(mapState, mapActions)(VehicleList)
