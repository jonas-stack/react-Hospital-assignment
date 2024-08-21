// client/src/components/Utilities/Button.tsx
import React, { ReactNode } from "react";
import { useAtom } from "jotai";
import { ThemeAtom } from "../../atoms/ThemeAtom.tsx";

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = "", disabled = false, type = "button", children }) => {
    const [theme] = useAtom(ThemeAtom);

    // Combine base button class with theme-specific class
    const combinedClass = `btn ${theme} ${className}`;

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
