import React, { Suspense, lazy, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import history from "./history";
import { getUser } from "store/auth/userSlice";
import NotFound from "views/notfound";
import RequireAuth from "views/route/RequireAuth";
import RequireServiceProvider from "views/route/RequireServiceProvider";
import Unauthorized from "views/notfound/Unauthorized";
import CheckVerifications from "views/route/CheckVerifications";
import Layout from "views/layout";

const Landing = lazy(() => import("./views/landing"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const Home = lazy(() => import("./views/home"));
const Verify = lazy(() => import("./views/verify"));
const Service = lazy(() => import("./views/service"));
const EditService = lazy(() => import("./views/service/components/EditService"));
const Profile = lazy(() => import("./views/profile"));
const Settings = lazy(() => import("./views/settings"));
const Browse = lazy(() => import("./views/browse"));
const Category = lazy(() => import("./views/browse/components/category"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

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
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/browse" element={<Browse />} />
                                    <Route path="/browse/:categorySlug" element={<Category />} />
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