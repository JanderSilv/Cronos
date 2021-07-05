import { useContext } from 'react'
import ThemeContext, { IThemeContext } from '../styles/theme/context'

export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be use within a ThemeProvider')
  }

  return context
}
