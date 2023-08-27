import { useEffect } from 'react'
import { injectReducer } from "@/store"
import reducer, { homeIndex, useAppSelector, useAppDispatch } from "./store"
import { Loading } from '@/components/shared'
import GettingData from './components/GettingData'
import HomeFeed from './components/feed'

injectReducer('home', reducer)

const Home = () => {
    const dispatch = useAppDispatch();

    const { status, loading } = useAppSelector((state) => state.home.data)

    useEffect(() => {
        dispatch(homeIndex())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            { loading ? (
                <GettingData />
            ) : (
                <HomeFeed />
            )}
        </div>
    )
}
export default Home