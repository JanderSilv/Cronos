import { useState } from 'react'
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

export type TypeTime = { s: number; m: number; h: number }

const Home = (): JSX.Element => {
  const classes = useStyles()

  const [time, setTime] = useState({ s: 40, m: 20, h: 10 })
  const [interval, setWatchInterval] = useState<NodeJS.Timeout>()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  // stopped = 2

  const dateNow = DateTime.now()
  const greetings = () => makeGreetings(dateNow.hour, dateNow.minute)

  const start = () => {
    clearInterval(interval)
    run()
    setStatus(1)
    setWatchInterval(setInterval(run, 1000))
  }

  let updatedS = time.s
  let updatedM = time.m
  let updatedH = time.h

  const run = () => {
    if (updatedM > 59) {
      updatedM = 0
      updatedH++
    }
    if (updatedS > 59) {
      updatedS = 0
      updatedM++
    }

    updatedS++
    return setTime({ s: updatedS, m: updatedM, h: updatedH })
  }

  const rerun = () => {
    if (updatedH !== 0) updatedH--
    if (updatedM !== 0) updatedM--
    if (updatedS !== 0) updatedS--
    return setTime({ s: updatedS, m: updatedM, h: updatedH })
  }

  const stop = () => {
    clearInterval(interval)
    setStatus(2)
  }

  const reset = () => {
    clearInterval(interval)
    rerun()
    setStatus(0)
    setWatchInterval(setInterval(rerun, 1))
  }

  const resume = () => start()

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
            <Typography>{greetings()}, Jander</Typography>
            <Typography>
              São {dateNow.toLocaleString(DateTime.TIME_24_SIMPLE)} horas.
            </Typography>
          </Box>
          <Animation period={greetings()} status={status} />
        </Box>
      </Box>

      <Box component="section" className={classes.watchWrapper}>
        <Box className={classes.watchContainer}>
          <Display time={time} />
          <Box className={classes.controlButtonsContainer}>
            <ControlButton
              start={start}
              stop={stop}
              resume={resume}
              reset={reset}
              status={status}
            />
          </Box>
        </Box>
        <Typography>
          {makePhrases(greetings(), status, dateNow.hour, dateNow.minute)}
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
