import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import FlowControl from './components/FlowControl'

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
      <FlowControl />
    </MuiThemeProvider>
  )
}

export default App
