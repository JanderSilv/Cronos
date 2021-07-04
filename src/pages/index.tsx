import { useEffect, useReducer, useState, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SettingsButton from '../components/SettingsButton'
import StopwatchButton from '../components/StopwatchButton'

import { DateTime } from 'luxon'
import useStyles from '../styles/pages'
import Display from '../components/Display'
import ControlButton from '../components/ControlButton'
import makeGreetings from '../utils/functions/makeGreetings'
import makePhrases from '../utils/functions/makePhrases'
import Animation from '../components/Animation'

export interface Time {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

interface StopwatchState {
  running: boolean
  currentTime: number
  lastTime: number
}
export type StopwatchActions =
  | { type: 'stop' }
  | { type: 'start' }
  | { type: 'reset' }
  | { type: 'tick' }

function StopwatchReducer(
  state: StopwatchState,
  action: StopwatchActions
): StopwatchState {
  switch (action.type) {
    case 'reset':
      return { running: false, currentTime: 0, lastTime: 0 }
    case 'start':
      return { ...state, running: true, lastTime: Date.now() }
    case 'stop':
      return { ...state, running: false }
    case 'tick':
      if (!state.running) return state
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now()
      }
  }
}
function parseTime(
  time: number
): { hours: number; minutes: number; seconds: number; milliseconds: number } {
  const date = new Date(time)
  const hours = date.getHours() + date.getTimezoneOffset() / 60 - 24
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  return {
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

const Home = (): JSX.Element => {
  const classes = useStyles()

  const [dateNow, setDateNow] = useState(DateTime.now())
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0
  })

  useEffect(() => {
    let frame: number
    function tick() {
      dispatch({ type: 'tick' })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDateNow(DateTime.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const greetings = makeGreetings(dateNow.hour, dateNow.minute)
  const time = parseTime(state.currentTime)

  const handler = useCallback(
    (action: StopwatchActions) => dispatch(action),
    []
  )

  return (
    <Box component="main" className={classes.container}>
      <Head>
        <title>Cronos</title>
      </Head>
      <Box component="header" className={classes.header}>
        <Box component="figure">
          <Image
            src="/assets/logo/Cronos.png"
            width="131"
            height="80"
            alt="Logo do Cronos"
            draggable="false"
          />
        </Box>
        <Box component="section" className={classes.headerGreetings}>
          <Box>
            <Typography>{greetings}, Jander</Typography>
            <Typography>
              São <span>{dateNow.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
              .
            </Typography>
          </Box>
          <Animation period={greetings} status={state.running} />
        </Box>
      </Box>

      <Box component="section" className={classes.watchWrapper}>
        <Box className={classes.watchContainer}>
          <Display time={time} />
          <Box className={classes.controlButtonsContainer}>
            <ControlButton handler={handler} status={state.running} />
          </Box>
        </Box>
        <Typography>
          {makePhrases(greetings, state.running, dateNow.hour, dateNow.minute)}
        </Typography>
      </Box>

      <Box component="section" className={classes.buttonsContainer}>
        <StopwatchButton />
        <SettingsButton />
      </Box>
    </Box>
  )
}

export default Home
