import Home from '@/views/home';
import ProviderDashboard from '@/views/providerDash';
// import { useSelector } from 'react-redux';
import { useUser } from '@/services/features/userApi';

const Views = () => {
	const { userType } = useUser();
	// const { userType } = useSelector((state) => state.auth.user);
	// return userType === 'Provider' ? <ProviderDashboard /> : <Home />;

	return userType === 'Provider' ? <ProviderDashboard /> : <Home />;
};
export default Views;
