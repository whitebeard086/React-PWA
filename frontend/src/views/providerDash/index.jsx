import { useDashboard } from '@/services/features/dashboardApi';
import { injectReducer } from '@/store';
import { socket } from '@/utils/socket';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BillsComponent from '../payments/components/Bills/BillsComponent';
import CancelService from './components/CancelService';
import CompleteServiceDialog from './components/CompleteServiceDialog';
import DashboardFeed from './components/DashboardFeed';
import DisputeDialog from './components/DisputeDialog';
import GettingDashboardData from './components/GettingDashboardData';
import StartService from './components/StartService';
import reducer from './store';
import {
	getDashboardData,
	setServiceCompletedDash,
	setServiceConfirmedDash,
} from './store/dataSlice';

injectReducer('dashboard', reducer);

const ProviderDashboard = () => {
	const dispatch = useDispatch();

	const {
		isLoading,
		isError,
		dashboard,
		bookings,
		bookingsCount,
		disputes,
		enquiries,
		status,
	} = useDashboard();

	console.log('dash from useDashboard: ', dashboard);
	console.log('IsLoading from useDashboard: ', isLoading);
	console.log('IsError from useDashboard: ', isError);
	console.log('Bookings from useDashboard: ', bookings);
	console.log('Disputes from useDashboard: ', disputes);
	console.log('Enquiries from useDashboard: ', enquiries);
	console.log('BookingsCount from useDashboard: ', bookingsCount);
	console.log('Status from useDashboard: ', status);

	const {
		serviceCompleted,
		serviceConfirmed,
		serviceStarted,
		serviceCancelled,
	} = useSelector((state) => state.dashboard.data);
	const { serviceBooked } = useSelector((state) => state.chat.data);
	const { loading } = useSelector((state) => state.dashboard.data);

	useEffect(() => {
		dispatch(getDashboardData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if (
			serviceCompleted ||
			serviceConfirmed ||
			serviceBooked ||
			serviceStarted ||
			serviceCancelled
		) {
			dispatch(getDashboardData());
		}

		if (serviceCompleted) {
			dispatch(setServiceCompletedDash(false));
		} else if (serviceConfirmed) {
			dispatch(setServiceConfirmedDash(false));
		}
	}, [
		dispatch,
		serviceCompleted,
		serviceConfirmed,
		serviceBooked,
		serviceStarted,
		serviceCancelled,
	]);

	return (
		<div className="mt-10 mb-8 px-4">
			{loading ? <GettingDashboardData /> : <DashboardFeed />}
			<BillsComponent />
			<CompleteServiceDialog socket={socket.current} />
			<StartService />
			<CancelService />
			<DisputeDialog />
		</div>
	);
};
export default ProviderDashboard;
