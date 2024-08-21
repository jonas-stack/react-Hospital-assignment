import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import TextFields from "../Utilities/TextField";
import Button from "../Utilities/Button";
import { apiClient } from "../../apiClient";
import { Patients } from "../../Api";
import { useNavigate } from "react-router-dom";

interface UpdatePatientFormProps {
    patient: Patients;
}

const UpdatePatientForm: React.FC<UpdatePatientFormProps> = ({ patient }) => {
    const [patients, setPatients] = useAtom(patientsAtom);
    const [newName, setNewName] = useState(patient.name);
    const [isModified, setIsModified] = useState(false);
    const navigate = useNavigate();

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
        <div>
            <h1>Update Patient</h1>
            <form onSubmit={handlePatientUpdate}>
                <div>
                    <label>New name:</label>
                    <TextFields value={newName} onChange={setNewName} />
                </div>
                <Button
                    type="submit"
                    disabled={!isModified}
                    className={!isModified ? "button-disabled" : ""}
                >
                    Update Patient
                </Button>
                <Button
                    type="button"
                    onClick={() => navigate('/patients')}
                >
                    Go Back To Patients List
                </Button>
            </form>
        </div>
    );
};

export default UpdatePatientForm;
