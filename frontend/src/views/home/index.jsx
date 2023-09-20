import { injectReducer } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GettingHomeFeed from './components/GettingHomeFeed';
import HomeFeed from './components/HomeFeed';
import reducer from './store';
import { getHomeData, getHomeGuestData } from './store/dataSlice';

injectReducer('home', reducer);

const Home = () => {
	const dispatch = useDispatch();

	const { loading } = useSelector((state) => state.home.data);
	const { signedIn } = useSelector((state) => state.auth.session);
	// const loading = true
	console.log('loading from home: ', loading);

	useEffect(() => {
		signedIn ? dispatch(getHomeData()) : dispatch(getHomeGuestData());
		console.log('Get home data ran');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="mt-10 mb-8 px-4">
			{/* <HomeFeed /> */}
			{loading ? <GettingHomeFeed /> : <HomeFeed />}
		</div>
	);
};
export default Home;
