import { useEffect, useReducer, useState, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon'

import StopwatchReducer, { StopwatchActions } from '../reducers/Stopwatch'
import { makeGreetings, makePhrases, parseTime } from '../utils'
import {
  SettingsButton,
  StopwatchButton,
  Display,
  Animation,
  ControlButton
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
        <StopwatchButton state={state} />
        <SettingsButton />
      </Box>
    </Box>
  )
}

export default Home
