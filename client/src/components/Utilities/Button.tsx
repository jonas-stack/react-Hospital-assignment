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


    return (
        <button
            className={`btn ${theme} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
