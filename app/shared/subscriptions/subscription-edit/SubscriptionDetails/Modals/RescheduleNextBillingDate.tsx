import { useEffect, useState } from "react";
import { FaCalendar, FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Flex,
    Loader,
    Input,
} from "rizzui";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";

const RescheduleBillingModal = ({
    modalState,
    setModalState,
    nextBillingDate,
}: {
    modalState: boolean;
    setModalState: (state: boolean) => void;
    nextBillingDate?: string;
}) => {
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        nextBillingDate ? new Date(nextBillingDate) : null
    );

    const canSave = selectedDate && selectedDate.toISOString() !== nextBillingDate;

    const handleSubmit = () => {
        if (!selectedDate) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "rescheduleBillingDate");
        formData.append("nextBillingDate", selectedDate.toISOString());

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Billing date updated!");
                setModalState(false);
            } else {
                toast.error(fetcher?.data?.error || "Something went wrong");
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={modalState}
            onClose={() => setModalState(false)}
            containerClassName="min-w-[500px] overflow-visible z-[999] relative"
        >
            <div className="m-auto p-3">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Reschedule Next Billing</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Input Field with Calendar Icon */}
                <Flex className="relative w-full">
                    <FaCalendar className="absolute left-3 top-[37px] text-muted w-4 h-4" />
                    <Input
                        label="Select Date & Time"
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="pl-10 w-full"
                    />
                </Flex>

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

export default RescheduleBillingModal;
