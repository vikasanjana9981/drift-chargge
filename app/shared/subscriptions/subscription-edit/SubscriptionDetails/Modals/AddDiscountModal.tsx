import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Input,
    Flex,
    Loader,
    Text,
} from "rizzui";
import { useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import { Discounts } from "app/types/subscription/subscriptionQueryTypes";

const AddDiscountModal = ({
    modalState,
    setModalState,
    discounts,
}: {
    modalState: boolean;
    setModalState: (state: boolean) => void;
    discounts?: Discounts;
}) => {
    const fetcher = useFetcher<any>();
    const [discount, setDiscount] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const existingDiscount = discounts?.edges?.[0]?.node;
    const canSave = discount.trim() !== "";

    const handleSubmit = (remove = false) => {
        setIsLoading(true);
        const formData = new FormData();

        if (remove && existingDiscount?.id) {
            formData.append("action", "removeDiscount");
            formData.append("discountId", existingDiscount.id);
        } else {
            formData.append("action", "updateDiscount");
            formData.append("discountCode", discount);
        }

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success) {
                toast.success("Discount updated successfully!");
                setModalState(false);
            } else {
                toast.error(fetcher.data.error || "Something went wrong");
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal isOpen={modalState} onClose={() => setModalState(false)} containerClassName="min-w-[500px]">
            <div className="m-auto p-3">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">
                        {existingDiscount ? "Remove Discount" : "Add Discount"}
                    </Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Discount Form */}
                {existingDiscount ? (
                    <>
                        <Text className="text-sm mb-4">
                            Are you sure you want to remove the discount code <strong>{existingDiscount.title}</strong> from this address?
                        </Text>
                        <Flex justify="end" gap="1" className="mt-8 space-x-1">
                            <Button variant={"outline" as any} onClick={() => setModalState(false)}>
                                Cancel
                            </Button>
                            <Button
                                color="danger"
                                onClick={() => handleSubmit(true)}
                                isLoading={isLoading}
                                loader={<Loader variant="spinner" />}
                            >
                                Remove Discount
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Input
                            label="Discount"
                            placeholder="Enter discount code"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />

                        <Flex justify="end" gap="1" className="mt-8 space-x-1">
                            <Button variant={"outline" as any} onClick={() => setModalState(false)}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => handleSubmit(false)}
                                isLoading={isLoading}
                                loader={<Loader variant="spinner" />}
                                disabled={!canSave || isLoading}
                            >
                                Save
                            </Button>
                        </Flex>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default AddDiscountModal;
