import { injectReducer } from "@/store"
import StatCards from "@/views/home/components/feed/StatCards"
import reducer, {  } from "../store"
import AllClients from "./components/AllClients"
import GettingData from "./components/GettingData"
import { useUsersData } from '../utils/hooks'

injectReducer('users', reducer)

const Clients = () => {
    const { data, isLoading:loading } = useUsersData()
    // const { loading, status,  } = useAppSelector((state) => state.users.data)

    return (
        <div>
            {loading ? (
                <GettingData />
            ):(
                <>
                    <StatCards />
                    <div className="mt-4">
                        <AllClients 
                            usersData={data ?? {}}
                            loading={loading}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
export default Clients