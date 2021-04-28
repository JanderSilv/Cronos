import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    button: {
      padding: theme.spacing(0.5),
      margin: theme.spacing(1),
      width: 45,
      height: 45,
      border: '1px solid #F5F5F5',
      boxShadow: theme.shadows[1],

      '& svg': {
        width: '90%',
        // maxWidth: 100,
        height: 'auto'
      }
    },

    mainButton: {
      '& svg': {
        width: '100%',
        maxWidth: 20,
        height: 'auto'
      }
    },
    redoButton: {
      '& svg': {
        transform: 'rotateZ(0deg)',
        transition: 'transform .4s'
      },

      '&.rotate': {
        '& svg': {
          transform: 'rotate(-360deg)'
        }
      }
    }
  })
)

export default useStyles
