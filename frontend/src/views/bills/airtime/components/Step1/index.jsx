/* eslint-disable react/prop-types */
import AirtimeForm from "./AirtimeForm";
import Operators from "./Operators";

const Step1 = ({ onNext }) => {
    return (
        <div>
            <Operators onNext={onNext} />
            <AirtimeForm onNext={onNext} />
        </div>
    );
};
export default Step1;
