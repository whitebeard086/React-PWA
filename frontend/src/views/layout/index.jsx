import { Container } from '@/components/shared';
import { Button, Spinner } from '@/components/ui';
import { getUser } from '@/store/auth/userSlice';
import { socket } from '@/utils/socket';
import classNames from 'classnames';
import { useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGetOperators } from '../bills/store/hooks';
import { setMessages } from '../chat/store/dataSlice';
import {
	createNotification,
	getNotifications,
	setCreateStatus,
} from '../notifications/store/dataSlice';
import DepositDialog from '../payments/components/Deposit/DepositDialog';
import BvnDialog from '../payments/components/bvn/bvnDialog';
// import {
// 	toggleBvnDialog,
// 	toggleDepositDialog,
// } from '../payments/store/stateSlice';
import ContinueWithPin from '../auth/validate/continueWithPin';
import KycDialog from '../profile/kyc/components/kycDialog';
import WithdrawDialog from '../withdraw/components/withdraw';
import { toggleWithdrawDialog } from '../withdraw/store/stateSlice';
import Footer from './Footer';
import Header from './Header';
// import BreadCrumbs from './components/breadCrumbs';
import { useUser } from '@/services/features/userApi';

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		user,
		isLoading,
		isError,
		hasPin,
		hasService,
		userType: typenkeuser,
		verifiedPhone,
	} = useUser();

	// console.log('User from useUser: ', user);
	// console.log('IsLoading from useUser: ', isLoading);
	// console.log('IsError from useUser: ', isError);
	// console.log('HasPin from useUser: ', hasPin);
	// console.log('HasService from useUser: ', hasService);
	// console.log('VerifiedPhone from useUser: ', verifiedPhone);
	// console.log('User type from useUser: ', typenkeuser);

	const { profile, userType } = useSelector((state) => state.auth.user);
	const { signedIn } = useSelector((state) => state.auth.session);
	const { verifying } = useSelector((state) => state.payments.data);
	const { chat, messageStatus, sentMessage } = useSelector(
		(state) => state.chat.data
	);
	const { createStatus, notification } = useSelector(
		(state) => state.notifications.data
	);

	const receiver = profile?.id === chat?.user?.id ? chat?.receiver : chat?.user;

	const notificationData = {
		receiver_id: receiver?.id,
		type: 'message',
		data: JSON.stringify(sentMessage),
		// data: sentMessage?.message,
		url: `/chat/${profile?.username?.toLowerCase()}`,
	};

	useEffect(() => {
		if (signedIn) {
			dispatch(getUser());
			dispatch(getNotifications());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	// Send message to the socket server
	useEffect(() => {
		if (messageStatus === 'sent') {
			socket.emit(
				'sendMessage',
				[sentMessage, receiver?.id],
				console.log('Emit send message: ', true)
			);
			dispatch(setMessages(sentMessage));

			dispatch(createNotification(notificationData));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageStatus, sentMessage]);

	useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [
				notification,
				receiver?.id,
				console.log('Emit send notification: ', true),
			]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

	const onTopUp = () => {
		navigate('/payment/topup', { state: { from: location } });
		// if (profile?.bvn) dispatch(toggleDepositDialog(true));
		// if (!profile?.bvn) dispatch(toggleBvnDialog(true));
	};

	const onWithdraw = () => {
		dispatch(toggleWithdrawDialog(true));
	};

	useGetOperators('electricity');
	useGetOperators('television');
	useGetOperators('telco');

	return (
		<Container className="max-w-2xl w-full">
			<Header />
			<div className="bg-white pb-4">
				<div className="bg-primary-500 w-[96%] mx-auto rounded-2xl py-3 px-4 flex items-center gap-4 justify-between">
					{signedIn ? (
						<h2 className="text-xl font-bold text-emerald-50">
							{verifying ? (
								<Spinner
									indicator={FaSpinner}
									className="mr-4"
									color="emerald-50"
									size="25px"
								/>
							) : (
								`₦${profile?.balance?.toLocaleString()}`
							)}
						</h2>
					) : (
						<h2 className="text-xl font-bold text-emerald-50">Welcome</h2>
					)}

					{signedIn ? (
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								variant="solid"
								className="!bg-gray-900 hover:!bg-black"
								onClick={onTopUp}
								disabled={verifying}
							>
								Topup
							</Button>
							{userType === 'Provider' && (
								<Button
									size="sm"
									variant="solid"
									disabled={verifying}
									onClick={onWithdraw}
									className="!bg-gray-900 hover:!bg-black"
								>
									Withdraw
								</Button>
							)}
						</div>
					) : (
						<div className="w-full flex items-center justify-end gap-2">
							<Link to="/register">
								<Button
									size="sm"
									variant="solid"
									className="!bg-gray-900 hover:!bg-black"
								>
									Sign Up
								</Button>
							</Link>

							<Link to="/login">
								<Button
									size="sm"
									variant="solid"
									className="!bg-gray-900 hover:!bg-black"
								>
									Sign In
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
			{/* <BreadCrumbs /> */}
			<div className={classNames('bg-gray-100 min-h-[72vh]')}>
				<Outlet />
			</div>
			{signedIn && <Footer />}

			<KycDialog />
			<DepositDialog />
			<BvnDialog />
			<WithdrawDialog />
			<ContinueWithPin />
		</Container>
	);
};
export default Layout;
