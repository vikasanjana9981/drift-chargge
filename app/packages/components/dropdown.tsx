"use client";

import { Dropdown, Button } from "rizzui";
// import { FaChevronDown } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";

interface DropdownOption<T> {
  value: T;
  label: string;
}

interface CustomDropdownProps<T> {
  label: string;
  options: DropdownOption<T>[]; // Generic list of dropdown options
  onSelect: (value: T) => void;
  renderOption?: (value: T) => React.ReactNode; // Custom render function
  variant?: "outline" | "solid" | "ghost" | "text";
  menuClassName?: string
}

export default function CustomDropdown<T>({
  label,
  options,
  onSelect,
  renderOption,
  variant = "outline",
  menuClassName
}: CustomDropdownProps<T>) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button as="span" variant={variant as any}>
          {label} 
          {/* <IoChevronDownSharp className="ml-2 w-5" /> */}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className={menuClassName}>
        {options.map((option) => (
          <Dropdown.Item key={String(option.value)} onClick={() => onSelect(option.value)}>
            {renderOption ? renderOption(option.value) : option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
