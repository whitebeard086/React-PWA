import { Avatar, Skeleton } from '@/components/ui';
import appConfig from '@/configs/app.config';
import { useClient } from '@/services/features/clientApi';
import { HiOutlineUser } from 'react-icons/hi';
import { useParams } from 'react-router-dom';

const Client = () => {
	const { clientSlug } = useParams();
	const { imagePath } = appConfig;

	const { isLoading, client } = useClient(clientSlug);

	console.log(client);
	return (
		<div className="mt-2 p-4">
			{isLoading ? (
				<div className="flex flex-col items-center gap-3">
					<Skeleton height="150px" width="150px" />
					<Skeleton height="20px" width="20%" />
					<Skeleton height="20px" width="30%" />
				</div>
			) : (
				<div className="flex flex-col items-center gap-3">
					<Avatar
						size={150}
						icon={<HiOutlineUser />}
						src={client?.image ? `${imagePath}/${client.image}` : null}
					/>
					<div className="flex flex-col justify-center items-center">
						<h4 className="text-lg font-bold text-primary-500">
							{client?.first_name} {client?.last_name}
						</h4>
						<p className="text-base font-semibold text-primary-500">
							{client?.email}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default Client;
