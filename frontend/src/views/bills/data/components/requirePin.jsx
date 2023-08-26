/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { BiSolidLockOpen } from 'react-icons/bi';
import PinInput from 'react-pin-input';

import { Button, Dialog } from '@/components/ui';
import { popNotification } from '@/utils/toast';
import {
	SLICE_NAME,
	buyData,
	resetState,
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
	const [pin, setPin] = useState('');

	let pinRef;

	const { store, bundle } = useAppSelector((state) => state[SLICE_NAME].data);
	const { pinDialog } = useAppSelector((state) => state[SLICE_NAME].state);

	const onDialogClose = () => {
		dispatch(togglePinDialog(false));
	};

	useEffect(() => {
		const clearInput = () => {
			pinRef?.clear();
			setPin('');
		};

		if (bundle.status === 'failed') {
			popNotification(
				'Error',
				'Oops! Something went wrong, please try again.',
				'danger',
				5000
			);

			clearInput();
			dispatch(resetState('bundle'));
			onDialogClose();
		}

		if (bundle.status === 'pin error') {
			popNotification(
				'Error',
				'The PIN entered does not match your transaction PIN, please try again.',
				'danger',
				5000
			);

			clearInput();
			dispatch(resetState('bundle'));
		}

		if (bundle.status === 'success') {
			clearInput();
			dispatch(togglePinDialog(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bundle.status]);

	const handleSubmit = () => {
		dispatch(
			buyData({
				pin,
				phone: store?.phone,
				amount: store?.amount,
				product: store?.product,
				operator: store?.oid,
			})
		);
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
						length={6}
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
					variant="solid"
					className="!bg-gray-900 hover:!bg-black mt-6"
					icon={<BiSolidLockOpen />}
					loading={bundle.status === 'pending'}
					disabled={!pin || pin?.length < 6}
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
