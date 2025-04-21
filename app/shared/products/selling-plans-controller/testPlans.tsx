import { useState } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Accordion } from "rizzui/accordion";
import { Button } from "rizzui/button";
import { Input } from "rizzui/input";
import { Select } from "rizzui/select";
import { ActionIcon } from "rizzui/action-icon";
import { PiPlusBold } from "react-icons/pi";
import TrashIcon from "app/packages/components/icons/trash";
import { SellingPlanCreateInput } from "./form.schema";

export default function SellingPlansForm() {
    const {
        control,
        register,
        watch,
        formState: { errors },
    } = useFormContext<SellingPlanCreateInput>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "input.sellingPlansToCreate",
    });

    const [expandedIndex, setExpandedIndex] = useState(0);

    // Dropdown options
    const billingPolicyOptions = [
        { value: "fixed", label: "Fixed Billing" },
        { value: "recurring", label: "Recurring Billing" },
    ];

    const categoryOptions = [
        { value: "OTHER", label: "Other" },
        { value: "PRE_ORDER", label: "Pre-Order" },
        { value: "SUBSCRIPTION", label: "Subscription" },
        { value: "TRY_BEFORE_YOU_BUY", label: "Try Before You Buy" },
    ];

    const fulfillmentTriggerOptions = [
        { value: "ANCHOR", label: "Anchor" },
        { value: "ASAP", label: "ASAP" },
        { value: "EXACT_TIME", label: "Exact Time" },
        { value: "UNKNOWN", label: "Unknown" },
    ];

    const addSellingPlan = () => {
        append({
            name: "",
            options: [],
            billingPolicy: {
                fixed: {
                    checkoutCharge: {
                        type: "PRICE",
                        value: { fixedValue: 0, percentage: 0 },
                    },
                },
            },
            category: "OTHER",
            deliveryPolicy: {
                fixed: {
                    anchors: [{ cutoffDay: undefined, day: undefined, month: undefined, type: undefined }],
                    fulfillmentTrigger: "ASAP",
                },
            },
            pricingPolicies: [
                {
                    fixed: {
                        adjustmentType: "FIXED_AMOUNT",
                        adjustmentValue: { fixedValue: 0, percentage: 0 },
                        id: "",
                    },
                },
            ],
        });
    };

    return (
        <div>
            {fields.map((item, index) => {
                const selectedBillingType = watch(`input.sellingPlansToCreate.${index}.billingPolicy.fixed.checkoutCharge.type`);
                const selectedDeliveryPolicy = watch(`input.sellingPlansToCreate.${index}.deliveryPolicy.fixed.fulfillmentTrigger`);

                return (
                    <Accordion
                        key={item.id}
                        index={expandedIndex}
                        onIndexChange={setExpandedIndex}
                        className="mb-6"
                    >
                        {/* Plan Details */}
                        <Accordion.Item>
                            <Accordion.Button>Plan Details</Accordion.Button>
                            <Accordion.Panel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Selling Plan Name"
                                        placeholder="Enter plan name"
                                        {...register(`input.sellingPlansToCreate.${index}.name`)}
                                    />
                                    <Controller
                                        name={`input.sellingPlansToCreate.${index}.category`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={categoryOptions}
                                                value={categoryOptions.find((opt) => opt.value === value)}
                                                onChange={(selected) => onChange(selected?.value)}
                                                label="Category"
                                            />
                                        )}
                                    />
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Billing Policy */}
                        <Accordion.Item>
                            <Accordion.Button>Billing Policy</Accordion.Button>
                            <Accordion.Panel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name={`input.sellingPlansToCreate.${index}.billingPolicy.fixed.checkoutCharge.type`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={[
                                                    { value: "PRICE", label: "Price" },
                                                    { value: "PERCENTAGE", label: "Percentage" },
                                                ]}
                                                value={value}
                                                onChange={onChange}
                                                label="Billing Type"
                                            />
                                        )}
                                    />
                                    {selectedBillingType && (
                                        <Input
                                            type="number"
                                            label="Fixed Value"
                                            placeholder="0.00"
                                            {...register(
                                                `input.sellingPlansToCreate.${index}.billingPolicy.fixed.checkoutCharge.value.fixedValue`
                                            )}
                                        />
                                    )}
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Delivery Policy */}
                        <Accordion.Item>
                            <Accordion.Button>Delivery Policy</Accordion.Button>
                            <Accordion.Panel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name={`input.sellingPlansToCreate.${index}.deliveryPolicy.fixed.fulfillmentTrigger`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={fulfillmentTriggerOptions}
                                                value={value}
                                                onChange={onChange}
                                                label="Fulfillment Trigger"
                                            />
                                        )}
                                    />
                                    {selectedDeliveryPolicy === "EXACT_TIME" && (
                                        <Input
                                            type="datetime-local"
                                            label="Fulfillment Exact Time"
                                            {...register(
                                                `input.sellingPlansToCreate.${index}.deliveryPolicy.fixed.fulfillmentExactTime`
                                            )}
                                        />
                                    )}
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Pricing Policy */}
                        <Accordion.Item>
                            <Accordion.Button>Pricing Policy</Accordion.Button>
                            <Accordion.Panel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name={`input.sellingPlansToCreate.${index}.pricingPolicies.0.fixed.adjustmentType`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={[
                                                    { value: "FIXED_AMOUNT", label: "Fixed Amount" },
                                                    { value: "PERCENTAGE", label: "Percentage" },
                                                    { value: "PRICE", label: "Price" },
                                                ]}
                                                value={value}
                                                onChange={onChange}
                                                label="Adjustment Type"
                                            />
                                        )}
                                    />
                                    <Input
                                        type="number"
                                        label="Adjustment Value"
                                        placeholder="0.00"
                                        {...register(
                                            `input.sellingPlansToCreate.${index}.pricingPolicies.0.fixed.adjustmentValue.fixedValue`
                                        )}
                                    />
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Remove Button */}
                        {fields.length > 1 && (
                            <ActionIcon onClick={() => remove(index)} variant="flat" className="mt-7 shrink-0 self-end">
                                <TrashIcon className="h-4 w-4" />
                            </ActionIcon>
                        )}
                    </Accordion>
                );
            })}

            {/* Add Selling Plan Button */}
            <Button onClick={addSellingPlan} variant="outline" className="col-span-full ml-auto w-auto">
                <PiPlusBold className="me-2 h-4 w-4" /> Add Selling Plan
            </Button>
        </div>
    );
}
