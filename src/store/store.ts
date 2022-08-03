/**
 * Global application state
 */

import {atom} from "jotai"
import { DEFAULT_SECONDS } from "../modules/defaults"
import { ApplicationState, Stats, Word } from "../types"


export const subHeaderAtom = atom("Press any key to start")
export const firstKeyPressAtom = atom(false)

// export const qqqAtom = atom(qqq)

export const countdownTimerAtom = atom(DEFAULT_SECONDS)

export const wordsAtom = atom([] as Word[])
export const wordIndexCursorAtom = atom(0)

export const statsAtom = atom({} as Stats)

export const appStateAtom = atom('idle' as ApplicationState)
