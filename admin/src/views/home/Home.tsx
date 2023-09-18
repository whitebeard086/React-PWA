import { useEffect } from 'react'
import { injectReducer } from "@/store"
import reducer, { homeIndex, useAppSelector, useAppDispatch } from "./store"
import GettingData from './components/GettingData'
import HomeFeed from './components/feed'
import { useHomeData } from './utils/hooks'
import InvoiceDialog from '../handyMan/inDispute/components/InvoiceDialog'

injectReducer('home', reducer)

const Home = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading: loading } = useHomeData()

    // const { loading } = useAppSelector((state) => state.home.data)

    useEffect(() => {
        dispatch(homeIndex())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            { loading ? (
                <GettingData />
            ) : (
                <HomeFeed 
                    data={data ?? {}}
                    loading={loading}
                />
            )}
            <InvoiceDialog />
        </div>
    )
}
export default Home