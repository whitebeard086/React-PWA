import StatCards from "./StatCards"
import RecentDisputes from "./RecentDisputes"
import RecentProviders from "./RecentProviders"
import RecentCustomers from "./RecentCustomers"
import RecentBookings from "./RecentBookings"
import { GetHomeResponse } from '../../utils/types'

type Props = {
    data: Partial<GetHomeResponse>
    loading?: boolean
}

const HomeFeed = ({ data, loading }: Props) => {
    

    return (
        <div>
            <StatCards />
            <div className="mt-4">
                <RecentDisputes 
                    data={data}
                    loading={loading ?? false}
                />
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
                <RecentProviders data={data} />
                <RecentCustomers data={data} />
                <RecentBookings data={data} />
            </div>
        </div>
    )
}
export default HomeFeed
