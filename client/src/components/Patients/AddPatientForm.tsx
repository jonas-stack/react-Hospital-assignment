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
                <div className="flex flex-col">
                    <label htmlFor="name">Name & Last Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className={`input input-bordered ${theme}`}
                        style={{ width: "300px" }} // Set a fixed width for the input field
                    />
                </div>
                <br />
                <button type="submit" disabled={isButtonDisabled} className="btn btn-primary">
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default AddPatientForm;