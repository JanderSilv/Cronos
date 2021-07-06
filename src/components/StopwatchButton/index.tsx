import { memo, useState, MouseEvent, useEffect } from 'react'
import {
  Fab,
  Popover,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { DateTime } from 'luxon'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { StopwatchState } from '../../reducers/Stopwatch'
import { TimerIcon } from '../../../public/assets/icons'

interface Props {
  state: StopwatchState
}

type Time = {
  pauseTime: DateTime
  pauseTimeHumanized: string
}

const createTime = (pauseTime: DateTime, pauseTimeHumanized: string) => ({
  pauseTime,
  pauseTimeHumanized
})

const getRelative = (lastTime: DateTime) =>
  lastTime.setLocale('pt-BR').toRelative()

const StopwatchButton = ({ state }: Props): JSX.Element => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [times, setTimes] = useState<Time[]>([])

  const isOpen = !!anchorEl
  const id = isOpen ? 'paused-times-popover' : undefined

  useEffect(() => {
    const handlePause = () => {
      if (!state.running && state.lastTime > 0) {
        const timeFromMillis = DateTime.fromMillis(state.lastTime)
        setTimes(prevValues => [
          createTime(
            timeFromMillis,
            timeFromMillis.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
          ),
          ...prevValues
        ])
      }
    }
    handlePause()
  }, [state.lastTime, state.running])

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <Fab
        aria-describedby={id}
        onClick={handleOpen}
        className={classes.fabButton}
      >
        <TimerIcon color="action" />
      </Fab>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <Typography variant="h2" className={classes.title}>
          Horários de Pausa
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="horários de pausa do cronometro">
            <TableHead>
              <TableRow>
                <TableCell>Horário</TableCell>
                <TableCell>Decorrido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map(time => (
                <TableRow key={time.pauseTimeHumanized}>
                  <TableCell component="th" scope="row">
                    {time.pauseTimeHumanized}
                  </TableCell>
                  <TableCell>{getRelative(time.pauseTime)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  )
}

export default memo(StopwatchButton)

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  title: {
    fontSize: 16,
    textAlign: 'center'
  },
  fabButton: {
    width: 50,
    height: 50,

    background: theme.palette.type === 'light' ? 'white' : '#00000061',
    boxShadow: theme.shadows[1],
    transition: 'background .2s',

    '&:hover': {
      background: theme.palette.type === 'light' ? '#d8d8d8' : '#5e5e5e'
    }
  }
}))
