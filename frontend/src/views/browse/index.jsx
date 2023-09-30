import { useBrowse } from '@/services/features/browseApi';
import { injectReducer } from '@/store';
import { useState } from 'react';
import BrowseFeed from './components/BrowseFeed';
import GettingFeed from './components/GettingFeed';
import Search from './components/search';
import reducer from './store';

injectReducer('browse', reducer);

const Browse = () => {
	const { isLoading, categories } = useBrowse();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredCategories = categories?.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="mt-2 p-4">
			<div>
				<Search onSearch={setSearchQuery} />
			</div>

			<div className="mt-4">
				{isLoading ? (
					<GettingFeed />
				) : (
					<BrowseFeed categories={filteredCategories} />
				)}
			</div>
		</div>
	);
};
export default Browse;
