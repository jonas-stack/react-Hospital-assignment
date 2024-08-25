import React, { useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { apiClient } from "../../apiClient";
import { diagnosesAtom } from "../../atoms/DiagnosesAtom";
import AddDiagnosisForm from "./AddDiagnosisForm";
import RemoveDiagnosis from "./RemoveDiagnosis";

interface DiagnosisHistoryProps {
    patientId: number;
}

const DiagnosisHistory: React.FC<DiagnosisHistoryProps> = ({ patientId }) => {
    const [diagnoses, setDiagnoses] = useAtom(diagnosesAtom);
    const [diseases, setDiseases] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDiagnoses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.diagnoses.diagnosesList({
                patient_id: `eq.${patientId}`,
                select: "id,disease_id,diagnosis_date"
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
                if (disease.id !== undefined) {
                    acc[disease.id] = disease.name;
                }
                return acc;
            }, {} as { [key: number]: string });

            setDiseases(diseaseMap);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [patientId, setDiagnoses]);

    useEffect(() => {
        fetchDiagnoses();
    }, [fetchDiagnoses]);

    const handleDiagnosisAdded = () => {
        fetchDiagnoses();
    };

    const handleRemoveDiagnosis = (diagnosisId: number) => {
        setDiagnoses(diagnoses.filter(d => d.id !== diagnosisId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {diagnoses.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Disease</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {diagnoses.map(diagnosis => (
                        <tr key={diagnosis.id}>
                            <td className="border px-4 py-2">{diseases[diagnosis.disease_id]}</td>
                            <td className="border px-4 py-2">
                                {diagnosis.diagnosis_date ? new Date(diagnosis.diagnosis_date).toLocaleDateString() : "Unknown Date"}
                            </td>
                            <td className="border px-4 py-2">
                                <RemoveDiagnosis
                                    diagnosis={diagnosis}
                                    setError={setError}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No diagnoses found</p>
            )}
            <br/>
            <AddDiagnosisForm patientId={patientId} onDiagnosisAdded={handleDiagnosisAdded} />
        </div>
    );
};

export default DiagnosisHistory;
