import { useGuest, useHome } from '@/services/features/homeApi';
import { injectReducer } from '@/store';
import { useDispatch } from 'react-redux';
import GettingHomeFeed from './components/GettingHomeFeed';
import HomeFeed from './components/HomeFeed';
import reducer from './store';

injectReducer('home', reducer);

const Home = () => {
	const dispatch = useDispatch();
	const { isLoading } = useGuest();
	useHome();

	// const { loading } = useSelector((state) => state.home.data);
	// const { signedIn } = useSelector((state) => state.auth.session);
	// const loading = true

	// useEffect(() => {
	// 	signedIn ? dispatch(getHomeData()) : dispatch(getHomeGuestData());
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className="mt-10 mb-8 px-4">
			{/* <HomeFeed /> */}
			{isLoading ? <GettingHomeFeed /> : <HomeFeed />}
		</div>
	);
};
export default Home;
