// DiseaseSelect.tsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient.ts";

interface Disease {
    id: number;
    name: string;
}

interface DiseaseSelectProps {
    onSelect: (diseaseId: number) => void;
}

const transformToDisease = (data: any[]): Disease[] => {
    return data.map(item => ({
        id: item.id ?? 0,
        name: item.name
    }));
};

const DiseaseSelect: React.FC<DiseaseSelectProps> = ({ onSelect }) => {
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await apiClient.diseases.diseasesList();
                setDiseases(transformToDisease(response.data));
            } catch {
                setError("Failed to fetch diseases");
            } finally {
                setLoading(false);
            }
        };

        fetchDiseases();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <select onChange={(e) => onSelect(parseInt(e.target.value))}>
            <option value="">Select a disease</option>
            {diseases.map((disease) => (
                <option key={disease.id} value={disease.id}>
                    {disease.name}
                </option>
            ))}
        </select>
    );
};

export default DiseaseSelect;