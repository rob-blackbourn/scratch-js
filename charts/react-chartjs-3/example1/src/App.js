import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import YearOnYearChart from './components/YearOnYearChart'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <YearOnYearChart />
    </MuiThemeProvider>
  )
}

export default App
