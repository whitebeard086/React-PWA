import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireServiceProvider = () => {
    const location = useLocation();

    const { signedIn } = useSelector((state) => state.auth.session)
    const { userType } = useSelector((state) => state.auth.user)

    return (
        userType === "Provider"
            ? <Outlet />
            : signedIn
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/home" state={{ from: location }} replace />
    )
}
export default RequireServiceProvider