import { ThemeOptions } from '@material-ui/core/styles'

const theme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#0047BA',
      light: '#2575FC',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    button: {
      textTransform: 'initial'
    }
  }
}

export default theme
