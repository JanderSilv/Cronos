import { memo, useState } from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import {
  PlayArrowIcon,
  PauseIcon,
  RedoIcon
} from '../../../public/assets/icons'
import useStyles from './styles'

interface Props {
  resume: () => void
  start: () => void
  stop: () => void
  reset: () => void
  status: number
}

const ControlButton = (props: Props): JSX.Element => {
  const classes = useStyles()

  const [rotate, setRotate] = useState(false)

  const handleStart = () => {
    props.start()
    setRotate(false)
  }

  const handleRedo = () => {
    props.reset()
    setRotate(true)
  }

  const renderButton = () => {
    switch (props.status) {
      case 0:
      case 2:
        return (
          <IconButton
            className={[classes.button, classes.mainButton].join(' ')}
            onClick={handleStart}
          >
            <PlayArrowIcon />
          </IconButton>
        )
      case 1:
        return (
          <IconButton
            className={[classes.button, classes.mainButton].join(' ')}
            onClick={props.stop}
          >
            <PauseIcon />
          </IconButton>
        )
    }
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
      >
        <RedoIcon />
      </IconButton>
    </Box>
  )
}

export default memo(ControlButton)
