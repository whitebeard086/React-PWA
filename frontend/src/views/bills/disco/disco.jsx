import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useGetOperators } from '../store/hooks';
import { DataForm, Operators } from './components';
import reducer, { SLICE_NAME, useAppDispatch, useAppSelector } from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Disco = () => {
	const dispatch = useAppDispatch();

	const { data, isFetching } = useGetOperators('electricity');
	const { operators } = data || {};

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);
	const { store } = useAppSelector((state) => state[SLICE_NAME].data);

	console.log('Operators: ', operators);
	console.log('State: ', state);
	console.log('Store: ', store);

	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>
				{state.state ? (
					<>{state.steps === 1 && <DataForm data={store} />}</>
				) : (
					<>
						<Operators operators={operators} />
					</>
				)}
			</Loading>
		</div>
	);
};
export default Disco;
