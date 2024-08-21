import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import { DevTools } from "jotai-devtools";
import Navigation from "./Navigation";
import { useAtom } from "jotai";
import { ThemeAtom } from "../atoms/ThemeAtom";
import PatientList from "./Patients/PatientList";
import Breadcrumbs from "./Utilities/Breadcrumbs";
import { generateBreadcrumbs } from "./Utilities/generateBreadcrumbs";
import PatientDetail from "./Patients/PatientDetail";

const App: React.FC = () => {
    const [theme] = useAtom(ThemeAtom);
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <Navigation />
            <Breadcrumbs items={generateBreadcrumbs(location.pathname)} />
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:id" element={<PatientDetail />} />
            </Routes>
            <DevTools />
        </>
    );
};

export default App;
