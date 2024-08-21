// client/src/components/Patients/PatientList.tsx
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import { Api } from "../../Api";
import AddPatientForm from "./AddPatientForm";
import RemovePatient from "./RemovePatient";
import UpdatePatient from "./UpdatePatient.tsx";
import {Link} from "react-router-dom";
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
            <AddPatientForm />
            {patients.map((patient) => (
                <div key={patient.id}>
                    <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                </div>
            ))}
            <div>
                {patients.map(patient => (
                    <Card
                        key={patient.id}
                        title={patient.name}
                        content={<p>ID: {patient.id}</p>}
                        link={`/patients/${patient.id}`}
                    />
                ))}
            </div>
        </div>
    );
};