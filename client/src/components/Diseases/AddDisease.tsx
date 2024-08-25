import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { ThemeAtom } from '../../atoms/ThemeAtom';
import { apiClient } from '../../apiClient';

interface Disease {
    id: number;
    name: string;
}

interface AddDiseaseProps {
    onDiseaseAdded: (newDisease: Disease) => void;
}

const AddDisease: React.FC<AddDiseaseProps> = ({ onDiseaseAdded }) => {
    const [name, setName] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [theme] = useAtom(ThemeAtom);

    const handleNameChange = (value: string) => {
        setName(value);
        setIsButtonDisabled(!value.trim());
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await apiClient.diseases.diseasesCreate({ name });
            if ([200, 201].includes(response.status)) {
                onDiseaseAdded({ id: response.data.id, name });
                setName('');
                setIsButtonDisabled(true);
                alert('Disease created successfully!');
            } else {
                alert('Failed to create disease.');
            }
        } catch (error) {
            console.error('Error creating disease:', error);
            alert('An error occurred while creating the disease.');
        }
    };

    return (
        <div className={`p-4 ${theme}`} data-theme={theme}>
            <h1 className="text-3xl font-bold mb-4">Add Disease</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xl">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                        className={`input input-bordered text-lg ${theme}`}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className="btn btn-primary text-lg"
                >
                    Add Disease
                </button>
            </form>
        </div>
    );
};

export default AddDisease;