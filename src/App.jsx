import React from 'react'
import {connect} from 'react-redux'
import {get} from 'lodash'
import styled from 'styled-components'

import Header from './components/Header'
import VehicleList from './components/VehicleList'
import Footer from './components/Footer'
import VehicleDetail from './components/VehicleDetail'
import './App.css' // Additional global resets and defaults

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  font-size: 14px;
`

export class App extends React.Component {
  render() {
    const {currentVehicle} = this.props
    // The App displays different views all based on if a "currentVehicle" is selected
    return (
      <AppContainer>
        <Header currentVehicle={currentVehicle} />
        {!currentVehicle && <VehicleList />}
        {currentVehicle && <VehicleDetail vehicle={currentVehicle} />}
        {!currentVehicle && <Footer />}
      </AppContainer>
    )
  }
}

const mapState = state => ({
  currentVehicle: get(state, 'vehicles.currentVehicle'),
})

export default connect(mapState)(App)
