import React, { useCallback, useState } from 'react'

export type ThemesTypes = 'light' | 'dark'

export interface IThemeContext {
  currentTheme: ThemesTypes
  toggleTheme: () => void
}

const ThemeContext = React.createContext<IThemeContext>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemesTypes>(
    (typeof window !== 'undefined'
      ? window.localStorage.getItem('@Cronos:app-theme')
      : 'light') as ThemesTypes
  )

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevValue => {
      const newValue = prevValue === 'light' ? 'dark' : 'light'
      if (window) window.localStorage.setItem('@Cronos:app-theme', newValue)
      return newValue
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
