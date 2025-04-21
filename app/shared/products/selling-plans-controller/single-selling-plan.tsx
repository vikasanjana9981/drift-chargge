import TrashIcon from "app/packages/components/icons/trash";
import cn from "app/packages/utils/class-names";
import FormGroup from "app/shared/form-group";
import { useCallback, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { PiPlusBold } from "react-icons/pi";
import { ActionIcon } from "rizzui/action-icon";
import { Button } from "rizzui/button";
import { Input } from "rizzui/input";
import { Select } from "rizzui/select";
import { Text } from "rizzui/typography";

export default function SellingPlans({ className }: { className?: string }) {
    const {
        control,
        register,
        watch,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sellingPlanGroupCreate',
    });

    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    const discountOptions = [
        { label: 'No discount', value: 'no_discount' },
        { label: 'Flat amount discount', value: 'flat_amount' },
        { label: 'Percentage discount', value: 'percentage' },
    ];

    const frequencyUnits = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' },
    ];

    const billingDayOptions = [
        { label: 'Order day', value: 'order_day' },
        { label: 'Specific date', value: 'specific_date' },
    ];

    const daysOfWeek = [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
    ];

    const addVariant = useCallback(() => append({}), [append]);

    const toggleAdvancedOptions = () => setShowAdvancedOptions(!showAdvancedOptions);

    return (
        <div className="p-3 flex flex-col gap-4">
            <div className="mb-4 flex flex-col gap-4">
                {fields.map((item, index) => {
                    const discountType = watch(`sellingPlanGroupCreate.${index}.discountOption`);
                    const billingDay = watch(`sellingPlanGroupCreate.${index}.billingDay`);
                    const freq = watch(`sellingPlanGroupCreate.${index}.deliveryFrequency`);
                    const unit = watch(`sellingPlanGroupCreate.${index}.frequencyUnit`);

                    return (
                        <div key={item.id} className="p-3 border shadow-lg rounded-[10px] col-span-full flex flex-col gap-4 xl:gap-7 relative">
                            <div className="flex gap-4 xl:gap-7">
                                <Controller
                                    name={`sellingPlanGroupCreate.${index}.discountOption`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={discountOptions}
                                            value={value}
                                            onChange={onChange}
                                            label="Discount Option"
                                            className="w-full @2xl:w-auto @2xl:flex-grow"
                                            getOptionValue={(option) => option.value}
                                        />
                                    )}
                                />
                                {(discountType === 'flat_amount' || discountType === 'percentage') && (
                                    <Input
                                        type="number"
                                        label="Discount Value"
                                        placeholder={discountType === 'flat_amount' ? '10.00' : '10'}
                                        className="flex-grow"
                                        prefix={discountType === 'flat_amount' ? '$' : '%'}
                                        {...register(`sellingPlanGroupCreate.${index}.discountValue`)}
                                    />
                                )}
                            </div>

                            <div className="flex gap-4 xl:gap-7">
                                <Input
                                    type="number"
                                    label="Delivery Frequency"
                                    placeholder="1"
                                    className="flex-grow"
                                    {...register(`sellingPlanGroupCreate.${index}.deliveryFrequency`)}
                                />
                                <Controller
                                    name={`sellingPlanGroupCreate.${index}.frequencyUnit`}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={frequencyUnits}
                                            value={value}
                                            onChange={onChange}
                                            label="Frequency Unit"
                                            className="w-full @2xl:w-auto @2xl:flex-grow"
                                            getOptionValue={(option) => option.value}
                                        />
                                    )}
                                />
                            </div>

                            <Input
                                label="Selling Plan Name"
                                placeholder={`Delivery Every ${freq || '1'} ${unit || 'month'}`}
                                className="flex-grow"
                                {...register(`sellingPlanGroupCreate.${index}.sellingPlanName`)}
                            />

                            <Text
                                onClick={toggleAdvancedOptions}
                                className="col-span-full w-auto text-primary"
                            >
                                Advanced Options
                            </Text>

                            {showAdvancedOptions && (
                                <div className="flex flex-col gap-4 xl:gap-7">
                                    <Controller
                                        name={`sellingPlanGroupCreate.${index}.billingDay`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                options={billingDayOptions}
                                                value={value}
                                                onChange={onChange}
                                                label="Billing Day"
                                                className="w-full @2xl:w-auto @2xl:flex-grow"
                                                getOptionValue={(option) => option.value}
                                            />
                                        )}
                                    />
                                    {billingDay === 'specific_date' && (
                                        <Controller
                                            name={`sellingPlanGroupCreate.${index}.shipAndBillOn`}
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    options={daysOfWeek}
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Ship and Bill On"
                                                    className="w-full @2xl:w-auto @2xl:flex-grow"
                                                    getOptionValue={(option) => option.value}
                                                />
                                            )}
                                        />
                                    )}
                                    <Input
                                        type="number"
                                        label="Auto Expire After X Deliveries"
                                        placeholder="0"
                                        className="flex-grow"
                                        {...register(`sellingPlanGroupCreate.${index}.autoExpireAfter`)}
                                    />
                                    <Input
                                        type="number"
                                        label="Minimum Deliveries Before Cancellation"
                                        placeholder="0"
                                        className="flex-grow"
                                        {...register(`sellingPlanGroupCreate.${index}.minDeliveriesBeforeCancel`)}
                                    />
                                    <Input
                                        label="Add Frequency Label"
                                        placeholder={`${freq || '1'} ${unit || 'month'}`}
                                        className="flex-grow"
                                        {...register(`sellingPlanGroupCreate.${index}.addFreqLabel`)}
                                    />
                                    <Input
                                        type="number"
                                        label="Change Discount After X Deliveries"
                                        placeholder="0"
                                        className="flex-grow"
                                        {...register(`sellingPlanGroupCreate.${index}.changeDiscountAfter`)}
                                    />
                                </div>
                            )}

                            {fields.length > 1 && (
                                <div className="absolute top-2 right-3">
                                    <Text onClick={() => remove(index)} className="text-primary text-sm">Remove</Text>
                                </div>
                            )}
                        </div>
                    );
                })}

            </div>
            <Button
                onClick={addVariant}
                variant={"outline" as any}
                className="col-span-full ml-auto w-auto"
            >
                <PiPlusBold className="me-2 h-4 w-4" /> Add More
            </Button>
        </div>
    );
}