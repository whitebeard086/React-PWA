import { AiOutlineRollback } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
// import { RequirePin } from '.';
import {
	SLICE_NAME,
	setState,
	togglePinDialog,
	useAppDispatch,
	useAppSelector,
} from '../store';

const Order = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { store, product } = useAppSelector((state) => state[SLICE_NAME].data);
	const { hasPin } = useAppSelector((state) => state.auth.user);

	// useEffect(() => {
	// 	if (bundle.status === 'failed') {
	// 		popNotification(
	// 			'Error',
	// 			'Oops! Something went wrong, please try again.',
	// 			'danger',
	// 			5000
	// 		);

	// 		dispatch(resetState('bundle'));
	// 		// dispatch(setState(0));
	// 	}

	// 	if (bundle.status === 'success') {
	// 		popNotification(
	// 			'Success',
	// 			'Transaction completed successfully.',
	// 			'success',
	// 			5000
	// 		);

	// 		dispatch(resetState('bundle'));
	// 		dispatch(getUser());
	// 		dispatch(setState(0));
	// 	}
	// }, [dispatch, bundle.status]);

	const onConfirm = () => {
		if (!hasPin) {
			navigate('/transaction-pin');
		} else {
			dispatch(togglePinDialog(true));
		}
	};
	return (
		<div>
			<div>
				<h4 className="text-base mb-2">Your Order</h4>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Package:</p>
					<p className="text-sm font-semibold">{product?.package}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Smart Card Number:</p>
					<p className="text-sm font-semibold">{product?.device_number}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Subscription Cost:</p>
					<p className="text-sm font-semibold">
						{`₦${Number(product?.amount)?.toLocaleString()}`}
					</p>
				</div>

				<div className="flex items-center gap-4 mt-8">
					<Button
						block
						variant="solid"
						color="red-500"
						icon={<AiOutlineRollback />}
						className=""
						// disabled={bundle.status === 'pending'}
						onClick={() => dispatch(setState(1))}
					>
						Back
					</Button>
					<Button
						block
						variant="solid"
						icon={<BsBagCheckFill />}
						className="!bg-gray-900 hover:!bg-black"
						// loading={bundle.status === 'pending'}
						onClick={onConfirm}
					>
						Confirm
					</Button>
				</div>
			</div>
			{/* <RequirePin /> */}
		</div>
	);
};
export default Order;
