import { Plan } from 'app/types/product/sellingPlans'
import { Switch } from 'rizzui/switch'
import { NumberInput } from '../NumberInput'
import { Select } from 'rizzui/select'
import { PricingPolicyAdjustmentTypeOptions } from '../SellingPlanFormUtils'


const OfferDiscountTab = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof Plan>(field: T, value: Plan[T]) => void,
    plan: Plan
}) => {
    return (
        <div className="space-y-4">
            <Switch
                checked={plan.offerDiscount}
                onChange={() => handleChange('offerDiscount', !plan.offerDiscount)}
                label="Offer a discount on this frequency"
            />
            {plan.offerDiscount && (
                <>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <NumberInput
                                label="Discount Value"
                                value={plan.discountValue}
                                onChange={(v) => handleChange('discountValue', v)}
                            />
                        </div>
                        <div className="flex-1">
                            <Select
                                value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === plan.discountType)}
                                options={PricingPolicyAdjustmentTypeOptions}
                                onChange={(option: any) => option && handleChange('discountType', option.value)}
                                label="Discount Type"
                            />
                        </div>
                    </div>
                    <Switch
                        checked={plan.changeDiscountAfterChargeEnable}
                        onChange={() => handleChange('changeDiscountAfterChargeEnable', !plan.changeDiscountAfterChargeEnable)}
                        label="Change discount after specific number of payments"
                    />
                    {plan.changeDiscountAfterChargeEnable && (
                        <div className="space-y-4">
                            <NumberInput
                                label="Change After Charges"
                                value={plan.changeDiscountAfterCharge}
                                onChange={(v) => handleChange('changeDiscountAfterCharge', v)}
                            />
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <NumberInput
                                        label="New Discount Value"
                                        value={plan.changeDiscountAfterChargeValue}
                                        onChange={(v) => handleChange('changeDiscountAfterChargeValue', v)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Select
                                        value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === plan.changeDiscountafterChargeDiscountType)}
                                        options={PricingPolicyAdjustmentTypeOptions}
                                        onChange={(option: any) => option && handleChange('changeDiscountafterChargeDiscountType', option.value)}
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

export default OfferDiscountTab