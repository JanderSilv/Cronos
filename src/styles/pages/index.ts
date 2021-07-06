import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      padding: theme.spacing(1, 2, 4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 4, 4)
      }
    },

    watchWrapper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& p#phrase': {
        fontSize: theme.typography.pxToRem(20),
        textAlign: 'center'
      }
    },
    watchContainer: {
      marginBottom: theme.spacing(6),
      display: 'inherit',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
      }
    },
    controlButtonsContainer: {
      marginTop: theme.spacing(4),

      [theme.breakpoints.up('md')]: {
        marginTop: 'unset',
        position: 'absolute',
        right: -110
      }
    },

    buttonsContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  })
)

export default useStyles
