import { Button, Card, Notification, toast } from '@/components/ui';
import { getUser } from '@/store/auth/userSlice';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentsData } from '../../store/dataSlice';
import { toggleDepositDialog } from '../../store/stateSlice';

const Transfer = ({ profile }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const onDone = () => {
		dispatch(toggleDepositDialog(false));
		dispatch(paymentsData());
		dispatch(getUser());

		if (location.pathname !== '/transactions') {
			navigate('/transactions');
		}
	};

	const handleCopyClick = (account = '') => {
		navigator.clipboard.writeText(account);
		toast.push(<Notification title="Copied" type="success" duration={1000} />, {
			placement: 'top-center',
		});
	};

	return (
		<div>
			<p className="text-base text-center">
				You can fund your account via your personal Taskitly virtual account
			</p>

			{!profile?.collection_number ? (
				<Card className="bg-primary-500 text-white mt-4">
					<p className="text-base font-semibold text-center p-4">
						We could not retrieve your dedicated account at the moment, please
						try again later or contact our customer support for help.
					</p>
				</Card>
			) : (
				<>
					<Card className="bg-primary-500 text-white mt-4">
						<div className="flex flex-col gap-2">
							<p className="text-base text-center">
								{profile?.collection_bank}
							</p>
							<div
								className="text-base flex flex-col justify-center items-center cursor-pointer"
								onClick={() => handleCopyClick(profile?.collection_number)}
							>
								<p className="font-bold text-center">
									{profile?.collection_number}
								</p>
								<div className="flex items-center gap-">
									<p className="text sm">copy</p>
									<HiOutlineDuplicate className="text-lg" />
								</div>
							</div>
							<p className="text-base text-center font-semibold">
								{profile?.collection_name}
							</p>

							<Button
								variant="solid"
								block
								className="!bg-gray-900 hover:!bg-black mt-6"
								onClick={onDone}
							>
								Done, check my deposits
							</Button>
						</div>
					</Card>
				</>
			)}
		</div>
	);
};
export default Transfer;
