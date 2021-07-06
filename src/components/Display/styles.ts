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

    watchContainer: {
      fontSize: '14vw',
      fontWeight: theme.typography.fontWeightBold,

      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(80)
      }
    },
    timeBox: {
      padding: theme.spacing(1.5, 1),
      border: '1px solid #F5F5F5',
      borderRadius: 5,
      boxShadow: theme.shadows[1]
    },
    ms: {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(40)
    }
  })
)

export default useStyles
