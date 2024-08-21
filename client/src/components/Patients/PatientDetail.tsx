import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { apiClient } from "../../apiClient";
import { Patients } from "../../Api";
import UpdatePatientForm from "./UpdatePatient";
import { patientsAtom } from "../../atoms/PatientsAtom";
import Card from "../Utilities/Cards.tsx";
import Button from "../Utilities/Button";
import RemovePatient from "./RemovePatient";

const PatientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patients] = useAtom(patientsAtom);
    const [patient, setPatient] = useState<Patients | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        <Card
            title="Patient Details"
            content={
                <div className="flex flex-col" style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <br/>
                    <UpdatePatientForm patient={patient} />
                    <br/>
                    <RemovePatient patient={patient} />
                    <br/>
                    <Button
                        type="button"
                        onClick={() => navigate('/patients')}
                    >
                        Go Back To Patients List
                    </Button>
                </div>
            }
        />
    );
};

export default PatientDetail;
