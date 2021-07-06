import { useCallback, useState, memo } from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { makeStyles } from '@material-ui/core/styles'

import { useTheme } from '../../hooks/useTheme'
import { SettingsIcon, MoonIcon, SunIcon } from '../../../public/assets/icons'

const SettingsButton = (): JSX.Element => {
  const { toggleTheme, currentTheme } = useTheme()
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => setOpen(value => !value), [])

  const makeActions = useCallback(
    () => [
      {
        icon:
          currentTheme === 'dark' ? <SunIcon color="action" /> : <MoonIcon />,
        name: currentTheme === 'dark' ? 'Claro' : 'Escuro',
        action: toggleTheme
      }
    ],
    [currentTheme, toggleTheme]
  )

  return (
    <SpeedDial
      ariaLabel="configurações"
      classes={{ fab: classes.fabButton }}
      icon={<SettingsIcon color="action" />}
      onClose={handleOpen}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {makeActions().map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
          className={classes.actionButton}
        />
      ))}
    </SpeedDial>
  )
}

export default memo(SettingsButton)

const useStyles = makeStyles(theme => ({
  fabButton: {
    width: 50,
    height: 50,

    background: theme.palette.type === 'light' ? 'white' : '#00000061',
    boxShadow: theme.shadows[1],
    transition: 'background .2s',

    '&:hover': {
      background: theme.palette.type === 'light' ? '#d8d8d8' : '#5e5e5e'
    }
  },
  actionButton: {
    width: 45,
    height: 45,
    background: theme.palette.type === 'light' ? 'white' : '#00000061',
    boxShadow: theme.shadows[1],

    '& svg': {
      width: '100%',
      maxWidth: 24,
      height: 'auto'
    }
  }
}))
