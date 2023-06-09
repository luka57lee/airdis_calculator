import { AirportReactState } from '../../types'
import { GoogleMap } from '@react-google-maps/api'
import { useEffect, useState, useCallback } from 'react'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

let destinationMarker: google.maps.Marker | null
let originMarker: google.maps.Marker | null
let flightPath: google.maps.Polyline | null

const AirportMap = ({
  origin,
  destination,
}: {
  origin: AirportReactState
  destination: AirportReactState
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(mapIns: google.maps.Map) {
    setMap(mapIns)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  useEffect(() => {
    if (map) {
      if (destination && !origin) {
        map?.setCenter({ lat: destination.lat, lng: destination.lng })
      }
      if (origin && !destination) {
        map?.setCenter({ lat: origin.lat, lng: origin.lng })
      }
    }
  }, [map, origin, destination])

  useEffect(() => {
    originMarker?.setMap(null)
    if (map && origin) {
      originMarker?.setMap(null)
      originMarker = new google.maps.Marker({
        position: {
          lat: origin.lat,
          lng: origin.lng,
        },
        map,
      })
    }
  }, [origin, map])

  useEffect(() => {
    destinationMarker?.setMap(null)
    if (map && destination) {
      destinationMarker?.setMap(null)
      destinationMarker = new google.maps.Marker({
        position: {
          lat: destination.lat,
          lng: destination.lng,
        },
        map,
      })
    }
  }, [destination, map])

  useEffect(() => {
    if (map) {
      flightPath?.setMap(null)

      if (origin && destination) {
        const originCord = {
          lat: origin.lat,
          lng: origin.lng,
        }

        const destCord = {
          lat: destination.lat,
          lng: destination.lng,
        }

        const flightPlanCoordinates = [originCord, destCord]
        flightPath = new window.google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: false,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        })
        flightPath.setMap(map)
        const latlngbounds = new google.maps.LatLngBounds()
        latlngbounds.extend(originCord)
        latlngbounds.extend(destCord)
        map?.setCenter(latlngbounds.getCenter())
        map?.fitBounds(latlngbounds)
      }
    }

    return () => {
      flightPath?.setMap(null)
    }
  }, [origin, destination, map])

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  )
}

export default AirportMap
