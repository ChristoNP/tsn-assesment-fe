import React from "react";

interface InputFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    type?: string
    required?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    type = "text",
    required = true
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-bold mb-1">{label} <span className="text-red-600">*</span></label>
            <input
                type={type}
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default InputField