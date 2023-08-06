/* eslint-disable react/prop-types */
import PhoneForm from "./PhoneForm"

const Step1 = ({ onNext }) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="w-full flex flex-col gap-4 justify-center">
                <div className="w-full flex justify-center items-center">
                    <img className="w-72" src="/img/signup.png" alt="" />
                </div>

                <div>
                    <h1 className="text-center mt-4 text-2xl font-bold">Phone Verification</h1>
                    <p className="font-semibold text-center text-gray-400">We will send you an OTP code on this phone number.</p>
                </div>

                <PhoneForm onNext={onNext} />
            </div>
        </div>
    )
}
export default Step1