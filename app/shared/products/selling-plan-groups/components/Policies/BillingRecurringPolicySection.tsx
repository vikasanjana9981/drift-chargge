import { Select } from "rizzui/select";
import { Switch } from "rizzui/switch";
import { Text } from "rizzui/typography";
import { anchorTypeOptions, checkoutChargeTypeOptions, dayOptions, monthDayOptions, remainingBalanceChargeTriggerOptions, yearlyRenewalMonthOptions } from "../SellingPlanFormUtils";
import { NumberInput } from "../NumberInput";
import { DatePicker } from "app/packages/ui/datepicker";
import { SelectOption, unitOptions } from '../SellingPlanFormUtils';
import { PayPerShipmentSellingPlan, SellingPlanInterval } from "app/types/product/sellingPlans";
import { useEffect } from "react";

/** Renders the billing policy section with conditional fields based on selections. */
export const BillingRecurringPolicySection = ({
    currentPlan,
    onChange
}: {
    currentPlan: PayPerShipmentSellingPlan,
    onChange: any;
}) => {
    const {
        billingRecurringPolicyEnable,
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount,
        billingRecurringPolicyMinCycles,
        billingRecurringPolicyMaxCycles,
        billingRecurringPolicyAnchorsType,
        billingRecurringPolicyAnchorsDay,
        billingRecurringPolicyAnchorsCutoffDay,
        billingRecurringPolicyAnchorsMonth
    } = currentPlan;

    useEffect(() => {
        const defaultPlanName = `${billingRecurringPolicyIntervalCount} ${billingRecurringPolicyInterval.toLowerCase()} Subscription`;
        onChange('planName', defaultPlanName);
    }, [billingRecurringPolicyIntervalCount, billingRecurringPolicyInterval]);

    return (
        <div className="pt-3 border-t-2">
            <div className="flex gap-4 mt-3 flex-wrap">
                <div className="flex w-full gap-4">
                    <div className="w-[50%]">
                        <NumberInput
                            label="Billing Frequency"
                            value={billingRecurringPolicyIntervalCount}
                            onChange={(v) => onChange('billingRecurringPolicyIntervalCount', v)}
                        />
                    </div>
                    <div className="w-[50%]">
                        <Select<SelectOption<PayPerShipmentSellingPlan['billingRecurringPolicyInterval']>>
                            value={unitOptions.find((opt: any) => opt.value === billingRecurringPolicyInterval)}
                            options={unitOptions}
                            onChange={(option: any) => {
                                if (option) {
                                    onChange('billingRecurringPolicyInterval', option.value);
                                }
                            }}
                            label="Unit"
                        />
                    </div>
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex-1 w-[50%]">
                        <NumberInput
                            label="Billing Policy Min Cycles"
                            value={billingRecurringPolicyMinCycles ?? 0}
                            onChange={(v) => onChange('billingRecurringPolicyMinCycles', v)}
                        />
                    </div>

                    <div className="flex-1 w-[50%]">
                        <NumberInput
                            label="Billing Policy Max Cycles"
                            value={billingRecurringPolicyMaxCycles ?? 0}
                            onChange={(v) => onChange('billingRecurringPolicyMaxCycles', v)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-3 w-full">
                    <div className="flex-1">
                        <Select
                            value={anchorTypeOptions.find(opt => opt.value === billingRecurringPolicyAnchorsType)}
                            options={anchorTypeOptions}
                            onChange={(option: any) => option && onChange('billingRecurringPolicyAnchorsType', option.value)}
                            label="When Should Delivery Be Scheduled?"
                        />
                    </div>

                    {billingRecurringPolicyAnchorsType == 'WEEKDAY' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="">
                                <Select
                                    value={dayOptions.find(opt => opt.value === billingRecurringPolicyAnchorsDay)}
                                    options={dayOptions}
                                    onChange={(option: any) => option && onChange('billingRecurringPolicyAnchorsDay', option.value)}
                                    label="Select Day"
                                />
                            </div>
                            <div className="">
                                <Select
                                    value={dayOptions.find(opt => opt.value === billingRecurringPolicyAnchorsCutoffDay)}
                                    options={dayOptions}
                                    onChange={(option: any) => option && onChange('billingRecurringPolicyAnchorsCutoffDay', option.value)}
                                    label="Cutfoff Time Interval"
                                />
                            </div>
                        </div>
                    )}

                    {billingRecurringPolicyAnchorsType === "MONTHDAY" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Select
                                    value={monthDayOptions.find(opt => opt.value === billingRecurringPolicyAnchorsMonth)}
                                    options={monthDayOptions}
                                    onChange={(option: any) => option && onChange('deliveryRecurringPolicyAnchorsMonth', option.value)}
                                    label="Select Month"
                                />
                            </div>
                            <div>
                                <Select
                                    value={monthDayOptions.find(opt => opt.value === billingRecurringPolicyAnchorsCutoffDay)}
                                    options={monthDayOptions}
                                    onChange={(option: any) => option && onChange('billingRecurringPolicyAnchorsCutoffDay', option.value)}
                                    label="Cutfoff Time Interval"
                                />
                            </div>
                        </div>
                    )}

                    {billingRecurringPolicyAnchorsType == 'YEARDAY' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                value={yearlyRenewalMonthOptions.find(opt => opt.value === billingRecurringPolicyAnchorsDay)}
                                options={yearlyRenewalMonthOptions}
                                onChange={(option: any) => option && onChange('billingRecurringPolicyAnchorsDay', option.value)}
                                label="Select Day"
                            />
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};