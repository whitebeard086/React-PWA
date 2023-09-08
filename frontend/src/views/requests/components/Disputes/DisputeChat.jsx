import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { getDispute, setDisputeStatus } from "../../store/dataSlice"
import ChatBar from "./chat/ChatBar"
import Messages from "./chat/Messages"
import { Loading } from "@/components/shared"
import MessageBox from "./chat/MessageBox"

const DisputeChat = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const DUID = location.pathname.split('/')[3]

    const { disputeStatus, gettingDispute } = useSelector((state) => state.requests.data)

    useEffect(() => {
        dispatch(getDispute({ DUID }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (disputeStatus !== 'idle') {
            dispatch(setDisputeStatus('idle'));
        }
    }, [dispatch, disputeStatus])

    return (
        <div className="relative min-h-[72vh]">
            {gettingDispute ? (
                <div className="min-h-[70vh] flex justify-center items-center">
                    <Loading loading={true} />
                </div>
            ):(
                <div>
                    <ChatBar />

                    <div className="p-4">
                        <div className="mb-14 min-h-[50vh]">
                            <Messages />
                        </div>
                    </div>

                    <div className="sticky w-full min-w-full p-4 pb-5 bg-white max-w-2xl bottom-[5rem] border-b-2">
                        <MessageBox />
                    </div>
                </div>
            )}
        </div>
    )
}
export default DisputeChat