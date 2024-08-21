// client/src/components/Patients/PatientList.tsx
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import { Api } from "../../Api";
import AddPatientForm from "./AddPatientForm";
import Card from "../Utilities/Cards.tsx";

export const PatientList = () => {
    const [patients, setPatients] = useAtom(patientsAtom);

    useEffect(() => {
        const api = new Api();
        api.patients.patientsList()
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, [setPatients]);

    return (
        <div>
            <h1>Patient List</h1>
            <div className="patient-list">
                {patients.map(patient => (
                    <Card
                        key={patient.id}
                        title={patient.name}
                        content={<p>ID: {patient.id}</p>}
                        link={`/patients/${patient.id}`}
                    />
                ))}
            </div>
            <AddPatientForm />
        </div>
    );
};