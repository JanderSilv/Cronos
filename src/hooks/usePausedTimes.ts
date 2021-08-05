import { useContext } from 'react'
import ThemeContext, {
  PausedTimesContextData
} from '../contexts/PausedTimesContext'

export function usePausedTimes(): PausedTimesContextData {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('usePausedTimes must be use within a PausedTimesProvider')
  }

  return context
}
