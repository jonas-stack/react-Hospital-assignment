// client/src/components/Patients/RemovePatient.tsx
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { patientsAtom } from '../../atoms/PatientsAtom';
import Button from '../Utilities/Button.tsx';
import TextFields from '../Utilities/TextField.tsx';
import { apiClient } from '../../apiClient.ts';

const RemovePatient = () => {
    const [name, setName] = useState("");
    const [patients, setPatients] = useAtom(patientsAtom);

    const handleRemove = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.patients.patientsDelete({ name: `eq.${name}` });
            if (response && response.status === 200) {
                setPatients(patients.filter(patient => patient.name !== name));
                alert("Patient removed successfully!");
                setName(""); // Clear the input field after successful removal
            } else {
                alert("Failed to remove patient. Please try again.");
            }
        } catch (error) {
            console.error("Error removing patient:", error);
            alert("An error occurred while removing the patient.");
        }
    };

    return (
        <form onSubmit={handleRemove}>
            <div>
                <label>Remove patient name from list:</label>
                <TextFields value={name} onChange={setName} />
            </div>
            <Button type="submit">Remove Patient</Button>
        </form>
    );
};

export default RemovePatient;