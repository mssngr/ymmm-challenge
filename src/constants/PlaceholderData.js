import {fill} from 'lodash'
import carIcon from '../assets/svg/carIcon.svg'

export default fill(Array(4), {
  year: '',
  make: '',
  model: '',
  mileage: '',
  drivetrain: '',
  bodytype: '',
  image_url: carIcon,
  created_at: '2018-03-13T00:00:00.586Z',
})
