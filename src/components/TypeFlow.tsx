import useWords from "../hooks/useWords";
import { WordComponent } from "./WordComponent";
import "../TypeFlow.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyPressType } from "../types";
import { useAtom } from "jotai";
import { wordsAtom } from "../store/store";
import useApp from "../hooks/useApp";
import { DEFAULT_SECONDS } from "../modules/defaults";
import useStats from "../hooks/useStats";

export const TypeFlow = () => {

    // ------- STATE ----------

    const {words, setWords, processKeyboardInput, generateWords, wordIndexCursor, resetWords} = useWords()
    const {subHeader, setSubHeader, } = useApp() 
    const {resetStats, stats} = useStats()

    const typeflowRef = useRef<HTMLDivElement>(null)

    let interval: any = null;
    const [timer, setTimer] = useState(DEFAULT_SECONDS);
    const [firstKeyPress, setFirstKeyPress] = useState(false);
    const [complete, setComplete] = useState(false);


    // ------- METHODS ----------


    const decrementTime = () => {
        interval = !interval && setInterval(() => {
            setTimer(timer => {

                if (timer === 0) {
                    setFirstKeyPress(false)
                    setSubHeader("COMPLETE!")
                    setTimer(DEFAULT_SECONDS)
                    clearInterval(interval)
                    setComplete(true)
                }
                return Math.max(timer - 1, 0)
            })

        }, 1000)
    }


    const keyPressed = (e: KeyboardEvent) => {
        if (complete === true) {
            return
        }
        if (firstKeyPress === false) {
            setFirstKeyPress(true)
            setComplete(false)
            console.log(`set key to true`)
        }
        processKeyboardInput(e)
    }

    const playAgain = () => {
        setComplete(false)
        setFirstKeyPress(false)
        setTimer(DEFAULT_SECONDS)
        resetWords()
        setSubHeader("Type any key to start")
        resetStats()
    }


    // ------- EFFECTS ----------


    useEffect(() => {
        generateWords()
        resetStats()
    }, []);

    useEffect(() => {
        window.addEventListener("keyup", keyPressed)

        return () => {
            window.removeEventListener("keyup", keyPressed)
        }
    }, [words, wordIndexCursor]);

    useEffect(() => {
        
        if (firstKeyPress === true) {
            setSubHeader("")
            decrementTime()
        }

        return () => {
            clearInterval(interval)
        }

    }, [firstKeyPress]);

    if (!words.length) {
        return <div></div>
    }

    return (
        <>
            <h2>{subHeader || timer }</h2>
            {complete && (
                <div className="complete-w">
                    <h2>Stats</h2>
                    <div>WPM: {stats.totalWords }</div>
                    <div>Mistakes: {stats.numberOfMistakes}</div>
                    <div>Correct Words: {stats.correctWordCount}</div>
                    <button onClick={(e) => {playAgain()}}>Play again</button>
                </div>
            )}
            <div className="typeflow-w" ref={typeflowRef}>
                {words.map((word, index) => {
                    return <WordComponent key={index} word={word} />
                })}
            </div>
           
        </>
    );
}