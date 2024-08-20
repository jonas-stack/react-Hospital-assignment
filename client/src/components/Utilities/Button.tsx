// client/src/components/Utilities/Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = "", disabled = false, type = "button", children }) => {
    const baseClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    const combinedClass = `${baseClass} ${className}`;

    return (
        <button
            className={combinedClass}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;