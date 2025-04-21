import { OneTimePlan, SellingPlanPricingPolicyAdjustmentType } from "app/types/product/sellingPlans";
import { Button, Modal, Title, ActionIcon, Loader } from "rizzui";
import { FaClock, FaGift, FaMoneyBill, FaTrash, FaXmark } from "react-icons/fa6";
import cn from "app/packages/utils/class-names";
import { formatPrice } from "app/packages/utils/shopifyIdUtils";
import { useFetcher } from "@remix-run/react";
import { useAtom } from "jotai";
import { productAtom } from "app/states/productAtom";
import { useEffect, useMemo, useState } from "react";
import { OneTimePlanForm } from "../../selling-plan-groups/OneTimePlanSettings/OneTimePlanForm";
import { createPlanPageStates } from "app/states/plansAtom";
import { defaultOneTimePlan } from "../../selling-plan-groups/PayPerShipment/default.plan";
import toast from "react-hot-toast";
import { shopObject } from "app/states/shopAtom";
import { ConfirmationModal } from "../../selling-plan-groups/components/ConfirmationModal";
import CheckCircleIcon from "app/packages/components/icons/check-circle";

// Plan Header Component
const PlanHeader = ({
    planName,
    children,
    className }: {
        planName: string,
        children?: React.ReactNode,
        className?: string
    }) => (
    <div className={cn("flex gap-2", className)}>
        <div className="flex gap-2">
            <FaMoneyBill className="text-green-600 text-xl" />
            <h4 className="text-base font-semibold text-gray-900">
                {planName || "Unnamed Plan"}
            </h4>
        </div>
        {children}
    </div>
);

// Plan Details Component
const PlanDetails = ({
    pricingPolicyAdjustmentValue,
    pricingPolicyAdjustmentType,
}: {
    pricingPolicyAdjustmentValue: number;
    pricingPolicyAdjustmentType: SellingPlanPricingPolicyAdjustmentType;
}) => {
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
    const formattedPrice = useMemo(() => {
        if (pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PRICE") {
            return formatPrice(pricingPolicyAdjustmentValue, moneyWithCurrencyFormat);
        }
        return null;
    }, [pricingPolicyAdjustmentValue, pricingPolicyAdjustmentType, moneyWithCurrencyFormat]);

    return (
        <div className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex flex-col gap-1">
                <p>
                    <FaClock className="inline-block text-blue-500 mr-1" />
                    <strong>Plan Type:</strong> One-time Purchase
                </p>
                {pricingPolicyAdjustmentType === "PERCENTAGE" && (
                    <p className="text-green-600 font-medium">
                        <FaGift className="inline-block text-yellow-500 mr-1" />
                        <strong>Discount:</strong> {pricingPolicyAdjustmentValue}%
                    </p>
                )}
                {formattedPrice && (
                    <p className="text-green-600 font-medium">
                        <FaGift className="inline-block text-yellow-500 mr-1" />
                        <strong>
                            {pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PERCENTAGE" ? "Discount:" : "Price:"}
                        </strong> {formattedPrice}
                    </p>
                )}
            </div>
        </div>
    );
};

// Plan Actions Component
const PlanActions = ({
    OneTimeGroup
}: {
    OneTimeGroup: OneTimePlan
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fetcher = useFetcher<any>();


    const handleMangePlanClick = () => {
        setIsModalOpen(true); // Open the modal
    }

    const handleConfirmDeletePlan = () => {
        setIsLoading(true);
        const { sellingPlanId, groupId } = OneTimeGroup;
        if (!groupId || !sellingPlanId) {
            toast.error("Somethink wrong Please try again ");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("sellingPlanId", sellingPlanId);
        formData.append("groupId", groupId);
        formData.append("action", 'deleteOneTimePlan');

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    }

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <div className="flex justify-end gap-2 mt-2">
            <Button
                variant={"outline" as any}
                size="sm"
                onClick={handleMangePlanClick}
            >
                <CheckCircleIcon className="mr-1 text-blue-500" /> Edit
            </Button>
            <Button
                variant={"outline" as any}
                size="sm" color="danger"
                onClick={() => setShowDeleteConfirmationModal(true)}
                isLoading={isLoading}
                loader={<Loader variant="spinner" />}
            >
                <FaTrash className="mr-1 text-red-500" /> Delete
            </Button>

            <OneTimeEditModal
                modalState={isModalOpen}
                setModalState={setIsModalOpen}
            />
            <ConfirmationModal
                isOpen={showDeleteConfirmationModal}
                title="Delete Onetime"
                message="Are you sure you want to delete Onetime Plan?"
                onConfirm={handleConfirmDeletePlan}
                onCancel={() => setShowDeleteConfirmationModal(false)}
            />
        </div>
    )
};


const OneTimeEditModal = ({
    modalState,
    setModalState
}: any) => {
    const [productResponse] = useAtom(productAtom);
    const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
    const fetcher = useFetcher<any>();
    const [loader, setLoader] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<OneTimePlan>(defaultOneTimePlan);

    // Only initialize `currentPlan` when the modal first opens
    useEffect(() => {
        if (modalState && createPlanPageState?.oneTimeGroup) {
            setCurrentPlan(createPlanPageState.oneTimeGroup);
        }
    }, [modalState]); // Runs only when `modalState` changes

    const handleChange = <T extends keyof OneTimePlan>(field: T, value: OneTimePlan[T]) => {
        setCurrentPlan((prevPlan) => ({
            ...prevPlan,
            [field]: value
        }));

        setCreatePlanPageState((prevState: any) => ({
            ...prevState,
            oneTimeGroup: {
                ...prevState.oneTimeGroup,
                [field]: value
            }
        }));
    };

    const handleSavePlan = async () => {
        setLoader(true);
        const { groupId } = currentPlan;
        if (!groupId) {
            toast.error("Please select a group.");
            setLoader(false);
            return;
        }
        const formData = new FormData();
        formData.append("plans", JSON.stringify(currentPlan));
        formData.append("groupId", groupId);
        formData.append("action", 'updateOneTimePlan');

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
            } else {
                toast.error(fetcher?.data?.error);
            }
            setLoader(false);
            setModalState(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <Modal
            isOpen={modalState}
            onClose={() => setModalState(false)}
            overlayClassName="backdrop-blur"
            containerClassName="!w-[90%] sm:!w-[600px] !max-w-4xl !shadow-2xl"
        >
            <div className="m-auto px-7 pt-6 pb-8">
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Edit Plan</Title>
                    <ActionIcon
                        size="sm"
                        variant={"text" as any}
                        onClick={() => setModalState(false)}
                    >
                        <FaXmark
                            className="h-auto w-6"
                            strokeWidth={1.8}
                        />
                    </ActionIcon>
                </div>
                <div className="w-full">
                    <OneTimePlanForm
                        currentPlan={currentPlan}
                        onChange={handleChange as any}
                        onSave={handleSavePlan}
                        productTitle={productResponse?.title || ""}
                        tabListClassName="w-[35%]"
                        tabPanelClassName="w-[79%]"
                        saveButtonProps={{ isLoading: loader, loader: <Loader variant="spinner" /> }}
                    />
                </div>
            </div>
        </Modal>
    );
};



// Main OneTimePlansList Component
const OneTimePlansList = ({
    OneTimeGroup
}: {
    OneTimeGroup: OneTimePlan
}) => {
    const { planName,
        pricingPolicyAdjustmentValue,
        pricingPolicyAdjustmentType
    } = OneTimeGroup;
    return (
        <div className="flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 lg:gap-y-2 sm:p-[30px]">
            <PlanHeader planName={planName} />
            <PlanDetails
                pricingPolicyAdjustmentValue={pricingPolicyAdjustmentValue}
                pricingPolicyAdjustmentType={pricingPolicyAdjustmentType}
            />
            <PlanActions OneTimeGroup={OneTimeGroup} />
        </div>
    );
};

export default OneTimePlansList;

export { PlanHeader, PlanDetails, PlanActions };