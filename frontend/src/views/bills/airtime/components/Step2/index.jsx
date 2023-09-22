/* eslint-disable react/prop-types */
import { Button } from '@/components/ui';
import { AiOutlineRollback } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { togglePinDialog } from '../../store/stateSlice';
import RequirePin from './RequirePin';

const Step2 = ({ onBack, complete }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { product } = useSelector((state) => state.airtime.data);
	const { hasPin } = useSelector((state) => state.auth.user);

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
					<p className="text-sm">Operator:</p>
					<p className="text-sm font-semibold">{product?.package}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Phone Number:</p>
					<p className="text-sm font-semibold">{product?.device_number}</p>
				</div>

				<div className="flex items-center gap-2 justify-between">
					<p className="text-sm">Recharge Amount:</p>
					<p className="text-sm font-semibold">
						{`₦${product?.amount?.toLocaleString()}`}
					</p>
				</div>

				<div className="flex items-center gap-4 mt-8">
					<Button
						block
						variant="solid"
						color="red-500"
						icon={<AiOutlineRollback />}
						onClick={() => onBack()}
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
			<RequirePin onComplete={complete} />
		</div>
	);
};
export default Step2;
