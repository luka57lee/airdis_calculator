import { styled } from '@mui/material/styles'
import { Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'

const HeaderTitle = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
    lineHeight: '50px',
  },
  [theme.breakpoints.down(320)]: {
    fontSize: '14px',
    lineHeight: '50px',
  },
}))
const HeaderDesc = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const Header = () => {
  return (
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
        <HeaderTitle>Airport distance calculator</HeaderTitle>
        <HeaderDesc>
          <Typography>calculate distance between two airports</Typography>
        </HeaderDesc>
      </Container>
    </Box>
  )
}

export default Header
