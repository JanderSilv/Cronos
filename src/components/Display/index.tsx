import { memo } from 'react'
import { TypeTime } from '../../pages'
import Box from '@material-ui/core/Box'
import useStyles from './styles'

interface Props {
  time: TypeTime
}

const Display = ({ time }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.watchContainer}>
      <span className={classes.timeBox}>
        {time.h >= 10 ? time.h : '0' + time.h}
      </span>
      &nbsp;:&nbsp;
      <span className={classes.timeBox}>
        {time.m >= 10 ? time.m : '0' + time.m}
      </span>
      &nbsp;:&nbsp;
      <span className={classes.timeBox}>
        {time.s >= 10 ? time.s : '0' + time.s}
      </span>
    </Box>
  )
}

export default memo(Display)
