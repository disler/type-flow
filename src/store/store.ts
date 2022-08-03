/**
 * Global application state
 */

import {atom} from "jotai"
import { ApplicationState, Stats, Word } from "../types"


export const subHeaderAtom = atom("Press any key to start")

// export const qqqAtom = atom(qqq)

export const countdownTimerAtom = atom(60)

export const wordsAtom = atom([] as Word[])
export const wordIndexCursorAtom = atom(0)

export const statsAtom = atom({} as Stats)
export const previousStatsAtom = atom([] as Stats[])

export const appStateAtom = atom('idle' as ApplicationState)
