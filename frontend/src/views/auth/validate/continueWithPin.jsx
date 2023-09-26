/* eslint-disable react/prop-types */
import { useValidateMutation } from '@/services/features/userApi';
import { toggleValidate } from '@/views/payments/store/stateSlice';
import { useRef, useState } from 'react';
import { BiSolidLockOpen } from 'react-icons/bi';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog } from '@/components/ui';
import useAuth from '@/utils/hooks/useAuth';
import { popNotification } from '@/utils/toast';
import { setValidateAttempts } from '@/views/payments/store/stateSlice';

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

const ContinueWithPin = () => {
	const { handleSignOut } = useAuth();
	const [validate, { isLoading }] = useValidateMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [pin, setPin] = useState('');
	const pinRef = useRef(null);

	const { validate: pinDialog, validateAttempts } = useSelector(
		(state) => state.payments.state
	);

	console.log('validateAttempts: ', validateAttempts);
	const onDialogClose = () => {
		dispatch(toggleValidate(false));
		dispatch(setValidateAttempts(0));
	};

	const clearInput = () => {
		pinRef.current.clear();
		setPin('');
	};

	const handleSubmit = () => {
		onValidate();
	};

	const onValidate = async () => {
		try {
			await validate({ pin: pin }).unwrap();
			popNotification('Success', 'Welcome back', 'success', 1000);
			clearInput();
			onDialogClose();
			// navigate(-1);
		} catch (error) {
			clearInput();
			dispatch(setValidateAttempts());
			if (validateAttempts >= 2) {
				popNotification(
					'Error',
					'Wrong PIN, You will be logged out',
					'danger',
					2000
				);
				handleSignOut();
			} else {
				popNotification(
					'Error',
					`Wrong PIN, please try again. ${2 - validateAttempts} ${
						2 - validateAttempts === 1 ? 'attempt' : 'attempts'
					} left`,
					'warning',
					5000
				);
			}
		}
	};

	return (
		<Dialog
			isOpen={pinDialog}
			onClose={onDialogClose}
			closable={false}
			onRequestClose={onDialogClose}
			shouldCloseOnOverlayClick={false}
			shouldCloseOnEsc={false}
			contentClassName="mt-[30vh]"
			overlayClassName="bg-opacity-80 backdrop-blur-xl"
			title="Continue with PIN"
		>
			<h4 className="text-lg font-bold text-gray-700">Continue with PIN</h4>
			<div className="mt-4">
				<p className="text-sm mb-2">
					You stayed idle for too long, please revalidate your session
				</p>

				<div>
					<PinInput
						length={4}
						initialValue=""
						secretDelay={200}
						ref={pinRef}
						onChange={(value) => {
							setPin(value);
						}}
						type="numeric"
						inputMode="number"
						inputStyle={INPUT_PIN_STYLE_RESET}
						inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
						autoSelect={true}
						regexCriteria={/^[1-9][0-9]*$/}
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
					Continue
				</Button>
			</div>
		</Dialog>
	);
};
export default ContinueWithPin;
