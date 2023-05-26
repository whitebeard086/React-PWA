import React, { Suspense, lazy, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import history from "./history";
import { getUser } from "store/auth/userSlice";

const Landing = lazy(() => import("./views/landing"));
const Register = lazy(() => import("./views/auth/Register"));
const Login = lazy(() => import("./views/auth/Login"));
const Home = lazy(() => import("./views/home"));
const Verify = lazy(() => import("./views/verify"));

function App() {
    const dispatch = useDispatch();

    const { signedIn } = useSelector((state) => state.auth.session)
    console.log(signedIn);
    // useEffect(() => {
    //     if (!signedIn) {
    //         <Navigate to="/login" />
    //     }
    // }, [signedIn])


    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter history={history}>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/register" element={signedIn ? <Navigate to="/home" /> : <Register />} />
                        <Route path="/login" element={signedIn ? <Navigate to="/home" /> : <Login />} />
                        <Route path="/home" element={signedIn ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/verify" element={signedIn ? <Verify /> : <Navigate to="/login" />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </PersistGate>
    );
}

export default App;
