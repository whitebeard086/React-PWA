import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import reducer from "./store";
import { getHomeData, getHomeGuestData } from "./store/dataSlice";
import GettingHomeFeed from "./components/GettingHomeFeed";
import HomeFeed from "./components/HomeFeed";
import { injectReducer } from "@/store";

injectReducer("home", reducer);

const Home = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.home.data)
    const { signedIn } = useSelector((state) => state.auth.session)
    // const loading = true

    useEffect(() => {
        signedIn ? dispatch(getHomeData()) : dispatch(getHomeGuestData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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