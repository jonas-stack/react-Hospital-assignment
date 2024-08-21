import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api, Patients } from "../../Api";
import { apiClient } from "../../apiClient.ts";

const PatientDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patients | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) {
                setError("No patient ID provided");
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.patients.patientsList({ id: `eq.${parseInt(id)}` });
                if (response && response.status === 200) {
                    if (response.data.length > 0) {
                        setPatient(response.data[0]);
                    } else {
                        setError("Patient not found");
                    }
                } else {
                    setError("Failed to fetch patient");
                }
            } catch (err) {
                console.error("Error fetching patient details:", err);
                setError("An error occurred while fetching patient details");
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div>
            <h1>Patient Details</h1>
            <p><strong>Name:</strong> {patient.name}</p>
        </div>
    );
};

export default PatientDetail;
