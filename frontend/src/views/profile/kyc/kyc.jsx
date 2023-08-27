import { injectReducer } from '@/store';
import { ActionBar, Identification } from './components';
import reducer, {
	SLICE_NAME,
	// getUser,
	useAppDispatch,
	useAppSelector,
} from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Kyc = () => {
	const dispatch = useAppDispatch();

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);
	const { user } = useAppSelector((state) => state[SLICE_NAME].data);
	const { profile } = useAppSelector((state) => state.auth.user);

	// useEffect(() => {
	// 	dispatch(getUser());
	// }, [dispatch]);

	// console.log('user: ', user);
	console.log('state: ', state);
	console.log('profile: ', profile);

	return (
		<div className="bg-white min-h-[80vh] space-y-2">
			<div className="w-[96%] mx-auto">
				<ActionBar />
				<Identification userId={profile?.id} />
			</div>
		</div>
	);
};
export default Kyc;
