/* eslint-disable react/prop-types */
import { usePaymentsQuery } from '@/services/features/paymentApi';
import Transaction from './transaction';

const PaymentData = () => {
	const { data: payments, isLoading, isSuccess } = usePaymentsQuery('payments');

	console.log('payment from data: ', payments);

	if (isSuccess) {
		return (
			<div className="flex flex-col gap-2">
				{payments.ids.map((paymentId) => (
					<Transaction key={paymentId} paymentId={paymentId} />
				))}
			</div>
		);
	}
	return '...';
};
export default PaymentData;
