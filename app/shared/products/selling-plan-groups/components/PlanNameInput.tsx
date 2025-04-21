import { Input } from 'rizzui';

export const PlanNameInput = ({
    value,
    onChange,
    productTitle,
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    productTitle: string;
}) => (
    <Input
        label="Plan Name"
        value={value || productTitle}
        onChange={onChange}
        placeholder="Enter plan name"
    />
);