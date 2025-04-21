import { FC, useState } from 'react';
import { Input } from 'rizzui/input';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';

interface NumberInputProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    percent?: boolean; // New prop to control max limit
    onChange: (value: number) => void;
}

export const NumberInput: FC<NumberInputProps> = ({ label, value, min = 1, percent = false, onChange }) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === '' ? '' : Number(e.target.value);
        setInternalValue(newValue as number); // Allow empty value for manual entry
    };

    const handleBlur = () => {
        const finalValue = Math.max(min, Math.min(internalValue || min, percent ? 100 : Infinity)); // Apply min/max limits
        setInternalValue(finalValue);
        onChange(finalValue);
    };

    return (
        <Input
            type="number"
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            label={label}
            suffix={
                <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                    <button
                        type="button"
                        className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                        onClick={() => {
                            const newValue = Math.min(internalValue + 1, percent ? 100 : Infinity);
                            setInternalValue(newValue);
                            onChange(newValue);
                        }}
                    >
                        <FaChevronUp className="h-3 w-3" />
                    </button>
                    <button
                        type="button"
                        className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                        onClick={() => {
                            const newValue = Math.max(internalValue - 1, min);
                            setInternalValue(newValue);
                            onChange(newValue);
                        }}
                    >
                        <FaChevronDown className="h-3 w-3" />
                    </button>
                </div>
            }
        />
    );
};
