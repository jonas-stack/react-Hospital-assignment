// client/src/components/Diseases/RemoveDisease.tsx
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { ThemeAtom } from '../../atoms/ThemeAtom';
import { apiClient } from "../../apiClient.ts";
import { diseaseAtom } from "../../atoms/DiseaseAtom";

interface RemoveDiseaseProps {
    diseaseId: number;
    onDiseaseRemoved: (diseaseId: number) => void;
    onEditButtonVisibilityChange: (visible: boolean) => void;
}

const RemoveDisease: React.FC<RemoveDiseaseProps> = ({ diseaseId, onDiseaseRemoved, onEditButtonVisibilityChange }) => {
    const [theme] = useAtom(ThemeAtom);
    const [diseases, setDiseases] = useAtom(diseaseAtom);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleRemove = async () => {
        try {
            const response = await apiClient.diseases.diseasesDelete({ id: `eq.${diseaseId}` });
            if (response.status === 204 || response.status === 200) {  // Handle both 204 No Content and 200 OK responses
                setDiseases(diseases.filter(disease => disease.id !== diseaseId));
                onDiseaseRemoved(diseaseId);
            } else {
                console.error('Failed to remove disease:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing disease:', error);
        }
    };

    const handleConfirmRemove = () => {
        setShowConfirmation(true);
        onEditButtonVisibilityChange(false);
    };

    const handleCancelRemove = () => {
        setShowConfirmation(false);
        onEditButtonVisibilityChange(true);
    };

    const handleConfirmYes = () => {
        setShowConfirmation(false);
        handleRemove();
    };

    return (
        <>
            <button onClick={handleConfirmRemove} className={`btn btn-primary ${theme}`} data-theme={theme}>
                Remove Disease
            </button>
            {showConfirmation && (
                <div className="confirmation-dialog flex flex-col items-center">
                    <p>Are you sure you want to remove this disease?</p>
                    <div className="flex">
                        <button onClick={handleConfirmYes} className="btn btn-danger m-4 p-4">Yes</button>
                        <button onClick={handleCancelRemove} className="btn btn-secondary m-4 p-4">No</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RemoveDisease;