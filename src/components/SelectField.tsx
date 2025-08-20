import React from "react"

interface SelectFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    options: string[]
    required?: boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    value,
    onChange,
    options,
    required = true,
}) => {
    return (
        <div className="mb-4 mt-6">
            <label className="block text-sm font-bold mb-1">{label} <span className="text-red-600">*</span></label>
            <select
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                className="w-[13.7rem] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value=""></option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField
