import { useUser } from '@/services/features/userApi';
import { HiChevronLeft } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import Transfer from '../components/Deposit/transfer';

const Topup = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useUser();

	const handleBack = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate(-1); // Fallback to the previous page if no state is passed
		}
	};

	return (
		<div>
			{/* Your topup functionality here */}
			<button onClick={handleBack} className="flex items-center py-2 pr-2">
				<HiChevronLeft /> Back
			</button>
			<div className="flex justify-center items-center pb-5">
				<img
					className="w-1/3"
					src="/svg/topup.svg"
					alt="mobile payment image courtesy of undraw"
				/>
			</div>
			{/* <h4 className="text-lg font-bold text-gray-700 text-center">
				Topup Your Account
			</h4> */}
			<Transfer profile={user} />
		</div>
	);
};

export default Topup;
