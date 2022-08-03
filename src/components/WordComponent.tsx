import { memo, useMemo } from "react";
import { Word } from "../types";
import { LetterComponent } from "./LetterComponent";

export type Props = {
    word: Word
}
export const WordComponent = memo(({word}: Props) => {

    const classes = useMemo(() => [
        "word-w",
        word.state === "focused" ? "word-focused" : "",
        word.state === "invalid" ? "word-invalid" : "",
        word.state === "valid" ? "word-valid" : "",
    ].join(" "), [word])

    return (
        <span className={classes}>
            {word.letters.map((letter, index) => (
                <LetterComponent key={index} letter={letter} />
            ))}
        </span>
    );
})