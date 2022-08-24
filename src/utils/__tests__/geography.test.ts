import {
  deg2rad,
  getDistanceFromLatLonInKm,
  getDistanceInNauticalMiles,
  getZoomLevelOnGoogleMap,
  getMeanPoint,
  getCenter,
} from '../geography'

import { Airport, Point } from '../../types'

describe('Test deg2rad function', () => {
  it('180 degree is PI rad', () => {
    const deg = 180
    const expectedRad = Math.PI

    const rad = deg2rad(deg)
    expect(rad).toEqual(expectedRad)
  })

  it('45 degree is 1/4 * PI rad', () => {
    const deg = 45
    const expectedRad = Math.PI / 4

    const rad = deg2rad(deg)
    expect(rad).toEqual(expectedRad)
  })

  it('0 degree is 0 rad', () => {
    const deg = 0
    const expectedRad = 0
    const rad = deg2rad(deg)
    expect(rad).toEqual(expectedRad)
  })
})

describe('Test getDistanceFromLatLonInKm function', () => {
  it('Test with two point in 2 km', () => {
    const lat1 = 53.32055555555556
    const lng1 = -1.7297222222222
    const lat2 = 53.31861111111111
    const lng2 = -1.6997222222222

    const expectedDis = 2.0043678382716137

    const dis = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2)
    expect(dis).toBeCloseTo(expectedDis, 5)
  })
})

describe('Test getDistanceInNauticalMiles function', () => {
  it('Test with two virtual airport in 2 km', () => {
    const lat1 = 53.32055555555556
    const lng1 = -1.7297222222222
    const lat2 = 53.31861111111111
    const lng2 = -1.6997222222222

    const origin: Airport = {
      lat: lat1,
      lng: lng1,
      idata: 'virtual 1',
      name: 'virtual 1',
    }

    const destination: Airport = {
      lat: lat2,
      lng: lng2,
      idata: 'virtual 2',
      name: 'virtual 2',
    }

    const expectedDis = 2.0043678382716137
    const expectedDisInMiles = expectedDis / 1.852
    const dis = getDistanceInNauticalMiles(origin, destination)
    expect(dis).toBeCloseTo(expectedDisInMiles, 5)
  })
})

describe('Test zoom, center, meanpoint functions', () => {
  let origin: Airport
  let destination: Airport

  beforeEach(() => {
    origin = {
      name: 'New York City - All Airports',
      lat: 40.712784,
      lng: -74.005941,
      idata: undefined,
    }

    destination = {
      name: 'London - All Airports',
      lat: 51.507351,
      lng: -0.127758,
      idata: undefined,
    }
  })

  it('Test getZoomLevelOnGoogleMap', () => {
    const expectedZoom = 2
    const zoom = getZoomLevelOnGoogleMap(origin, destination)
    expect(zoom).toEqual(expectedZoom)
  })

  it('Test getMeanPoint', () => {
    const expectedMeanpoint: Point = {
      lat: 52.368405,
      lng: -41.29023,
    }
    const meanpoint = getMeanPoint([
      { lat: origin.lat, lng: origin.lng },
      { lat: destination.lat, lng: destination.lng },
    ])
    expect(meanpoint.lat).toBeCloseTo(expectedMeanpoint.lat, 3)
    expect(meanpoint.lng).toBeCloseTo(expectedMeanpoint.lng, 3)
  })

  it('Test getCenter', () => {
    const expectedCenter: Point = {
      lat: 52.368405,
      lng: -41.29023,
    }

    const center = getCenter(origin, destination)
    expect(center.lat).toBeCloseTo(expectedCenter.lat, 3)
    expect(center.lng).toBeCloseTo(expectedCenter.lng, 3)
  })
})
