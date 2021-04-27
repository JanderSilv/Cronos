import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SettingsButton from '../components/SettingsButton'
// import Grid from '@material-ui/core/Grid'
import useStyles from '../styles/pages'

const Home = () => {
  const classes = useStyles()

  return (
    <Box component="main" className={classes.container}>
      <Head>
        <title>Cronos</title>
      </Head>
      <Box component="header" className={classes.header}>
        <Box component="figure">{/* img */}</Box>
        <Box component="section" className={classes.headerGreetings}>
          <Box>
            <Typography>Boa Tarde, Jander</Typography>
            <Typography>Agora, são 17:24 horas</Typography>
          </Box>
          {/* animation */}
        </Box>
      </Box>

      <Box component="section">
        <Box>{/* watch */}</Box>
        <Typography>Vamos começar, tenha um bom dia de trabalho</Typography>
      </Box>

      <Box component="section" className={classes.buttonsContainer}>
        <SettingsButton />
        <SettingsButton />
      </Box>
    </Box>
  )
}

export default Home
