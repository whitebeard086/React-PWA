import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import history from "./history";
import Landing from "./views/landing";

// const Landing = lazy(() => import("./views/landing"));

function App() {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter history={history}>
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </PersistGate>
    );
}

export default App;
