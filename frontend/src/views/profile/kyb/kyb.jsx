import { Avatar } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { injectReducer } from '@/store';
import UploadImage from '@/views/settings/components/User/UploadImage';
import { HiOutlineUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAddress, useKybUpdate } from '../store';
import { ActionBar, AddressForm, ProfileForm } from './components';
import reducer, { SLICE_NAME, useAppSelector } from './store';

injectReducer(`${SLICE_NAME}`, reducer);

const Kyb = () => {
	const { imagePath } = appConfig;
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	const {
		mutate: createAddress,
		isLoading: isCreating,
		isSuccess: created,
	} = useAddress();
	const {
		mutate: updateKyb,
		isLoading: isUpdating,
		isSuccess: updated,
	} = useKybUpdate();

	const { state } = useAppSelector((state) => state[SLICE_NAME].state);
	const { profile } = useAppSelector((state) => state.auth.user);

	if (
		profile?.address &&
		profile?.gender &&
		profile?.dob &&
		profile?.place_of_birth &&
		profile?.image
	) {
		goBack();
	}

	console.log('state: ', state);
	console.log('profile: ', profile);

	return (
		<div className="bg-white min-h-[80vh] space-y-2">
			<div className="w-[96%] mx-auto space-y-3">
				<ActionBar />
				<div className="flex flex-col items-center xx:flex-row xx:justify-between gap-4 cursor-pointer relative">
					<div className="relative">
						<Avatar
							size={150}
							className="relative"
							icon={!profile?.image ? <HiOutlineUser /> : null}
							src={profile?.image ? `${imagePath}/${profile.image}` : null}
						/>
						<UploadImage />
					</div>
					<ProfileForm
						profile={profile}
						mutate={updateKyb}
						isLoading={isUpdating}
						isSuccess={updated}
					/>
				</div>
				<AddressForm
					profile={profile}
					mutate={createAddress}
					isLoading={isCreating}
					isSuccess={created}
				/>
			</div>
		</div>
	);
};
export default Kyb;
