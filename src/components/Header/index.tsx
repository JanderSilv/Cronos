import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import { Box, Typography, Hidden } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { DateTime } from 'luxon'

import { Greetings } from '../../models/enums'
import { useTheme } from '../../hooks/useTheme'
import { Animation, NameDialog } from '../index'

interface Props {
  greetings: Greetings
  dateNow: DateTime
  running: boolean
}

const Header = (props: Props): JSX.Element => {
  const { greetings, dateNow, running } = props
  const { currentTheme } = useTheme()
  const classes = useStyles()

  const [nameState, setNameState] = useState({ name: '', isOpen: false })

  useEffect(() => {
    const getName = () => {
      const name = localStorage.getItem('@Cronos:name')
      setNameState({
        name,
        isOpen: !name
      })
    }

    getName()
  }, [])

  const handleChangeName = useCallback(
    (name: string) =>
      setNameState({
        name,
        isOpen: false
      }),
    []
  )

  return (
    <>
      <Box component="header" className={classes.header}>
        <Box className={classes.container}>
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
            <Hidden xsDown>
              <Box>
                <Typography>
                  {greetings}, {nameState.name}
                </Typography>
                <Typography>
                  São{' '}
                  <span>{dateNow.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
                </Typography>
              </Box>
            </Hidden>
            <Animation period={greetings} status={running} />
          </Box>
        </Box>
        <Hidden smUp>
          <Box width="100%">
            <Typography>
              {greetings}, {nameState.name}
            </Typography>
            <Typography>
              São{' '}
              <span style={{ fontWeight: 'bold' }}>
                {dateNow.toLocaleString(DateTime.TIME_24_SIMPLE)}
              </span>
            </Typography>
          </Box>
        </Hidden>
      </Box>
      <NameDialog
        isOpen={nameState.isOpen}
        handleChangeName={handleChangeName}
      />
    </>
  )
}

export default Header

const useStyles = makeStyles(theme => ({
  header: {
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerGreetings: {
    display: 'flex',
    alignItems: 'center',

    '& span': {
      fontWeight: theme.typography.fontWeightBold
    }
  }
}))
