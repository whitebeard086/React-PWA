import { Button } from '@/components/ui';
import Tabs from '@/components/ui/Tabs';
import appConfig from '@/configs/app.config';
import {
	useCompleteServiceMutation,
	useConfirmServiceMutation,
	useRequest,
} from '@/services/features/requestApi';
import { injectReducer } from '@/store';
import { socket } from '@/utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Bookings from './components/Bookings';
import CancelService from './components/Bookings/CancelService';
import CompleteServiceDialog from './components/Bookings/CompleteServiceDialog';
import ConfirmServiceDialog from './components/Bookings/ConfirmServiceDialog';
import DisputeDialog from './components/Bookings/DisputeDialog';
import StartService from './components/Bookings/StartService';
import Disputes from './components/Disputes';
import Enquiries from './components/Enquiries';
import GettingData from './components/GettingData';
import reducer from './store';
import {
	setBookingID,
	toggleCancelServiceDialog,
	toggleCompleteServiceDialog,
	toggleConfirmServiceDialog,
	toggleOpenDisputeDialog,
	toggleStartServiceDialog,
} from './store/stateSlice';

injectReducer('requests', reducer);

const Requests = () => {
	const { isLoading, bookings, disputes, enquiries } = useRequest();
	const [completeService, { isLoading: completingService }] =
		useCompleteServiceMutation();
	const [confirmService, { isLoading: confirmingService }] =
		useConfirmServiceMutation();
	const dispatch = useDispatch();
	const { imagePath } = appConfig;

	const { booking } = useSelector((state) => state.requests.data);
	const { bookingID } = useSelector((state) => state.requests.state);
	const { userType } = useSelector((state) => state.auth.user);
	const isProvider = userType === 'Provider' ? true : false;

	console.log('Enquiries: ', enquiries);
	console.log('Bookings: ', bookings);
	console.log('Disputes: ', disputes);

	const { TabNav, TabList, TabContent } = Tabs;

	window.OneSignal = window.OneSignal || [];
	const OneSignal = window.OneSignal;

	OneSignal.push(() => {
		OneSignal.init({
			appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
			safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
			allowLocalhostAsSecureOrigin: true,
			autoResubscribe: true,
		});
	});

	const onReport = (booking) => {
		dispatch(toggleOpenDisputeDialog(true));
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

	const onComplete = (booking) => {
		dispatch(toggleCompleteServiceDialog(true));
		dispatch(setBookingID(booking?.id));
	};

	const onConfirm = (booking) => {
		dispatch(toggleConfirmServiceDialog(true));
		dispatch(setBookingID(booking?.id));
	};

	return (
		<div className="mt-2 p-4">
			{isLoading ? (
				<GettingData />
			) : (
				<div>
					<h4>Active Bookings</h4>

					<div className="mt-4 mb-4">
						<Bookings
							imagePath={imagePath}
							bookings={bookings}
							booking={booking}
							completingService={completingService}
							confirmingService={confirmingService}
							bookingID={bookingID}
							isProvider={isProvider}
							onComplete={onComplete}
							onConfirm={onConfirm}
							onStart={onStart}
							onCancel={onCancel}
							onReport={onReport}
						/>
					</div>

					{disputes?.length > 0 && (
						<div className="mt-10">
							<Tabs defaultValue="enquiries" variant="pill">
								<TabList className="justify-start gap-4 text-base">
									<TabNav value="enquiries">Enquiries</TabNav>
									<TabNav value="disputes">Disputes</TabNav>
								</TabList>
								<div className="mt-4">
									<TabContent value="enquiries">
										<div className="min-h-[50vh]">
											<Enquiries />
										</div>
									</TabContent>
									<TabContent value="disputes">
										<div className="min-h-[50vh]">
											<Disputes />
										</div>
									</TabContent>
								</div>
							</Tabs>
						</div>
					)}

					{disputes?.length < 1 && (
						<>
							<h4>Enquiries</h4>

							<div className="min-h-[50vh]">
								<Enquiries />
							</div>
						</>
					)}
				</div>
			)}

			<div className="sticky bottom-24 flex justify-end mr-5">
				<Link to="history">
					<Button variant="solid">Booking History</Button>
				</Link>
			</div>

			<CompleteServiceDialog socket={socket.current} />
			<ConfirmServiceDialog socket={socket.current} />
			<StartService />
			<CancelService />
			<DisputeDialog />
		</div>
	);
};
export default Requests;
