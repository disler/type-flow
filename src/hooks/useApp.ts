import {useAtom} from "jotai"
import {subHeaderAtom, countdownTimerAtom, firstKeyPressAtom} from "../store/store"

export default function useApp() {
    const [subHeader, setSubHeader] = useAtom(subHeaderAtom)
    const [firstKeyPress, setFirstKeyPress] = useAtom(firstKeyPressAtom)


    return {
        subHeader,
        setSubHeader,
        firstKeyPress,
        setFirstKeyPress
    }
}