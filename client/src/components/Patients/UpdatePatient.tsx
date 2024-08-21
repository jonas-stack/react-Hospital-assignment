import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import TextFields from "../Utilities/TextField.tsx";
import Button from "../Utilities/Button.tsx";
import { apiClient } from "../../apiClient.ts";

const UpdatePatientForm = () => {
    const [patients, setPatients] = useAtom(patientsAtom);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [newName, setNewName] = useState("");

    const handlePatientUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        const patientToUpdate = patients.find(patient => patient.name === selectedPatient);

        if (!patientToUpdate) {
            alert("Patient not found. Please select a valid patient.");
            return;
        }

        try {
            const response = await apiClient.patients.patientsPartialUpdate(
                { name: newName },
                { id: `eq.${patientToUpdate.id}` },
                { headers: { Prefer: "return=representation" } }
            );

            if (response && response.status === 200) {
                setPatients(patients.map(patient =>
                    patient.id === patientToUpdate.id ? { ...patient, name: newName } : patient
                ));
                alert("Patient updated successfully!");
                setSelectedPatient("");
                setNewName("");
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
                    <label>Select patient to update:</label>
                    <TextFields value={selectedPatient} onChange={setSelectedPatient} />
                </div>
                <div>
                    <label>New name:</label>
                    <TextFields value={newName} onChange={setNewName} />
                </div>
                <Button type="submit">Update Patient</Button>
            </form>
            <h2>Patient List</h2>
            {patients.map((patient) => (
                <div key={patient.id}>
                    {patient.name}
                </div>
            ))}
        </div>
    );
};

export default UpdatePatientForm;
