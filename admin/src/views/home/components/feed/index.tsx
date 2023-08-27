import StatCards from "./StatCards"
import RecentDisputes from "./RecentDisputes"
import RecentProviders from "./RecentProviders"
import RecentCustomers from "./RecentCustomers"
import RecentBookings from "./RecentBookings"

const HomeFeed = () => {
    

    return (
        <div>
            <StatCards />
            <div className="mt-4">
                <RecentDisputes />
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
                <RecentProviders />
                <RecentCustomers />
                <RecentBookings />
            </div>
        </div>
    )
}
export default HomeFeed
