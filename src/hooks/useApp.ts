import {useAtom} from "jotai"
import {subHeaderAtom} from "../store/store"

export default function useApp() {
    const [subHeader, setSubHeader] = useAtom(subHeaderAtom)



    return {
        subHeader,
        setSubHeader
    }
}