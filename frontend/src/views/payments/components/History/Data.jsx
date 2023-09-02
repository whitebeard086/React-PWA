/* eslint-disable react/prop-types */
import { Card } from '@/components/ui';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const Data = ({ transactions }) => {
	const { userType } = useSelector((state) => state.auth.user);

	return (
		<div className="flex flex-col gap-4">
			{transactions?.map((txn) => (
				<Card key={txn.id}>
					<div className="flex items-center gap-4 justify-between">
						<h4 className="text-lg font-bold text-gray-700">{txn.type}</h4>
						{txn.type === 'Wallet Topup' && (
							<p className="text-lg font-semibold text-green-500">
								+₦{txn.amount?.toLocaleString()}
							</p>
						)}
						{txn.type.split(' ')[1] === 'Airtime' && (
							<p className="text-lg font-semibold text-green-500">
								+₦{txn.amount?.toLocaleString()}
							</p>
						)}
						{userType === 'Provider' && txn.type === 'Service Payment' && (
							<p className="text-lg font-semibold text-green-500">
								+₦{txn.amount?.toLocaleString()}
							</p>
						)}
						{userType === 'Client' && txn.type === 'Service Payment' && (
							<p className="text-lg font-semibold text-red-500">
								-₦{txn.amount?.toLocaleString()}
							</p>
						)}
					</div>

					<div className="mt-2 flex items-center gap-4 justify-between">
						{txn.status === 'Success' && (
							<p className="font-semibold text-green-500">Completed</p>
						)}
						<p className="font-semibold">
							{dayjs(txn.created_at).format('DD MMM YYYY hh:mm a')}
						</p>
					</div>
				</Card>
			))}
		</div>
	);
};
export default Data;
