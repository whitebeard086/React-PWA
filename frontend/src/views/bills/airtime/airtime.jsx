import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import { useCallback, useState } from 'react';
import { useGetOperators } from '../store/hooks';
import AirtimeForm from './components/Step1/AirtimeForm';
import Operators from './components/Step1/Operators';
import reducer, { SLICE_NAME, useAppSelector } from './store';

import Step2 from './components/Step2';

injectReducer(`${SLICE_NAME}`, reducer);

const Airtime = () => {
	const [step, setStep] = useState(1);
	const { product, store } = useAppSelector((state) => state[SLICE_NAME].data);

	const { data, isFetching } = useGetOperators('telco');
	const { operators } = data || {};

	console.log('Product: ', product);
	console.log('Store: ', store);
	console.log('Step: ', step);

	const handleNext = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const handleBack = useCallback(() => {
		setStep(step - 1);
	}, [step]);

	const onComplete = () => {
		setStep(1);
	};
	return (
		<div className="p-4 mt-2">
			<Loading loading={isFetching}>
				{step === 1 && (
					<>
						<Operators operators={operators} />

						{store && <AirtimeForm onNext={handleNext} />}
					</>
				)}
				{step === 2 && (
					<Step2
						onNext={handleNext}
						complete={onComplete}
						onBack={handleBack}
						store={store}
					/>
				)}
			</Loading>
		</div>
	);
};
export default Airtime;
