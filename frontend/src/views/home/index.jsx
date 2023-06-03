import { Button } from "components/ui"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import useAuth from "utils/hooks/useAuth";
import reducer from "./store";
import { injectReducer } from "store/index";
import { getHomeData } from "./store/dataSlice";
import GettingHomeFeed from "./components/GettingHomeFeed";
import HomeFeed from "./components/HomeFeed";

injectReducer("home", reducer);

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { handleSignOut } = useAuth();

    const { loading } = useSelector((state) => state.home.data)
    // const loading = true

    useEffect(() => {
        dispatch(getHomeData())
    }, [dispatch])

    return (
        <div className="mt-10">
            {loading ? (
                <GettingHomeFeed />
            ) : (
                <HomeFeed />
            )}
        </div>
    )
}
export default Home