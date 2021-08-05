import { memo, useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'

import { usePausedTimes } from '../../hooks/usePausedTimes'
import { StopwatchActions, StopwatchState } from '../../reducers/Stopwatch'

import {
  PlayArrowIcon,
  PauseIcon,
  RedoIcon
} from '../../../public/assets/icons'
import useStyles from './styles'

interface Props {
  handler: (action: StopwatchActions) => void
  state: StopwatchState
}

const ControlButton = (props: Props): JSX.Element => {
  const { handler, state } = props
  const { handleSaveTime, resetPausedTimes } = usePausedTimes()
  const classes = useStyles()

  const [rotate, setRotate] = useState(false)

  const handleStart = () => {
    handler({ type: 'start' })
    setRotate(false)
  }

  const handlePause = () => {
    handler({ type: 'stop' })
    handleSaveTime(state)
  }

  const handleRedo = () => {
    handler({ type: 'reset' })
    setRotate(true)
    resetPausedTimes()
  }

  const renderButton = () => {
    if (!state.running)
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
          onClick={handlePause}
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
