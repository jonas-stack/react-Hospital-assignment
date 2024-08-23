import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import { DevTools } from "jotai-devtools";
import Navigation from "./Navigation";
import { useAtom } from "jotai";
import { ThemeAtom } from "../atoms/ThemeAtom";
import PatientList from "./Patients/PatientList";
import { Breadcrumbs, generateBreadcrumbs } from "./Utilities/Breadcrumbs";
import PatientDetail from "./Patients/PatientDetail";
import NavigationBar from "./Utilities/NavigationBar";
import DiseaseList from "./Diseases/DiseaseList";

const App: React.FC = () => {
    const [theme] = useAtom(ThemeAtom);
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className={`app-container ${theme}`}>
            <NavigationBar/>
            <div className="main-content">
                <Navigation/>
                <Breadcrumbs items={generateBreadcrumbs(location.pathname)}/>
                <br/>
                <Toaster/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/patients" element={<PatientList/>}/>
                    <Route path="/patients/:id" element={<PatientDetail/>}/>
                    <Route path="/diseases" element={<DiseaseList/>}/>
                </Routes>
                <DevTools/>
            </div>
        </div>
    );
};

export default App;