import { useDispatch, useSelector } from "react-redux"
import { setBookingID, toggleCancelServiceDialog, toggleCompleteServiceDialog, toggleStartServiceDialog } from "../store/stateSlice";
import UnansweredChats from "./UnansweredChats";
import Stats from "./Stats";
import appConfig from "@/configs/app.config";
import Bookings from "@/views/requests/components/Bookings";
import BillsComponent from "@/views/payments/components/Bills/BillsComponent";

const DashboardFeed = () => {
    const dispatch = useDispatch();
    const { imagePath } = appConfig
    const { enquiries, bookings, bookingsCount, booking, completingService, confirmingService } = useSelector((state) => state.dashboard.data)
    const { bookingID } = useSelector((state) => state.dashboard.state)
    const { profile, userType } = useSelector((state) => state.auth.user)
    const isProvider = userType === "Provider" ? true : false

    const chatsData = enquiries?.filter((chat) => {
        return chat.messages.every((item) => item.sender_id !== profile?.id)
    })
    console.log(chatsData);

    const onComplete = (booking) => {
        dispatch(toggleCompleteServiceDialog(true))
        dispatch(setBookingID(booking?.id))
    }

    const onStart = (booking) => {
        dispatch(toggleStartServiceDialog(true));
        dispatch(setBookingID(booking?.id));
    }

    const onCancel = (booking) => {
        dispatch(toggleCancelServiceDialog(true));
        dispatch(setBookingID(booking?.id));
    }
    
    return (
        <div>
            <h4>Active Bookings</h4>

            <div className="mt-4 mb-4">
                <Bookings 
                    imagePath={imagePath}
                    bookings={bookings}
                    isProvider={isProvider}
                    booking={booking} 
                    completingService={completingService}   
                    confirmingService={confirmingService}
                    bookingID={bookingID}
                    onComplete={onComplete}
                    onStart={onStart}
                    onCancel={onCancel}
                />
            </div>

            <h4>Unanswered Request Chats</h4>

            <div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
                <UnansweredChats
                    data={chatsData} 
                    imagePath={imagePath}
                />
            </div>

            <div className="mt-4 mb-4 w-full flex items-center gap-4 overflow-auto pb-4">
                <Stats 
                    bookingsCount={bookingsCount}
                    profile={profile}
                />
            </div>

            <BillsComponent />
        </div>
    )
}
export default DashboardFeed