import { memo, useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'

import { StopwatchActions } from '../../reducers/Stopwatch'
import {
  PlayArrowIcon,
  PauseIcon,
  RedoIcon
} from '../../../public/assets/icons'
import useStyles from './styles'

interface Props {
  handler: (action: StopwatchActions) => void
  status: boolean
}

const ControlButton = (props: Props): JSX.Element => {
  const { handler, status } = props
  const classes = useStyles()

  const [rotate, setRotate] = useState(false)

  const handleStart = () => {
    handler({ type: 'start' })
    setRotate(false)
  }

  const handleRedo = () => {
    handler({ type: 'reset' })
    setRotate(true)
  }

  const renderButton = () => {
    if (!status)
      return (
        <IconButton
          className={[classes.button, classes.mainButton].join(' ')}
          onClick={handleStart}
        >
          <PlayArrowIcon />
        </IconButton>
      )
    else
      return (
        <IconButton
          className={[classes.button, classes.mainButton].join(' ')}
          onClick={() => handler({ type: 'stop' })}
        >
          <PauseIcon />
        </IconButton>
      )
  }

  return (
    <Box className={classes.buttonsContainer}>
      {renderButton()}
      <IconButton
        className={clsx({
          [classes.button]: true,
          [classes.redoButton]: true,
          rotate: rotate
        })}
        onClick={handleRedo}
        disabled={rotate}
      >
        <RedoIcon />
      </IconButton>
    </Box>
  )
}

export default memo(ControlButton)
