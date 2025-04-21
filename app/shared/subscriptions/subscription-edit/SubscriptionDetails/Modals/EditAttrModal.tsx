import { useFetcher } from "@remix-run/react";
import { CustomAttribute, CustomAttributes } from "app/types/subscription/subscriptionQueryTypes";
import { useEffect, useState } from "react";
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
} from "rizzui";



const EditAttrModal = ({
    isEditAttrModalOpen,
    setIsEditAttrModalOpen,
    customAttributes
}: any) => {
    const [attributes, setAttributes] = useState<CustomAttributes>(customAttributes);
    const fetcher = useFetcher<any>();
    const [errors, setErrors] = useState<{ key?: string; value?: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);


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
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );

        setErrors((prev) =>
            prev.map((err, i) =>
                i === index ? { ...err, [field]: undefined } : err
            )
        );
    };

    const handleUpdate = () => {
        const newErrors = attributes.map(attr => ({
            key: !attr.key.trim() ? "Name is required" : undefined,
            value: !attr.value.trim() ? "Value is required" : undefined
        }));

        const hasErrors = newErrors.some(err => err.key || err.value);

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "updateAttribute");
        formData.append("attributes", JSON.stringify(attributes));
        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    const areAttributesEqual = (a: CustomAttributes, b: CustomAttributes) => {
        if (a.length !== b.length) return false;
        return a.every((attr, i) => attr.key === b[i].key && attr.value === b[i].value);
    };

    useEffect(() => {
        setAttributes(customAttributes);
        setErrors(customAttributes.map(() => ({})));
    }, [customAttributes]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setIsLoading(false);
                setIsEditAttrModalOpen(false)
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }

    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={isEditAttrModalOpen}
            onClose={() => setIsEditAttrModalOpen(false)}
            containerClassName="min-w-[500px]"
        >
            <div className="m-auto p-3">
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Edit Order Attributes</Title>
                    <ActionIcon
                        size="sm"
                        variant={"text" as any}
                        onClick={() => setIsEditAttrModalOpen(false)}
                    >
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <div className="space-y-3">
                    {attributes.length > 0 ? (
                        attributes.map((attr, index) => (
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
                        ))
                    ) : null}

                    {/* Add button shown always, but full width if no attributes */}
                    <Button
                        variant={"text" as any}
                        className="font-bold text-primary"
                        onClick={handleAddAttribute}
                    >
                        + Add Order Attribute
                    </Button>
                </div>

                {/* Action Buttons */}
                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button variant={"outline" as any} onClick={() => {

                    }}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        isLoading={isLoading}
                        loader={<Loader variant="spinner" />}
                        disabled={isLoading || areAttributesEqual(attributes, customAttributes)}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default EditAttrModal;
