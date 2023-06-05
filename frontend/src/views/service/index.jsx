import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import ServiceForm from "./components/ServiceForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./store/dataSlice";
import { useNavigate } from "react-router-dom";

injectReducer("service", reducer);

const Service = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { hasService } = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (hasService) {
            navigate(-1);
        }

        dispatch(getCategories());
    }, [dispatch, hasService, navigate]);

    return (
        <Container className="max-w-xl">
            <div className="flex h-full justify-center items-center p-8">
                <div className="w-full h-full">
                    <h1 className="font-bold text-xl text-center">
                        Your Service Details
                    </h1>

                    <ServiceForm />
                </div>
            </div>
        </Container>
    );
};
export default Service;
