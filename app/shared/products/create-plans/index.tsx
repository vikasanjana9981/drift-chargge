"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { productAtom } from "app/states/productAtom";
import { routes } from "app/config/routes";
import { Link, useNavigate, useParams } from "@remix-run/react";
import PageHeader from "app/shared/page-header";
import { Flex, Box, Button, Modal } from "rizzui";
import { PiCheckCircleBold, PiEyeBold, PiPlusCircleBold, PiTrashBold, PiXCircleBold } from "react-icons/pi";
import { PlanTypeSelection } from "./PlanTypeSelection";
import { PlanDetails } from "./PlanDetails";
import { plansAtom } from "app/states/plansAtom";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { formatPrice } from "app/packages/utils/shopifyIdUtils";

export default function CreatePlans({ handleSavePlans, createPlanLoader }: { handleSavePlans: (plan: any[]) => void, createPlanLoader: Boolean }) {
    const [product] = useAtom(productAtom);
    const navigate = useNavigate();
    const { productId } = useParams();

    const [plans, setPlans] = useAtom(plansAtom);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
    const [deletingPlanIndex, setDeletingPlanIndex] = useState<number | null>(null); // Track which plan is being deleted
    const [deletingPlanName, setDeletingPlanName] = useState(""); // Store the plan name for confirmation

    const pageHeader = {
        breadcrumb: [
            { href: routes.products.products, name: "Products" },
            { name: product?.title || "Product" },
            { name: "Edit" },
        ],
    };

    // ✅ Handle adding or updating plans
    const handleAddOrUpdatePlan = () => {
        if (!currentPlan) return;

        if (editingPlanIndex !== null) {
            const updatedPlans = [...plans];
            updatedPlans[editingPlanIndex] = currentPlan;
            setPlans(updatedPlans);
            setEditingPlanIndex(null);
        } else {
            setPlans([...plans, currentPlan]);
        }

        setCurrentPlan(null);
        setShowForm(false);
    };

    useEffect(() => {
        if (!product) {
            navigate(`/merchant/products/${productId}`);
        }
    }, [product, productId, navigate]);

    // ✅ Toggle form visibility
    const handleToggleForm = () => {
        if (showForm) {
            setShowConfirmPopup(true);
        } else {
            setShowForm(true);
        }
    };

    // ✅ Reset form and close confirmation modal
    const discardChanges = () => {
        setCurrentPlan(null);
        setEditingPlanIndex(null);
        setShowForm(false);
        setShowConfirmPopup(false);
    };

    // ✅ Set plan for editing
    const handleEditPlan = (index: number) => {
        setCurrentPlan(plans[index]);
        setEditingPlanIndex(index);
        setShowForm(true);
    };

    // ✅ Open confirmation modal when deleting
    const handleDeletePlan = (index: number) => {
        setDeletingPlanIndex(index);
        setDeletingPlanName(plans[index].planName);
    };

    // ✅ Confirm and delete the plan
    const confirmDeletePlan = () => {
        if (deletingPlanIndex !== null) {
            setPlans(plans.filter((_, i) => i !== deletingPlanIndex));
            setDeletingPlanIndex(null);
            setDeletingPlanName("");
        }
    };

    return (
        <>
            <PageHeader title={product?.title || ""} breadcrumb={pageHeader.breadcrumb} />
            <Flex direction="col">
                <Box>
                    <h3 className="text-base font-medium xl:text-lg">Create Plans</h3>
                </Box>

                {/* Display Added Plans */}
                {plans.map((plan: any, index: any) => (
                    <Box key={index} className="mb-4 p-4 border rounded-md flex justify-between flex-col gap-5">
                        <div>
                            <h4 className="text-lg font-semibold">{plan.planName || "Unnamed Plan"}</h4>
                            <p className="text-sm">Type: {plan.planType}</p>
                            <p className="text-sm">Frequency: {plan.frequency} {plan.unit}</p>
                            {plan.offerDiscount && <p className="text-sm">Discount: {plan.discount}%</p>}
                        </div>

                        <hr />

                        {/* Action Buttons */}
                        <Flex className="gap-3">
                            {/* Edit Button */}
                            <Button variant={"outline" as any} size="sm" onClick={() => handleEditPlan(index)}>
                                <PiCheckCircleBold className="mr-1" /> Edit
                            </Button>

                            {/* Duplicate Button */}
                            <Button
                                variant={"outline" as any}
                                size="sm"
                                onClick={() => {
                                    setCurrentPlan({ ...plan, planName: `${plan.planName} (Copy)` });
                                    setEditingPlanIndex(null);
                                    setShowForm(true);
                                }}
                            >
                                <PiPlusCircleBold className="mr-1" /> Duplicate
                            </Button>

                            {/* Delete Button */}
                            <Button variant={"outline" as any} size="sm" color="danger" onClick={() => handleDeletePlan(index)}>
                                <PiTrashBold className="mr-1" /> Delete
                            </Button>
                        </Flex>
                    </Box>
                ))}

                {/* Toggle Button */}
                <Button variant={"solid" as any} color="primary" onClick={handleToggleForm}>
                    <PiPlusCircleBold className="mr-2" />
                    {editingPlanIndex !== null ? "Edit Plan" : showForm ? "Cancel" : "Create Plan"}
                </Button>

                {/* Plan Form */}
                {showForm && (
                    <div className="mt-4 w-half cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted">
                        <Box className="p-6">
                            <PlanTypeSelection onPlanChange={setCurrentPlan} currentPlan={currentPlan} />
                            <hr className="my-6" />
                            {product && <PlanDetails currentPlan={currentPlan} onPlanChange={setCurrentPlan} product={product} />}
                            {product && <PlanPreview product={product} currentPlan={currentPlan} />}
                            <hr />

                            {/* Action Buttons */}
                            <Flex className="gap-4 mt-5">
                                <Button variant={"solid" as any} color="primary" onClick={handleAddOrUpdatePlan}>
                                    <PiPlusCircleBold className="mr-2" />
                                    {editingPlanIndex !== null ? "Save Changes" : "Add Plan"}
                                </Button>
                                <Button variant={"outline" as any} color="secondary" onClick={handleToggleForm}>
                                    <PiXCircleBold className="mr-2" /> Cancel
                                </Button>
                            </Flex>
                        </Box>
                    </div>
                )}

                {/* Confirmation Modal for Deleting */}
                <Modal isOpen={deletingPlanIndex !== null} onClose={() => setDeletingPlanIndex(null)}>
                    <Box className="p-6">
                        <h3 className="text-lg font-semibold">Remove Plan</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Are you sure you want to remove the plan <strong>"{deletingPlanName}"</strong>?
                        </p>
                        <Flex className="mt-4 gap-4">
                            <Button variant={"outline" as any} color="secondary" onClick={() => setDeletingPlanIndex(null)}>
                                Cancel
                            </Button>
                            <Button variant={"solid" as any} color="danger" onClick={confirmDeletePlan}>
                                Confirm
                            </Button>
                        </Flex>
                    </Box>
                </Modal>

                <Button variant={"solid" as any} color="primary" disabled={plans.length === 0}
                    onClick={() => handleSavePlans(plans)}>
                    Save plans
                </Button>

            </Flex>

        </>
    );
}


export const PlanPreview = ({ product, currentPlan }: { product: ProductSingleNode, currentPlan: any }) => {
    const { variants, shop: { currencyFormats: { moneyFormat } } } = product;
    const initialVariant = variants.nodes[0];
    const formattedPrice = formatPrice(initialVariant.price, moneyFormat);

    return (
        <Flex className="bg-gray-100 p-4 mt-4 rounded items-center gap-2">
            <PiEyeBold className="text-gray-600 text-lg" />
            <strong>Recurring subtotal preview:</strong>
            {formattedPrice} every {currentPlan?.frequency} {currentPlan?.unit}
        </Flex>
    );
};

export const PlanActions = () => {
    return (
        <Flex className="gap-4 mt-5">
            <Button variant={"solid" as any} color="primary">
                <PiCheckCircleBold className="mr-2" /> Save Plan
            </Button>
            <Button variant={"outline" as any}>
                <PiXCircleBold className="mr-2" /> Cancel
            </Button>
            <Button variant={"text" as any} className="text-primary">
                <PiPlusCircleBold className="mr-2" /> Add Another Plan
            </Button>
        </Flex>
    );
};

export const PlanChanges = () => {
    return (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded">
            <h4 className="font-semibold mb-2">The following changes will be saved:</h4>
            <Button variant={"text" as any} color="secondary" className="mt-2">
                <PiTrashBold className="mr-2" /> Discard Changes
            </Button>
        </div>
    );
};