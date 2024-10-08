import React from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { patientsAtom } from '../../atoms/PatientsAtom';
import { apiClient } from '../../apiClient';
import { Patients } from '../../Api';

interface RemovePatientProps {
    patient: Patients;
}

const RemovePatient: React.FC<RemovePatientProps> = ({ patient }) => {
    const [patients, setPatients] = useAtom(patientsAtom);
    const navigate = useNavigate();

    const handleRemove = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.patients.patientsDelete({ id: `eq.${patient.id}` });
            if (response.status === 200) {
                setPatients(patients.filter(p => p.id !== patient.id));
                alert("Patient removed successfully!");
                navigate('/patients'); // Navigate back to the patient list
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
            <div className="flex justify-center p-4">
                <button className="btn bg-red-500" type="submit">Delete Patient</button>
            </div>
        </form>
    );
};

export default RemovePatient;