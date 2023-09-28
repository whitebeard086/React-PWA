import { useEffect } from 'react';

import { injectReducer } from '@/store';
import { Actions, History, Intro } from './components';
import reducer, {
	SLICE_NAME,
	getReferrals,
	getSystemConfig,
	useAppDispatch,
	useAppSelector,
} from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Referral = () => {
	const dispatch = useAppDispatch();

	const { referrals } = useAppSelector((state) => state[SLICE_NAME].data);
	const { state } = useAppSelector((state) => state[SLICE_NAME].state);

	useEffect(() => {
		dispatch(getSystemConfig())
		dispatch(getReferrals());
	}, [dispatch]);

	console.log('referrals: ', referrals);
	console.log('state: ', state);
	return (
		<div className="bg-white min-h-[80vh] space-y-2">
			{state.state ? (
				<>{state.steps === 1 && <History referrals={referrals} />}</>
			) : (
				<>
					<Intro />
					<Actions />
				</>
			)}
		</div>
	);
};
export default Referral;
