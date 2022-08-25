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
    setDistance(-1)
  }

  const handleDestination = (ap: AirportReactState) => {
    setDestination(ap)
    setDistance(-1)
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
        overflowX: 'hidden',
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ margin: '24px auto' }}>
        <Box>
          <Search title="Origin" onSelect={handleOrigin} />
          <Search title="Destination" onSelect={handleDestination} />
          <Button
            variant="contained"
            onClick={calculate}
            disabled={!origin || !destination}
          >
            Calculate
          </Button>
        </Box>
        <Box
          sx={{
            minHeight: '20px',
            margin: '8px 0px',
          }}
        >
          {distance >= 0 && origin && destination && (
            <span>The distance is {distance.toFixed(2)} nautical miles.</span>
          )}
        </Box>
        <Box>
          {isLoaded && <AirportMap origin={origin} destination={destination} />}
        </Box>
      </Container>
    </Box>
  )
}

export default Calculator
