import React, { Suspense, lazy, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import history from "./history";
import { getUser } from "store/auth/userSlice";
import Layout from "views/route/Layout";
import NotFound from "views/notfound";
import RequireAuth from "views/route/RequireAuth";

const Landing = lazy(() => import("./views/landing"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const Home = lazy(() => import("./views/home"));
const Verify = lazy(() => import("./views/verify"));
const Service = lazy(() => import("./views/service"));

function App() {
    const dispatch = useDispatch();

    const { hasService, verifiedPhone, userType } = useSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    // useEffect(() => {
    //     if (userType === "Service Provider" && !hasService) {
    //         // return <Navigate to="/verify-setup" />
    //         console.log("go to service-setup");
    //     } else if (userType === "Normal User" && !verifiedPhone) {
    //         <Navigate to="/verify" />
    //         console.log("go to phone-verification");   
    //     }

    //     if ((userType === "Service Provider" && hasService) && !verifiedPhone) {
    //         // return <Navigate to="/verify" />
    //         console.log("go to phone-verification");
    //     }
    // }, [hasService, userType, verifiedPhone])

    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter history={history}>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route element={<RequireAuth />} >
                                <Route path="/" element={<Landing />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/verify" element={<Verify />} />
                                <Route path="/service-setup" element={<Service />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </PersistGate>
    );
}

export default App;
