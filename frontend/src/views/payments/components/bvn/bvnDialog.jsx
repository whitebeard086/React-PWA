import { Dialog } from '@/components/ui';
import { getUser } from '@/store/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleBvnDialog } from '../../store/stateSlice';
import BvnForm from './bvnForm';

const BvnDialog = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { bvnDialog } = useSelector((state) => state.payments.state);
	const { profile } = useSelector((state) => state.auth.user);

	const onDialogClose = () => {
		dispatch(toggleBvnDialog(false));
	};

	const onDone = () => {
		dispatch(toggleBvnDialog(false));
		dispatch(getUser());

		if (location.pathname !== '/transactions') {
			navigate('/transactions');
		}
	};

	console.log('Profile in topup: ', profile);

	return (
		<>
			<Dialog
				isOpen={bvnDialog}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
				shouldCloseOnOverlayClick={false}
				shouldCloseOnEsc={false}
				// contentClassName="mt-[30vh]"
				title="Deposit"
			>
				<h4 className="text-lg font-bold text-gray-700 text-center">
					Update your BVN
				</h4>
				<div className="mt-3 overflow-y-auto">
					{/* <DepositForm /> */}
					<p className="text-sm text-center">
						Your bvn is required to create an Account for you. Please upload
						your bvn and review your name to continue.
					</p>
				</div>
				<BvnForm />
			</Dialog>
		</>
	);
};
export default BvnDialog;
