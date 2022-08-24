import { useState } from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import { Airport, AirportReactState } from '../../types'
import Button from '@mui/material/Button'
import Search from '../../components/Search'
import { getDistanceInNauticalMiles } from '../../utils/geography'
import AirportMap from '../../components/AirportMap'
import { useJsApiLoader } from '@react-google-maps/api'
import Header from '../../components/Header'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const Calculator = () => {
  const [origin, setOrigin] = useState<AirportReactState>(null)
  const [destination, setDestination] = useState<AirportReactState>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey || '',
  })

  const [distance, setDistance] = useState<number>(0)

  const handleOrigin = (ap: AirportReactState) => {
    setOrigin(ap)
    setDistance(0)
  }

  const handleDestination = (ap: AirportReactState) => {
    setDestination(ap)
    setDistance(0)
  }

  const calculate = () => {
    const dis = getDistanceInNauticalMiles(
      origin as Airport,
      destination as Airport,
    )

    setDistance(dis)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ margin: '24px auto' }}>
        <Box sx={{ margin: '16px' }}>
          <Search title="Origin" onSelect={handleOrigin} />
          <Search title="Destination" onSelect={handleDestination} />
          <Button
            variant="contained"
            sx={{ marginLeft: '16px' }}
            onClick={calculate}
            disabled={!origin || !destination}
          >
            Calcuate
          </Button>
        </Box>
        <Box
          sx={{
            minHeight: '60px',
            width: '100%',
            margin: '16px',
          }}
        >
          {distance === 0 || !origin || !destination ? null : (
            <>
              Distance between <b>{origin?.name}</b> and &nbsp;
              <b>{destination?.name}</b> is <b>{distance.toFixed(3)}</b> &nbsp;
              <b>NM</b>
            </>
          )}
        </Box>
        <Box
          sx={{
            marginLeft: '16px',
          }}
        >
          {isLoaded && <AirportMap origin={origin} destination={destination} />}
        </Box>
      </Container>
    </Box>
  )
}

export default Calculator
