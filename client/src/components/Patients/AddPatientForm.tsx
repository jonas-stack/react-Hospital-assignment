// client/src/components/Patients/AddPatientForm.tsx
import React, { useState } from "react";
import { Api } from "../../Api";
import Button from "../Utilities/Button.tsx";

const AddPatientForm: React.FC = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const api = new Api();
        try {
            await api.patients.patientsCreate({name});
            alert("Patient added successfully!");
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <Button type="submit">Add Patient</Button>
        </form>
    );
};

export default AddPatientForm;