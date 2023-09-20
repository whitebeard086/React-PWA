import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { appRouter } from '@/routes/appRouter';
import { getUser, setOnlineUsers } from '@/store/auth/userSlice';
import { useSocket } from '@/utils/hooks/useSocket';
import { socket } from '@/utils/socket';
import {
	setMessages,
	setReceivedInvoice,
	setServiceBooked,
} from '@/views/chat/store/dataSlice';
import { setNotifications } from '@/views/notifications/store/dataSlice';
import {
	setServiceCancelledDash,
	setServiceCompletedDash,
	setServiceStartedDash,
} from '@/views/providerDash/store/dataSlice';
import {
	setServiceCancelled,
	setServiceCompleted,
	setServiceConfirmed,
	setServiceStarted,
} from '@/views/requests/store/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
	const dispatch = useDispatch();

	const { onlineUsers, profile } = useSelector((state) => state.auth.user);

	const events = [
		{
			name: 'getUsers',
			handler(users) {
				dispatch(setOnlineUsers(users));
				console.log('Online Users: ', onlineUsers);
			},
		},
		{
			name: 'receiveNotification',
			handler(data) {
				dispatch(setNotifications(data));
				console.log('Received Socket Notification: ', true);
			},
		},
		{
			name: 'receiveMessage',
			handler(data) {
				dispatch(setMessages(data));
				console.log('Received Socket Message: ', true);
			},
		},
		{
			name: 'receiveInvoice',
			handler() {
				dispatch(setReceivedInvoice(true));
				console.log('Received Invoice: ', true);
			},
		},
		{
			name: 'serviceStarted',
			handler() {
				dispatch(setServiceStarted(true));
				dispatch(setServiceStartedDash(true));
				console.log('Received Service Started: ', true);
			},
		},
		{
			name: 'serviceCancelled',
			handler() {
				dispatch(setServiceCancelled(true));
				dispatch(setServiceCancelledDash(true));
				console.log('Received Service Cancelled: ', true);
			},
		},
		{
			name: 'serviceCompleted',
			handler() {
				dispatch(setServiceCompleted(true));
				dispatch(setServiceCompletedDash(true));
				console.log('Received Service Completed: ', true);
			},
		},
		{
			name: 'serviceConfirmed',
			handler() {
				dispatch(getUser());
				dispatch(setServiceConfirmed(true));
				console.log('Received Service Confirmed: ', true);
			},
		},
		{
			name: 'serviceBooked',
			handler() {
				dispatch(setServiceBooked(true));
				console.log('Received Service Booked: ', true);
			},
		},
	];

	useEffect(() => {
		socket.emit('addNewUser', profile);
	}, [profile]);

	useSocket(events);

	return <RouterProvider router={appRouter} />;
}

export default App;
