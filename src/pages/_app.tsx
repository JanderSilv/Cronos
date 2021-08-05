import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { PausedTimesProvider } from '../contexts/PausedTimesContext'
import themes from '../styles/theme'
import ThemeControlContext, {
  ThemeProvider as ThemeControlProvider
} from '../styles/theme/context'
import GlobalCss from '../styles/global'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeControlProvider>
      <ThemeControlContext.Consumer>
        {({ currentTheme }) => (
          <ThemeProvider theme={themes[currentTheme] || themes.light}>
            <PausedTimesProvider>
              <Component {...pageProps} />
              <CssBaseline />
              <GlobalCss />
            </PausedTimesProvider>
          </ThemeProvider>
        )}
      </ThemeControlContext.Consumer>
    </ThemeControlProvider>
  )
}

export default MyApp
