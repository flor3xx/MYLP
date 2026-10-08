import { createContext, type Dispatch } from 'react'
import type { Preferences, PreferencesAction, PreferencesActions } from './preferences'

type BoundPreferencesActions = {
  [K in keyof PreferencesActions]: PreferencesActions[K] extends (
    ...args: infer P
  ) => PreferencesAction
    ? (...args: P) => void
    : PreferencesActions[K]
}

export type PreferencesContextValue = {
  preferences: Preferences
  dispatch: Dispatch<PreferencesAction>
  actions: BoundPreferencesActions
} & BoundPreferencesActions

export const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined,
)
