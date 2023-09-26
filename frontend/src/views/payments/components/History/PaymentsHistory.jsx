import Tabs from '@/components/ui/Tabs';
import { useSelector } from 'react-redux';
import Data from './Data';
import GettingData from './GettingData';

const PaymentsHistory = () => {
	const { verifying } = useSelector((state) => state.payments.data);
	const { userType } = useSelector((state) => state.auth.user);
	const { transactions } = useSelector((state) => state.payments.data);
	const clientTopups = transactions?.filter(
		(txn) => txn.type === 'Wallet Topup'
	);
	const providerTopups = transactions?.filter(
		(txn) => txn.type === 'Wallet Topup' || txn.type === 'Service Payment'
	);
	const clientExpenses = transactions?.filter(
		(txn) => txn.type === 'Service Payment'
	);
	const { TabNav, TabList, TabContent } = Tabs;

	console.log('Transactions: ', transactions);
	return (
		<div className="mt-2 mb-2">
			<h4 className="text-lg font-bold text-gray-700 mb-4">Transactions</h4>

			{verifying ? (
				<GettingData />
			) : (
				<>
					{/* <Data /> */}
					<Tabs defaultValue="all" variant="pill">
						<TabList>
							<TabNav value="all">All</TabNav>
							<TabNav value="topups">Topups</TabNav>
							<TabNav value="expenses">Expenses</TabNav>
							{userType === 'Provider' && (
								<TabNav value="withdrawals">Withdrawals</TabNav>
							)}
						</TabList>
						<div className="mt-4">
							<TabContent value="all">
								<Data transactions={transactions} />
							</TabContent>
							<TabContent value="topups">
								{userType === 'Client' && <Data transactions={clientTopups} />}
								{userType === 'Provider' && (
									<Data transactions={providerTopups} />
								)}
							</TabContent>
							<TabContent value="expenses">
								{userType === 'Client' && (
									<Data transactions={clientExpenses} />
								)}
							</TabContent>
						</div>
					</Tabs>
				</>
			)}
		</div>
	);
};
export default PaymentsHistory;
