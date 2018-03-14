import React from 'react'
import styled from 'styled-components'

import Header from './components/Header'
import VehicleList from './components/VehicleList'
import Footer from './components/Footer'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100vw;
  font-family: 'Montserrat', 'Helvetica', sans-serif;
  font-size: 14px;
`

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Header />
        <VehicleList />
        <Footer />
      </AppContainer>
    )
  }
}

export default App
