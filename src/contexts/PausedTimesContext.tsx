import React, { createContext, useCallback, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { LocalStorageKeys } from '../models/enums'
import { StopwatchState } from '../reducers/Stopwatch'

type Time = {
  pauseTime: DateTime
  pauseTimeHumanized: string
}

export interface PausedTimesContextData {
  pausedTimes: Time[]
  handleSaveTime: (state: StopwatchState) => void
  resetPausedTimes: () => void
}

const createTime = (pauseTime: DateTime, pauseTimeHumanized: string) => ({
  pauseTime,
  pauseTimeHumanized
})

const PausedTimesContext = createContext({} as PausedTimesContextData)

export const PausedTimesProvider: React.FC = ({ children }) => {
  const [pausedTimes, setTimes] = useState<Time[]>([])

  useEffect(() => {
    const getStoredTimes = () => {
      const times = JSON.parse(localStorage.getItem(LocalStorageKeys.stopTimes))
      if (times) setTimes(times)
    }
    getStoredTimes()
  }, [])

  const handleSaveTime = useCallback((state: StopwatchState) => {
    const timeFromMillis = DateTime.fromMillis(state.lastTime)
    setTimes(prevValues => {
      const newValue = [
        createTime(
          timeFromMillis,
          timeFromMillis.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
        ),
        ...prevValues
      ]
      localStorage.setItem(LocalStorageKeys.stopTimes, JSON.stringify(newValue))
      return newValue
    })
  }, [])

  const resetPausedTimes = useCallback(() => {
    setTimes([])
    localStorage.removeItem(LocalStorageKeys.stopTimes)
  }, [])

  return (
    <PausedTimesContext.Provider
      value={{ pausedTimes, handleSaveTime, resetPausedTimes }}
    >
      {children}
    </PausedTimesContext.Provider>
  )
}

export default PausedTimesContext
