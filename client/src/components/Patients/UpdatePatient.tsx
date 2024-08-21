import React, { useState } from "react";
import { useAtom } from "jotai";
import { patientsAtom } from "../../atoms/PatientsAtom";  // Importing the atom that holds the state of the patients list
import TextFields from "../Utilities/TextField.tsx";     // Importing a reusable text field component
import Button from "../Utilities/Button.tsx";           // Importing a reusable button component
import { apiClient } from "../../apiClient.ts";         // Importing the API client for making HTTP requests

const UpdatePatientForm = () => {
    // State hooks for managing selected patient and new name input
    const [patients, setPatients] = useAtom(patientsAtom);  // Using Jotai to manage the state of patients globally
    const [selectedPatient, setSelectedPatient] = useState(""); // State for the name of the patient to be updated
    const [newName, setNewName] = useState("");               // State for the new name to assign to the patient

    // Function to handle the form submission and update the patient's information
    const handlePatientUpdate = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Find the patient object from the patients list by matching the selected patient's name
        const patientToUpdate = patients.find(patient => patient.name === selectedPatient);

        // If no matching patient is found, alert the user and exit the function
        if (!patientToUpdate) {
            alert("Patient not found. Please select a valid patient.");
            return;
        }

        try {
            // Make an API call to partially update the patient's information
            const response = await apiClient.patients.patientsPartialUpdate(
                { name: newName },                     // The new name data to update
                { id: `eq.${patientToUpdate.id}` },    // Querying the patient by ID using the equality operator
                { headers: { Prefer: "return=representation" } } // Requesting the updated patient data in the response
            );

            // If the API call is successful, update the local state with the new patient data
            if (response && response.status === 200) {
                setPatients(patients.map(patient =>
                    patient.id === patientToUpdate.id ? { ...patient, name: newName } : patient
                ));
                alert("Patient updated successfully!"); // Notify the user of the success
                setSelectedPatient("");                 // Reset the selected patient input
                setNewName("");                         // Reset the new name input
            } else {
                alert("Failed to update patient. Please try again."); // Notify the user if the update fails
            }
        } catch (error) {
            console.error("Error updating patient:", error); // Log any errors to the console for debugging
            alert("An error occurred while updating the patient.");  // Alert the user of the error
        }
    };

    return (
        <div>
            <h1>Update Patient</h1>
            {/* Form to capture and submit the patient's update */}
            <form onSubmit={handlePatientUpdate}>
                <div>
                    <label>Select patient to update:</label>
                    {/* Input field for selecting the patient to update */}
                    <TextFields value={selectedPatient} onChange={setSelectedPatient} />
                </div>
                <div>
                    <label>New name:</label>
                    {/* Input field for entering the new name for the selected patient */}
                    <TextFields value={newName} onChange={setNewName} />
                </div>
                {/* Button to submit the form and trigger the update */}
                <Button type="submit">Update Patient</Button>
            </form>
            <h2>Patient List</h2>
            {/* Displaying the list of patients for reference */}
            {patients.map((patient) => (
                <div key={patient.id}>
                    {patient.name}  {/* Displaying the name of each patient */}
                </div>
            ))}
        </div>
    );
};

export default UpdatePatientForm;  // Exporting the component so it can be used elsewhere in the application
