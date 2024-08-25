import React, { useState } from "react";
import AddDiagnosisPopup from "./AddDiagnosisPopup";

interface AddDiagnosisFormProps {
    patientId: number;
    onDiagnosisAdded: () => void;
}

const AddDiagnosisForm: React.FC<AddDiagnosisFormProps> = ({ patientId, onDiagnosisAdded }) => {
    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
                type="button"
                className={`btn ${popupOpen ? "btn-danger" : "btn-primary"}`}
                onClick={() => setPopupOpen(!popupOpen)}
                style={{
                    backgroundColor: popupOpen ? "red" : "",
                    color: popupOpen ? "white" : ""
                }}
            >
                {popupOpen ? "Cancel Adding Diagnosis" : "Add Diagnosis"}
            </button>
            {popupOpen && (
                <AddDiagnosisPopup
                    patientId={patientId}
                    onClose={() => setPopupOpen(false)}
                    onDiagnosisAdded={onDiagnosisAdded}
                />
            )}
        </div>
    );
};

export default AddDiagnosisForm;