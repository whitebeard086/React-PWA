import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { Button } from "components/ui"
import { Container } from "components/shared"

const Layout = () => {
    const { profile, userType } = useSelector((state) => state.auth.user)

    return (
        <Container className="max-w-2xl">
            <Header />
            <div className="bg-white pb-4">
                <div className="bg-primary-500 w-[96%] mx-auto rounded-2xl py-3 px-4 flex items-center gap-4 justify-between">
                    <h2 className="text-xl font-bold text-white">
                    ₦0.00
                    </h2>
                    {userType === "Normal User" && (
                        <Button
                            size="sm"
                            variant="solid"
                            className="!bg-gray-900 hover:!bg-black"  
                        >
                            Topup
                        </Button>
                    )}
                    {userType === "Service Provider" && (
                        <Button
                            size="sm"
                            variant="solid"
                            className="!bg-gray-900 hover:!bg-black"  
                        >
                            Withdraw
                        </Button>
                    )}
                </div>
            </div>
            <div className="bg-gray-100 min-h-[72vh] px-2">
                <Outlet />
            </div>
            <Footer />
        </Container>
    )
}
export default Layout