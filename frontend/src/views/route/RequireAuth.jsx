import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = () => {
  const location = useLocation()

  const { signedIn } = useSelector((state) => state.auth.session)

    return (
      signedIn
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth