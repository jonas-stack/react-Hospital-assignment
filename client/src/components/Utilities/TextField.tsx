// client/src/components/Utilities/TextField.tsx
import React from 'react';

interface TextFieldProps {
    value: string;
    onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ value, onChange }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default TextField;