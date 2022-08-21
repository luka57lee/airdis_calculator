import { useState } from 'react'
import { Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'
import { Airport, AirportSearch } from '../types'
import Search from '../components/Search'

const Calculator = () => {
  const [search, setSearch] = useState<AirportSearch>({
    origin: undefined,
    destination: undefined,
  })

  const selectAirPort = (key: string) => (ap: Airport) => {
    setSearch((prev) => ({
      ...prev,
      [key]: ap,
    }))
  }

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
          <Typography>calculate distance between two airports</Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ margin: '24px auto' }}>
        <Box sx={{ width: '320px', margin: '16px 0px' }}>
          <Search title="Origin" onSelect={selectAirPort('origin')} />
          <Search title="Destination" onSelect={selectAirPort('destination')} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        ></Box>
      </Container>
    </Box>
  )
}

export default Calculator
