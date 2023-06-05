import { Button } from "../../../components/ui"

const Step4 = ({ onNext, onSkip }) => {
    return (
        <div className="bg-primary-500 w-full h-screen p-6">
            <p onClick={onSkip} className="text-end text-white cursor-pointer">Skip</p>
            <div className="w-full h-[84vh] text-white font-semibold flex flex-col justify-center items-center">
                <img className="w-80 pb-4" src="/img/onboarding3.png" alt="" />
                <p>Describe your service request</p>
                <p>via a chat and negotiate a cost</p>
            </div>
            <div className="">
                <Button 
                    variant="solid"
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
export default Step4