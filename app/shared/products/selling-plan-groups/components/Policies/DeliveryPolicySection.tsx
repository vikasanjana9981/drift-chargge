import { Text } from "rizzui/typography";
import { anchorTypeOptions, dayOptions, deliveryPolicyFulfillmentTriggerOptions, monthDayOptions, preAnchorBehaviorOptions, yearlyRenewalMonthOptions } from "../SellingPlanFormUtils";
import { Select } from "rizzui/select";
import { DatePicker } from "app/packages/ui/datepicker";
import { NumberInput } from "../NumberInput";

/** Renders the delivery policy section with trigger options and conditional fields. */
export const DeliveryPolicySection = ({
    currentPlan,
    onChange
}: {
    currentPlan: any,
    onChange: any;
}) => {
    const {
        deliveryPolicyFulfillmentTrigger,
        deliveryPolicyFulfillmentExactTime,
        preAnchorBehavior,
        deliveryPolicyAnchorsType,
        deliveryPolicyAnchorsDay,
        deliveryPolicyAnchorsCutoffDay,
        deliveryPolicyAnchorsMonth,
        deliveryPolicyCutoff
    } = currentPlan;

    return (
        <div className="pt-3 w-full">
            <Text>Set Delivery Policy</Text>
            <div className="flex gap-4 mt-3">
                <div className="flex-1">
                    <Select
                        value={deliveryPolicyFulfillmentTriggerOptions.find(opt => opt.value === deliveryPolicyFulfillmentTrigger)}
                        options={deliveryPolicyFulfillmentTriggerOptions}
                        onChange={(option: any) => option && onChange('deliveryPolicyFulfillmentTrigger', option.value)}
                        label="What triggers the fulfillment."
                    />
                </div>
            </div>

            {deliveryPolicyFulfillmentTrigger === 'EXACT_TIME' && (
                <div className="flex gap-4 mt-3">
                    <div className="flex-1">
                        <DatePicker
                            selected={deliveryPolicyFulfillmentExactTime ? new Date(deliveryPolicyFulfillmentExactTime) : null}
                            onChange={(date: Date | null) => {
                                const isoDate = date ? date.toISOString() : null;
                                onChange("deliveryPolicyFulfillmentExactTime", isoDate as any);
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
                    <div className="flex-1">
                        <Select
                            value={preAnchorBehaviorOptions.find(opt => opt.value === preAnchorBehavior)}
                            options={preAnchorBehaviorOptions}
                            onChange={(option: any) => option && onChange('preAnchorBehavior', option.value)}
                            label="The pre-anchor behavior."
                        />
                    </div>
                </div>
            )}

            {deliveryPolicyFulfillmentTrigger === 'ANCHOR' && (
                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex-1">
                        <Select
                            value={anchorTypeOptions.find(opt => opt.value === deliveryPolicyAnchorsType)}
                            options={anchorTypeOptions}
                            onChange={(option: any) => option && onChange('deliveryPolicyAnchorsType', option.value)}
                            label="When Should Delivery Be Scheduled?"
                        />
                    </div>

                    {deliveryPolicyAnchorsType == 'WEEKDAY' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="">
                                <Select
                                    value={dayOptions.find(opt => opt.value === deliveryPolicyAnchorsDay)}
                                    options={dayOptions}
                                    onChange={(option: any) => option && onChange('deliveryPolicyAnchorsDay', option.value)}
                                    label="Select Day"
                                />
                            </div>
                            <div className="">
                                <Select
                                    value={dayOptions.find(opt => opt.value === deliveryPolicyAnchorsCutoffDay)}
                                    options={dayOptions}
                                    onChange={(option: any) => option && onChange('deliveryPolicyAnchorsCutoffDay', option.value)}
                                    label="Cutfoff Time Interval"
                                />
                            </div>
                        </div>
                    )}

                    {deliveryPolicyAnchorsType === "MONTHDAY" && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Select
                                    value={monthDayOptions.find(opt => opt.value === deliveryPolicyAnchorsMonth)}
                                    options={monthDayOptions}
                                    onChange={(option: any) => option && onChange('deliveryPolicyAnchorsMonth', option.value)}
                                    label="Select Month"
                                />
                            </div>
                            <div>
                                <Select
                                    value={monthDayOptions.find(opt => opt.value === deliveryPolicyAnchorsCutoffDay)}
                                    options={monthDayOptions}
                                    onChange={(option: any) => option && onChange('deliveryPolicyAnchorsCutoffDay', option.value)}
                                    label="Cutfoff Time Interval"
                                />
                            </div>
                        </div>
                    )}

                    {deliveryPolicyAnchorsType == 'YEARDAY' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                value={yearlyRenewalMonthOptions.find(opt => opt.value === deliveryPolicyAnchorsDay)}
                                options={yearlyRenewalMonthOptions}
                                onChange={(option: any) => option && onChange('deliveryPolicyAnchorsDay', option.value)}
                                label="Select Day"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-4 mt-3">
                        <div className="flex-1">
                            <Select
                                value={preAnchorBehaviorOptions.find(opt => opt.value === preAnchorBehavior)}
                                options={preAnchorBehaviorOptions}
                                onChange={(option: any) => option && onChange('preAnchorBehavior', option.value)}
                                label="The pre-anchor behavior."
                            />
                        </div>
                    </div>

                    {/* {(deliveryPolicyAnchorsType == 'WEEKDAY' || deliveryPolicyAnchorsType == 'MONTHDAY') && (
                        <div>
                            <NumberInput
                                label="Cutfoff Time Interval"
                                value={deliveryPolicyAnchorsCutoffDay}
                                onChange={(v) => onChange('deliveryPolicyAnchorsCutoffDay', v)}
                                max={
                                    deliveryPolicyAnchorsType === "WEEKDAY"
                                        ? 7 // Max value for WEEKDAY
                                        : deliveryPolicyAnchorsType === "MONTHDAY"
                                            ? 31 // Max value for MONTHDAY
                                            : undefined // No max value for other types
                                }
                                percent={true}
                            />
                            
                        </div>
                    )} */}

                </div>
            )}
        </div>
    );
};
