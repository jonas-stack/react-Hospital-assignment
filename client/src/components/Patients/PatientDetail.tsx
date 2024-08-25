// PatientDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { apiClient } from "../../apiClient";
import { Patients } from "../../Api";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Card from "../Utilities/Cards";
import { ThemeAtom } from "../../atoms/ThemeAtom";
import DiagnosisHistory from "../Diagnosis/DiagnosisHistory.tsx";
import AddDiagnosisForm from "../Diagnosis/AddDiagnosisForm";
import PatientActions from "./PatientActions"; // Import the new component

const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patients] = useAtom(patientsAtom);
    const [patient, setPatient] = useState<Patients | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDiagnosisAdded = () => {
        fetchPatient();
    };

    const fetchPatient = async () => {
        if (!id) {
            setError("No patient ID provided");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.patients.patientsList({ id: `eq.${parseInt(id)}` });
            if (response.status === 200 && response.data.length > 0) {
                setPatient(response.data[0]);
            } else {
                setError("Patient not found");
            }
        } catch {
            setError("An error occurred while fetching patient details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    useEffect(() => {
        if (id) {
            const updatedPatient = patients.find(p => p.id === parseInt(id));
            if (updatedPatient) {
                setPatient(updatedPatient);
            }
        }
    }, [patients, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <Card
                title="Patient Details"
                content={
                    <div className="flex flex-col gap-4 p-4">
                        <p><strong>Name:</strong> {patient.name}</p>
                        <div className="flex flex-col gap-4 p-4">
                            <h1>Patient Medical History</h1>
                            {patient.id !== undefined && (
                                <>
                                    <DiagnosisHistory patientId={patient.id} />
                                </>
                            )}
                        </div>
                    </div>
                }
                actions={<PatientActions patient={patient} />}
            />
        </div>
    );
};

export default PatientDetail;