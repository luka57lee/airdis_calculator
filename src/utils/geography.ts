import { Airport, Point } from '../types'

export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

export function getDistanceInNauticalMiles(
  origin: Airport,
  destination: Airport,
): number {
  return (
    getDistanceFromLatLonInKm(
      origin.lat,
      origin.lng,
      destination.lat,
      destination.lng,
    ) / 1.852
  )
}

export function getZoomLevelOnGoogleMap(
  origin: Airport,
  destination: Airport,
): number {
  const R = 6371 // Radius of the earth in km
  const zoomLevelInEarth =
    (Math.PI * R) /
    getDistanceFromLatLonInKm(
      origin.lat,
      origin.lng,
      destination.lat,
      destination.lng,
    )
  let zoom = 1,
    i = 0
  while (zoom < zoomLevelInEarth) {
    zoom *= 2
    i++
  }
  return i
}

function getMeanPoint(coords: Point[]): Point {
  if (coords.length === 1) {
    return coords[0]
  }

  let x = 0.0
  let y = 0.0
  let z = 0.0

  for (const coord of coords) {
    const latitude = (coord.lat * Math.PI) / 180
    const longitude = (coord.lng * Math.PI) / 180

    x += Math.cos(latitude) * Math.cos(longitude)
    y += Math.cos(latitude) * Math.sin(longitude)
    z += Math.sin(latitude)
  }

  const total = coords.length

  x = x / total
  y = y / total
  z = z / total

  const centralLongitude = Math.atan2(y, x)
  const centralSquareRoot = Math.sqrt(x * x + y * y)
  const centralLatitude = Math.atan2(z, centralSquareRoot)

  return {
    lat: (centralLatitude * 180) / Math.PI,
    lng: (centralLongitude * 180) / Math.PI,
  }
}

export function getCenter(origin: Airport, destination: Airport): Point {
  return getMeanPoint([
    { lat: origin.lat, lng: origin.lng },
    { lat: destination.lat, lng: destination.lng },
  ])
}
