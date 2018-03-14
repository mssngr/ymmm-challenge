import {matches} from 'lodash'
import actions from '../actions'
import reducer from '../reducers'

const mockData = [
  {
    year: 2013,
    make: 'Jeep',
    model: 'Wrangler Unlimited',
    mileage: 19000,
    image_url: 'http://blog.caranddriver.com/wp-content/uploads/2014/07/2013-Jeep-Wrangler-Unlimited-Rubicon-10th-Anniversary-Edition-PLACEMENT.jpg',
    created_at: '2016-10-14T20:13:22.586Z'
  },
  {
    year: 2013,
    make: 'Kia',
    model: 'Optima',
    mileage: 24235,
    drivetrain: 'FWD',
    bodytype: 'sedan',
    image_url: 'http://www.optimaforums.com/forum/attachments/new-member-introductions/11137d1347548855-new-2013-kia-optima-sx-l-titanium-photo.jpg',
    created_at: '2018-10-14T20:13:22.586Z'
  },
  {
    year: 2014,
    make: 'Nissan',
    model: 'Juke',
    mileage: 10457,
    drivetrain: 'FWD',
    bodytype: 'CUV',
    image_url: 'http://www.automobilesreview.com/gallery/2014-nissan-juke-nismo-rs/2014-nissan-juke-nismo-rs-08.jpg',
    created_at: '2017-10-14T20:13:22.586Z'
  },
  {
    year: 1999,
    make: 'BMW',
    model: '528i',
    mileage: 160254,
    image_url: 'http://intorg.netfirms.com/Cars8/1999_BMW_528/DrQuarter2.jpg',
    created_at: '2016-10-14T20:13:22.586Z'
  },
]

describe('reducers', () => {
  describe('vehicles()', () => {
    const initialState = {
      vehicles: {
        unfiltered: mockData,
        filtered: mockData,
        currentVehicle: null,
      }
    }

    test('POPULATE_VEHICLES', () => {
      expect.assertions(2)
      const newState = reducer(undefined, actions.populateVehicles(mockData))
      expect(newState.vehicles.unfiltered).toEqual(mockData)
      expect(newState.vehicles.filtered).toEqual(mockData)
    })

    test('UPDATE_CURRENT_VEHICLE', () => {
      expect.assertions(1)
      const newState = reducer(undefined, actions.updateCurrentVehicle(mockData[0]))
      expect(newState.vehicles.currentVehicle).toEqual(mockData[0])
    })

    test('SORT_BY_RECENTLY_ADDED', () => {
      expect.assertions(2)
      const newState = reducer(initialState, actions.sortByRecentlyAdded())
      expect(newState.vehicles.unfiltered[0].created_at).toBe('2018-10-14T20:13:22.586Z')
      expect(newState.vehicles.filtered[0].created_at).toBe('2018-10-14T20:13:22.586Z')
    })

    test('SORT_BY_YEAR_NEWEST_OLDEST', () => {
      expect.assertions(2)
      const newState = reducer(initialState, actions.sortByYearNewestOldest())
      expect(newState.vehicles.unfiltered[0].year).toBe(2014)
      expect(newState.vehicles.filtered[0].year).toBe(2014)
    })

    test('SORT_BY_YEAR_OLDEST_NEWEST', () => {
      expect.assertions(2)
      const newState = reducer(initialState, actions.sortByYearOldestNewest())
      expect(newState.vehicles.unfiltered[0].year).toBe(1999)
      expect(newState.vehicles.filtered[0].year).toBe(1999)
    })

    test('SORT_BY_MILEAGE_LOW_HIGH', () => {
      expect.assertions(2)
      const newState = reducer(initialState, actions.sortByMileageLowHigh())
      expect(newState.vehicles.unfiltered[0].mileage).toBe(10457)
      expect(newState.vehicles.filtered[0].mileage).toBe(10457)
    })

    test('SORT_BY_MILEAGE_HIGH_LOW', () => {
      expect.assertions(2)
      const newState = reducer(initialState, actions.sortByMileageHighLow())
      expect(newState.vehicles.unfiltered[0].mileage).toBe(160254)
      expect(newState.vehicles.filtered[0].mileage).toBe(160254)
    })

    test('FILTER', () => {
      expect.assertions(2)
      const mockFilteredData = mockData.filter(matches({year: 2013}))
      const newState = reducer(initialState, actions.filter(mockFilteredData))
      expect(newState.vehicles.unfiltered).toEqual(mockData)
      expect(newState.vehicles.filtered).toEqual(mockFilteredData)
    })
  })

  describe('pages()', () => {
    test('SET_CURRENT_PAGE', () => {
      expect.assertions(1)
      const newState = reducer(undefined, actions.setCurrentPage(3))
      expect(newState.pages.currentPage).toBe(3)
    })
  })
})
