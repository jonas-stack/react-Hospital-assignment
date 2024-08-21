// client/src/components/App.tsx
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./Home.tsx";
import { DevTools } from "jotai-devtools";
import Navigation from "./Navigation.tsx";
import { useAtom } from "jotai";
import { ThemeAtom } from "../atoms/ThemeAtom.tsx";
import { PatientList } from "./Patients/PatientList.tsx";
import Breadcrumbs from "./Utilities/Breadcrumbs.tsx";
import { generateBreadcrumbs} from "./Utilities/generateBreadcrumbs.tsx";
import PatientDetail from "./Patients/PatientDetail.tsx";


const App = () => {
    const [theme, setTheme] = useAtom(ThemeAtom);
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
