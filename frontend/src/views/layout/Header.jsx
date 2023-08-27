/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Notification from './components/notification';

const Header = () => {
	const { profile } = useSelector((state) => state.auth.user);
	const { signedIn } = useSelector((state) => state.auth.session);

	return (
		<div className="p-5 flex w-full justify-between items-center sticky top-0 bg-white z-10">
			{signedIn ? (
				<h2 className="text-lg font-bold text-primary-500">
					Hey {profile?.username}!
				</h2>
			) : (
				<h2 className="text-lg font-bold text-primary-500">Hey Guest!</h2>
			)}

			<div className="flex gap-3 items-center">
				<Notification />
			</div>
		</div>
	);
};
export default Header;
