import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import { ThemesTypes } from './context'
import lightTheme from './lightTheme'
import darkTheme from './darkTheme'

const themes: { [key in ThemesTypes]: ReturnType<typeof createMuiTheme> } = {
  light: createMuiTheme(lightTheme),
  dark: createMuiTheme(darkTheme)
}

export default themes
