import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient";
import { Diagnoses, Diseases } from "../../Api";

interface DiagnosisHistoryProps {
    patientId: number;
}

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({ patientId }) => {
    const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
    const [diseases, setDiseases] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const response = await apiClient.diagnoses.diagnosesList({
                    patient_id: `eq.${patientId}`,
                    select: "disease_id,diagnosis_date"
                });
                if (response.status !== 200) throw new Error("Failed to fetch diagnoses");

                setDiagnoses(response.data);
                const diseaseIds = response.data.map(d => d.disease_id);
                const diseaseResponse = await apiClient.diseases.diseasesList({
                    id: `in.(${diseaseIds.join(",")})`,
                    select: "id,name"
                });
                if (diseaseResponse.status !== 200) throw new Error("Failed to fetch diseases");

                const diseaseMap = diseaseResponse.data.reduce((acc, disease) => {
                    acc[disease.id] = disease.name;
                    return acc;
                }, {});
                setDiseases(diseaseMap);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiagnoses();
    }, [patientId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Diagnosis History</h2>
            {diagnoses.length > 0 ? (
                <ul>
                    {diagnoses.map((diagnosis) => (
                        <li key={diagnosis.id}>
                            Disease: {diseases[diagnosis.disease_id]}, Date: {diagnosis.diagnosis_date ? new Date(diagnosis.diagnosis_date).toLocaleDateString() : "Unknown Date"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No diagnoses found</p>
            )}
        </div>
    );
};

export default DiagnosisHistory;