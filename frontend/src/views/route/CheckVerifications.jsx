import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const CheckVerifications = () => {
    const location = useLocation()

    const { userType, verifiedPhone, hasService } = useSelector((state) => state.auth.user)

    const providerVerified = userType === "Service Provider" && verifiedPhone && hasService
    const userVerified = userType === "Normal User" && verifiedPhone

    return (
        providerVerified || userVerified
            ?   <Outlet />
            :   userType === "Service Provider" && !hasService
            ?   <Navigate to="/service-setup" state={{ from: location }} replace />
            :   userType === "Service Provider" && hasService && !verifiedPhone
            ?   <Navigate to="/verify" state={{ from: location }} replace />
            :   userType === "Normal User" && !verifiedPhone
            ?   <Navigate to="/verify" state={{ from: location }} replace />
            :   <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default CheckVerifications