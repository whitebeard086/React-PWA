import { createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

export const paymentsAdapter = createEntityAdapter({
	selectId: (transaction) => transaction.uid,
});
const initialState = paymentsAdapter.getInitialState();

export const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		payments: builder.query({
			query: () => '/payments',
			transformResponse: (responseData) => {
				const payments = responseData.transactions;
				return paymentsAdapter.setAll(initialState, payments);
			},
			providesTags: (result) => [
				{ type: 'Payment', id: 'LIST' },
				...result.ids.map((id) => ({ type: 'Payment', id })),
			],
			providesTags: ['Payment'],
		}),
	}),
});

export const { usePaymentsQuery } = paymentApi;

// const { selectAll: selectAllTransactions, selectById: selectTransactionById } =
// 	paymentsAdapter.getSelectors((state) => state.api.payments);

// export const selectClientTopups = createSelector(
// 	[selectAllTransactions],
// 	(transactions) => transactions.filter((txn) => txn.type === 'Wallet Topup')
// );

// export const selectProviderTopups = createSelector(
// 	[selectAllTransactions],
// 	(transactions) =>
// 		transactions.filter(
// 			(txn) => txn.type === 'Wallet Topup' || txn.type === 'Service Payment'
// 		)
// );

// export const selectClientExpenses = createSelector(
// 	[selectAllTransactions],
// 	(transactions) => transactions.filter((txn) => txn.type === 'Service Payment')
// );
