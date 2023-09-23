/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiSolidLockOpen } from 'react-icons/bi';
import PinInput from 'react-pin-input';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Dialog } from '@/components/ui';
import { getUser } from '@/store/auth/userSlice';
import { popNotification } from '@/utils/toast';
import { usePayBill } from '../../store/hooks';
import {
	SLICE_NAME,
	setState,
	setStore,
	togglePinDialog,
	useAppDispatch,
	useAppSelector,
} from '../store';

const INPUT_PIN_STYLE_RESET = {
	padding: undefined,
	margin: undefined,
	textAlign: undefined,
	border: undefined,
	background: undefined,
	width: undefined,
	height: undefined,
};

const FOCUS_INPUT_PIN_STYLE_RESET = {
	outline: undefined,
	boxShadow: undefined,
};

const RequirePin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [pin, setPin] = useState('');
	let pinRef;

	const { product } = useAppSelector((state) => state[SLICE_NAME].data);
	const { pinDialog } = useAppSelector((state) => state[SLICE_NAME].state);

	const onDialogClose = () => {
		dispatch(togglePinDialog(false));
	};

	const onError = () => {
		dispatch(togglePinDialog(false));
		dispatch(setState(0));
	};

	const doKYB = () => {
		if (location.pathname !== '/profile/kyb') {
			navigate('/profile/kyb');
		}
	};

	const clearInput = () => {
		pinRef?.clear();
		setPin('');
	};

	const handleSubmit = () => {
		const p_data = {
			pin,
			...product,
		};
		mutate(p_data);
	};

	const { mutate, isLoading, error } = usePayBill(
		(error) => {
			console.log('error block', error);
			if (error.response.data.status === 'pin error') {
				popNotification(
					error.response.data.message,
					'The PIN entered does not match your transaction PIN, please try again.',
					'danger',
					5000
				);
			} else if (error.response.status === 422) {
				popNotification(
					error.response.data.status,
					error.response.data.message,
					'danger',
					5000
				);
				onError();
				doKYB();
			} else {
				popNotification(
					'Error',
					error.response.data.message ??
						'Oops! Something went wrong, please try again.',
					'danger',
					5000
				);
				onError();
			}
			clearInput();
			onDialogClose();
		},
		(data) => {
			console.log('Success block', data);
			popNotification(
				'Success',
				data.message ?? 'Transaction completed successfully.',
				'success',
				5000
			);
			clearInput();
			dispatch(togglePinDialog(false));
			dispatch(getUser());
			dispatch(setState(0));
			dispatch(setStore(0));
		}
	);

	return (
		<Dialog
			isOpen={pinDialog}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			shouldCloseOnOverlayClick={false}
			shouldCloseOnEsc={false}
			contentClassName="mt-[30vh]"
			title="Require PIN"
		>
			<h4 className="text-lg font-bold text-gray-700">Authorize Transaction</h4>
			<div className="mt-4">
				<p className="text-sm mb-2">
					Please enter your pin to authorize this transaction
				</p>

				<div>
					<PinInput
						length={4}
						initialValue=""
						secretDelay={200}
						ref={(n) => (pinRef = n)}
						onChange={(value) => {
							setPin(value);
						}}
						type="numeric"
						inputMode="number"
						inputStyle={INPUT_PIN_STYLE_RESET}
						inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
						autoSelect={true}
						regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
					/>
				</div>

				<Button
					block
					variant="solid"
					className="!bg-gray-900 hover:!bg-black mt-6"
					icon={<BiSolidLockOpen />}
					loading={isLoading}
					disabled={!pin || pin?.length < 4 || isLoading || pin[0] === '0'}
					onClick={handleSubmit}
				>
					Authorize
				</Button>
			</div>
		</Dialog>
	);
};
export default RequirePin;
