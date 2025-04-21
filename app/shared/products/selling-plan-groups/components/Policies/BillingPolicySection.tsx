import { Select } from "rizzui/select";
import { Switch } from "rizzui/switch";
import { Text } from "rizzui/typography";
import { checkoutChargeTypeOptions, remainingBalanceChargeTriggerOptions } from "../SellingPlanFormUtils";
import { NumberInput } from "../NumberInput";
import { DatePicker } from "app/packages/ui/datepicker";

/** Renders the billing policy section with conditional fields based on selections. */
export const BillingPolicySection = ({
    currentPlan,
    onChange
}: {
    currentPlan: any,
    onChange: any;
}) => {
    const {
        billingPolicyEnable,
        billingPolicyCheckoutChargeType,
        billingPolicyCheckoutChargeValue,
        billingPolicyRemainingBalanceChargeTrigger,
        billingPolicyRemainingBalanceChargeExactTime,
        billingPolicyRemainingBalanceChargeTimeAfterCheckout
    } = currentPlan;

    return (
        <div className="pt-3 border-t-2">
            <div>
                <Switch
                    checked={billingPolicyEnable}
                    onChange={() => onChange('billingPolicyEnable', !billingPolicyEnable)}
                    label="Set Billing Policy"
                />
                <Text>If not set, it will treat as a normal order</Text>
            </div>
            {billingPolicyEnable && (
                <div className="flex gap-4 mt-3 flex-wrap">
                    <div className="flex-1 w-[50%]">
                        <Select
                            value={checkoutChargeTypeOptions.find(opt => opt.value === billingPolicyCheckoutChargeType)}
                            options={checkoutChargeTypeOptions}
                            onChange={(option: any) => option && onChange('billingPolicyCheckoutChargeType', option.value)}
                            label="Checkout Charge Type"
                        />
                    </div>
                    <div className="flex-1 w-[50%]">
                        <NumberInput
                            label="Set Value"
                            value={billingPolicyCheckoutChargeValue ?? 0}
                            onChange={(v) => onChange('billingPolicyCheckoutChargeValue', v)}
                            percent={true}
                        />
                    </div>
                    {(billingPolicyCheckoutChargeType === 'PERCENTAGE' && billingPolicyCheckoutChargeValue < 100) && (
                        <div className="w-[100%]">
                            <Select
                                value={remainingBalanceChargeTriggerOptions.find(opt => opt.value === billingPolicyRemainingBalanceChargeTrigger)}
                                options={remainingBalanceChargeTriggerOptions}
                                onChange={(option: any) => option && onChange('billingPolicyRemainingBalanceChargeTrigger', option.value)}
                                label="Remaining Balance Charge Trigger"
                            />
                        </div>
                    )}

                    {/* Here we need a condition that if the trigger is exact time and pricing value is less than the actuall price or percent is lesst than actual price */}
                    {billingPolicyRemainingBalanceChargeTrigger === 'EXACT_TIME' && (
                        <div className="flex-1">
                            <DatePicker
                                selected={billingPolicyRemainingBalanceChargeExactTime ? new Date(billingPolicyRemainingBalanceChargeExactTime) : null}
                                onChange={(date: Date | null) => {
                                    const isoDate = date ? date.toISOString() : null;
                                    onChange("billingPolicyRemainingBalanceChargeExactTime", isoDate as any);
                                }}
                                dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                                placeholderText="Select Date & Time"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Time"
                                popperPlacement="bottom-end"
                                showMonthYearPicker={false}
                                inputProps={{
                                    variant: "text",
                                    inputClassName:
                                        "rizzui-input-container flex items-center peer w-full transition duration-200 [&.is-focus]:ring-[0.8px] ring-[0.6px] [&.is-hover]:border-primary [&.is-focus]:border-primary [&.is-focus]:ring-primary [&_input::placeholder]:opacity-60 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
                                    label: "Select Date Time"
                                }}
                                className="w-full"
                            />
                        </div>
                    )}
                    {billingPolicyRemainingBalanceChargeTrigger === 'TIME_AFTER_CHECKOUT' && (
                        <NumberInput
                            label="Remaining Balance Charge Time After Checkout"
                            value={parseInt(billingPolicyRemainingBalanceChargeTimeAfterCheckout.replace(/\D/g, ""), 10) || ""}
                            onChange={(v) => onChange("billingPolicyRemainingBalanceChargeTimeAfterCheckout", `P${v}${billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) || "D"}`)}
                            suffix={
                                <Select
                                    options={[
                                        { value: "D", label: "Days" },
                                        { value: "W", label: "Weeks" },
                                        { value: "M", label: "Months" },
                                        { value: "Y", label: "Years" }
                                    ]}
                                    value={{
                                        value: billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) || "D",
                                        label: billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "D"
                                            ? "Days"
                                            : billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "W"
                                                ? "Weeks"
                                                : billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "M"
                                                    ? "Months"
                                                    : "Years"
                                    }}
                                    onChange={(option: any) =>
                                        option &&
                                        onChange("billingPolicyRemainingBalanceChargeTimeAfterCheckout", `P${parseInt(billingPolicyRemainingBalanceChargeTimeAfterCheckout.replace(/\D/g, ""), 10) || 1}${option.value}`)
                                    }
                                />
                            }
                        />
                    )}
                </div>
            )}
        </div>
    );
};