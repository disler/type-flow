/**
 * Handle word management
 */

import {WORD_BANK, TOTAL_WORDS_TO_GENERATE} from "../modules/defaults"
import {useAtom} from "jotai"
import {wordIndexCursorAtom, wordsAtom} from "../store/store"
import { KeyPressType, Letter, LetterState, Word, WordState } from "../types"
import { getRandomFromList } from "../modules/random"
import { useEffect } from "react"

function generateNewWord(word: string, index: number): Word {
    
    const letters: Letter[] = word.split("").map((letter, i) => ({
        letter,
        state: "idle"
    }))

    return {
        index,
        word,
        state: 'idle',
        letters,
        letterIndexCursor: 0
    }
}

function atEndOfWord(word: Word): boolean {
    return word.letterIndexCursor >= word.letters.length - 1
}

function atBeginningOfWord(word: Word): boolean {
    return word.letterIndexCursor === 0
}


export default function useWords() {

    const [words, setWords] = useAtom(wordsAtom)
    const [wordIndexCursor, setWordIndexCursor] = useAtom(wordIndexCursorAtom)
    
    function generateWords(): void {
        console.log(`GENERATE NEW WORDS`)

        let newWordList = []

        for (let i = 0; i < TOTAL_WORDS_TO_GENERATE; i++) {
            let randomWord = getRandomFromList(WORD_BANK)
            const newWord: Word = generateNewWord(randomWord, i)
            newWordList.push(newWord)
        }

        newWordList[0].state = "focused"
        newWordList[0].letters[0].state = "focused"

        setWords(newWordList)
    }

    function handleBackspaceInput(): void {

        const word = words[wordIndexCursor]

        if (wordIndexCursor === 0 && word.letterIndexCursor === 0) {
            return
        }

        // if at beginning of word, move back to previous word and set
        if (atBeginningOfWord(word)) {

            const previousWordIndex = wordIndexCursor - 1
            const previousWord = words[previousWordIndex]

            const updatedWords: Word[] = words.map((word, i) => {

                if (i === wordIndexCursor) {
                    const idleLetters: Letter[] = word.letters.map((letter, i) => ({...letter, state: "idle"}))
                    return {
                        ...word,
                        letters: idleLetters,
                        state: "idle",
                    }
                }

                if (i === previousWordIndex) {
                    const updatedLetters: Letter[] = word.letters.map((letter, i) => {
                        if (i === previousWord.letterIndexCursor) {
                            return {
                                ...letter,
                                state: "focused"
                            }
                        }
                        return letter
                    })

                    return {
                        ...word,
                        letters: updatedLetters,
                        state: "focused",
                    }
                }
                return word
            })

            setWords(updatedWords)

            setWordIndexCursor(previousWordIndex)

            return
        }
        else {

            // reset current letter to idle
            let updatedWord = updateLetterState(word, word.letterIndexCursor, "idle")

            const previousLetterIndex = updatedWord.letterIndexCursor - 1

            // move to previous letter
            updatedWord = moveCurrentLetterIndexCursor(updatedWord, previousLetterIndex)

            // set previous letter to focused
            updateLetterState(updatedWord, previousLetterIndex, 'focused')

        }

        // qqq go back and invalidate previous letter and (possibly previous word)?
        
        return
    }

    function handleSpaceInput(): void {

        const currentWord = words[wordIndexCursor]

        console.log(`currentWord`, currentWord)

        console.log(`atEndOfWord(currentWord`, atEndOfWord(currentWord))
        
        if (atEndOfWord(currentWord)) {
            console.log(`currentWord`, currentWord)

            const newWordIndexCursor = wordIndexCursor + 1

            const isValid = currentWord.letters.every(letter => letter.state === "valid")

            const updatedWords: Word[] = words.map(w => {
                if (w.index === currentWord.index) {
                    return {
                        ...w,
                        state: isValid ? "valid" : "invalid"
                    }
                }
                if (w.index === currentWord.index + 1) {
                    const updatedLetters: Letter[] = w.letters.map((_letter, ltrIndex) => {
                        if (ltrIndex === 0) {
                            return {
                                ..._letter,
                                state: "focused"
                            }
                        }
                        return _letter
                    })
                    return {
                        ...w,
                        letters: updatedLetters,
                        state: "idle"
                    }
                }
                return w
            })

            setWords(updatedWords)

            setWordIndexCursor(newWordIndexCursor)

            return
        }
        
        updateWordIdxAndLetter(currentWord, 'invalid', true)

        incrementMistake()
    }

    function incrementMistake(): void {
        
    }

    function moveCurrentLetterIndexCursor(word: Word, newIndexCursor: number): Word {

        const updatedWord = {
            ...word,
            letterIndexCursor: newIndexCursor
        }

        const updatedWords = words.map(_word => {
            if (_word.index === word.index) {
                return updatedWord
            }
            return _word
        })

        setWords(updatedWords)

        return updatedWord
    }

    function handleLetterInput(letter: string): void {

        const currentWord = words[wordIndexCursor]

        if (currentWord.letterIndexCursor === currentWord.letters.length) {
            incrementMistake()
            return
        }


        const currentLetter = currentWord.letters[currentWord.letterIndexCursor]

        const newLetterState = currentLetter.letter !== letter ? "invalid" : "valid"

        if (newLetterState === "invalid") {
            incrementMistake()
        }

        let updatedWord = updateWordIdxAndLetter(currentWord, newLetterState, true)


        // if the word is complete, validate the word, increment the word cursor
        if (updatedWord.letterIndexCursor === updatedWord.letters.length) {
            
            // const validated = validateWord(updatedWord)
            // if (validated) {
                // updateWordIdxAndLetter(currentWord, newLetterState, false)
            // }
        }
    }

    function validateWord(word: Word): boolean {
        const isValid = word.letters.every(letter => letter.state === "valid")

        const updatedWords: Word[] = words.map(w => {
            if (w.index === word.index) {
                return {
                    ...w,
                    state: isValid ? "valid" : "invalid"
                }
            }
            return w
        })

        setWords(updatedWords)

        return isValid
    }

    function updateLetterState(word: Word, letterIndex: number, letterState: LetterState): Word {

        const updatedWord: Word = {
            ...word,
            letters: word.letters.map((letter, i) => {
                if (i === letterIndex) {
                    return {
                        ...letter,
                        state: letterState
                    }
                }
                return letter
            })
        }

        const updatedWords = words.map(w => {
            if (w.index === word.index) {
                return updatedWord
            }
            return w
        })

        setWords(updatedWords)

        return updatedWord
        
    }

    function updateWordIdxAndLetter(word: Word, letterState: LetterState, incr: boolean): Word {

        const updatedWord: Word = {
            ...word,
            letterIndexCursor: incr ? word.letterIndexCursor + 1: word.letterIndexCursor,
            letters: word.letters.map((letter, i) => {
                if (i === word.letterIndexCursor) {
                    return {
                        ...letter,
                        state: letterState
                    }
                }
                if (i === word.letterIndexCursor + 1) {
                    return {
                        ...letter,
                        state: "focused"
                    }
                }
                return letter
            })
        }

        const updatedWords = words.map(w => {
            if (w.index === word.index) {
                return updatedWord
            }
            return w
        })

        setWords(updatedWords)

        return updatedWord
    }

    function processKeyboardInput(e: KeyboardEvent): void {
        
        const key = e.key

        const isLetterKey = key.length === 1 && key.match(/[a-z]/i)
        const isSpace = key === " "
        const isBackspace = key === "Backspace"

        const keyPressType: KeyPressType = isLetterKey ? "letter" : isSpace ? "space" : isBackspace ? "backspace" : "other"

        console.log(`key`, key)
        console.log(`keyPressType`, keyPressType)

        if (keyPressType === 'other') {
            return
        }
        if (keyPressType === 'backspace') {
            handleBackspaceInput()
            return
        }
        if (keyPressType === 'space') {
            e.preventDefault()
            handleSpaceInput()
            return
        }
        if (keyPressType === 'letter') {
            handleLetterInput(key)
            return
        }
    }

    return {
        generateWords,
        words,
        processKeyboardInput,
        wordIndexCursor,
        setWords,
    }
}