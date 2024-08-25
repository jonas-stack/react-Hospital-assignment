import React from 'react';
import { useAtom } from 'jotai';
import { ThemeAtom } from '../../atoms/ThemeAtom';
import { apiClient } from "../../apiClient.ts";
import { diseaseAtom } from "../../atoms/DiseaseAtom";

interface RemoveDiseaseProps {
    diseaseId: number;
    onDiseaseRemoved: (diseaseId: number) => void;
}

const RemoveDisease: React.FC<RemoveDiseaseProps> = ({ diseaseId, onDiseaseRemoved }) => {
    const [theme] = useAtom(ThemeAtom);
    const [diseases, setDiseases] = useAtom(diseaseAtom);

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

    return (
        <button onClick={handleRemove} className={`btn btn-primary ${theme}`} data-theme={theme}>
            Remove Disease
        </button>
    );
};

export default RemoveDisease;
