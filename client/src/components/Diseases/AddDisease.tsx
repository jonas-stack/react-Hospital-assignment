import React, { useState } from 'react';
import {Api} from "../../Api.ts";


const AddDisease: React.FC = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const api = new Api();
            await api.diseases.diseasesCreate({ name });
            setMessage('Disease created successfully!');
        } catch (error) {
            setMessage('Error creating disease.');
        }
    };

    return (
        <div>
            <h1>Add Disease</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Disease</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddDisease;