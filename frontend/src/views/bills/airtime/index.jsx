import { injectReducer } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { getOperators } from './store/dataSlice';
// import { getOperators, setBuyStatus } from "./store/dataSlice";
import { Loading } from '@/components/shared';
import { Suspense, lazy, useCallback } from 'react';
// import RequirePin from "@/views/payments/components/RequirePin";
// import { setPin } from "./store/stateSlice";

injectReducer('airtime', reducer);

const Airtime = () => {
	const dispatch = useDispatch();
	const [step, setStep] = useState(1);

	const Step1 = lazy(() => import('./components/Step1'));
	const Step2 = lazy(() => import('./components/Step2'));

	const { formData, pin } = useSelector((state) => state.airtime.state);
	const { buyStatus, buyingAirtime, operators } = useSelector(
		(state) => state.airtime.data
	);

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

	console.log('operators: ' + operators);
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
				{step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
			</Suspense>
		</div>
	);
};
export default Airtime;
