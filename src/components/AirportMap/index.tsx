import { Airport } from '../../types'
import { GoogleMap } from '@react-google-maps/api'
import { useEffect, useState, useCallback } from 'react'
import { getZoomLevelOnGoogleMap, getCenter } from '../../utils/geography'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

const AirportMap = ({
  origin,
  destination,
}: {
  origin: Airport | undefined
  destination: Airport | undefined
}) => {
  const [destinationMarker, setDestinationMarker] =
    useState<google.maps.Marker>()
  const [originMarker, setOriginMaker] = useState<google.maps.Marker>()
  const [flightPath, setFlightPath] = useState<google.maps.Polyline>()

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
    if (map && origin) {
      originMarker?.setMap(null)
      const om = new google.maps.Marker({
        position: {
          lat: origin.lat,
          lng: origin.lng,
        },
        map,
      })
      setOriginMaker(om)
    }
    // eslint-disable-next-line
  }, [origin, map])

  useEffect(() => {
    if (map && destination) {
      destinationMarker?.setMap(null)
      const dm = new google.maps.Marker({
        position: {
          lat: destination.lat,
          lng: destination.lng,
        },
        map,
      })
      setDestinationMarker(dm)
    }
    // eslint-disable-next-line
  }, [destination, map])

  useEffect(() => {
    if (map) {
      flightPath?.setMap(null)

      if (origin && destination) {
        const flightPlanCoordinates = [
          {
            lat: origin.lat,
            lng: origin.lng,
          },
          {
            lat: destination.lat,
            lng: destination.lng,
          },
        ]
        const fp = new window.google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        })
        setFlightPath(fp)
        fp.setMap(map)
        const center = getCenter(origin, destination)
        map.setCenter(center)
        const zoom = getZoomLevelOnGoogleMap(origin, destination)
        map.setZoom(zoom)
      }
    }

    return () => {
      flightPath?.setMap(null)
    }
    // eslint-disable-next-line
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
