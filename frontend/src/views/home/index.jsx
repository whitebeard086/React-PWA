import { Button } from "components/ui"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { onSignOutSuccess } from "store/auth/sessionSlice";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { hasService, userType } = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (userType === "Service Provider" && !hasService) {
            navigate('/service-setup')
        }
    }, [hasService, navigate, userType])

    return (
        <div>
            Home
            <Button
                size="sm"
                variant="solid"
                onClick={() => dispatch(onSignOutSuccess())}
            >
                Sign Out
            </Button>
        </div>
    )
}
export default Home