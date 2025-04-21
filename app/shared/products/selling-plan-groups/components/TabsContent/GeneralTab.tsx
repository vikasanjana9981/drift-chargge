import { useEffect } from 'react';
import { NumberInput } from '../NumberInput';
import { Select } from 'rizzui/select';
import { PayPerShipmentSellingPlan, Plan } from 'app/types/product/sellingPlans';
import { SelectOption, unitOptions } from '../SellingPlanFormUtils';

const GeneralTabContent = ({
    handleChange,
    plan,
    prePaidFrom
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void,
    plan: PayPerShipmentSellingPlan
    prePaidFrom: boolean
}) => {
    // Update frequencyName whenever orderFrequency or frequencyUnit changes
    useEffect(() => {
        const newFrequencyName = `${plan.orderFrequency} ${plan.frequencyUnit} Subscription`;
        handleChange('frequencyName', newFrequencyName);
    }, [plan.orderFrequency, plan.frequencyUnit]);

    return (
        <div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <NumberInput
                        label="Order Frequency"
                        value={plan.orderFrequency}
                        onChange={(v) => handleChange('orderFrequency', v)}
                    />
                </div>
                <div className="flex-1">
                    <Select<SelectOption<PayPerShipmentSellingPlan['frequencyUnit']>>
                        value={unitOptions.find(opt => opt.value === plan.frequencyUnit)}
                        options={unitOptions}
                        onChange={(option: any) => {
                            if (option) {
                                handleChange('frequencyUnit', option.value);
                            }
                        }}
                        label="Unit"
                    />
                </div>
            </div>

            {
                prePaidFrom && (
                    <div className="mt-5">
                        <NumberInput
                            label="Billing Frequency"
                            value={plan.billingFrequency}
                            onChange={(v) => handleChange('billingFrequency', v)}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default GeneralTabContent;