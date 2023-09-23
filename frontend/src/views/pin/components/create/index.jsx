import { Button } from '@/components/ui';
import { useCreatePinMutation } from '@/services/features/userApi';
import { popNotification } from '@/utils/toast';
import { motion } from 'framer-motion';
import { useState } from 'react';
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

const CreatePin = () => {
	const navigate = useNavigate();
	const [createPin, { isLoading }] = useCreatePinMutation();

	const [pin, setPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	let notMatched = false;
	let matched = false;

	if (confirmPin.length === 4 && confirmPin !== pin) {
		notMatched = true;
	}

	if (confirmPin.length === 4 && confirmPin === pin) {
		matched = true;
	}

	const onCreatePin = async () => {
		try {
			await createPin({ pin: pin, pin_confirmation: confirmPin }).unwrap();
			popNotification(
				'Success',
				'Transaction PIN created successfully.',
				'success',
				5000
			);
			navigate(-1);
		} catch (error) {
			popNotification(
				'Error',
				'Oops! Something went wrong, please try again.',
				'danger',
				5000
			);
		}
	};

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

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					onCreatePin();
				}}
			>
				<div className="mb-6">
					<p className="text-base mb-2">Enter PIN</p>

					<PinInput
						length={4}
						initialValue=""
						// secret
						secretDelay={200}
						onChange={(value) => {
							if (validatePin(value)) {
								setPin(value);
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
					<p className="text-base mb-2">Enter PIN Again</p>

					<PinInput
						length={4}
						initialValue=""
						// secret
						secretDelay={200}
						disabled={pin.length < 4}
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
						!confirmPin ||
						pin.length < 4 ||
						confirmPin.length < 4 ||
						notMatched ||
						!matched
					}
				>
					Create
				</Button>
			</form>
		</div>
	);
};
export default CreatePin;
