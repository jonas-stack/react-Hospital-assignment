// client/src/components/Patients/PatientList.tsx
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import { Api } from "../../Api";
import AddPatientForm from "./AddPatientForm";
import RemovePatient from "./RemovePatient";

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
            <AddPatientForm />
            {patients.map((patient) => (
                <div key={patient.id}>
                    {patient.name}
                </div>
            ))}
            <RemovePatient />
        </div>
    );
};