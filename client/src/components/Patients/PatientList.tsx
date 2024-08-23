import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";
import { Api } from "../../Api";
import AddPatientForm from "./AddPatientForm";
import Card from "../Utilities/Cards";
import SearchBar from "../Utilities/SearchBar.tsx";
import { ThemeAtom } from "../../atoms/ThemeAtom.tsx";

const PatientList: React.FC = () => {
    const [theme] = useAtom(ThemeAtom);
    const [patients, setPatients] = useAtom(patientsAtom);

    const handleSearch = async (query: string) => {
        try {
            const response = await new Api().patients.patientsList({ name: `ilike.*${query}*` });
            setPatients(response.data);
        } catch (error) {
            console.error("Error searching patients:", error);
        }
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await new Api().patients.patientsList();
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, [setPatients]);

    return (
        <div className={`flex flex-col ${theme}`} data-theme={theme}>
            <h1 style={{fontSize: '2em'}}><strong>Patient List</strong></h1>
            <br/>
            <div className="flex justify-between items-center">
                <SearchBar onSearch={handleSearch}/>
                <AddPatientForm/>
            </div>
            <br/>
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
            <br/>
        </div>
    );
};

export default PatientList;