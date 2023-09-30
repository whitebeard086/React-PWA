import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CheckVerifications = () => {
	const location = useLocation();

	const { userType, verifiedPhone, hasService } = useSelector(
		(state) => state.auth.user
	);

	const providerVerified =
		userType === 'Provider' && verifiedPhone && hasService;
	const userVerified = userType === 'Client' && verifiedPhone;

	return providerVerified || userVerified ? (
		<Outlet />
	) : userType === 'Provider' && !hasService ? (
		<Navigate to="/service-setup" state={{ from: location }} replace />
	) : userType === 'Provider' && hasService && !verifiedPhone ? (
		<Navigate to="/verify" state={{ from: location }} replace />
	) : userType === 'Client' && !verifiedPhone ? (
		<Navigate to="/verify" state={{ from: location }} replace />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};
export default CheckVerifications;
