import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Flex,
    Loader,
    RadioGroup,
    Textarea,
    Checkbox,
    Text,
    Radio,
} from "rizzui";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import { SubscriptionContractSubscriptionStatus } from "app/types/subscription/subscriptionQueryTypes";

const cancellationReasons = [
    "This is too expensive",
    "This was created by accident",
    "I already have more than I need",
    "I need it sooner",
    "I no longer use this product",
    "I want a different product or variety",
    "Other reason",
];

const CancelSubscriptionModal = ({
    modalState,
    setModalState,
}: {
    modalState: boolean;
    setModalState: (state: boolean) => void;

}) => {
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [customReason, setCustomReason] = useState<string>("");
    const [sendEmail, setSendEmail] = useState<boolean>(false);

    const canSubmit = selectedReason && (selectedReason !== "Other reason" || customReason.trim() !== "");

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "updateStatus");
        formData.append("reason", selectedReason === "Other reason" ? customReason : selectedReason);
        formData.append("sendCancellationEmail", sendEmail.toString());
        formData.append("status", SubscriptionContractSubscriptionStatus.CANCELLED);

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success) {
                toast.success("Subscription cancelled successfully.");
                setModalState(false);
            } else {
                toast.error(fetcher?.data?.error || "Something went wrong.");
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal isOpen={modalState} onClose={() => setModalState(false)} containerClassName="min-w-[525px]">
            <div className="m-auto p-3">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Cancel Subscription</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Reason radios */}
                <Text className="mb-2">Please select a reason for cancelling this subscription.</Text>
                <RadioGroup value={selectedReason} setValue={setSelectedReason} className="space-y-2">
                    {cancellationReasons.map((reason) => (
                        <Radio key={reason} name="cancelReason" value={reason} label={reason} />
                    ))}
                </RadioGroup>

                {/* Custom reason input */}
                {selectedReason === "Other reason" && (
                    <div className="mt-4">
                        <Textarea
                            placeholder="Please provide your reason..."
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                            className="w-full"
                            rows={4}
                        />
                    </div>
                )}

                {/* Send email checkbox */}
                <div className="mt-6">
                    <Checkbox
                        label="Send a cancellation email"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                    />
                    <Text className="text-xs text-gray-500 mt-1">
                        An email will only be sent if the customer has no remaining active subscriptions. You can manage this email in your notifications.
                    </Text>
                </div>

                {/* Action Buttons */}
                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button variant={"outline" as any} onClick={() => setModalState(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        loader={<Loader variant="spinner" />}
                        disabled={!canSubmit || isLoading}
                    >
                        Cancel Subscription
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default CancelSubscriptionModal;
