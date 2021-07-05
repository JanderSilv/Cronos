import { ThemeOptions } from '@material-ui/core/styles'

const theme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#0047BA',
      light: '#2575FC',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#646464',
      secondary: '#000000'
    },
    background: {
      default: '#F9F9F9'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  }
}

export default theme
