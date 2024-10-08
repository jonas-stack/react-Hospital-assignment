// client/src/components/Diseases/DiseaseList.tsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../../apiClient";
import AddDisease from "./AddDisease";
import { useAtom } from 'jotai';
import { diseaseAtom } from '../../atoms/DiseaseAtom';
import RemoveDisease from "./RemoveDisease";
import UpdateDisease from "./UpdateDisease";

export interface Disease {
    id: number;
    name: string;
}

const transformToDisease = (data: any[]): Disease[] => {
    return data.map(item => ({
        id: item.id ?? 0,
        name: item.name
    }));
};

const DiseaseList: React.FC = () => {
    const [diseases, setDiseases] = useAtom(diseaseAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
    const [showEditButton, setShowEditButton] = useState(true);

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
    }, [setDiseases]);

    const handleDiseaseAdded = (newDisease: Disease) => {
        setDiseases([...diseases, newDisease]);
    };

    const handleDiseaseRemoved = (diseaseId: number) => {
        setDiseases(diseases.filter(disease => disease.id !== diseaseId));
    };

    const handleDiseaseUpdated = (updatedDisease: Disease) => {
        setEditingDisease(null);
        setDiseases(diseases.map(disease => disease.id === updatedDisease.id ? updatedDisease : disease));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold mb-4">Diseases</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {diseases.map(disease => (
                    <div key={disease.id} className="card bg-base-200 shadow-md p-4 rounded-lg">
                        {editingDisease && editingDisease.id === disease.id ? (
                            <div>
                                <UpdateDisease disease={disease} onDiseaseUpdated={handleDiseaseUpdated}/>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold truncate">{disease.name}</h2>
                                <br/>
                                <div className="flex justify-between">
                                    {showEditButton && (
                                        <button onClick={() => setEditingDisease(disease)}
                                                className="btn btn-secondary">Edit
                                        </button>
                                    )}
                                    <RemoveDisease diseaseId={disease.id} onDiseaseRemoved={handleDiseaseRemoved} onEditButtonVisibilityChange={setShowEditButton}/>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <br/>
            <AddDisease onDiseaseAdded={handleDiseaseAdded}/>
        </div>
    );
};

export default DiseaseList;