import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#27333f',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#963d5a'
    }
  },
  typography: {
    useNextVariants: true
  }
})

export default theme
