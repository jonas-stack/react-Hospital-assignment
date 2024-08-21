import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Button from "../Utilities/Button";
import TextFields from "../Utilities/TextField";
import { apiClient } from "../../apiClient";

const AddPatientForm: React.FC = () => {
    const [name, setName] = useState("");
    const [patients, setPatients] = useAtom(patientsAtom);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
        <div className= "flex flex-col">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name & Last Name:</label>
                    <TextFields value={name} onChange={handleNameChange} />
                </div>
                <br />
                <Button type="submit" disabled={isButtonDisabled}>Add Patient</Button>
            </form>
        </div>
    );
};

export default AddPatientForm;