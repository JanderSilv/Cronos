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

    header: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    headerGreetings: {
      display: 'flex'
    },

    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })
)

export default useStyles
