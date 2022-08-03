import useWords from "../hooks/useWords";
import { WordComponent } from "./WordComponent";
import "../TypeFlow.css"
import { useCallback, useEffect, useRef } from "react";
import { KeyPressType } from "../types";
import { useAtom } from "jotai";
import { wordsAtom } from "../store/store";

export const TypeFlow = () => {

    const {words, setWords, processKeyboardInput, generateWords, wordIndexCursor} = useWords()
    

    const typeflowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        generateWords()
    }, []);

    useEffect(() => {
        window.addEventListener("keyup", keyPressed)

        return () => {
            window.removeEventListener("keyup", keyPressed)
        }
    }, [words, wordIndexCursor]);

    useEffect(() => {
        setInterval
    }, []);


    const keyPressed = (e: KeyboardEvent) => {
        processKeyboardInput(e)
    }

    if (!words.length) {
        return <div></div>
    }

    return (
        <>
            <div className="typeflow-w" ref={typeflowRef}>
                {words.map((word, index) => {
                    return <WordComponent key={index} word={word} />
                })}
            </div>
        </>
    );
}