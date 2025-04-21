import { useEffect, useState } from "react";
import { Link, useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import { FaXmark, FaTrash } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Input,
    Box,
    Flex,
    Loader,
    Text,
} from "rizzui";
import { CustomAttribute, CustomAttributes, SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";

const EditLineItemAttributeModal = ({
    modalState,
    setModalState,
    subscriptionLine,
}: {
    modalState: boolean;
    setModalState: (val: boolean) => void;
    subscriptionLine?: SubscriptionLineItem;
}) => {
    const lineItemAttributes = subscriptionLine?.customAttributes;
    const [attributes, setAttributes] = useState<CustomAttributes>(lineItemAttributes || []);
    const [errors, setErrors] = useState<{ key?: string; value?: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetcher = useFetcher<any>();

    const handleAddAttribute = () => {
        setAttributes((prev) => [...prev, { key: "", value: "" }]);
        setErrors((prev) => [...prev, {}]);
    };

    const handleRemove = (index: number) => {
        setAttributes((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: keyof CustomAttribute, value: string) => {
        setAttributes((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
        setErrors((prev) =>
            prev.map((err, i) => (i === index ? { ...err, [field]: undefined } : err))
        );
    };

    const areAttributesEqual = (a: CustomAttributes, b: CustomAttributes) => {
        if (a.length !== b.length) return false;
        return a.every((attr, i) => attr.key === b[i].key && attr.value === b[i].value);
    };

    const handleUpdate = () => {
        const newErrors = attributes.map(attr => ({
            key: !attr.key.trim() ? "Name is required" : undefined,
            value: !attr.value.trim() ? "Value is required" : undefined,
        }));

        if (newErrors.some(err => err.key || err.value)) {
            setErrors(newErrors);
            return;
        }

        if(!subscriptionLine?.id) {
            toast.error("Line item not found, please refresh the page and try again.");
            return;
        };

        setIsLoading(true);
        const formData = new FormData();
        
        formData.append("action", "updateLineItemAttribute");
        formData.append("lineId", subscriptionLine?.id);
        formData.append("attributes", JSON.stringify(attributes));

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        setAttributes(lineItemAttributes || []);
        setErrors((lineItemAttributes || []).map(() => ({})));
    }, [lineItemAttributes]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Line item attributes updated!");
                setIsLoading(false);
                setModalState(false);
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={modalState}
            onClose={() => setModalState(false)}
            containerClassName="min-w-[500px]"
        >
            <div className="m-auto p-3">
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Edit Line Item Attributes</Title>
                    <ActionIcon
                        size="sm"
                        variant={"text" as any}
                        onClick={() => setModalState(false)}
                    >
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <Box className="mb-3"> 
                    <Text>
                    Line item properties are used to record customized information about specific items within an order. Line item properties entered here will be included on orders generated from this subscription.
                    <Link to={'/'} className="text-primary font-bold">Learn more</Link>
                    </Text>
                </Box>

                <div className="space-y-3">
                    {attributes.map((attr, index) => (
                        <Box key={index} className="flex gap-2 items-start">
                            <Input
                                placeholder="Name"
                                className="w-[45%]"
                                value={attr.key}
                                onChange={(e) => handleChange(index, "key", e.target.value)}
                                error={errors[index]?.key}
                            />
                            <Input
                                placeholder="Value"
                                className="w-[45%]"
                                value={attr.value}
                                onChange={(e) => handleChange(index, "value", e.target.value)}
                                error={errors[index]?.value}
                            />
                            <Button
                                variant={"text" as any}
                                color="danger"
                                className="w-[10%]"
                                onClick={() => handleRemove(index)}
                            >
                                <FaTrash />
                            </Button>
                        </Box>
                    ))}

                    <Button
                        variant={"text" as any}
                        className="font-bold text-primary"
                        onClick={handleAddAttribute}>
                        + Add Line Item Attribute
                    </Button>
                </div>

                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button
                        variant={"outline" as any}
                        onClick={() => setModalState(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        isLoading={isLoading}
                        loader={<Loader variant="spinner" />}
                        disabled={isLoading || areAttributesEqual(attributes, lineItemAttributes || [])}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default EditLineItemAttributeModal;
