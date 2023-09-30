import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		payments: builder.query({
			query: () => '/payments',
			providesTags: ['Payment'],
		}),
		getTransaction: builder.query({
			query: (slug) => `/payments/${slug}`,
			providesTags: (result, error, slug) => [{ type: 'Payment', id: slug }],
		}),
		updateTransaction: builder.mutation({
			query: (data) => ({
				url: '/deposit/update',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User', 'Payment'],
		}),
	}),
});

export const {
	usePaymentsQuery,
	useGetTransactionQuery,
	useUpdateTransaction,
} = paymentApi;

export function usePayment() {
	const {
		transactions,
		clientTopups,
		providerTopups,
		clientExpenses,
		status,
		isLoading,
		isError,
		isSuccess,
	} = usePaymentsQuery(undefined, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => {
			const transactions = data?.transactions ?? [];

			const clientTopups = transactions.filter(
				(txn) => txn.type === 'Wallet Topup'
			);
			const providerTopups = transactions.filter(
				(txn) => txn.type === 'Wallet Topup' || txn.type === 'Service Payment'
			);
			const clientExpenses = transactions.filter(
				(txn) => txn.type === 'Service Payment'
			);

			return {
				data: data ?? {},
				status: data?.status,
				transactions,
				clientTopups,
				providerTopups,
				clientExpenses,
				isLoading,
				isError,
				isSuccess,
			};
		},
	});

	return {
		transactions,
		clientTopups,
		providerTopups,
		clientExpenses,
		status,
		isLoading,
		isError,
		isSuccess,
	};
}

export function useTransaction(slug) {
	const { data, transaction, isLoading, isError, isSuccess } =
		useGetTransactionQuery(slug, {
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data ?? {},
				transaction: data?.transaction,
				isLoading,
				isError,
				isSuccess,
			}),
		});

	return {
		data,
		transaction,
		isLoading,
		isError,
		isSuccess,
	};
}
