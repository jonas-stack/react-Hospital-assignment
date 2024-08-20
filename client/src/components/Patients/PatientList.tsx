// client/src/components/Patients/PatientList.tsx
import { Api } from "../../Api";
import { useEffect, useState } from "react";

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
            {patients.map((patient) => (
                <div key={patient.id}>
                    {patient.name}
                </div>
            ))}
        </div>
    );
};