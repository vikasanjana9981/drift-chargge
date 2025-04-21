import { useEffect, useState } from "react";
import { PayPerShipmentPlanGroup, PayPerShipmentSellingPlanFrontend } from "../utils/sellingPlansGroupUtils";
import { PlanHeader } from "./OneTimePlans";
import { FaCopy, FaEllipsisVertical, FaGear, FaPencil, FaRepeat, FaShip, FaTag, FaTrash, FaXmark } from "react-icons/fa6";
import { Flex, Text, Title, Box, Dropdown, ActionIcon, Loader, Button, Modal } from "rizzui";
import { messages } from "app/config/messages";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";
import { Link, useFetcher, useNavigate, useParams } from "@remix-run/react";
import { productAtom } from "app/states/productAtom";
import { useAtom } from "jotai";
import { extractNumericId, formatDate } from "app/packages/utils/shopifyIdUtils";
import { ConfirmationModal } from "../../selling-plan-groups/components/ConfirmationModal";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { PayPerShipmentSellingPlan } from "app/types/product/sellingPlans";
import { OneTimePlanForm } from "../../selling-plan-groups/OneTimePlanSettings/OneTimePlanForm";

const PayperShipmentPlansList = ({
    shipmentGroup,
    plansKey,
    setRefreshKey
}: {
    shipmentGroup: PayPerShipmentPlanGroup | null;
    plansKey: string,
    setRefreshKey: any
}) => {
    if (!shipmentGroup) return null
    const { groupName, sellingPlans, id } = shipmentGroup;
    const numericSellingPlanGroupId = extractNumericId(id);
    // Sort the sellingPlans array by the "position" property
    const sortedSellingPlans = [...sellingPlans].sort((a, b) => a.position - b.position);
    const [sellingPlansState, setSellingPlansState] = useState(sortedSellingPlans);
    const [hasChanges, setHasChanges] = useState(false);
    const [loader, setLoader] = useState(false);
    const fetcher = useFetcher<any>();
    const [productResponse, setProduct] = useAtom(productAtom);
    const navigate = useNavigate();
    const { productId } = useParams();

    /** Handles reordering when dragging ends */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = sellingPlansState.findIndex(({ id }: PayPerShipmentSellingPlanFrontend) => id === active.id);
        const newIndex = sellingPlansState.findIndex(({ id }: PayPerShipmentSellingPlanFrontend) => id === over.id);
        setSellingPlansState(arrayMove(sellingPlansState, oldIndex, newIndex));
        setHasChanges(true);
    };

    /** Function to compare two arrays for equality */
    const arraysAreEqual = (arr1: any[], arr2: any[]) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((item, index) => item.id === arr2[index].id);
    };


    /** Handle save changes */
    const handleSaveChanges = () => {
        const productId = extractNumericId(productResponse.id);
        setLoader(true);
        const formData = new FormData();
        formData.append("plans", JSON.stringify(sellingPlansState));
        formData.append("groupId", id);
        formData.append("action", 'updatePlanOrder');

        fetcher.submit(formData, {
            method: "POST",
            action: `/merchant/products/${productId}`,
            encType: "multipart/form-data",
        });

    };

    const handleMangePlanClick = () => {
        const productId = extractNumericId(productResponse.id);
        navigate(`/merchant/products/${productId}/plans?plansUpdate=yes`)
    }

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setHasChanges(false); // Reset changes after saving
            } else {
                toast.error(fetcher?.data?.error);
            }
            setLoader(false);
        }
    }, [fetcher.state, fetcher.data]);

    return (
        <div className="flex w-full cursor-pointer flex-col gap-y-6 rounded-[10px] border border-muted p-4 lg:gap-y-2 sm:p-[30px]">
            <PlanHeader className="mb-4 flex-col" planName={groupName} children={<Text>{messages.products.subscriptionPlanDnD}</Text>} />
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sellingPlansState.map(({ id }: PayPerShipmentSellingPlanFrontend) => id)} strategy={verticalListSortingStrategy}>
                    {/* Render each selling plan */}
                    {sellingPlansState.map((plan) => (
                        <SortablePlan
                            key={plan.id}
                            id={plan.id}
                            plan={plan}
                            shipmentGroup={shipmentGroup}
                            setRefreshKey={setRefreshKey}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {/* Conditionally render the Save Changes button */}
            <div className="flex items-center justify-end gap-2">
                <div className="flex items-center">
                    <Button variant={"text" as any} onClick={handleMangePlanClick}>
                        <FaGear className="text-primary" />
                        <Text className="ms-2 text-primary font-semibold">Manage plans</Text>
                    </Button>
                    <Link className="flex items-center" to={`/merchant/products/${productId}/variant-plans?groupId=${numericSellingPlanGroupId}`} >
                        <FaGear className="text-primary" />
                        <Text className="ms-2 text-primary font-semibold">Manage variant plans</Text>
                    </Link>
                </div>
                {hasChanges && (
                    <Button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        isLoading={loader}
                        loader={<Loader variant="spinner" />}
                    >
                        Save Changes
                    </Button>
                )}
            </div>
        </div>
    );
};

const SortablePlan = ({
    id,
    plan,
    shipmentGroup,
    setRefreshKey
}: {
    id: string;
    plan: PayPerShipmentSellingPlanFrontend,
    shipmentGroup: PayPerShipmentPlanGroup,
    setRefreshKey: any
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: '#EDEEF9'
    };

    return (
        <div className="p-4 rounded-lg mt-2" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <PlanDetails
                sellingPlan={plan}
                shipmentGroup={shipmentGroup}
                setRefreshKey={setRefreshKey}
            />
        </div>
    );
};


const PlanDetails = ({
    sellingPlan,
    shipmentGroup,
    setRefreshKey
}: {
    sellingPlan: PayPerShipmentSellingPlanFrontend,
    shipmentGroup: PayPerShipmentPlanGroup,
    setRefreshKey: any
}) => {
    const planName = sellingPlan.planName || "Unnamed Plan";
    const category = sellingPlan.category?.charAt(0).toUpperCase() + sellingPlan.category?.slice(1).toLowerCase() || "Subscription";

    // Ships Every Calculation (from Delivery Policy)
    const deliveryInterval = sellingPlan.deliveryRecurringPolicyInterval || "MONTH";
    const deliveryCount = sellingPlan.deliveryRecurringPolicyIntervalCount || 1;
    const shipsEvery = `Ships every ${deliveryCount} ${deliveryInterval.toLowerCase()}${deliveryCount > 1 ? "s" : ""}.`;

    // Pricing Policy (Discount)
    const discountValue = sellingPlan.pricingPolicyAdjustmentValue || 0;
    const discountType = sellingPlan.pricingPolicyAdjustmentType?.toLowerCase() || "fixed amount";
    const discountText = `${discountValue}% ${discountType}`;

    return (
        <div className="flex flex-col gap-1">
            <Flex align="center" direction="row" gap="2" justify="between" >
                <Box className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 25 25" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z" fill="#121923" />
                    </svg>
                    <Title className="text-lg font-semibold">{planName}</Title>
                </Box>
                <PlanActions
                    sellingPlan={sellingPlan}
                    shipmentGroup={shipmentGroup}
                    setRefreshKey={setRefreshKey}
                />
            </Flex>
            <Box className="ms-8 mt-3">
                <Text className="text-gray-600">
                    <FaRepeat className="inline-block mr-1" />
                    {category}
                </Text>
                <Text className="text-blue-600">
                    <FaShip className="inline-block mr-1" />
                    {shipsEvery}
                </Text>
                <Text className="text-green-600">
                    <FaTag className="inline-block mr-1" />
                    {discountText}
                </Text>
            </Box>
        </div>
    );
};

const PlanActions = ({
    sellingPlan,
    shipmentGroup,
    setRefreshKey
}: {
    sellingPlan: PayPerShipmentSellingPlanFrontend,
    shipmentGroup: PayPerShipmentPlanGroup,
    setRefreshKey: any
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Box className="flex items-center">
            <ActionIcon
                variant={"text" as any}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true)
                }}
            >
                <FaPencil className="mr-2 h-4 w-4" />
            </ActionIcon>
            <PlanDropDowns
                sellingPlan={sellingPlan}
                shipmentGroup={shipmentGroup}
                setRefreshKey={setRefreshKey}

            />
            <SellingPlanEditModal
                modalState={isModalOpen}
                setModalState={setIsModalOpen}
                sellingPlan={sellingPlan}
                shipmentGroup={shipmentGroup}
                setRefreshKey={setRefreshKey}
            />
        </Box>
    );
};

const SellingPlanEditModal = ({
    modalState,
    setModalState,
    sellingPlan,
    shipmentGroup,
    setRefreshKey
}: any) => {
    const [currentPlan, setCurrentPlan] = useState<PayPerShipmentSellingPlan>(sellingPlan);
    const [loader, setLoader] = useState(false);
    const fetcher = useFetcher<any>();
    const handleChange = <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => {
        setCurrentPlan((prevPlan) => ({
            ...prevPlan,
            [field]: value
        }));
    };

    const handleSavePlan = async () => {
        setLoader(true);
        console.log('shipmentGroup', shipmentGroup)
        const formData = new FormData();
        formData.append("plans", JSON.stringify(currentPlan));
        formData.append("groupId", shipmentGroup.id);
        formData.append("action", 'updatePayPerShipmentPlan');

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
                setRefreshKey((prevKey: any) => prevKey + 1);
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
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <FaXmark
                            className="h-auto w-6"
                            strokeWidth={1.8}
                        />
                    </ActionIcon>
                </div>
                <div className="w-full">
                    <OneTimePlanForm
                        currentPlan={currentPlan as any}
                        onChange={handleChange as any}
                        onSave={handleSavePlan}
                        productTitle={""}
                        tabListClassName="w-[35%]"
                        tabPanelClassName="w-[79%]"
                        saveButtonProps={{ isLoading: loader, loader: <Loader variant="spinner" /> }}
                    />
                </div>
            </div>
        </Modal>
    )
}

const PlanDropDowns = ({
    sellingPlan,
    shipmentGroup,
    setRefreshKey
}: {
    sellingPlan: PayPerShipmentSellingPlanFrontend,
    shipmentGroup: PayPerShipmentPlanGroup,
    setRefreshKey: any
}) => {
    const fetcher = useFetcher<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [product] = useAtom<ProductSingleNode>(productAtom);

    const handleConfirmDeletePlan = () => {
        setIsLoading(true);
        const { sellingPlanGroups } = product;
        const groupId = shipmentGroup.id;
        const sellingPlanId = sellingPlan.id;

        if (!groupId || !sellingPlanId) {
            toast.error('Required data missing')
            setIsLoading(false)
            return;
        }

        const selectedSellingPlanGroup = sellingPlanGroups.edges.find(edge => edge.node.id === groupId)?.node || null;

        if (!selectedSellingPlanGroup) {
            toast.error('Selling plan group not found')
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("sellingPlanId", sellingPlanId);
        formData.append("groupId", groupId);

        const action = isSingleSellingPlan(selectedSellingPlanGroup) ? 'deletePayPerShipmentPlanGroup' : 'deletePayPerShipmentPlan';
        formData.append("action", action);

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    }

    const isSingleSellingPlan = (sellingPlanGroup: any): boolean => {
        return sellingPlanGroup.sellingPlans.edges.length === 1;
    }

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setRefreshKey((prevKey: any) => prevKey + 1);
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);


    return (
        <Dropdown placement="bottom-end" className="min-w-250">
            <Dropdown.Trigger
                className={"flex items-center"}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <FaEllipsisVertical className="h-5 w-5" />
            </Dropdown.Trigger>
            <Dropdown.Menu className="divide-y min-w-[210px]">
                <div className="mb-2">
                    <Dropdown.Item>
                        <Button className="px-0 py-2" variant={"text" as any} >
                            <FaPencil className="mr-2 h-4 w-4" />
                            Edit Plan
                        </Button>
                    </Dropdown.Item>

                    <Dropdown.Item>
                        <Button
                            isLoading={isLoading}
                            loader={<Loader variant="spinner" />}
                            className="px-0 py-2"
                            variant={"text" as any}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirmationModal(true)
                            }}
                        >
                            <FaTrash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>

                        <ConfirmationModal
                            isOpen={showDeleteConfirmationModal}
                            title="Delete Plan"
                            message="Are you sure you want to delete Plan?"
                            onConfirm={handleConfirmDeletePlan}
                            onCancel={() => setShowDeleteConfirmationModal(false)}
                        />
                    </Dropdown.Item>

                    <Dropdown.Item>
                        <Button className="px-0 py-2" variant={"text" as any} >
                            <FaCopy className="mr-2 h-4 w-4" />
                            Checkout Link
                        </Button>
                    </Dropdown.Item>

                    <hr className="my-3" />
                    <Dropdown.Item>
                        <Flex direction="col" gap="1">
                            <Text className="font-semibold text-[#848BD4] text-lg uppercase">Created on</Text>
                            <Text className="text-left">{formatDate(sellingPlan?.createdAt as string)}</Text>
                        </Flex>
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default PayperShipmentPlansList;