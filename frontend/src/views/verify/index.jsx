import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import reducer from "./store";
import { getCountries, setMessage } from "./store/dataSlice";
import { Container, Loading } from "@/components/shared";
import { injectReducer } from "@/store";

injectReducer("verify", reducer);

const Step1 = lazy(() => import("./components/Step1"))
const Step2 = lazy(() => import("./components/Step2"))

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { verifiedPhone } = useSelector((state) => state.auth.user);

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (verifiedPhone) {
            navigate('/home')
        }
    }, [navigate, verifiedPhone]) 

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const handleNext = useCallback(() => {
        dispatch(setMessage(''))
        setStep(step + 1)
    }, [dispatch, step])

    const handleBack = useCallback(() => {
        dispatch(setMessage(''))
        setStep(step - 1)
    }, [dispatch, step])
    console.log(step);

    return (
        <Container className="max-w-xl h-screen bg-white">
            <Suspense fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }>
                {step === 1 && <Step1 onNext={handleNext} />}
                {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
            </Suspense>
        </Container>
    )
}
export default Verify