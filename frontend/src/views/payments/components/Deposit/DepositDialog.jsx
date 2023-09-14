import { Dialog } from '@/components/ui';
// import classNames from 'classnames';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDepositDialog } from '../../store/stateSlice';
// import DepositShell from './depositShell';
// import SimulationForm from './simulationForm';
import Transfer from './transfer';

const DepositDialog = () => {
	// const [checked, setChecked] = useState(false);

	const dispatch = useDispatch();

	const { depositDialog } = useSelector((state) => state.payments.state);
	const { profile } = useSelector((state) => state.auth.user);

	console.log('profile: ', profile);
	const onDialogClose = () => {
		dispatch(toggleDepositDialog(false));
	};

	// const onSwitcherToggle = (val) => {
	// 	setChecked(!val);
	// };

	return (
		<>
			<Dialog
				isOpen={depositDialog}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
				shouldCloseOnOverlayClick={false}
				shouldCloseOnEsc={false}
				contentClassName="mt-[30vh]"
				title="Deposit"
			>
				<h4 className="text-lg font-bold text-gray-700 text-center">
					Topup Your Account
				</h4>

				{/* <div className="flex gap-2 justify-between items-center">
					<h4 className="text-lg font-bold text-gray-700">
						Topup Your Account
					</h4>
					<Switcher
						className={classNames('mr-6', { 'text-slate-800': checked })}
						checked={checked}
						onChange={onSwitcherToggle}
						checkedContent="Test"
						unCheckedContent="Live"
					/>
				</div> */}
				{/* {checked ? (
					<div className="mt-4 overflow-y-auto">
						<p className="text-xs mb-3">
							This simulates deposit to your virtual account. In production, you
							will have to transfer to your account or make bank deposits like
							you do your every other bank account
						</p>
						<SimulationForm />
					</div>
				) : (
					<DepositShell />
				)} */}
				<Transfer profile={profile} />
			</Dialog>
		</>
	);
};
export default DepositDialog;
