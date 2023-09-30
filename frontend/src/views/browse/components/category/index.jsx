import { useCategoryByGet } from '@/services/features/browseApi';
import { injectReducer } from '@/store';
import reducer from '@/views/browse/store';
/* import { useEffect } from 'react';
import { getCategory } from '../../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux'; */
import { useParams } from 'react-router-dom';
import GettingCategory from './GettingCategory';
import Services from './Services';

injectReducer('browse', reducer);

const Category = () => {
	// const dispatch = useDispatch();
	const { categorySlug } = useParams();

	const { isLoading, category, services, isSuccess } =
		useCategoryByGet(categorySlug);

	// console.log('fetching category: ', isLoading);
	// console.log('fetching success: ', isSuccess);
	// console.log('services before services', services);
	// console.log('category before services', category);

	// const { gettingCategory } = useSelector((state) => state.browse.data);

	// useEffect(() => {
	// 	dispatch(getCategory({ slug: categorySlug }));
	// }, [categorySlug, dispatch]);

	return (
		<div className="mt-2 p-4">
			{isLoading ? (
				<div>
					<GettingCategory />
				</div>
			) : (
				<>{isSuccess && <Services services={services} category={category} />}</>
			)}
		</div>
	);
};
export default Category;
