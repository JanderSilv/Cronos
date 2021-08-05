import { memo, useState, MouseEvent } from 'react'
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

import { usePausedTimes } from '../../hooks/usePausedTimes'
import { TimerIcon } from '../../../public/assets/icons'

const getRelative = (lastTime: DateTime | string) => {
  return typeof lastTime === 'string'
    ? DateTime.fromISO(lastTime).setLocale('pt-BR').toRelative()
    : lastTime.setLocale('pt-BR').toRelative()
}
const StopwatchButton = (): JSX.Element => {
  const { pausedTimes } = usePausedTimes()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const isOpen = !!anchorEl
  const id = isOpen ? 'paused-times-popover' : undefined

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
              {pausedTimes.map(time => (
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
