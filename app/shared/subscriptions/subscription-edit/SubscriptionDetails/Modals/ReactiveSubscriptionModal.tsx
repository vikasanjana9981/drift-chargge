import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Flex,
    Loader,
    Checkbox,
    Text,
} from "rizzui";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import { SubscriptionContractSubscriptionStatus } from "app/types/subscription/subscriptionQueryTypes";


const ReactiveSubscriptionModal = ({
    modalState,
    setModalState,
}: {
    modalState: boolean;
    setModalState: (state: boolean) => void;

}) => {
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "updateStatus");
        formData.append("reason", '');
        formData.append("status", SubscriptionContractSubscriptionStatus.ACTIVE);

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
                    <Title as="h3">Reactivate subscription</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Reason radios */}
                <Text className="mb-2">Are you sure you want to reactivate this subscription?</Text>

                {/* Action Buttons */}
                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button variant={"outline" as any} onClick={() => setModalState(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        loader={<Loader variant="spinner" />}
                    >
                        Reactive
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default ReactiveSubscriptionModal;
