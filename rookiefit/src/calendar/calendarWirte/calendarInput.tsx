// TextInput.tsx
import React from 'react';
import './calendarInput.css';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => {
    return (
        <div className="text-input-wrapper">
            <label className="text-input-label">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="text-input-field"
            />
        </div>
    );
};

export default TextInput;
