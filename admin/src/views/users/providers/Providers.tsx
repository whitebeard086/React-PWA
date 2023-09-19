import { injectReducer } from "@/store"
import reducer, { useAppSelector, useAppDispatch, usersIndex } from "../store"
import { useEffect } from "react"
import GettingData from "./components/GettingData"
import AllProviders from "./components/AllProviders"
import StatCards from "@/views/home/components/feed/StatCards"
import { useUsersData } from '../utils/hooks'

injectReducer('users', reducer)

const Providers = () => {
    const { data, isLoading: loading } = useUsersData()
    // const { loading, status } = useAppSelector((state) => state.users.data)

    return (
        <div>
            {loading ? (
                <GettingData />
            ):(
                <>
                    <StatCards />
                    <div className="mt-4">
                        <AllProviders 
                            providersData={data ?? {}}
                            loading={loading}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
export default Providers