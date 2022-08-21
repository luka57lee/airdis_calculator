import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import './App.css'
import Calculator from './pages/calculator'

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Calculator />
    </ThemeProvider>
  )
}

export default App
