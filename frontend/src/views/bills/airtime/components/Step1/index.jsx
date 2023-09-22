/* eslint-disable react/prop-types */
import AirtimeForm from './AirtimeForm';
import Operators from './Operators';

const Step1 = ({ onNext, operators, store }) => {
	return (
		<div>
			<Operators onNext={onNext} operators={operators} />
			{store && <AirtimeForm onNext={onNext} />}
		</div>
	);
};
export default Step1;
