import React from "react";
import { useAtom } from "jotai";
import { apiClient } from "../../apiClient";
import { Diagnoses } from "../../Api";
import { diagnosesAtom } from "../../atoms/DiagnosesAtom"; // Assuming you have a diagnosesAtom

interface RemoveDiagnosisProps {
    diagnosis: Diagnoses;
    setError: (error: string | null) => void;
}

const RemoveDiagnosis: React.FC<RemoveDiagnosisProps> = ({ diagnosis, setError }) => {
    const [diagnoses, setDiagnoses] = useAtom(diagnosesAtom);

    const handleRemove = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.diagnoses.diagnosesDelete({ id: `eq.${diagnosis.id}` });
            if (response.status === 200) {
                setDiagnoses(diagnoses.filter(d => d.id !== diagnosis.id));
                alert("Diagnosis removed successfully!");
            } else {
                alert("Failed to remove diagnosis. Please try again.");
            }
        } catch (error) {
            console.error("Error removing diagnosis:", error);
            setError("An error occurred while removing the diagnosis.");
        }
    };

    return (
        <form onSubmit={handleRemove}>
            <button className="bg-red-500 text-white px-2 py-1 rounded" type="submit">
                Remove
            </button>
        </form>
    );
};

export default RemoveDiagnosis;
