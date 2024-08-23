import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import { apiClient } from "../../apiClient";
import { ThemeAtom } from "../../atoms/ThemeAtom";

const AddPatientForm: React.FC = () => {
    const [name, setName] = useState("");
    const [patients, setPatients] = useAtom(patientsAtom);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [theme] = useAtom(ThemeAtom);

    const handleNameChange = (value: string) => {
        setName(value);
        setIsButtonDisabled(value.trim() === "");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.patients.patientsCreate({ name });
            setPatients(prevPatients => [...prevPatients, response.data[0]]);
            alert("Patient added successfully!");
            setName("");
            setIsButtonDisabled(true);
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <div className={`flex flex-col ${theme}`} data-theme={theme}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center">
                    <label htmlFor="name" className="mr-2">Name & Last Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className={`input input-bordered ${theme}`}
                        style={{flex: 1}}
                    />
                    <button type="submit" disabled={isButtonDisabled} className="btn btn-primary ml-2">
                        Add Patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPatientForm;