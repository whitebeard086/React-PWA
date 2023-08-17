import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOperators } from "./store/dataSlice";
import { Loading } from "@/components/shared";
import { useCallback } from "react";
import { Suspense } from "react";
import { lazy } from "react";

injectReducer("airtime", reducer);

const Airtime = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);

    const Step1 = lazy(() => import("./components/Step1"));
    const Step2 = lazy(() => import("./components/Step2"));

    useEffect(() => {
        dispatch(getOperators());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = useCallback(() => {
        setStep(step + 1);
    }, [step]);

    const handleBack = useCallback(() => {
        setStep(step - 1);
    }, [step]);

    return (
        <div className="mt-2 p-4">
            <Suspense
                fallback={
                    <div className="flex flex-auto flex-col h-[100vh]">
                        <Loading loading={true} />
                    </div>
                }
            >
                {step === 1 && <Step1 onNext={handleNext} />}
                {step === 2 && (
                    <Step2 onNext={handleNext} onBack={handleBack} />
                )}
            </Suspense>
        </div>
    );
};
export default Airtime;
