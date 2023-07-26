import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCategory } from "views/browse/store/dataSlice";
import GettingCategory from "./GettingCategory";
import { injectReducer } from "store";
import reducer from "views/browse/store";
import Services from "./Services";

injectReducer("browse", reducer);

const Category = () => {
    const dispatch = useDispatch();
    const { categorySlug } = useParams();

    const { gettingCategory } = useSelector((state) => state.browse.data)
    
    useEffect(() => {
        dispatch(getCategory({ slug: categorySlug }))
    }, [categorySlug, dispatch])
    return (
        <div className="mt-2 p-4">
            {gettingCategory ? (
                <div>
                    <GettingCategory />
                </div>
            ):(
                <div>
                    <Services />
                </div>
            )}
        </div>
    )
}
export default Category