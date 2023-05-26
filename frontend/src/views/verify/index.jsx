import { Container } from "components/shared"
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import reducer from "./store";
import { injectReducer } from "store/index";
import { getCountries, setMessage } from "./store/dataSlice";

injectReducer("verify", reducer);

const Step1 = lazy(() => import("./components/Step1"))
const Step2 = lazy(() => import("./components/Step2"))

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);

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
        <Container className="max-w-sm h-screen">
            <Suspense fallback={<></>}>
                {step === 1 && <Step1 onNext={handleNext} />}
                {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
            </Suspense>
        </Container>
    )
}
export default Verify