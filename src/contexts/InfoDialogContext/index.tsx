import React, { createContext, useCallback, useState } from 'react'
import Image from 'next/image'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Dialog,
  Grid,
  Link,
  Typography,
  SvgIcon
} from '@material-ui/core'
import clsx from 'clsx'

import { useTheme } from '../../hooks/useTheme'
import {
  CloseIcon,
  GitHubIcon,
  LinkedInIcon
} from '../../../public/assets/icons'
import useStyles from './styles'

export interface InfoDialogContextData {
  isOpen: boolean
  handleOpen: () => void
  handleClose: () => void
}

const InfoDialogContext = createContext({} as InfoDialogContextData)

export const InfoDialogProvider: React.FC = ({ children }) => {
  const { currentTheme } = useTheme()
  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const [showCopied, setShowCopied] = useState(false)

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleCopyKey = () => {
    setShowCopied(true)
    navigator.clipboard.writeText('jander.silv@outlook.com')
    setTimeout(() => setShowCopied(false), 5000)
  }

  return (
    <InfoDialogContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialog }}
      >
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <Box component="picture" className={classes.logo}>
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

        <Grid container component="article">
          <Grid item xs={12} component="section">
            <Box className={classes.infoContainer}>
              <Avatar
                src="https://avatars.githubusercontent.com/u/42092038?v=4"
                alt="Minha foto de perfil do Github"
                draggable="false"
                className={classes.avatar}
              />

              <Box>
                <Link
                  href="https://github.com/JanderSilv"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <GitHubIcon />
                  <Typography>JanderSilv</Typography>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/jander-silva-267909184/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: '1rem' }}
                  className={classes.link}
                >
                  <LinkedInIcon />
                  <Typography>Jander Silva</Typography>
                </Link>
              </Box>
            </Box>

            <Box className={classes.buyMeACoffee}>
              <Typography>
                O Cronos foi útil para você?
                <br />
                Considere me comprar um café!
              </Typography>
              <Button
                variant="contained"
                startIcon={
                  !showCopied ? (
                    <SvgIcon>
                      <svg
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs />
                        <g fill="#4BB8A9" fillRule="evenodd">
                          <path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z" />
                          <path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868" />
                        </g>
                      </svg>
                    </SvgIcon>
                  ) : null
                }
                onClick={handleCopyKey}
                className={clsx(classes.button, {
                  [classes.buttonSuccess]: showCopied
                })}
              >
                {!showCopied ? 'Minha chave Pix' : 'Chave Pix copiada'}
              </Button>
            </Box>
          </Grid>
          {/* <Grid item xs={5} component="section"></Grid> */}
        </Grid>
      </Dialog>
    </InfoDialogContext.Provider>
  )
}

export default InfoDialogContext
