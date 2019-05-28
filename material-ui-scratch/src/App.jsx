import { hot } from 'react-hot-loader'
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Example from './components/Chat2'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true
  }
})

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Example />
  </MuiThemeProvider>
)

export default hot(module)(App)
