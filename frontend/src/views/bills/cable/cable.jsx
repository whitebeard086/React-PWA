import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useGetOperators } from '../store/hooks';
import reducer, { SLICE_NAME, useAppDispatch, useAppSelector } from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Cable = () => {
	const dispatch = useAppDispatch();

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);

	const { data, isFetching } = useGetOperators('television');
	const { operators } = data || {};

	console.log('Operators: ', operators);
	console.log('State: ', state);

	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>Has data</Loading>
		</div>
	);
};
export default Cable;
