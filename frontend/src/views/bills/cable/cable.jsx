import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useGetOperators } from '../store/hooks';
import { DataForm, Operators, Order, Products } from './components';
import reducer, { SLICE_NAME, useAppDispatch, useAppSelector } from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Cable = () => {
	const dispatch = useAppDispatch();

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);
	const { store, product, customer } = useAppSelector(
		(state) => state[SLICE_NAME].data
	);

	const { data, isFetching } = useGetOperators('television');
	const { operators } = data || {};

	console.log('Operators: ', operators);
	console.log('State: ', state);
	console.log('Store: ', store);
	console.log('Product: ', product);
	console.log('Customer: ', customer);

	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>
				{state.state ? (
					<>
						{state.steps === 1 && <DataForm />}
						{state.steps === 2 && <Order />}
					</>
				) : (
					<div className="grid gap-4">
						<Operators operators={operators} />
						{store && <Products />}
					</div>
				)}
			</Loading>
		</div>
	);
};
export default Cable;
