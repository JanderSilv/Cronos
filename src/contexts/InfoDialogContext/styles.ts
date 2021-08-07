import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(3, 4, 4),
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 8, 4)
    }
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  logo: {
    marginBottom: theme.spacing(4),
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 110,
    height: 110,
    marginRight: theme.spacing(3)
  },
  buyMeACoffee: {
    marginTop: theme.spacing(4),
    textAlign: 'center',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',

    '& > svg': {
      fill: theme.palette.text.primary
    },
    '& > p': {
      marginLeft: theme.spacing(1),
      color: theme.palette.text.primary
    }
  },
  button: {
    marginTop: theme.spacing(3)
  },
  buttonSuccess: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark
    }
  }
}))

export default useStyles
