import { useEffect } from 'react'
import { injectReducer } from "@/store"
import reducer, { homeIndex, useAppSelector, useAppDispatch } from "./store"

injectReducer('home', reducer)

const Home = () => {
    const dispatch = useAppDispatch();

    const {status} = useAppSelector((state) => state.home.data)
    console.log(status);

    useEffect(() => {
        dispatch(homeIndex())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>Home</div>
    )
}
export default Home