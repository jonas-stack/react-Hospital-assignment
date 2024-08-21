// client/src/components/Patients/AddPatientForm.tsx
import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Button from "../Utilities/Button.tsx";
import {apiClient} from "../../apiClient.ts";
import TextFields from "../Utilities/TextField.tsx";

const AddPatientForm: React.FC = () => {
    const [name, setName] = useState("");
    const [patients, setPatients] = useAtom(patientsAtom);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await apiClient.patients.patientsCreate({ name });
            setPatients([...patients, response.data[0]]);
            alert("Patient added successfully!");
            setName("");
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name & Last Name:</label>
                <TextFields value={name} onChange={setName} />
            </div>
            <Button type="submit">Add Patient</Button>
        </form>
    );
};

export default AddPatientForm;