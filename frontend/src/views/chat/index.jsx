import { Loading } from '@/components/shared';
import createUID from '@/components/ui/utils/createUid';
import { injectReducer } from '@/store';
import { socket } from '@/utils/socket';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import MessageBox from './components/MessageBox';
import Messages from './components/Messages';
import PaymentDialog from './components/PaymentDialog';
import ChatBar from './components/chatBar';
import InvoiceDialog from './components/invoice/InvoiceDialog';
import reducer from './store';
import {
	initiateChat,
	resetBookingStatus,
	setInvoiceStatus,
	setReceivedInvoice,
	setServiceBooked,
} from './store/dataSlice';
import { setInvoiceNumber, toggleInvoiceDialog } from './store/stateSlice';

injectReducer('chat', reducer);

const Chat = () => {
	const dispatch = useDispatch();
	const { state } = useLocation();
	const { providerSlug } = useParams();

	window.OneSignal = window.OneSignal || [];
	const OneSignal = window.OneSignal;

	// const { message, file, invoice } = useSelector((state) => state.chat.state)
	const { chat, receivedInvoice, serviceBooked, bookingStatus, invoiceStatus } =
		useSelector((state) => state.chat.data);
	const { profile } = useSelector((state) => state.auth.user);

	// Determine the sender and receiver based on the logged-in user
	const sender = profile?.id === chat?.user?.id ? chat?.user : chat?.receiver;
	const receiver = profile?.id === chat?.user?.id ? chat?.receiver : chat?.user;

	const isOwner = (message) => message?.sender_id === profile?.id;

	const { gettingProvider } = useSelector((state) => state.chat.data);

	const onCreateInvoice = () => {
		dispatch(toggleInvoiceDialog(true));
		dispatch(setInvoiceNumber(createUID(8)));
	};

	// useEffect(() => {
	//     socket.emit("addNewUser", profile?.id);
	// }, [profile]);

	OneSignal.push(() => {
		OneSignal.init({
			appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
			safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
			allowLocalhostAsSecureOrigin: true,
			autoResubscribe: true,
		});
	});
	useEffect(() => {
		dispatch(
			initiateChat({
				slug: providerSlug,
				id: state?.chat && state.chat,
				provider_id: state?.provider_id && state.provider_id,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (
			receivedInvoice ||
			serviceBooked ||
			bookingStatus === 'success' ||
			invoiceStatus === 'success'
		) {
			dispatch(
				initiateChat({
					slug: providerSlug,
					id: state?.chat && state.chat,
					provider_id: state?.provider_id && state.provider_id,
				})
			);
		}

		if (receivedInvoice) {
			dispatch(setReceivedInvoice(false));
		}

		if (serviceBooked) {
			dispatch(setServiceBooked(false));
		}

		if (bookingStatus === 'success') {
			dispatch(resetBookingStatus());
		}

		if (invoiceStatus === 'success') {
			dispatch(setInvoiceStatus('idle'));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, receivedInvoice, serviceBooked, bookingStatus, invoiceStatus]);

	return (
		<div className="">
			{gettingProvider ? (
				<div className="min-h-[70vh] flex justify-center items-center">
					<Loading loading={true} />
				</div>
			) : (
				<div className="relative min-h-[72vh]">
					{/* <hr /> */}
					<ChatBar onCreateInvoice={onCreateInvoice} />

					<div className="p-4">
						<div className="mb-14 min-h-[50vh]">
							<Messages isOwner={isOwner} sender={sender} receiver={receiver} />
						</div>
					</div>

					<div className="sticky w-full min-w-full p-4 pb-5 bg-white max-w-2xl bottom-[5rem] border-b-2">
						<MessageBox
							receiver={receiver}
							socket={socket.current}
							onCreateInvoice={onCreateInvoice}
						/>
					</div>
				</div>
			)}

			<InvoiceDialog receiver={receiver} socket={socket.current} />
			<PaymentDialog
				providerSlug={providerSlug}
				state={state}
				socket={socket.current}
			/>
		</div>
	);
};
export default Chat;
