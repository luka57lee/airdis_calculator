import { useState } from 'react'
import { Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'
import { Airport, AirportSearch } from '../../types'
import Button from '@mui/material/Button'
import Search from '../../components/Search'
import { styled } from '@mui/material/styles'
import { getDistanceInNauticalMiles } from '../../utils/geography'

const HeaderDesc = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const Calculator = () => {
  const [search, setSearch] = useState<AirportSearch>({
    origin: undefined,
    destination: undefined,
  })

  const [distance, setDistance] = useState<number>(0)

  const selectAirPort = (key: string) => (ap: Airport) => {
    setSearch((prev: AirportSearch) => ({
      ...prev,
      [key]: ap,
    }))
  }

  const calculate = () => {
    const dis = getDistanceInNauticalMiles(
      search.origin as Airport,
      search.destination as Airport,
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
            disabled={
              search.origin === undefined || search.destination === undefined
            }
          >
            Calcuate
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: '16px',
          }}
        >
          {distance === 0 ||
          search.origin === undefined ||
          search.destination === undefined
            ? ''
            : `Distance between ${search.origin?.name} and ${search.destination?.name} is ${distance}`}
        </Box>
      </Container>
    </Box>
  )
}

export default Calculator
