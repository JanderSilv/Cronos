import { withStyles } from '@material-ui/core/styles'

const GlobalCss = withStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },

    a: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
})(() => null)

export default GlobalCss
