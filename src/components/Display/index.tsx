import { memo } from 'react'
import Box from '@material-ui/core/Box'

import { Time } from '../../utils/formatters/parseTime'
import useStyles from './styles'

interface Props {
  time: Time
}

const Display = ({ time }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.watchContainer}>
      <span className={classes.timeBox}>
        {time.hours.toString().padStart(2, '0')}
      </span>
      &nbsp;:&nbsp;
      <span className={classes.timeBox}>
        {time.minutes.toString().padStart(2, '0')}
      </span>
      &nbsp;:&nbsp;
      <span className={classes.timeBox}>
        {time.seconds.toString().padStart(2, '0')}
      </span>
      {/* <span className={classes.ms}>
        ,{time.milliseconds.toString().padStart(3, '0').substr(0, 2)}
      </span> */}
    </Box>
  )
}

export default memo(Display)
