// client/src/components/Patients/UpdatePatient.tsx
import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import TextFields from "../Utilities/TextField.tsx";
import Button from "../Utilities/Button.tsx";
import { apiClient } from "../../apiClient.ts";
import { Patients } from "../../Api.ts";

interface UpdatePatientFormProps {
    patient: Patients;
}

const UpdatePatientForm: React.FC<UpdatePatientFormProps> = ({ patient }) => {
    const [patients, setPatients] = useAtom(patientsAtom);
    const [newName, setNewName] = useState(patient.name);

    const handlePatientUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await apiClient.patients.patientsPartialUpdate(
                { name: newName },
                { id: `eq.${patient.id}` },
                { headers: { Prefer: "return=representation" } }
            );

            if (response && response.status === 200) {
                setPatients(patients.map(p =>
                    p.id === patient.id ? { ...p, name: newName } : p
                ));
                alert("Patient updated successfully!");
            } else {
                alert("Failed to update patient. Please try again.");
            }
        } catch (error) {
            console.error("Error updating patient:", error);
            alert("An error occurred while updating the patient.");
        }
    };

    return (
        <div>
            <h1>Update Patient</h1>
            <form onSubmit={handlePatientUpdate}>
                <div>
                    <label>New name:</label>
                    <TextFields value={newName} onChange={setNewName} />
                </div>
                <Button type="submit">Update Patient</Button>
            </form>
        </div>
    );
};

export default UpdatePatientForm;