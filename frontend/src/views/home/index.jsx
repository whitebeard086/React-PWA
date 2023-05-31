import { Button } from "components/ui"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { onSignOutSuccess } from "store/auth/sessionSlice";
import useAuth from "utils/hooks/useAuth";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSignOut } = useAuth();

    const { hasService, userType } = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (userType === "Service Provider" && !hasService) {
            // navigate('/service-setup')
        }
    }, [hasService, navigate, userType])

    const onSignOut = async () => {
        // await signOut()
    }

    return (
        <div>
            Home
            <Button
                size="sm"
                variant="solid"
                onClick={() => handleSignOut()}
            >
                Sign Out
            </Button>
        </div>
    )
}
export default Home