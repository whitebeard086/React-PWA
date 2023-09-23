import { Button } from '@/components/ui';
import { useUpdatePinMutation } from '@/services/features/userApi';
import { popNotification } from '@/utils/toast';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import PinInput from 'react-pin-input';
import { useNavigate } from 'react-router-dom';

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

const UpdatePin = () => {
	const navigate = useNavigate();
	const [updatePin, { isLoading }] = useUpdatePinMutation();

	const [pin, setPin] = useState('');
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	let notMatched = false;
	let matched = false;

	const pinRef = useRef(null);
	const newRef = useRef(null);
	const confirmRef = useRef(null);

	const validatePin = (pin) => {
		if (pin[0] === '0') {
			setErrorMessage('First digit cannot be 0');
			return false;
		}
		if (pin === '0000') {
			setErrorMessage('PIN cannot be 0000');
			return false;
		}

		for (let i = 1; i < pin.length; i++) {
			if (pin[i] === pin[i - 1]) {
				setErrorMessage('No digit should be the same as the previous one');
				return false;
			}
		}

		setErrorMessage('');
		return true;
	};

	if (confirmPin.length === 4 && confirmPin !== newPin) {
		notMatched = true;
	}

	if (confirmPin.length === 4 && confirmPin === newPin) {
		matched = true;
	}
	const clearInput = () => {
		pinRef.current.clear();
		newRef.current.clear();
		confirmRef.current.clear();
		setPin('');
		setNewPin('');
		setConfirmPin('');
		setErrorMessage('');
	};

	const onUpdatePin = async () => {
		try {
			console.log(newPin);
			await updatePin({
				old_pin: pin,
				pin: newPin,
				pin_confirmation: confirmPin,
			}).unwrap();
			popNotification(
				'Success',
				'Transaction PIN updated successfully.',
				'success',
				5000
			);
			clearInput();
			navigate(-1);
		} catch (error) {
			console.log(error.data);
			popNotification(error.data.status, error.data.message, 'warning', 5000);
			clearInput();
		}
	};

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					onUpdatePin();
				}}
			>
				<div className="mb-6">
					<p className="text-base mb-2">Enter Old PIN</p>

					<PinInput
						length={6}
						initialValue=""
						// secret
						secretDelay={200}
						ref={pinRef}
						onChange={(value) => {
							setPin(value);
						}}
						type="numeric"
						inputMode="number"
						inputStyle={INPUT_PIN_STYLE_RESET}
						inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
						// onComplete={(value, index) => {}}
						autoSelect={true}
						regexCriteria={/^[1-9][0-9]*$/}
					/>
				</div>

				<div className="mb-6">
					<p className="text-base mb-2">Enter New PIN</p>

					<PinInput
						length={4}
						initialValue=""
						// secret
						secretDelay={200}
						ref={newRef}
						disabled={pin.length < 4}
						onChange={(value) => {
							if (validatePin(value)) {
								setNewPin(value);
							}
						}}
						type="numeric"
						inputMode="number"
						inputStyle={INPUT_PIN_STYLE_RESET}
						inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
						// onComplete={(value, index) => {}}
						autoSelect={true}
						regexCriteria={/^[1-9][0-9]*$/}
					/>

					{errorMessage && (
						<motion.p
							className="text-red-500 mt-2"
							key={2}
							layoutId={2}
							initial={{ opacity: 0, visibility: 'hidden' }}
							animate={{ opacity: 1, visibility: 'visible' }}
							transition={{ duration: 0.4, type: 'tween' }}
							exit={{ opacity: 0, visibility: 'hidden' }}
						>
							{errorMessage}
						</motion.p>
					)}
				</div>

				<div className="mb-6">
					<p className="text-base mb-2">Enter New PIN Again</p>

					<PinInput
						length={4}
						initialValue=""
						// secret
						secretDelay={200}
						ref={confirmRef}
						disabled={newPin.length < 4}
						onChange={(value) => {
							setConfirmPin(value);
						}}
						type="numeric"
						inputMode="number"
						inputStyle={INPUT_PIN_STYLE_RESET}
						inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
						// onComplete={(value, index) => {}}
						autoSelect={true}
						regexCriteria={/^[1-9][0-9]*$/}
					/>

					{notMatched && (
						<motion.p
							className="text-red-500 mt-2"
							key={1}
							layoutId={1}
							initial={{ opacity: 0, visibility: 'hidden' }}
							animate={{ opacity: 1, visibility: 'visible' }}
							transition={{ duration: 0.4, type: 'tween' }}
							exit={{ opacity: 0, visibility: 'hidden' }}
						>
							Your PIN do not match!
						</motion.p>
					)}
				</div>

				<Button
					block
					type="submit"
					variant="solid"
					className="!bg-gray-900 hover:!bg-black mt-2"
					loading={isLoading}
					disabled={
						!pin ||
						!newPin ||
						!confirmPin ||
						pin.length < 4 ||
						newPin.length < 4 ||
						confirmPin.length < 4 ||
						notMatched ||
						!matched
					}
				>
					Update
				</Button>
			</form>
		</div>
	);
};
export default UpdatePin;
