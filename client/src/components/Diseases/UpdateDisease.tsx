import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { diseaseAtom } from '../../atoms/DiseaseAtom';
import { apiClient } from '../../apiClient';
import { ThemeAtom } from '../../atoms/ThemeAtom';

export interface Disease {
    id: number;
    name: string;
}

interface UpdateDiseaseProps {
    disease: Disease;
    onDiseaseUpdated: (updatedDisease: Disease) => void;
}

const UpdateDisease: React.FC<UpdateDiseaseProps> = ({ disease, onDiseaseUpdated }) => {
    const [diseases, setDiseases] = useAtom(diseaseAtom);
    const [newName, setNewName] = useState(disease.name);
    const [isModified, setIsModified] = useState(false);
    const [theme] = useAtom(ThemeAtom);

    useEffect(() => {
        setIsModified(newName !== disease.name);
    }, [newName, disease.name]);

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.diseases.diseasesPartialUpdate(
                { name: newName }, // Body
                { id: `eq.${disease.id}` }, // Query Parameters
                { headers: { Prefer: 'return=representation' } } // Headers
            );

            if (response.status === 200) {
                const updatedDisease = { ...disease, name: newName };
                setDiseases(diseases.map(d => d.id === disease.id ? updatedDisease : d));
                onDiseaseUpdated(updatedDisease);
                alert('Disease updated successfully!');
            } else {
                alert('Failed to update disease. Please try again.');
            }
        } catch (error) {
            console.error('Error updating disease:', error);
            alert('An error occurred while updating the disease.');
        }
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <div className={`flex flex-col ${theme}`} data-theme={theme}>
            <br/>
            <form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-2 p-4">
                    <label htmlFor="newName">New name:</label>
                    <input
                        id="newName"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`input input-bordered ${theme}`}
                    />
                </div>
                <br/>
                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        disabled={!isModified}
                        className={`btn btn-primary ${!isModified ? 'button-disabled' : ''}`}
                    >
                        {isModified ? 'Update Disease' : 'No changes'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <br/>
        </div>
    );
};

export default UpdateDisease;