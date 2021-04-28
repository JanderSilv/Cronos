import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useCommonStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabButton: {
      width: 50,
      height: 50,
      background: 'white',
      border: '1px solid #F5F5F5',
      boxShadow: theme.shadows[1],

      '& svg': {
        width: '100%',
        maxWidth: 26,
        height: 'auto'
      }
    }
  })
)

export default useCommonStyles
