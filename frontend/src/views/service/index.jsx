import { Container } from "components/shared";
import reducer from "./store";
import { injectReducer } from "store/index";
import ServiceForm from "./components/ServiceForm";

injectReducer("service", reducer);

const Service = () => {
    return (
        <Container className="max-w-2xl h-screen">
            <div className="flex h-full justify-center items-center p-8">
                <div className="w-full">
                    <h1 className="font-bold text-xl text-center">Your Service Details</h1>

                    <ServiceForm />
                </div>
            </div>
        </Container>
    )
}
export default Service