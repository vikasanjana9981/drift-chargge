import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Title,
    ActionIcon,
    Button,
    Textarea,
    Flex,
    Loader,
} from "rizzui";

const EditOrderNoteModal = ({
    isEditOrderNoteModalOpen,
    setEditOrderNoteModalOpen,
    orderNoteDefault,
}: any) => {
    const [orderNote, setOrderNote] = useState<string>(orderNoteDefault || "");
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);

    const canSave = orderNote.trim() !== "" && orderNote !== orderNoteDefault;

    const handleUpdate = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", "updateOrderNote");
        formData.append("orderNote", orderNote);
        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        setOrderNote(orderNoteDefault || "");
    }, [orderNoteDefault]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setEditOrderNoteModalOpen(false);
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={isEditOrderNoteModalOpen}
            onClose={() => setEditOrderNoteModalOpen(false)}
            containerClassName="min-w-[500px]"
        >
            <div className="m-auto p-3">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Order Note</Title>
                    <ActionIcon
                        size="sm"
                        variant={"text" as any}
                        onClick={() => setEditOrderNoteModalOpen(false)}
                    >
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Textarea */}
                <Textarea
                    label="Message"
                    placeholder="Write your message..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    maxLength={5000}
                />

                {/* Action Buttons */}
                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button
                        variant={"outline" as any}
                        onClick={() => setEditOrderNoteModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
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

export default EditOrderNoteModal;
