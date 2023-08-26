import classNames from 'classnames';
import { useEffect } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/ui';
import { popNotification } from '@/utils/toast';
import {
	SLICE_NAME,
	getProducts,
	resetState,
	setOperator,
	useAppDispatch,
	useAppSelector,
} from '../store';

const Operators = () => {
	const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	const { operators, operator, products } = useAppSelector(
		(state) => state[SLICE_NAME].data
	);
	const { status } = products;

	const onSelectOperator = (operator) => {
		dispatch(setOperator(operator));
		dispatch(
			getProducts({
				category: operator.id,
			})
		);
	};

	console.log('Operators: ', operators);

	useEffect(() => {
		if (status === 'error') {
			popNotification(
				'Error',
				'Oops! Something went wrong, please try again.',
				'danger',
				5000
			);

			dispatch(resetState('products'));
		}
	}, [dispatch, status]);

	return (
		<>
			<p className="text-sm font-semibold mb-4">Choose a Network Operator</p>
			<div className="flex items-center gap-4 justify-around flex-wrap">
				{operators?.data?.map((item) => (
					<div
						key={item.id}
						className={classNames(
							'flex flex-col gap-1 items-center cursor-pointer',
							status === 'success' &&
								operator.name === item.name &&
								'shadow-md px-4 py-2 bg-white rounded-lg border-b-2 border-primary-500'
						)}
						onClick={() => onSelectOperator(item)}
					>
						{item.name === 'Airtel' && (
							<Avatar
								size="lg"
								src="/img/airtel.jpg"
								icon={<HiOutlineUser />}
							/>
						)}
						{item.name === '9Mobile' && (
							<Avatar
								className="bg-white"
								size="lg"
								src="/img/9mobile.png"
								icon={<HiOutlineUser />}
							/>
						)}
						{item.name === 'Glo' && (
							<Avatar
								className="bg-white"
								size="lg"
								src="/img/Glo.png"
								icon={<HiOutlineUser />}
							/>
						)}
						{item.name === 'MTN' && (
							<Avatar
								className="bg-white"
								size="lg"
								src="/img/MTN.png"
								icon={<HiOutlineUser />}
							/>
						)}
						<p className="text-sm">{item.name}</p>
					</div>
				))}
			</div>
		</>
	);
};
export default Operators;
