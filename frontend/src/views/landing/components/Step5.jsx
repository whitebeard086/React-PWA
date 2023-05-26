import { Button } from "../../../components/ui"

const Step5 = ({ onNext, onSkip }) => {
    return (
        <div className="bg-primary-500 w-full h-screen p-6">
            <p onClick={onSkip} className="text-end text-white cursor-pointer">Skip</p>
            <div className="w-full h-[84vh] text-white font-semibold flex flex-col justify-center items-center">
                <img className="w-80 pb-4" src="/img/onboarding4.png" alt="" />
                <p>Service is rendered and you</p>
                <p>confirm completion</p>
            </div>
            <div className="">
                <Button 
                    className="!bg-black hover:!bg-gray-900"    
                    block
                    onClick={onSkip}
                >
                    Get Started
                </Button>
            </div>

        </div>
    )
}
export default Step5