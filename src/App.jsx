import React from 'react'
import styled from 'styled-components'

import VehicleList from './components/VehicleList'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100vw;
`

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <VehicleList />
      </AppContainer>
    )
  }
}

export default App
