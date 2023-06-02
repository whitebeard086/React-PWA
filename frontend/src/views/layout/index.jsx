import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { Button } from "components/ui"

const Layout = () => {
    const { profile } = useSelector((state) => state.auth.user)

    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-[81vh] px-2">
                <div className="bg-primary-500 rounded-2xl py-3 px-4 flex items-center gap-4 justify-between">
                    <h2 className="text-xl font-bold text-white">
                    ₦0.00
                    </h2>
                    <Button
                        size="sm"
                        variant="solid"
                        className="!bg-gray-900 hover:!bg-black"  
                    >
                        Topup
                    </Button>
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
export default Layout