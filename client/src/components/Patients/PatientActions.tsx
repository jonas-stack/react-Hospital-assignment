import React, { useState } from "react";
import UpdatePatientForm from "./UpdatePatient";
import RemovePatient from "./RemovePatient";
import { Patients } from "../../Api";
import { useAtom } from "jotai";
import { ThemeAtom } from "../../atoms/ThemeAtom";

interface PatientActionsProps {
    patient: Patients;
}

const PatientActions: React.FC<PatientActionsProps> = ({ patient }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme] = useAtom(ThemeAtom);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="relative ml-4 flex flex-col justify-center items-center w-full max-w-lg">
            <div
                className={`collapse collapse-arrow bg-base-200 w-full ${isCollapsed ? "collapse-open" : "collapse-close"}`}
                data-theme={theme}
            >
                <div
                    className="collapse-title text-xl font-medium cursor-pointer"
                    onClick={toggleCollapse}
                >
                    {isCollapsed ? "Close" : "Edit Patient"}
                </div>
                {isCollapsed && (
                    <div className="collapse-content p-4">
                        <UpdatePatientForm patient={patient} />
                        <RemovePatient patient={patient} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientActions;
