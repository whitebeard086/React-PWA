import { usePaymentsQuery } from '@/services/features/paymentApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Transaction = ({ paymentId }) => {
	const { payment } = usePaymentsQuery('payments', {
		selectFromResult: ({ data }) => ({
			payment: data?.entities[paymentId],
		}),
	});
	const { userType } = useSelector((state) => state.auth.user);
	return (
		<Link to={payment.uid} className="card p-4 ">
			<div className="flex items-center gap-4 justify-between">
				<h4 className="text-lg font-bold text-gray-700">{payment.type}</h4>
				{payment.type === 'Wallet Topup' && (
					<p className="text-lg font-semibold text-green-500">
						+₦{payment.amount?.toLocaleString()}
					</p>
				)}
				{payment.type === 'Service Payment Refund' && (
					<p className="text-lg font-semibold text-green-500">
						+₦{payment.amount?.toLocaleString()}
					</p>
				)}
				{payment.type.split(' ')[1] === 'Airtime' && (
					<p className="text-lg font-semibold text-green-500">
						+₦{payment.amount?.toLocaleString()}
					</p>
				)}
				{userType === 'Provider' && payment.type === 'Service Payment' && (
					<p className="text-lg font-semibold text-green-500">
						+₦{payment.amount?.toLocaleString()}
					</p>
				)}
				{userType === 'Client' && payment.type === 'Service Payment' && (
					<p className="text-lg font-semibold text-red-500">
						-₦{payment.amount?.toLocaleString()}
					</p>
				)}
			</div>

			<div className="mt-2 flex items-center gap-4 justify-between">
				{payment.status === 'Success' && (
					<p className="font-semibold text-green-500">Completed</p>
				)}
				<p className="font-semibold">
					{dayjs(payment.created_at).format('DD MMM YYYY hh:mm a')}
				</p>
			</div>
		</Link>
	);
};
export default Transaction;
