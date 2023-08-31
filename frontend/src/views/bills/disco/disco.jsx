import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useGetOperators } from '../store/hooks';
import reducer, { SLICE_NAME, useAppDispatch, useAppSelector } from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Disco = () => {
	const dispatch = useAppDispatch();

	const { data, isFetching } = useGetOperators('electricity');
	const { operators } = data || {};

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);

	console.log('Operators: ', operators);
	console.log('State: ', state);

	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>Has data</Loading>
		</div>
	);
};
export default Disco;
