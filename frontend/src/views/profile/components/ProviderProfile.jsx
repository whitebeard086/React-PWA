import { useProvider } from '@/services/features/providerApi';
import { injectReducer } from '@/store';
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from '../store';
import GettingProvider from './GettingProvider';
import Provider from './Provider';

injectReducer('profile', reducer);

const ProviderProfile = () => {
	// const dispatch = useDispatch();
	const { providerSlug } = useParams();

	const { isLoading, provider, service, workdays, isSuccess } =
		useProvider(providerSlug);

	// const { gettingProvider } = useSelector((state) => state.profile.data);

	// useEffect(() => {
	//     dispatch(getProvider({ slug: providerSlug }));
	// }, [dispatch, providerSlug]);

	return (
		<div className="mt-2 p-4">
			{isLoading ? (
				<GettingProvider />
			) : (
				<>
					{isSuccess && (
						<Provider
							service={service}
							provider={provider}
							workdays={workdays}
						/>
					)}
				</>
			)}
		</div>
	);
};
export default ProviderProfile;
