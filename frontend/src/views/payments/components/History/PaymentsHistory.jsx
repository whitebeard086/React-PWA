import { useSelector } from "react-redux"
import GettingData from "./GettingData"
import Data from "./Data"
import { Tabs } from "components/ui"

const PaymentsHistory = () => {
    const { verifying } = useSelector((state) => state.payments.data)
    const { userType } = useSelector((state) => state.auth.user)
    const { transactions } = useSelector((state) => state.payments.data)
    const topups = transactions?.filter((txn) => txn.type === 'Wallet Topup')
    const clientExpenses = transactions?.filter((txn) => txn.type === 'Service Payment')
    const { TabNav, TabList, TabContent } = Tabs

    return (
        <div className="mt-2 mb-2">
            <h4 className="text-lg font-bold text-gray-700 mb-4 text-center">Transactions</h4>

            {verifying ? (
                <GettingData />
            ):(
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
                                <Data transactions={topups} />
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
    )
}
export default PaymentsHistory