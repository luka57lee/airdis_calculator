import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'
import Calculator from './pages/Calculator'

const defaultTheme = createTheme() // or your custom theme

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Calculator />
    </ThemeProvider>
  )
}

export default App
