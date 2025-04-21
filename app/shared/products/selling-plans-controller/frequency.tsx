import { messages } from "app/config/messages";
import cn from "app/packages/utils/class-names";
import FormGroup from "app/shared/form-group";
import { useCallback, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Flex } from "rizzui/flex";
import { Tab } from "rizzui/tabs";
import { Text, Title } from "rizzui/typography";
import { sellingPlans } from "./default.values";
import { Box } from "rizzui/box";
import { Select } from "rizzui/select";
import { Input } from "rizzui/input";
import { Modal } from "rizzui/modal";
import { FaChevronDown, FaXmark } from "react-icons/fa6";
import { Accordion } from "rizzui/accordion";
import { Checkbox } from "rizzui/checkbox";

export default function SellingPlanFrequency({ className }: { className?: string }) {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext(); // Ensure this is inside the function component


    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sellingPlans',
    });

    // Append only a single object instead of an array
    const addSellingPlan = useCallback(() => append([...sellingPlans]), [append]);

    const [openModal, setOpenModal] = useState(false);
    const frequency = messages.products.createSellingPlans.frequency;

    return (
        <div className="cursor-pointer flex flex-col rounded-[10px] border border-muted">
            <FormGroup title="" description="" className={cn(className)}>
                <div>
                    <Flex className="p-3" align="center" direction="row" gap="2" justify="between">
                        <Title as="h4" className="text-base font-medium">{frequency.title}</Title>
                        <Text
                            className="text-sm text-primary"
                            onClick={() => {
                                // addSellingPlan();
                                setOpenModal(true);
                            }}
                        >
                            {frequency.buttons.createPlanBtn.title}
                        </Text>
                    </Flex>
                    <hr className="w-full" />
                </div>
            </FormGroup>

            {/* {
                fields.length !== 0 && (
                    <CreatePlanFormModal fieldsProp={fields} openModal={openModal} setOpenModal={setOpenModal} control={control} register={register} />
                )
            } */}

            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                containerClassName="w-[623px]"
            >
                <Flex align="center" justify="between" className="bg-muted rounded-t-xl p-3">
                    <Title as="h3" className="text-base font-medium">Edit Selling Plan</Title>
                    <FaXmark className="h-auto w-4 cursor-pointer" onClick={() => setOpenModal(false)} />
                </Flex>

                <Flex className="p-3">
                    {fields.map((item, index) => {
                        return (
                            <>
                                <Controller
                                    name={`sellingPlans.${index}.billingType`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            options={[
                                                { label: 'Pay As You Go', value: 'payAsYouGo' },
                                                { label: 'Prepaid One Time', value: 'prepaidOneTime' },
                                                { label: 'Prepaid Auto Renew', value: 'prepaidAutoRenew' },
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                            label="Billing Type"
                                            className="w-full"
                                        />
                                    )}
                                />
                                <Input
                                    type="number"
                                    label="Order Frequency"
                                    placeholder="Enter Order Frequency"
                                    className="w-full"
                                    {...register(`sellingPlans.${index}.orderFrequency`)}
                                />
                            </>

                        )
                    })}

                </Flex>


            </Modal>
        </div>
    );
}


const CreatePlanFormModal = ({ fieldsProp, openModal, setOpenModal, control, register }: any) => {
    const [fieldsState, setFields] = useState([]);
    useEffect(() => {
        const groupedSellingPlans = groupSellingPlans(fieldsProp);
        setFields(groupedSellingPlans)
    }, [fieldsProp])
    return (
        <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            containerClassName="w-[623px]"
        >
            <Flex align="center" justify="between" className="bg-muted rounded-t-xl p-3">
                <Title as="h3" className="text-base font-medium">Edit Selling Plan</Title>
                <FaXmark className="h-auto w-4 cursor-pointer" onClick={() => setOpenModal(false)} />
            </Flex>
            <Accordion className="bg-muted bg-opacity-40 rounded-xl px-3 py-4 border">
                here
            </Accordion>

        </Modal>
    )
}


function groupSellingPlans(sellingPlans: any[]) {
    return sellingPlans.map(plan => ({
        General: {
            billingType: plan.billingType,
            orderFrequency: plan.orderFrequency,
            unit: plan.unit
        },
        DisplayContents: {
            frequencyName: plan.frequencyName,
            showDescription: plan.showDescription,
            content: plan.content
        },
        ChargeOnSpecificDays: {
            subscriptionRenewalDateType: plan.subscriptionRenewalDateType
        },
        OfferIncentives: {
            offerDiscount: plan.offerDiscount,
            changeDiscountAfterPayments: plan.changeDiscountAfterPayments
        },
        Policies: {
            inventoryPolicy: plan.inventoryPolicy,
            cancellationPolicy: plan.cancellationPolicy,
            automaticExpiration: plan.automaticExpiration
        },
        OfferTrial: {
            offerTrial: plan.offerTrial
        },
        Meta: {
            id: plan.id
        }
    }));
}