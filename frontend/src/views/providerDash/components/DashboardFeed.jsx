import appConfig from '@/configs/app.config';
import { useDashboard } from '@/services/features/dashboardApi';
import { useUser } from '@/services/features/userApi';
import BillsComponent from '@/views/payments/components/Bills/BillsComponent';
import Bookings from '@/views/requests/components/Bookings';
import { useDispatch, useSelector } from 'react-redux';
import {
	setBookingID,
	toggleCancelServiceDialog,
	toggleCompleteServiceDialog,
	toggleOpenDisputeDialog,
	toggleStartServiceDialog,
} from '../store/stateSlice';
import Stats from './Stats';
import UnansweredChats from './UnansweredChats';

const DashboardFeed = () => {
	const dispatch = useDispatch();
	const { bookings, bookingsCount, enquiries } = useDashboard();
	const { userType, user: profile } = useUser();
	const { imagePath } = appConfig;
	const { booking, completingService, confirmingService } = useSelector(
		(state) => state.dashboard.data
	);
	const { bookingID } = useSelector((state) => state.dashboard.state);
	// const { profile, userType } = useSelector((state) => state.auth.user);
	const isProvider = userType === 'Provider' ? true : false;

	const chatsData = enquiries?.filter((chat) => {
		return chat.messages.every((item) => item.sender_id !== profile?.id);
	});

	const onReport = (booking) => {
		dispatch(toggleOpenDisputeDialog(true));
		dispatch(setBookingID(booking?.id));
	};

	const onComplete = (booking) => {
		dispatch(toggleCompleteServiceDialog(true));
		dispatch(setBookingID(booking?.id));
	};

	const onStart = (booking) => {
		dispatch(toggleStartServiceDialog(true));
		dispatch(setBookingID(booking?.id));
	};

	const onCancel = (booking) => {
		dispatch(toggleCancelServiceDialog(true));
		dispatch(setBookingID(booking?.id));
	};

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
					onReport={onReport}
				/>
			</div>

			<h4>Unanswered Request Chats</h4>

			<div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
				<UnansweredChats data={chatsData} imagePath={imagePath} />
			</div>

			<div className="mt-4 mb-4 w-full flex items-center gap-4 overflow-auto pb-4">
				<Stats bookingsCount={bookingsCount} profile={profile} />
			</div>

			<BillsComponent />
		</div>
	);
};
export default DashboardFeed;
