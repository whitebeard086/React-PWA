import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { Avatar } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { HiUser } from 'react-icons/hi';
import { MdArrowBack } from 'react-icons/md';
import { setState, useAppDispatch } from '../store';

dayjs.extend(advancedFormat);

const History = ({ referrals }) => {
	const dispatch = useAppDispatch();
	const path = appConfig.imagePath;

	const { data, status } = referrals;

	const goBack = () => {
		dispatch(setState(0));
	};
	return (
		<div className="w-[96%] mx-auto">
			<MdArrowBack className="h-6 w-6 hover:cursor-pointer" onClick={goBack} />
			<div className="mt-3 grid gap-3">
				{['pending', 'idle'].includes(status) ? (
					'loading...'
				) : (
					<>
						{data.length === 0 ? (
							<p>No referrals</p>
						) : (
							<>
								{data.map((referral) => {
									const { image, first_name, last_name, created_at } =
										referral?.referred;
									return (
										<div
											key={referral.id}
											className="flex gap-3 items-center bg-gray-100 p-3 rounded-lg"
										>
											<Avatar
												size={40}
												shape="circle"
												src={image ? `${path}/${image}` : null}
												icon={!image ? <HiUser /> : null}
											/>
											<p className="text-xl font-extrabold">
												{first_name} {last_name}
											</p>
											<p className="ml-auto font-semibold">
												{dayjs(created_at).format('Do MMM YYYY')}
											</p>
										</div>
									);
								})}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};
export default History;
