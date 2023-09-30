import { useTransaction } from '@/services/features/paymentApi';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { HiCheck, HiX } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import GettingSingle from './gettingSingle';

const SingleTransaction = () => {
	const { slug } = useParams();

	const { isLoading, isSuccess, transaction } = useTransaction(slug);

	console.log('isLoading: ', isLoading);
	console.log('transaction: ', transaction);
	console.log('slug: ', slug);

	return (
		<div className="p-4 mt-2">
			{isLoading ? (
				<GettingSingle />
			) : (
				<div className="mt-4 grid gap-5">
					<div className="flex flex-col items-center gap-2 font-bold">
						<div
							className={classNames(
								'h-24 w-24 card rounded-full flex items-center justify-center',
								transaction?.status === 'Success'
									? 'bg-emerald-100'
									: 'bg-orange-100'
							)}
						>
							{transaction?.status === 'Success' ? (
								<HiCheck className="w-12 h-12 fill-emerald-500" />
							) : (
								<HiX className="w-12 h-12 fill-orange-600" />
							)}
						</div>
						<p
							className={classNames(
								transaction?.status === 'Success'
									? 'text-emerald-500'
									: 'text-orange-600',
								'text-xl'
							)}
						>
							{transaction?.status}
						</p>
						<p className="text-xl font-bold">
							NGN {transaction?.final_amount?.toLocaleString()}
						</p>
					</div>
					<div className="flex flex-col gap-2 font-semibold w-full max-w-sm mx-auto">
						<p className="flex gap-3 justify-between items-center">
							<span>Charge:</span>
							<span>{transaction?.charge}</span>
						</p>
						<p className="flex gap-3 justify-between items-center">
							<span>Method:</span>
							<span>{transaction?.method}</span>
						</p>
						<p className="flex gap-3 justify-between items-center">
							<span>Service:</span>
							<span>{transaction?.type}</span>
						</p>
						<p className="flex gap-3 justify-between items-center">
							<span>Reference:</span>
							<span>{transaction?.reference}</span>
						</p>
						<p className="flex gap-3 justify-between items-center">
							<span>Date:</span>
							<span>
								{dayjs(transaction?.created_at).format('DD MMM YYYY hh:mm a')}
							</span>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default SingleTransaction;
