import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProvider } from "../store/dataSlice";
import { injectReducer } from "@/store";
import reducer from "../store";
import GettingProvider from "./GettingProvider";
import Provider from "./Provider";

injectReducer("profile", reducer);

const ProviderProfile = () => {
    const dispatch = useDispatch();
    const { providerSlug } = useParams();

    const { gettingProvider } = useSelector((state) => state.profile.data);

    useEffect(() => {
        dispatch(getProvider({ slug: providerSlug }));
    }, [dispatch, providerSlug]);

    return (
        <div className="mt-2 p-4">
            {gettingProvider ? <GettingProvider /> : <Provider />}
        </div>
    );
};
export default ProviderProfile;
