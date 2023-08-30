import { injectReducer } from "@/store"
import reducer, { useAppSelector, useAppDispatch, usersIndex } from "../store"
import { useEffect } from "react"
import GettingData from "./components/GettingData"
import AllProviders from "./components/AllProviders"
import StatCards from "@/views/home/components/feed/StatCards"

injectReducer('users', reducer)

const Providers = () => {
    const dispatch = useAppDispatch()
    const { loading, status } = useAppSelector((state) => state.users.data)

    useEffect(() => {
        if (status !== 'success') {
            dispatch(usersIndex())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {loading ? (
                <GettingData />
            ):(
                <>
                    <StatCards />
                    <div className="mt-4">
                        <AllProviders />
                    </div>
                </>
            )}
        </div>
    )
}
export default Providers