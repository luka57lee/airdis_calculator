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
  return getDistanceFromLatLonInKm(
    origin.lat,
    origin.lng,
    destination.lat,
    destination.lng,
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

export function getMeanPoint(points: Point[]): Point {
  let latXTotal = 0
  let latYTotal = 0
  let lonDegreesTotal = 0

  let currentLatLong
  for (let i = 0; (currentLatLong = points[i]); i++) {
    const latDegrees = currentLatLong.lat
    const lonDegrees = currentLatLong.lng

    const latRadians = (Math.PI * latDegrees) / 180
    latXTotal += Math.cos(latRadians)
    latYTotal += Math.sin(latRadians)

    lonDegreesTotal += lonDegrees
  }

  const finalLatRadians = Math.atan2(latYTotal, latXTotal)
  const finalLatDegrees = (finalLatRadians * 180) / Math.PI

  const finalLonDegrees = lonDegreesTotal / points.length
  return {
    lat: finalLatDegrees,
    lng: finalLonDegrees,
  }
}

export function getCenter(origin: Airport, destination: Airport): Point {
  return getMeanPoint([
    { lat: origin.lat, lng: origin.lng },
    { lat: destination.lat, lng: destination.lng },
  ])
}
