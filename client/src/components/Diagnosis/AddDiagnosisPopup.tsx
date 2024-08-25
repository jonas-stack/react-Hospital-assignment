import React, { useState, useEffect } from "react";
import { apiClient } from "../../apiClient";
import { ThemeAtom } from "../../atoms/ThemeAtom";
import { useAtom } from "jotai";
import DiseaseSelect from "./DiseaseSelect";

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
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!selectedDiseaseId || !diagnosisDate);
    }, [selectedDiseaseId, diagnosisDate]);

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
        <div className={`popup ${theme}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="popup-content" style={{
                maxWidth: "400px",
                maxHeight: "80vh",
                overflowY: "auto",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <div style={{display: "flex", flexDirection: "column", padding: "10px 0"}}>
                        <label htmlFor="disease">Disease</label>
                        <DiseaseSelect onSelect={setSelectedDiseaseId}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", padding: "10px 0"}}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={diagnosisDate}
                            onChange={(e) => setDiagnosisDate(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`btn btn-primary ${isButtonDisabled ? "btn-disabled" : theme}`}
                            disabled={isButtonDisabled}
                        >
                            Add Diagnosis
                        </button>
                    </div>
                </form>
                {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
            </div>
        </div>
    );
};

export default AddDiagnosisPopup;