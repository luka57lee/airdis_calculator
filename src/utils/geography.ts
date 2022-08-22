import { Airport } from '../types'

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
    Number(origin.latitude),
    Number(origin.longitude),
    Number(destination.latitude),
    Number(destination.longitude),
  )
}