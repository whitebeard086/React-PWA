import { Button, Dialog } from '@/components/ui';
// import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	SLICE_NAME,
	toggleKycDialog,
	useAppDispatch,
	useAppSelector,
} from '../store';

const KycDialog = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// console.log(useAppSelector((state) => state));
	const { profile } = useAppSelector((state) => state.auth.user);
	// const { kycDialog } = useSelector((state) => state.kyc.state);
	const { kycDialog } = useAppSelector((state) => state[SLICE_NAME].state);

	const onDialogClose = () => {
		dispatch(toggleKycDialog(false));
	};
	const upgrade = () => {
		dispatch(toggleKycDialog(false));

		if (location.pathname !== '/profile/kyc') {
			navigate('/profile/kyc');
		}
	};

	console.log('profile: ', profile);
	console.log(
		'!profile?.pending_account_level: ',
		!profile?.pending_account_level
	);

	return (
		<Dialog
			isOpen={kycDialog}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			shouldCloseOnOverlayClick={false}
			shouldCloseOnEsc={false}
			contentClassName="mt-[30vh]"
			title="KYC"
		>
			<h2 className="text-lg font-semibold text-gray-700 text-center">
				Your Account Level: {profile?.account_level?.name}
			</h2>

			<div className="text-center mt-8 text-slate-800 font-medium">
				{profile?.pending_account_level ? (
					<p>level {profile?.pending_account_level} Verification: Pending</p>
				) : (
					<p>
						Upgrade your account to level{' '}
						{profile?.account_level_id === 1
							? 2
							: profile?.account_level_id === 2
							? 3
							: 4}
					</p>
				)}
			</div>
			<Button
				variant="solid"
				block
				className="mt-6"
				disabled={profile?.pending_account_level}
				onClick={upgrade}
			>
				Start Upgrade
			</Button>
		</Dialog>
	);
};
export default KycDialog;
