import {useAtom} from "jotai"
import {subHeaderAtom, countdownTimerAtom} from "../store/store"

export default function useApp() {
    const [subHeader, setSubHeader] = useAtom(subHeaderAtom)
    const [countdownTimer, setCountdownTimer] = useAtom(countdownTimerAtom)




    return {
        subHeader,
        setSubHeader,
        countdownTimer, 
        setCountdownTimer,
    }
}