import React, { useEffect } from "react";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { Patients } from "../Api";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    useNavigate();
    useEffect(() => {
        apiClient.patients.patientsList().then((result: AxiosResponse<Patients[]>) => {
            console.log(result.data);
        });
    }, []);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">The Hospital App</h1>
        </div>
    );
};

export default Home;
