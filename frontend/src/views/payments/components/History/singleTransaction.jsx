import { usePaymentsQuery } from '@/services/features/paymentApi';
import dayjs from 'dayjs';
import { HiCheck } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
const SingleTransaction = () => {
	const location = useLocation();
	const slug = location.pathname.split('/')[2];

	const { payment } = usePaymentsQuery('payments', {
		selectFromResult: ({ data }) => ({
			payment: data?.entities[slug],
		}),
	});

	console.log('slug: ', payment);

	return (
		<div className="mt-4">
			<div className="flex flex-col items-center gap-3 font-bold">
				<div className="h-24 w-24 card rounded-full flex items-center justify-center">
					<HiCheck className="w-12 h-12 fill-emerald-500" />
				</div>
				<p className="text-emerald-500 text-xl">{payment.status}</p>
			</div>
			<p className="font-semibold">
				{dayjs(payment.created_at).format('DD MMM YYYY hh:mm a')}
			</p>
		</div>
	);
};
export default SingleTransaction;
