import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import reducer from "./store";
import { getHomeData } from "./store/dataSlice";
import GettingHomeFeed from "./components/GettingHomeFeed";
import HomeFeed from "./components/HomeFeed";
import { injectReducer } from "@/store";

injectReducer("home", reducer);

const Home = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.home.data)
    // const loading = true

    useEffect(() => {
        dispatch(getHomeData())
    }, [dispatch])

    return (
        <div className="mt-10 mb-8 px-4">
            {loading ? (
                <GettingHomeFeed />
            ) : (
                <HomeFeed />
            )}
        </div>
    )
}
export default Home