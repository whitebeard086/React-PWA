import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
    const { profile } = useSelector((state) => state.auth.user)

    return (
        <div>
            <Header />
            <div className="bg-gray-100 h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
export default Layout