import { Button } from "components/ui";
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex justify-center flex-col gap-2 items-center min-h-[50vh]">
            Looks like you're lost
            <div className="mt-4 flex gap-4">
                <Button
                    variant="solid"
                    onClick={() => navigate(-1)} 
                >
                    Go Back
                </Button>
                <Button
                    variant="solid"
                    onClick={() => navigate('/home')} 
                >
                    Go Home
                </Button>
            </div>
        </div>
    )
}
export default NotFound