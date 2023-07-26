import { useEffect, useState } from 'react'

function useTimeOutStatus(interval) {

    const [checkMessage, setCheckMessage] = useState('')

    useEffect(() => {
        if (checkMessage) {
            let timeout = setTimeout(() => setCheckMessage(''), interval || 3000)
            return () => {
                clearTimeout(timeout)
            }
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkMessage])
                                              
    return [checkMessage, setCheckMessage]
}

export default useTimeOutStatus