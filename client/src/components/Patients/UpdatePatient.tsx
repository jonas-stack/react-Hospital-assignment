import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Button from "../Utilities/Button";
import { apiClient } from "../../apiClient";
import { Patients } from "../../Api";
import { ThemeAtom } from "../../atoms/ThemeAtom";

interface UpdatePatientFormProps {
    patient: Patients;
}

const UpdatePatientForm: React.FC<UpdatePatientFormProps> = ({ patient }) => {
    const [patients, setPatients] = useAtom(patientsAtom);
    const [newName, setNewName] = useState(patient.name);
    const [isModified, setIsModified] = useState(false);
    const [theme] = useAtom(ThemeAtom);

    useEffect(() => {
        setIsModified(newName !== patient.name);
    }, [newName, patient.name]);

    const handlePatientUpdate = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await apiClient.patients.patientsPartialUpdate(
                { name: newName },
                { id: `eq.${patient.id}` },
                { headers: { Prefer: "return=representation" } }
            );

            if (response.status === 200) {
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
        <div className={`flex flex-col ${theme}`} data-theme={theme}>
            <br/>
            <form onSubmit={handlePatientUpdate}>
                <div>
                    <label htmlFor="newName">New name:</label>
                    <input
                        id="newName"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`input input-bordered ${theme}`}
                    />
                </div>
                <br/>
                <div className="flex flex-row gap-4">
                    <Button
                        type="submit"
                        disabled={!isModified}
                        className={!isModified ? "button-disabled" : ""}
                    >
                        Update Patient
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePatientForm;