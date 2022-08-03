/**
 * handles statistic state management 
 */
import {useAtom} from "jotai"
import {statsAtom} from "../store/store"
 
export default function useStats() {

    const [stats, setStats] = useAtom(statsAtom)

    function addMistake(): void {
        setStats({
            ...stats,
            numberOfMistakes: stats.numberOfMistakes + 1
        })
    }

    function addCorrectWord(): void {
        setStats({
            ...stats,
            correctWordCount: stats.correctWordCount + 1,
            totalWords: stats.totalWords + 1
        })
    }

    function addTotalWords(): void {
        setStats({
            ...stats,
            totalWords: stats.totalWords + 1
        })
    }

    function resetStats(): void {
        setStats({
            correctWordCount: 0,
            numberOfMistakes: 0,
            wordsPerMinute: 0,
            totalWords: 0
        })
    }

    return {
        addMistake,
        addCorrectWord,
        resetStats,
        stats,
        addTotalWords,
    }
}