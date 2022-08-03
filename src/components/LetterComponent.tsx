import { memo, useMemo } from "react";
import { Letter } from "../types";

export type Props = {
    letter: Letter
}
export const LetterComponent = memo(({letter}: Props) => {

    const classes = useMemo(() => [
        "letter-w",
        letter.state === "focused" ? "letter-focused" : "",
        letter.state === "invalid" ? "letter-invalid" : "",
        letter.state === "valid" ? "letter-valid" : "",

    ].join(" "), [letter])

    return (
        <span className={classes}>
            {letter.letter}
        </span>
    );
})