import { Plan } from "app/types/product/sellingPlans"
import { Switch } from "rizzui/switch"
import { NumberInput } from "../NumberInput"
import { Select } from "rizzui/select"
import { PricingPolicyAdjustmentTypeOptions, SelectOption, unitOptions } from "../SellingPlanFormUtils"

const OfferTrialTab = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof Plan>(field: T, value: Plan[T]) => void,
    plan: Plan
}) => {
    return (
        <div className="space-y-4">
            <Switch
                checked={plan.OfferFreeTrial}
                onChange={() => handleChange('OfferFreeTrial', !plan.OfferFreeTrial)}
                label="Offer Free Trial"
            />
            {plan.OfferFreeTrial && (
                <>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <NumberInput
                                label="Trial Period"
                                value={plan.freeTrialEndsPeriod}
                                onChange={(v) => handleChange('freeTrialEndsPeriod', v)}
                            />
                        </div>
                        <div className="flex-1">
                            <Select<SelectOption<Plan['frequencyUnit']>>
                                value={unitOptions.find(opt => opt.value.toLowerCase() === plan.freeTrialEndsPeriodUnit.toLowerCase())}
                                options={unitOptions}
                                onChange={(option: any) => option && handleChange('freeTrialEndsPeriodUnit', option.value)}
                                label="Trial Period Unit"
                            />
                        </div>
                    </div>
                    <Switch
                        checked={plan.freeTrialDiscountEnable}
                        onChange={() => handleChange('freeTrialDiscountEnable', !plan.freeTrialDiscountEnable)}
                        label="Enable Free Trial Discount"
                    />
                    {plan.freeTrialDiscountEnable && (
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <NumberInput
                                    label="Trial Discount Value"
                                    value={plan.freeTrialDiscountValue}
                                    onChange={(v) => handleChange('freeTrialDiscountValue', v)}
                                />
                            </div>
                            <div className="flex-1">
                                <Select
                                    value={PricingPolicyAdjustmentTypeOptions.find(opt => opt.value === plan.freeTrialDiscountType)}
                                    options={PricingPolicyAdjustmentTypeOptions}
                                    onChange={(option: any) => option && handleChange('freeTrialDiscountType', option.value)}
                                    label="Trial Discount Type"
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default OfferTrialTab