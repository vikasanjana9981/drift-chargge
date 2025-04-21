import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Flex,
    Loader,
    Select,
} from "rizzui";
import { useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import { BillingPolicy } from "app/types/subscription/subscriptionQueryTypes";
import { NumberInput } from "app/shared/products/selling-plan-groups/components/NumberInput";
import { unitOptions } from "app/shared/products/selling-plan-groups/components/SellingPlanFormUtils";

type EditOrderFrequencyModalProps = {
    modalState: boolean;
    setModalState: (state: boolean) => void;
    billingPolicy: BillingPolicy;
};

const EditOrderFrequencyModal = ({
    modalState,
    setModalState,
    billingPolicy,
}: EditOrderFrequencyModalProps) => {
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [intervalCount, setIntervalCount] = useState(billingPolicy.intervalCount);
    const [interval, setInterval] = useState<BillingPolicy['interval']>(billingPolicy.interval);

    const canSave =
        intervalCount !== billingPolicy.intervalCount ||
        interval !== billingPolicy.interval;

    const handleSubmit = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "updateOrderFrequency");
        formData.append("intervalCount", intervalCount.toString());
        formData.append("interval", interval);

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Order frequency updated!");
                setModalState(false);
            } else {
                toast.error(fetcher?.data?.error || "Something went wrong");
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal isOpen={modalState} onClose={() => setModalState(false)} containerClassName="min-w-[500px]">
            <div className="m-auto p-3">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Edit Order Frequency</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                <div className="space-y-5">
                    <NumberInput
                        label="Billing Frequency"
                        value={intervalCount}
                        onChange={(val) => setIntervalCount(Number(val))}
                        min={1}
                    />

                    <Select
                        label="Billing Interval"
                        options={unitOptions}
                        value={unitOptions.find((o) => o.value === interval)}
                        onChange={(opt: any) => setInterval(opt.value)}
                    />
                </div>

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
                        disabled={!canSave || isLoading}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

export default EditOrderFrequencyModal;
