import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import ServiceForm from "./components/ServiceForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./store/dataSlice";

injectReducer("service", reducer);

const Service = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <Container className="max-w-2xl">
            <div className="flex h-full justify-center items-center p-8">
                <div className="w-full h-full">
                    <h1 className="font-bold text-xl text-center">Your Service Details</h1>

                    <ServiceForm />
                </div>
            </div>
        </Container>
    )
}
export default Service