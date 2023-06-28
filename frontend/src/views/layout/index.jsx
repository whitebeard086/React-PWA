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
import { getUser, setOnlineUsers } from "store/auth/userSlice"
import classNames from "classnames"
import { io } from "socket.io-client"
import { useRef } from "react"
import appConfig from "configs/app.config"

const Layout = ({ noPad }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const socket = useRef();
    const { socketURL } = appConfig;

    const { profile, userType } = useSelector((state) => state.auth.user)
    const { verifying } = useSelector((state) => state.payments.data)

    const onTopUp = () => {
        dispatch(toggleDepositDialog(true))
    }

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, location]);

    useEffect(() => {
        socket.current = io(socketURL);
        socket.current.emit("addNewUser", profile?.id)
        socket.current.on("getUsers", (users) => {
            dispatch(setOnlineUsers(users));
        })
    }, [profile, socketURL])

    return (
        <Container className="max-w-2xl w-full">
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
            <div className={classNames('bg-gray-100 min-h-[72vh]')}>
                <Outlet />
            </div>
            <Footer />

            <DepositDialog />
        </Container>
    )
}
export default Layout