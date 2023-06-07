import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { Button, Spinner } from "components/ui"
import { Container, Loading } from "components/shared"
import { FaSpinner } from "react-icons/fa"
import { toggleDepositDialog } from "views/payments/store/stateSlice"
import DepositDialog from "views/payments/components/Deposit/DepositDialog"
import { useEffect } from "react"
import { getUser } from "store/auth/userSlice"

const Layout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location);

    const { profile, userType } = useSelector((state) => state.auth.user)
    const { verifying } = useSelector((state) => state.payments.data)

    const onTopUp = () => {
        dispatch(toggleDepositDialog(true))
    }

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, location]);

    return (
        <Container className="max-w-2xl">
            <Header />
            <div className="bg-white pb-4">
                <div className="bg-primary-500 w-[96%] mx-auto rounded-2xl py-3 px-4 flex items-center gap-4 justify-between">
                    <h2 className="text-xl font-bold text-emerald-50">
                        {verifying ? (
                            <Spinner indicator={FaSpinner} className="mr-4" color="emerald-50" size="25px" />
                        ):(
                            `₦${(profile?.balance)?.toLocaleString()}`
                        )}
                    </h2>
                    {userType === "Normal User" && (
                        <Button
                            size="sm"
                            variant="solid"
                            className="!bg-gray-900 hover:!bg-black" 
                            onClick={onTopUp} 
                            disabled={verifying}
                        >
                            Topup
                        </Button>
                    )}
                    {userType === "Service Provider" && (
                        <Button
                            size="sm"
                            variant="solid"
                            disabled={verifying}
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

            <DepositDialog />
        </Container>
    )
}
export default Layout