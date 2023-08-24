import { useEffect, useState } from "react"

const useTaskitly = (amount) => {
    const [taskitlyCut, setTaskitlyCut] = useState(0)
    const [userCut, setUserCut] = useState(0)

    useEffect(() => {
        setTaskitlyCut(amount * 0.05);
        setUserCut(amount * 0.95);
      }, [amount]);

    return [taskitlyCut, userCut]
}
export default useTaskitly