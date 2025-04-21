import { PayPerShipmentSellingPlan, Plan } from 'app/types/product/sellingPlans'
import { Switch } from 'rizzui/switch'
import { NumberInput } from '../NumberInput'
import { Select } from 'rizzui/select'
import { PricingPolicyAdjustmentTypeOptions } from '../SellingPlanFormUtils'


const PricingPolicyRecurring = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void,
    plan: PayPerShipmentSellingPlan
}) => {
   const {
        pricingPolicyEnable,
        pricingPolicyAdjustmentValue,
        pricingPolicyAdjustmentType,
        pricingPolicyAfterCycleEnable,
        pricingPolicyAfterCycle,
        pricingPolicyAfterCycleAdjustmentValue,
        pricingPolicyAfterCycleAdjustmentType

    } = plan
    return (
        <div className="space-y-4">
            <Switch
                checked={pricingPolicyEnable}
                onChange={() => handleChange('pricingPolicyEnable', !pricingPolicyEnable)}
                label="Offer a discount on this frequency"
            />
            {pricingPolicyEnable && (
                <>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <NumberInput
                                label="Discount Value"
                                value={pricingPolicyAdjustmentValue}
                                onChange={(v) => handleChange('pricingPolicyAdjustmentValue', v)}
                            />
                        </div>
                        <div className="flex-1">
                            <Select
                                value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === pricingPolicyAdjustmentType)}
                                options={PricingPolicyAdjustmentTypeOptions}
                                onChange={(option: any) => option && handleChange('pricingPolicyAdjustmentType', option.value)}
                                label="Discount Type"
                            />
                        </div>
                    </div>
                    <Switch
                        checked={pricingPolicyAfterCycleEnable}
                        onChange={() => handleChange('pricingPolicyAfterCycleEnable', !pricingPolicyAfterCycleEnable)}
                        label="Change discount after specific number of payments"
                    />
                    {pricingPolicyAfterCycleEnable && (
                        <div className="space-y-4">
                            <NumberInput
                                label="Change After Charges"
                                value={pricingPolicyAfterCycle}
                                onChange={(v) => handleChange('pricingPolicyAfterCycle', v)}
                            />
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <NumberInput
                                        label="New Discount Value"
                                        value={pricingPolicyAfterCycleAdjustmentValue}
                                        onChange={(v) => handleChange('pricingPolicyAfterCycleAdjustmentValue', v)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Select
                                        value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === pricingPolicyAfterCycleAdjustmentType)}
                                        options={PricingPolicyAdjustmentTypeOptions}
                                        onChange={(option: any) => option && handleChange('pricingPolicyAfterCycleAdjustmentType', option.value)}
                                        label="New Discount Type"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PricingPolicyRecurring