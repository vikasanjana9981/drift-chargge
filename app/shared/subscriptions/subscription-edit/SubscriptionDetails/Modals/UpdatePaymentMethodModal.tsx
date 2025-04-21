import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Button,
    Title,
    ActionIcon,
    Flex,
    Loader,
    RadioGroup,
    AdvancedRadio,
    Text,
    Alert,
} from "rizzui";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import { Customer, PaymentMethod } from "app/types/subscription/subscriptionQueryTypes";
import CheckCircleIcon from "app/packages/components/icons/check-circle";

type UpdatePaymentMethodModalProp = {
    modalState: boolean;
    setModalState: (state: boolean) => void;
    activePaymentMethod: PaymentMethod;
    customer: Customer;
};

const UpdatePaymentMethodModal = ({
    modalState,
    setModalState,
    activePaymentMethod,
    customer,
}: UpdatePaymentMethodModalProp) => {
    const fetcher = useFetcher<any>();
    const [isSaving, setIsSaving] = useState(false); // For Save button
    const [emailLoadingId, setEmailLoadingId] = useState<string | null>(null);
    const [selectedMethodId, setSelectedMethodId] = useState<string>("");

    // Initialize with active method ID
    useEffect(() => {
        const defaultId = customer?.paymentMethods?.edges?.find(
            (edge) =>
                edge.node.instrument.lastDigits ===
                activePaymentMethod?.instrument?.lastDigits &&
                edge.node.instrument.brand === activePaymentMethod?.instrument?.brand
        )?.node?.id;

        if (defaultId) setSelectedMethodId(defaultId);
    }, [activePaymentMethod, customer, modalState]);

    const handleUpdate = (isUpdate = false, methodId?: string) => {
        if (isUpdate) {
            setIsSaving(true);
        } else if (methodId) {
            setEmailLoadingId(methodId);
        }
        const formData = new FormData();
        const action = isUpdate ? "updatePaymentMethod" : "sendUpdatePaymentMethodEmail";
        formData.append("action", action);
        formData.append("paymentMethodId", methodId || selectedMethodId);
        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        console.log(fetcher.data);
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Email Send successfully!");
                setModalState(false);
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsSaving(false);
            setEmailLoadingId(null);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={modalState}
            onClose={() => setModalState(false)}
            containerClassName="min-w-[625px] max-h-[500px] overflow-y-auto"
        >
            <div className="m-auto px-7 pt-6 pb-8">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Update Payment Method</Title>
                    <ActionIcon
                        size="sm"
                        variant={"text" as any}
                        onClick={() => setModalState(false)}
                    >
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <RadioGroup value={selectedMethodId} setValue={setSelectedMethodId} className="flex flex-col gap-3">
                        {customer?.paymentMethods?.edges?.map(({ node }) => (
                            <AdvancedRadio
                                key={node.id}
                                name="paymentMethod"
                                value={node.id}
                                inputClassName="[&:checked~span_.icon]:block"
                            >
                                <span className="relative">
                                    <span className="flex justify-between">
                                        <span className="flex gap-2">
                                            <Text className="capitalize">{node.instrument.brand}</Text>
                                            <Text>•••• {node.instrument.lastDigits}</Text>
                                        </span>
                                        <CheckCircleIcon className="icon hidden h-5 w-5 text-secondary" />
                                    </span>
                                    <Text className="text-sm">
                                        Expires {node.instrument.expiryMonth}/{node.instrument.expiryYear}
                                    </Text>
                                </span>
                                <Button
                                    variant={"text" as any}
                                    className="font-bold text-primary px-0"
                                    onClick={() => {
                                        setSelectedMethodId(node.id)
                                        handleUpdate()
                                    }}
                                    isLoading={emailLoadingId === node.id}
                                    loader={<Loader variant="spinner" />}
                                >
                                    Request an update via email
                                </Button>
                            </AdvancedRadio>
                        ))}
                    </RadioGroup>
                </div>

                <Flex direction="col" className="mt-3">
                    <Alert
                        color="info"
                        variant="flat"
                        icon={<CheckCircleIcon className="h-5 w-5" />}
                    >
                        <Text>
                            Shopify Payments manages all payment method details. If you need the customer to update their payment information, you can
                        </Text>
                    </Alert>
                </Flex>

                {/* Action Buttons */}
                {(customer?.paymentMethods?.edges?.length ?? 0) > 1 && (
                    <Flex justify="end" gap="1" className="mt-8 space-x-1">
                        <Button
                            variant={"outline" as any}
                            onClick={() => setModalState(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => handleUpdate(true)}
                            isLoading={isSaving}
                            loader={<Loader variant="spinner" />}
                            disabled={
                                !selectedMethodId ||
                                isSaving ||
                                selectedMethodId === activePaymentMethod?.id
                            }
                        >
                            Save
                        </Button>
                    </Flex>
                )}
            </div>
        </Modal>
    );
};

export default UpdatePaymentMethodModal;
