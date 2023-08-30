import { useEffect } from 'react'
import { injectReducer } from "@/store"
import StatCards from "@/views/home/components/feed/StatCards"
import reducer, { useAppSelector, useAppDispatch, usersIndex } from "../store"
import AllClients from "./components/AllClients"
import GettingData from "./components/GettingData"

injectReducer('users', reducer)

const Clients = () => {
    const dispatch = useAppDispatch()
    const { loading, status,  } = useAppSelector((state) => state.users.data)

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
                        <AllClients />
                    </div>
                </>
            )}
        </div>
    )
}
export default Clients