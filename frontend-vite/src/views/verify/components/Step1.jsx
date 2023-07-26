import { Button } from "components/ui"
import PhoneForm from "./PhoneForm"
import { useDispatch } from "react-redux"
import { assignVirtualAccount } from "../store/dataSlice"

const Step1 = ({ onNext }) => {
    const dispatch = useDispatch()
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

            {/* <Button
                variant="solid"
                size="sm"
                onClick={() => dispatch(assignVirtualAccount())}
            >
                Assign account
            </Button> */}
        </div>
    )
}
export default Step1