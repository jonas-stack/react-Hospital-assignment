// client/src/components/Patients/PatientList.tsx
import React, { useEffect, useState } from "react";
import { Api } from "../../Api";
import AddPatientForm from "./AddPatientForm";

export const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const api = new Api();
        api.patients.patientsList()
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    return (
        <div>
            <h1>Patient List</h1>
            <AddPatientForm />
            {patients.map((patient) => (
                <div key={patient.id}>
                    {patient.name}
                </div>
            ))}
        </div>
    );
};