import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import history from "./history";
import { getUser, setOnlineUsers } from "store/auth/userSlice";
import NotFound from "views/notfound";
import RequireAuth from "views/route/RequireAuth";
import RequireServiceProvider from "views/route/RequireServiceProvider";
import Unauthorized from "views/notfound/Unauthorized";
import CheckVerifications from "views/route/CheckVerifications";
import Layout from "views/layout";
import { useSocket } from "utils/hooks/useSocket";
import { socket } from "utils/socket";
import { setMessages, setReceivedInvoice, setServiceBooked } from "views/chat/store/dataSlice";
import { setServiceCompleted, setServiceConfirmed } from "views/requests/store/dataSlice";
import { setServiceCompletedDash } from "views/providerDash/store/dataSlice";

const Landing = lazy(() => import("./views/landing"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const Home = lazy(() => import("./views/home"));
const Verify = lazy(() => import("./views/verify"));
const Service = lazy(() => import("./views/service"));
const EditService = lazy(() => import("./views/service/components/EditService"));
const Profile = lazy(() => import("./views/profile"));
const ProviderProfile = lazy(() => import("./views/profile/components/ProviderProfile"));
const Settings = lazy(() => import("./views/settings"));
const Payments = lazy(() => import("./views/payments"));
const Browse = lazy(() => import("./views/browse"));
const Chat = lazy(() => import("./views/chat"));
const Requests = lazy(() => import("./views/requests"));
const History = lazy(() => import("./views/requests/components/History"));
const Category = lazy(() => import("./views/browse/components/category"));
const ProviderDashboard = lazy(() => import("./views/providerDash"));

function App() {
    const dispatch = useDispatch();
    
    const { userType, onlineUsers, profile } = useSelector((state) => state.auth.user);

    const events = [
        {
            name: 'getUsers',
            handler(users) {
                dispatch(setOnlineUsers(users));
                console.log('Online Users: ', onlineUsers);
            }
        }, 
        {
            name: 'receiveMessage',
            handler(data) {
                dispatch(setMessages(data));
                console.log('Received Socket Message: ', true);
            }
        },
        {
            name: 'receiveInvoice',
            handler() {
                dispatch(setReceivedInvoice(true))
                console.log('Received Invoice: ', true);
            }
        },
        {
            name: 'serviceCompleted',
            handler() {
                dispatch(setServiceCompleted(true));
                dispatch(setServiceCompletedDash(true));
                console.log('Received Service Completed: ', true);
            }
        },
        {
            name: 'serviceConfirmed',
            handler() {
                dispatch(getUser());
                dispatch(setServiceConfirmed(true));
                console.log('Received Service Confirmed: ', true);
            }
        },
        {
            name: 'serviceBooked',
            handler() {
                dispatch(setServiceBooked(true))
                console.log('Received Service Booked: ', true);
            }
        },
    ]

    useEffect(() => {
        socket.emit("addNewUser", profile?.id)
    }, [profile?.id])

    useSocket(events)

    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter history={history}>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                            <Route element={<RequireAuth />} >
                            <Route path="/verify" element={<Verify />} />
                            <Route element={<RequireServiceProvider />}>
                                <Route path="/service-setup" element={<Service />} />
                            </Route>
                            <Route path="/" element={<Layout />}>
                                <Route element={<RequireServiceProvider />}>
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/service/edit" element={<EditService />} />
                                </Route>
                                <Route element={<CheckVerifications />} >
                                    <Route path="/home" element={userType === "Service Provider" ? <ProviderDashboard /> : <Home />} />
                                    <Route path="/chat/:providerSlug" element={<Chat />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/payments" element={<Payments />} />
                                    <Route path="/requests" element={<Requests />} />
                                    <Route path="/requests/history" element={<History />} />
                                    <Route path="/browse" element={<Browse />} />
                                    <Route path="/browse/:categorySlug" element={<Category />} />
                                    <Route path="/browse/profile/:providerSlug" element={<ProviderProfile />} />
                                    <Route path="/unauthorized" element={<Unauthorized />} />
                                    <Route path="*" element={<NotFound />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </PersistGate>
    );
}

export default App;
