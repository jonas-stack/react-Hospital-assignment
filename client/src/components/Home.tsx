import React, { useEffect } from "react";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { Patients } from "../Api";
import { useNavigate } from "react-router-dom";
import Button from "./Utilities/Button";
import ButtonContainer from "./Utilities/ButtonContainer";

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.patients.patientsList().then((result: AxiosResponse<Patients[]>) => {
            console.log(result.data);
        });
    }, []);

    const handleButtonClick = () => {
        navigate("/patients");
    };

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">The Hospital App</h1>
            <ButtonContainer>
                <Button onClick={handleButtonClick}>Patient Page</Button>
            </ButtonContainer>
        </div>
    );
};

export default Home;
