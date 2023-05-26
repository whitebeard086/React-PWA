import { Button } from "../../../components/ui"

const Step2 = ({ onNext, onSkip }) => {
    return (
        <div className="bg-primary-500 w-full h-screen p-6">
            <p onClick={onSkip} className="text-end text-white cursor-pointer">Skip</p>
            <div className="w-full h-[84vh] leading-3 text-white font-semibold flex flex-col justify-center items-center">
                <img className="w-80" src="/img/onboarding1.png" alt="" />
                <p>Connecting you to a</p>
                <h1 className="text-2xl">Handyman</h1>
                <p>with just a few clicks</p>
            </div>
            <div className="">
                <Button 
                    className="!bg-black hover:!bg-gray-900"    
                    block
                    onClick={onNext}
                >
                    Next
                </Button>
            </div>

        </div>
    )
}
export default Step2