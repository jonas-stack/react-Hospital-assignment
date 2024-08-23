// DiseaseList.tsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient";
import AddDisease from "./AddDisease.tsx";

export interface Disease {
    id: number;
    name: string;
}

const transformToDisease = (data: any[]): Disease[] => {
    return data.map(item => ({
        id: item.id ?? 0, // Provide a default value if id is undefined
        name: item.name
    }));
};

const DiseaseList: React.FC = () => {
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await apiClient.diseases.diseasesList();
                if (response.status === 200) {
                    setDiseases(transformToDisease(response.data));
                } else {
                    setError("Failed to fetch diseases");
                }
            } catch (error) {
                setError("An error occurred while fetching diseases");
            } finally {
                setLoading(false);
            }
        };

        fetchDiseases();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1>Diseases</h1>
            <ul>
                {diseases.map(disease => (
                    <li key={disease.id}>{disease.name}</li>
                ))}
            </ul>
            <AddDisease />
        </div>
    );
};

export default DiseaseList;