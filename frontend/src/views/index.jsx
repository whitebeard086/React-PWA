import Home from '@/views/home';
import ProviderDashboard from '@/views/providerDash';
import { useSelector } from 'react-redux';

const Views = () => {
	const { userType } = useSelector((state) => state.auth.user);
	console.log('usertype: ', userType);
	console.log('evaluating usertype: ', userType === 'Provider');
	return userType === 'Provider' ? <ProviderDashboard /> : <Home />;
};
export default Views;
