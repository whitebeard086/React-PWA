/* eslint-disable react/prop-types */
import { Button, Dialog } from '@/components/ui';
import { popNotification } from '@/utils/toast';
import { usePayBill } from '@/views/bills/store/hooks';
import { useState } from 'react';
import { BiSolidLockOpen } from 'react-icons/bi';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { togglePinDialog } from '../../store/stateSlice';
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

const RequirePin = ({ onComplete }) => {
	const dispatch = useDispatch();
	const [pin, setPin] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	let pinRef;

	const { pinDialog } = useSelector((state) => state.airtime.state);
	const { product } = useSelector((state) => state.airtime.data);

	const onDialogClose = () => {
		dispatch(togglePinDialog(false));
	};

	const onError = () => {
		dispatch(togglePinDialog(false));
		onComplete();
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

	const { mutate, isLoading, error } = usePayBill(
		(error) => {
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
			popNotification(
				'Success',
				data.message ?? 'Transaction completed successfully.',
				'success',
				5000
			);
			clearInput();
			dispatch(togglePinDialog(false));
			dispatch(getUser());
			onComplete();
			dispatch(setStore(0));
		}
	);

	const handleSubmit = () => {
		const p_data = {
			pin,
			...product,
		};
		mutate(p_data);
	};

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
					Please enter your transaction pin to authorize this transaction
				</p>

				{/* <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                > */}
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
						// onComplete={(value) => {
						//     dispatch(setPinData(value));
						// }}
						regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
					/>
				</div>

				<Button
					block
					// type="submit"
					variant="solid"
					className="!bg-gray-900 hover:!bg-black mt-6"
					icon={<BiSolidLockOpen />}
					loading={isLoading}
					disabled={!pin || pin?.length < 4 || isLoading || pin[0] === '0'}
					onClick={handleSubmit}
				>
					Authorize
				</Button>
				{/* </form> */}
			</div>
		</Dialog>
	);
};
export default RequirePin;
