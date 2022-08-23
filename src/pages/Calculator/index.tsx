import { useState } from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import { Airport } from '../../types'
import Button from '@mui/material/Button'
import Search from '../../components/Search'
import { getDistanceInNauticalMiles } from '../../utils/geography'
import AirportMap from '../../components/AirportMap'
import { useJsApiLoader } from '@react-google-maps/api'
import Header from '../../components/Header'

const Calculator = () => {
  const [origin, setOrigin] = useState<Airport | undefined>()
  const [destination, setDestination] = useState<Airport | undefined>()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDfX3PQstiTI7_llOvuj3ND3twg6t5AvQg',
  })

  const [distance, setDistance] = useState<number>(0)

  const handleOrigin = (ap: Airport) => {
    setOrigin(ap)
  }

  const handleDestination = (ap: Airport) => {
    setDestination(ap)
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
            disabled={origin === undefined || destination === undefined}
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
          {distance === 0 ||
          origin === undefined ||
          destination === undefined ? (
            <></>
          ) : (
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
