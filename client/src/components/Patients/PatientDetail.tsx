// PatientDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { apiClient } from "../../apiClient";
import { Patients } from "../../Api";
import UpdatePatientForm from "./UpdatePatient";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Card from "../Utilities/Cards";
import RemovePatient from "./RemovePatient";
import { ThemeAtom } from "../../atoms/ThemeAtom";
import DiagnosisHistory from "../Diagnosis/DiagnosisHistory.tsx";
import AddDiagnosisForm from "../Diagnosis/AddDiagnosisForm"; // Fixed import path

const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patients] = useAtom(patientsAtom);
    const [patient, setPatient] = useState<Patients | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme] = useAtom(ThemeAtom);
    const navigate = useNavigate();

    // Function to handle adding a diagnosis
    const handleDiagnosisAdded = () => {
        fetchPatient(); // Refresh patient data after adding diagnosis
    };

    // Function to fetch patient data
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

    // Fetch patient data on component mount or when ID changes
    useEffect(() => {
        fetchPatient();
    }, [id]);

    // Update patient data if it changes in global state
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
                title={
                    <div className="flex justify-between items-center w-full">
                        <span className="flex-1">Patient Details</span>
                        <div className="relative ml-4">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`btn btn-secondary ${theme || ''}`} // Fixed theme conditional check
                                data-theme={theme}
                            >
                                &#x22EE; {/* Ensure this is the desired icon */}
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg flex flex-col gap-2">
                                    <UpdatePatientForm patient={patient} />
                                    <RemovePatient patient={patient} />
                                </div>
                            )}
                        </div>
                    </div>
                }
                content={
                    <div className="flex flex-col gap-4 p-4">
                        <p><strong>Name:</strong> {patient.name}</p>
                        <div className="flex flex-col gap-4 p-4">
                            <h1>Patient Medical History</h1>
                            {patient.id !== undefined && (
                                <>
                                    <DiagnosisHistory patientId={patient.id} />
                                    <AddDiagnosisForm
                                        patientId={patient.id}
                                        onDiagnosisAdded={handleDiagnosisAdded}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default PatientDetail;
