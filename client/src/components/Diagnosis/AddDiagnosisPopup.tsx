import React, { useState } from "react";
import { apiClient } from "../../apiClient";
import { ThemeAtom } from "../../atoms/ThemeAtom.tsx";
import { useAtom } from "jotai/index";
import DiseaseSelect from "./DiseaseSelect.tsx";

interface AddDiagnosisPopupProps {
    patientId: number;
    onClose: () => void;
    onDiagnosisAdded: () => void;
}

const AddDiagnosisPopup: React.FC<AddDiagnosisPopupProps> = ({ patientId, onClose, onDiagnosisAdded }) => {
    const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | null>(null);
    const [diagnosisDate, setDiagnosisDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [theme] = useAtom(ThemeAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.diagnoses.diagnosesCreate({
                patient_id: patientId,
                disease_id: selectedDiseaseId!,
                diagnosis_date: diagnosisDate,
            });
            onDiagnosisAdded();
            onClose();
        } catch {
            setError("Failed to add diagnosis");
        }
    };

    return (
        <div className={`popup ${theme}`}>
            <div className="popup-content">
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "10px 0" }}>
                        <label htmlFor="disease">Disease</label>
                        <DiseaseSelect onSelect={setSelectedDiseaseId} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", padding: "10px 0" }}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={diagnosisDate}
                            onChange={(e) => setDiagnosisDate(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{ padding: "10px", marginTop: "10px" }} disabled={!selectedDiseaseId || !diagnosisDate}>
                        Add Diagnosis
                    </button>
                </form>
                {error && <div>{error}</div>}
            </div>
        </div>
    );
};

export default AddDiagnosisPopup;