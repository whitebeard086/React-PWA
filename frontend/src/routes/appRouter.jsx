import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import ErrorPage from '@/routes/error';
import Views from '@/views';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import Airtime from '@/views/bills/airtime';
import Cable from '@/views/bills/cable';
import Data from '@/views/bills/data';
import Disco from '@/views/bills/disco';
import Browse from '@/views/browse';
import Category from '@/views/browse/components/category';
import Chat from '@/views/chat';
import Landing from '@/views/landing';
import Layout from '@/views/layout';
import Unauthorized from '@/views/notfound/Unauthorized';
import Notifications from '@/views/notifications';
import Payments from '@/views/payments';
import Pin from '@/views/pin';
import Profile from '@/views/profile';
import ProviderProfile from '@/views/profile/components/ProviderProfile';
import Kyb from '@/views/profile/kyb';
import Kyc from '@/views/profile/kyc';
import Referral from '@/views/referral';
import Requests from '@/views/requests';
import DisputeChat from '@/views/requests/components/Disputes/DisputeChat';
import CheckVerifications from '@/views/route/CheckVerifications';
import RequireAuth from '@/views/route/RequireAuth';
import RequireServiceProvider from '@/views/route/RequireServiceProvider';
import Service from '@/views/service';
import EditService from '@/views/service/components/EditService';
import Settings from '@/views/settings';
import Verify from '@/views/verify';
import Withdraw from '@/views/withdraw';

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Landing />} />
			<Route path="register" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="home" element={<Views />} />
			<Route path="browse" element={<Browse />} />
			<Route path="browse/:categorySlug" element={<Category />} />
			<Route
				path="browse/profile/:providerSlug"
				element={<ProviderProfile />}
			/>
			<Route element={<RequireAuth />}>
				<Route path="verify" element={<Verify />} />
				<Route element={<RequireServiceProvider />}>
					<Route path="service-setup" element={<Service />} />
					<Route path="profile" element={<Profile />} />
					<Route path="service/edit" element={<EditService />} />
					<Route path="withdraw" element={<Withdraw />} />
				</Route>
				<Route element={<CheckVerifications />}>
					<Route path="chat/:providerSlug" element={<Chat />} />
					<Route path="settings" element={<Settings />} />
					<Route path="refer-and-earn" element={<Referral />} />
					<Route path="profile/kyc" element={<Kyc />} />
					<Route path="profile/kyb" element={<Kyb />} />
					<Route path="transactions" element={<Payments />} />
					<Route path="requests" element={<Requests />} />
					<Route path="requests/history" element={<History />} />
					<Route path="requests/disputes/:uid" element={<DisputeChat />} />
					<Route path="transaction-pin" element={<Pin />} />
					<Route path="bills/airtime" element={<Airtime />} />
					<Route path="bills/data" element={<Data />} />
					<Route path="bills/disco" element={<Disco />} />
					<Route path="bills/cable" element={<Cable />} />
					<Route path="unauthorized" element={<Unauthorized />} />
					<Route path="/profile/notifications" element={<Notifications />} />
				</Route>
			</Route>
		</Route>
	)
);
