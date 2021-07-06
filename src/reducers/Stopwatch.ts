import { LocalStorageKeys } from '../models/enums'

export type StopwatchActions =
  | { type: 'loadState' }
  | { type: 'stop' }
  | { type: 'start' }
  | { type: 'reset' }
  | { type: 'tick' }

export interface StopwatchState {
  running: boolean
  currentTime: number
  lastTime: number
}

const StopwatchReducer = (
  state: StopwatchState,
  action: StopwatchActions
): StopwatchState => {
  switch (action.type) {
    case 'loadState':
      return (
        JSON.parse(localStorage.getItem(LocalStorageKeys.state)) ?? { ...state }
      )
    case 'reset': {
      const newState = { running: false, currentTime: 0, lastTime: 0 }
      localStorage.setItem(LocalStorageKeys.state, JSON.stringify(newState))
      return newState
    }
    case 'start':
      return { ...state, running: true, lastTime: Date.now() }
    case 'stop': {
      const newState = {
        ...state,
        running: false
      }
      localStorage.setItem(LocalStorageKeys.state, JSON.stringify(newState))
      return newState
    }
    case 'tick': {
      if (!state.running) return state
      const newState = {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now()
      }
      localStorage.setItem(LocalStorageKeys.state, JSON.stringify(newState))
      return newState
    }
  }
}

export default StopwatchReducer
