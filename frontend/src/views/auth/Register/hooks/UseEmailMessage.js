import { useEffect, useState } from 'react'

function useEmailMessage(interval) {

    const [emailMessage, setEmailMessage] = useState('')

    useEffect(() => {
        if (emailMessage) {
            let timeout = setTimeout(() => setEmailMessage(''), interval || 3000)
            return () => {
                clearTimeout(timeout)
            }
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailMessage])
                                              
    return [emailMessage, setEmailMessage]
}

export default useEmailMessage