// import { useEffect } from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import { RequirePin } from '.';
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

	const { product } = useAppSelector((state) => state[SLICE_NAME].data);
	const { hasPin } = useAppSelector((state) => state.auth.user);

	// console.log('Product: ', product);

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
					<p className="text-sm">Disco:</p>
					<p className="text-sm font-semibold">{product?.disco}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Meter Number:</p>
					<p className="text-sm font-semibold">{product?.device_number}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Bill Cost:</p>
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
						onClick={() => dispatch(setState(1))}
					>
						Back
					</Button>
					<Button
						block
						variant="solid"
						icon={<BsBagCheckFill />}
						className="!bg-gray-900 hover:!bg-black"
						onClick={onConfirm}
					>
						Confirm
					</Button>
				</div>
			</div>
			<RequirePin />
		</div>
	);
};
export default Order;
