import { Select } from "rizzui/select";
import { Switch } from "rizzui/switch";
import { NumberInput } from "../NumberInput";
import { PricingPolicyAdjustmentTypeOptions } from "../SellingPlanFormUtils";

export const PricingPolicy = ({
    pricingPolicyEnable,
    pricingPolicyAdjustmentType,
    pricingPolicyAdjustmentValue,
    onToggleDiscount,
    onChangePricingPolicyAdjustmentType,
    onChangePricingPolicyAdjustmentValue,
}: {
    pricingPolicyEnable: boolean,
    pricingPolicyAdjustmentType: string,
    pricingPolicyAdjustmentValue: number
    onToggleDiscount: () => void,
    onChangePricingPolicyAdjustmentType: (value: string) => void,
    onChangePricingPolicyAdjustmentValue: (value: number) => void,
}) => (
    <div>
        <Switch
            checked={pricingPolicyEnable}
            onChange={onToggleDiscount}
            label="Offer a discount"
        />
        {pricingPolicyEnable && (
            <div className="flex gap-4 mt-3">
                <div className="flex-1">
                    <Select
                        value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === pricingPolicyAdjustmentType)}
                        options={PricingPolicyAdjustmentTypeOptions}
                        onChange={(option: any) => option && onChangePricingPolicyAdjustmentType(option.value)}
                        label="Discount Type"
                    />
                </div>
                <div className="flex-1">
                    <NumberInput
                        label={pricingPolicyAdjustmentType === 'PERCENTAGE' ? 'Discount value' : 'Set Price'}
                        value={pricingPolicyAdjustmentValue ?? 0}
                        onChange={onChangePricingPolicyAdjustmentValue}
                        percent={true}
                    />
                </div>
            </div>
        )}
    </div>
);