import { useContext } from 'react'
import ThemeContext, {
  InfoDialogContextData
} from '../contexts/InfoDialogContext'

export const useInfoDialog = (): InfoDialogContextData => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useInfoDialog must be use within a InfoDialogProvider')
  }

  return context
}
