import { useEffect, useState } from 'react';

import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useHasData } from '@/utils/hooks/useHasData';
import { DataForm, Operators, Order } from './components';
import reducer, {
	SLICE_NAME,
	getOperators,
	useAppDispatch,
	useAppSelector,
} from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Data = () => {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);
	const { operators, products, store } = useAppSelector(
		(state) => state[SLICE_NAME].data
	);

	const { hasData } = useHasData(products.data);
	const isFetching = ['pending', 'idle'].includes(operators.status);
	useEffect(() => {
		dispatch(getOperators());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log('Operators: ', operators);
	console.log('Products: ', products);
	console.log('Store: ', store);
	console.log('State: ', state);
	console.log('HasData: ', hasData);

	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>
				{state.state ? (
					<>{state.steps === 1 && <Order />}</>
				) : (
					<>
						<Operators />
						{hasData && <DataForm />}
					</>
				)}
			</Loading>
		</div>
	);
};
export default Data;
