import { Text } from "rizzui/typography";
import { anchorTypeOptions, dayOptions, deliveryPolicyFulfillmentTriggerOptions, monthDayOptions, preAnchorBehaviorOptions, SelectOption, unitOptions, yearlyRenewalMonthOptions } from "../SellingPlanFormUtils";
import { Select } from "rizzui/select";
import { DatePicker } from "app/packages/ui/datepicker";
import { NumberInput } from "../NumberInput";
import { PayPerShipmentSellingPlan, PrePaidSubscriptionSellingPlan } from "app/types/product/sellingPlans";
import sellingPlanValidators from "app/shared/products/create-plans/sellingPlanValidators";

/** Renders the delivery policy section with trigger options and conditional fields. */
export const DeliveryRecurringPolicySection = ({
    currentPlan,
    onChange,
    prePaidFrom = false
}: {
    currentPlan: PayPerShipmentSellingPlan,
    onChange: any;
    prePaidFrom?: boolean
}) => {
    const {
        deliveryRecurringPolicyAnchorsCutoffDay,
        deliveryRecurringPolicyAnchorsDay,
        deliveryRecurringPolicyAnchorsMonth,
        deliveryRecurringPolicyAnchorsType,
        deliveryRecurringPolicyCutoff,
        deliveryRecurringPolicyInterval,
        deliveryRecurringPolicyIntervalCount,
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount,
        deliveryRecurringPreAnchorBehavior,

    } = currentPlan;

    const billingDays = sellingPlanValidators.getDays(
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount || 1
    );

    const deliveryDays = sellingPlanValidators.getDays(
        deliveryRecurringPolicyInterval,
        deliveryRecurringPolicyIntervalCount || 0
    );

    const filteredUnitOptions = unitOptions.map(opt => ({
        ...opt,
        disabled: sellingPlanValidators.getMaxDeliveryCount(billingDays, opt.value) < 1
    }));

    const maxDeliveryCount = sellingPlanValidators.getMaxDeliveryCount(billingDays, deliveryRecurringPolicyInterval);

    return (
        <div className="pt-3">
            {
                prePaidFrom && (
                    <div className="flex w-full gap-4 mb-3 flex-wrap">
                        <div className="w-[48%]">
                            <NumberInput
                                label="Delivery Frequency"
                                value={deliveryRecurringPolicyIntervalCount ?? 0}
                                onChange={(v) => onChange('deliveryRecurringPolicyIntervalCount', v)}
                                min={1}
                                max={maxDeliveryCount}
                            />
                        </div>
                        <div className="w-[48%]">
                            <Select<SelectOption<Exclude<PrePaidSubscriptionSellingPlan['deliveryRecurringPolicyInterval'], null>>>
                                value={unitOptions.find((opt: any) => opt.value === deliveryRecurringPolicyInterval)}
                                options={unitOptions}
                                onChange={(option: any) => {
                                    if (option) {
                                        onChange('deliveryRecurringPolicyInterval', option.value);
                                    }
                                }}
                                label="Unit"
                            />
                        </div>

                        {deliveryDays >= billingDays && (
                            <Text className="text-red-500 mt-2 w-[100%]">
                                Delivery interval must be shorter than the billing interval
                            </Text>
                        )}
                    </div>
                )
            }

            <div className="flex-1">
                <Select
                    value={preAnchorBehaviorOptions.find(opt => opt.value === deliveryRecurringPreAnchorBehavior)}
                    options={preAnchorBehaviorOptions}
                    onChange={(option: any) => option && onChange('deliveryRecurringPreAnchorBehavior', option.value)}
                    label="The pre-anchor behavior."
                />
            </div>

            <div className="flex flex-col gap-4 mt-3">
                <div className="flex-1">
                    <Select
                        value={anchorTypeOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsType)}
                        options={anchorTypeOptions}
                        onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsType', option.value)}
                        label="When Should Delivery Be Scheduled?"
                    />
                </div>

                {deliveryRecurringPolicyAnchorsType == 'WEEKDAY' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <Select
                                value={dayOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsDay)}
                                options={dayOptions}
                                onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsDay', option.value)}
                                label="Select Day"
                            />
                        </div>
                        <div className="">
                            <Select
                                value={dayOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsCutoffDay)}
                                options={dayOptions}
                                onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsCutoffDay', option.value)}
                                label="Cutfoff Time Interval"
                            />
                        </div>
                    </div>
                )}

                {deliveryRecurringPolicyAnchorsType === "MONTHDAY" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Select
                                value={monthDayOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsMonth)}
                                options={monthDayOptions}
                                onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsMonth', option.value)}
                                label="Select Month"
                            />
                        </div>
                        <div>
                            <Select
                                value={monthDayOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsCutoffDay)}
                                options={monthDayOptions}
                                onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsCutoffDay', option.value)}
                                label="Cutfoff Time Interval"
                            />
                        </div>
                    </div>
                )}

                {deliveryRecurringPolicyAnchorsType == 'YEARDAY' && (
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            value={yearlyRenewalMonthOptions.find(opt => opt.value === deliveryRecurringPolicyAnchorsDay)}
                            options={yearlyRenewalMonthOptions}
                            onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsDay', option.value)}
                            label="Select Day"
                        />
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex-1">
                        <Select
                            value={preAnchorBehaviorOptions.find(opt => opt.value === deliveryRecurringPreAnchorBehavior)}
                            options={preAnchorBehaviorOptions}
                            onChange={(option: any) => option && onChange('deliveryRecurringPreAnchorBehavior', option.value)}
                            label="The pre-anchor behavior."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
