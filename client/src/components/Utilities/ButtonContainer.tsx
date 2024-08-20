// client/src/components/Utilities/ButtonContainer.tsx
import React from "react";

interface ButtonContainerProps {
    children: React.ReactNode;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
    let containerClass = "flex justify-center items-center h-screen";
    return <div className={containerClass}>{children}</div>;
};

export default ButtonContainer;