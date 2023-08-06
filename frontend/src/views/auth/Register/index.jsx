// import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/shared";
import { injectReducer } from "../../../store";
import reducer from "../store";
import { useEffect } from "react";
import SignupForm from "./components/SignupForm";
import TermsDialog from "./components/TermsDialog";
import { useDispatch } from "react-redux";
import { getProfileTypes } from "../store/dataSlice";

injectReducer('authentication', reducer);

const Register = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileTypes())
    }, [dispatch])

    // const goBack = () => {
    //     navigate(-1);
    // }
    
    return (
        <Container className="max-w-xl bg-white p-6">
            <div className="w-full">
                <div className="w-full flex justify-center">
                    <img className="w-72" src="/img/signup.png" alt="" />
                </div>

                <div className="flex flex-col items-center gap-4 w-full justify-center">
                    <h1 className="font-bold text-lg">Register to continue</h1>
                </div>

                <SignupForm />
                <TermsDialog />
            </div>
        </Container>
    )
}
export default Register