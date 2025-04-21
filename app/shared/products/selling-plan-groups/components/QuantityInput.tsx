import { useEffect, useState } from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { ActionIcon } from "rizzui/action-icon";
import { Input } from "rizzui/input";

export default function QuantityInput({
    name,
    error,
    onChange,
    defaultValue,
}: {
    name?: string;
    error?: string;
    onChange?: (value: number) => void;
    defaultValue?: number;
}) {
    const [value, setValue] = useState(defaultValue ?? 1);

    function handleIncrement() {
        let newValue = value + 1;
        setValue(newValue);
        onChange && onChange(newValue);
    }

    function handleDecrement() {
        let newValue = value > 1 ? value - 1 : 1;
        setValue(newValue);
        onChange && onChange(newValue);
    }

    function handleOnChange(inputValue: number) {
        setValue(Number(inputValue));
        onChange && onChange(inputValue);
    }

    useEffect(() => {
        setValue(defaultValue ?? 1);
        onChange && onChange(defaultValue ?? 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Input
            label="Quantity"
            type="number"
            min={1}
            name={name}
            value={value}
            placeholder="1"
            onChange={(e) => handleOnChange(Number(e.target.value))}
            suffix={
                <>
                    <ActionIcon
                        title="Decrement"
                        size="sm"
                        variant={"outline" as any}
                        className="scale-90 shadow-sm"
                        onClick={() => handleDecrement()}
                    >
                        <PiMinusBold className="h-3.5 w-3.5" strokeWidth={2} />
                    </ActionIcon>
                    <ActionIcon
                        title="Increment"
                        size="sm"
                        variant={"outline" as any}
                        className="scale-90 shadow-sm"
                        onClick={() => handleIncrement()}
                    >
                        <PiPlusBold className="h-3.5 w-3.5" strokeWidth={2} />
                    </ActionIcon>
                </>
            }
            suffixClassName="flex gap-1 items-center -me-2"
            error={error}
        />
    );
}