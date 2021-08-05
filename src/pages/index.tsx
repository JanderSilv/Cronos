import { useEffect, useReducer, useState, useCallback } from 'react'
import Head from 'next/head'

import { Box, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'

import StopwatchReducer, { StopwatchActions } from '../reducers/Stopwatch'
import { makeGreetings, makePhrases, parseTime } from '../utils'
import {
  SettingsButton,
  StopwatchButton,
  Display,
  ControlButton,
  Header
} from '../components'
import useStyles from '../styles/pages'

const Home = (): JSX.Element => {
  const classes = useStyles()

  const [dateNow, setDateNow] = useState(DateTime.now())
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0
  })

  useEffect(() => {
    const loadState = () => dispatch({ type: 'loadState' })
    loadState()
  }, [])

  useEffect(() => {
    let frame: number
    const tick = () => {
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

      <Header dateNow={dateNow} greetings={greetings} running={state.running} />

      <Box component="section" className={classes.watchWrapper}>
        <Box className={classes.watchContainer}>
          <Display time={time} />
          <Box className={classes.controlButtonsContainer}>
            <ControlButton handler={handler} status={state.running} />
          </Box>
        </Box>
        <Typography id="phrase">
          {makePhrases(greetings, state.running, dateNow.hour, dateNow.minute)}
        </Typography>
      </Box>

      <Box component="section" className={classes.buttonsContainer}>
        <StopwatchButton state={state} />
        <SettingsButton />
      </Box>
    </Box>
  )
}

export default Home
