import { useEffect, useReducer, useState, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon'

import { useTheme } from '../hooks/useTheme'
import StopwatchReducer, { StopwatchActions } from '../reducers/Stopwatch'
import { LocalStorageKeys } from '../models/enums'
import { makeGreetings, makePhrases, parseTime } from '../utils'
import {
  SettingsButton,
  StopwatchButton,
  Display,
  Animation,
  ControlButton,
  NameDialog
} from '../components'
import useStyles from '../styles/pages'

const Home = (): JSX.Element => {
  const { currentTheme } = useTheme()
  const classes = useStyles()

  const [nameState, setNameState] = useState({ name: '', isOpen: false })
  const [dateNow, setDateNow] = useState(DateTime.now())
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0
  })

  useEffect(() => {
    const loadState = () => dispatch({ type: 'loadState' })
    const getName = () => {
      const name = localStorage.getItem('@Cronos:name')
      setNameState({
        name,
        isOpen: !name
      })
    }

    getName()
    loadState()
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKeys.state, JSON.stringify(state))
  }, [state])

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

  const handleChangeName = useCallback(
    (name: string) =>
      setNameState({
        name,
        isOpen: false
      }),
    []
  )

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
            src={
              currentTheme === 'light'
                ? '/assets/logo/Cronos.png'
                : '/assets/logo/Cronos_White.png'
            }
            width="131"
            height="80"
            alt="Logo do Cronos"
            draggable="false"
          />
        </Box>
        <Box component="section" className={classes.headerGreetings}>
          <Box>
            <Typography>
              {greetings}, {nameState.name}
            </Typography>
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

      <NameDialog
        isOpen={nameState.isOpen}
        handleChangeName={handleChangeName}
      />
    </Box>
  )
}

export default Home
