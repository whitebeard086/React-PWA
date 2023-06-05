import { useDispatch, useSelector } from "react-redux";
import Search from "./components/search"
import reducer from "./store";
import { injectReducer } from "store/index";
import { useEffect } from "react";
import { getBrowseData } from "./store/dataSlice";
import GettingFeed from "./components/GettingFeed";
import BrowseFeed from "./components/BrowseFeed";

injectReducer("browse", reducer);

const Browse = () => {
    const dispatch = useDispatch()

    const { loading } = useSelector((state) => state.browse.data)

    useEffect(() => {
        dispatch(getBrowseData())
    }, [dispatch])

    return (
        <div className="mt-2 p-4">
            <div>
                <Search />
            </div>

            <div className="mt-4">
                {loading ? (
                    <GettingFeed />
                ) : (
                    <BrowseFeed />
                )}
            </div>
        </div>
    )
}
export default Browse