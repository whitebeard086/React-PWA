import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { Container } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHasVisited } from "../../store/auth/userSlice";

const Landing = () => {
    const Step1 = lazy(() => import("./components/Step1"))
    const Step2 = lazy(() => import("./components/Step2"))
    const Step3 = lazy(() => import("./components/Step3"))
    const Step4 = lazy(() => import("./components/Step4"))
    const Step5 = lazy(() => import("./components/Step5"))

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [step, setStep] = useState(0);

    useEffect(() => {
        dispatch(setHasVisited(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNext = useCallback(() => {
        setStep(step + 1)
    }, [step])

    const handleSkip = () => {
        navigate("/register")
    }

    // const onGetStarted = useCallback(() => {
    //     navigate("/register")
    // }, [navigate])

    return (
        <Container className="max-w-sm">
            <Suspense fallback={<div className="bg-primary-500 w-full h-screen"></div>}>
                {step === 0 && <Step1 onNext={handleNext} onSkip={handleSkip} />}
                {step === 1 && <Step2 onNext={handleNext} onSkip={handleSkip} />}
                {step === 2 && <Step3 onNext={handleNext} onSkip={handleSkip} />}
                {step === 3 && <Step4 onNext={handleNext} onSkip={handleSkip} />}
                {step === 4 && <Step5 onNext={handleNext} onSkip={handleSkip} />}
            </Suspense>
        </Container>
    )
}
export default Landing