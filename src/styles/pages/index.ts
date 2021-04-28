import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      padding: theme.spacing(1, 4, 4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    header: {
      minHeight: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerGreetings: {
      display: 'flex',
      alignItems: 'center'
    },

    watchWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& p': {
        fontSize: theme.typography.pxToRem(20)
      }
    },
    watchContainer: {
      marginBottom: theme.spacing(6),
      display: 'inherit',
      alignItems: 'center',
      position: 'relative'
    },
    controlButtonsContainer: {
      position: 'absolute',
      right: -110
    },

    buttonsContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  })
)

export default useStyles
