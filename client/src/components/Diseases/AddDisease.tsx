import React, { useState } from 'react';
import { Api } from "../../Api.ts";
import { useAtom } from 'jotai';
import { ThemeAtom } from '../../atoms/ThemeAtom';

interface Disease {
    id: number;
    name: string;
}

interface AddDiseaseProps {
    onDiseaseAdded: (newDisease: Disease) => void;
}

const AddDisease: React.FC<AddDiseaseProps> = ({ onDiseaseAdded }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [theme] = useAtom(ThemeAtom);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const api = new Api();
            const response = await api.diseases.diseasesCreate({ name });
            const newDisease: Disease = {
                id: response.data.id,
                name: name,
            };
            onDiseaseAdded(newDisease);
            setMessage('Disease created successfully!');
            setName('');
        } catch (error) {
            setMessage('Error creating disease.');
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
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input input-bordered text-lg"
                    />
                </div>
                <button type="submit" className="btn btn-primary text-lg">Add Disease</button>
            </form>
            {message && <p className="text-lg mt-4">{message}</p>}
        </div>
    );
};

export default AddDisease;