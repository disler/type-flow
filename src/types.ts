
export type ApplicationState = 'idle' | 'typing' | 'reviewing'
export type LetterState = 'idle' | 'valid' | 'invalid' | 'focused'
export type WordState = 'idle' | 'valid' | 'invalid' | 'focused'

export type KeyPressType = 'letter' | 'backspace' | 'space' | 'other'

export interface Letter {
    letter: string
    state: LetterState
}

export interface Word {
    index: number
    word: string
    state: WordState
    letters: Letter[]
    letterIndexCursor: number
}

export interface Stats {
    wordsPerMinute: number;
    numberOfMistakes: number;
    correctWordCount: number;
    totalWords: number;
}