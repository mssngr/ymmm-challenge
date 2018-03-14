import React from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import moment from 'moment'

import carIcon from '../assets/svg/carIcon.svg'

/* STYLES */
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;
  background: white;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`

const Image = styled.div`
  width: 100vw;
  height: calc(70vh - 60px);
  background: no-repeat center/cover url(${props => props.src}), no-repeat center/cover url(${carIcon});

  @media (min-aspect-ratio: 1/1) {
    width: 65vw;
    height: calc(100vh - 60px);
  }
`

const Details = styled.div`
  padding: 30px;

  p {
    font-size: 18px;
    margin-bottom: 5px;
  }
`

const Date = styled.span`
  color: #92a0ab;
`

const Title = styled.h3`
  text-align: left;
  margin-bottom: 15px;
  font-size: 24px;
`

/* PRESENTATION/LOGIC */
class VehicleDetail extends React.Component {
  render () {
    const {vehicle} = this.props
    return (
      <Container>
        <Image src={vehicle.image_url} />
        <Details>
          <Title>{`${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`}</Title>
          {(vehicle.drivetrain || vehicle.bodytype) && (
            <p>
              {vehicle.drivetrain && `${vehicle.drivetrain} `}
              {vehicle.bodytype && `${vehicle.bodytype}`}
            </p>
          )}
          <p>
            <NumberFormat
              value={vehicle.mileage}
              suffix=" mi"
              displayType="text"
              thousandSeparator
            />
          </p>
          <br />
          <Date>Added on {moment(vehicle.created_at).format('MMMM Do, YYYY')}</Date>
        </Details>
      </Container>
    )
  }
}

export default VehicleDetail
