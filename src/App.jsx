import React from 'react'
import styled from 'styled-components'
import VehicleList from './components/VehicleList'

import colors from './styles/colors'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${colors.lightGray};
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
