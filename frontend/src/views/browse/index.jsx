import { useBrowse } from '@/services/features/browseApi';
import { injectReducer } from '@/store';
import { useDispatch } from 'react-redux';
import BrowseFeed from './components/BrowseFeed';
import GettingFeed from './components/GettingFeed';
import Search from './components/search';
import reducer from './store';

injectReducer('browse', reducer);

const Browse = () => {
	const dispatch = useDispatch();

	const { isLoading } = useBrowse();

	// const { loading } = useSelector((state) => state.browse.data);

	// useEffect(() => {
	//     dispatch(getBrowseData());
	// }, [dispatch]);

	return (
		<div className="mt-2 p-4">
			<div>
				<Search />
			</div>

			<div className="mt-4">{isLoading ? <GettingFeed /> : <BrowseFeed />}</div>
		</div>
	);
};
export default Browse;
