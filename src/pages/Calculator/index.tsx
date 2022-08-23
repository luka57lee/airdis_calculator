import { useEffect, useState, useCallback } from 'react'
import { Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'
import { Airport } from '../../types'
import Button from '@mui/material/Button'
import Search from '../../components/Search'
import { styled } from '@mui/material/styles'
import {
  getDistanceInNauticalMiles,
  getZoomLevelOnGoogleMap,
  getCenter,
} from '../../utils/geography'
// import GoogleMap from '@google/maps'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const HeaderDesc = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const containerStyle = {
  width: '100%',
  height: '400px',
}

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

const Calculator = () => {
  const [origin, setOrigin] = useState<Airport | undefined>()
  const [destination, setDestination] = useState<Airport | undefined>()

  const [distance, setDistance] = useState<number>(0)

  const [destinationMarker, setDestinationMarker] =
    useState<google.maps.Marker>()
  const [originMarker, setOriginMaker] = useState<google.maps.Marker>()
  const [flightPath, setFlightPath] = useState<google.maps.Polyline>()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDfX3PQstiTI7_llOvuj3ND3twg6t5AvQg',
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(function callback(mapIns: google.maps.Map) {
    setMap(mapIns)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const selectAirPort = (key: string) => (ap: Airport) => {
    if (map && origin === undefined && destination === undefined) {
      map.setCenter({ lat: ap.lat, lng: ap.lng })
    }
    if (key === 'origin') {
      if (isLoaded && map) {
        originMarker?.setMap(null)
        const om = new google.maps.Marker({
          position: {
            lat: ap.lat,
            lng: ap.lng,
          },
          map,
        })
        setOriginMaker(om)
      }
      setOrigin(ap)
    } else {
      destinationMarker?.setMap(null)
      const dm = new google.maps.Marker({
        position: {
          lat: ap.lat,
          lng: ap.lng,
        },
        map,
      })
      setDestinationMarker(dm)
      setDestination(ap)
    }
  }

  const calculate = () => {
    const dis = getDistanceInNauticalMiles(
      origin as Airport,
      destination as Airport,
    )
    setDistance(dis)
  }

  useEffect(() => {
    flightPath?.setMap(null)

    if (isLoaded && map) {
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
  }, [origin, destination, isLoaded, map])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '72px',
          width: '100%',
          padding: `8px 16px`,
          borderBottom: '1px solid black',
          fontSize: '20px',
          fontWeight: 500,
        }}
      >
        <Container maxWidth="xl">
          <span>Airport distance calculator</span>
          <HeaderDesc>
            <Typography>calculate distance between two airports</Typography>
          </HeaderDesc>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ margin: '24px auto' }}>
        <Box sx={{ margin: '16px' }}>
          <Search title="Origin" onSelect={selectAirPort('origin')} />
          <Search title="Destination" onSelect={selectAirPort('destination')} />
          <Button
            variant="contained"
            sx={{ marginLeft: '16px' }}
            onClick={calculate}
            disabled={origin === undefined || destination === undefined}
          >
            Calcuate
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: '16px',
          }}
        >
          {distance === 0 || origin === undefined || destination === undefined
            ? ''
            : `Distance between ${origin?.name} and ${
                destination?.name
              } is ${distance.toFixed(3)} NM`}
        </Box>
        <Box
          sx={{
            marginLeft: '16px',
          }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={1}
              onLoad={onLoad}
              onUnmount={onUnmount}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Calculator
