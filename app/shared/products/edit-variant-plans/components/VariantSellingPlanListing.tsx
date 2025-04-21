import { useFetcher, useNavigate, useSearchParams } from "@remix-run/react";
import { VariantSellingPlanListingProps } from "../types";
import { useEffect, useMemo, useState } from "react";
import VariantSellingPlanActions from "./VariantSellingPlanActions";
import { ConfirmationModal } from "../../selling-plan-groups/components/ConfirmationModal";
import VariantPlanListTable from "./VariantPlanListTable";
import toast from "react-hot-toast";

const VariantSellingPlanListing: React.FC<VariantSellingPlanListingProps> = ({ product }) => {
    const { variants: { nodes }, id } = product;
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('groupId');

    const selectedGroup = nodes
        .flatMap((variant) => variant.sellingPlanGroups.edges)
        .find((edge) => edge.node.id === `gid://shopify/SellingPlanGroup/${groupId}`);
    const sellingPlans = selectedGroup?.node.sellingPlans.edges || [];
    const [allVariantsChecked, setAllVariantsChecked] = useState<boolean[]>(sellingPlans.map(() => false));
    const [variantCheckboxes, setVariantCheckboxes] = useState<{ [key: string]: boolean }>({});
    const [originalVariantCheckboxes, setOriginalVariantCheckboxes] = useState<{ [key: string]: boolean }>({});
    const [isModified, setIsModified] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const tableData = useMemo(() => (nodes ? nodes : []), [product]);
    const fetcher = useFetcher<any>();
    const navigate = useNavigate();
    useEffect(() => {
        const initialCheckboxes: { [key: string]: boolean } = {};
        console.log('sellingPlans', sellingPlans);
        tableData.forEach((variant) => {
            sellingPlans.forEach((plan: any) => {
                const key = `${variant.id}-${plan.node.id}`;

                // Default assumption: Use existing selling plan assignment
                let hasSellingPlan = variant.sellingPlanGroups.edges
                    .find((edge: any) => edge.node.id === `gid://shopify/SellingPlanGroup/${groupId}`)
                    ?.node.sellingPlans.edges.some((edge: any) => edge.node.id === plan.node.id);

                // Retrieve metafields (if available)
                const metafieldNodes = plan?.node?.metafields?.nodes || [];
                const restrictedMetafield = metafieldNodes.find((m: any) => m.key === "restrictedVariants");
                const addedMetafield = metafieldNodes.find((m: any) => m.key === "addedVariants");

                // If metafields exist, override the default state
                if (metafieldNodes.length > 0) {
                    const restrictedVariants = restrictedMetafield ? JSON.parse(restrictedMetafield.value) : [];
                    const addedVariants = addedMetafield ? JSON.parse(addedMetafield.value) : [];

                    if (restrictedVariants.includes(variant.id)) {
                        hasSellingPlan = false; // Uncheck if in restrictedVariants
                    } else if (addedVariants.includes(variant.id)) {
                        hasSellingPlan = true; // Check if in addedVariants
                    }
                }

                initialCheckboxes[key] = hasSellingPlan || false;
            });
        });

        setVariantCheckboxes(initialCheckboxes);
        setOriginalVariantCheckboxes(initialCheckboxes); // Store the original state

        // Check if all variants are selected for each plan
        const initialAllVariantsChecked = sellingPlans.map((plan) =>
            tableData.every((variant) => initialCheckboxes[`${variant.id}-${plan.node.id}`])
        );

        setAllVariantsChecked(initialAllVariantsChecked);
        setIsModified(false); // Reset modification tracking
    }, [tableData, sellingPlans, groupId]);


    const handleCheckboxChange = (variantId: string, planId: string, checked: boolean) => {
        setVariantCheckboxes((prev) => {
            const newCheckboxes = { ...prev, [`${variantId}-${planId}`]: checked };
            const allChecked = tableData.every((variant) => newCheckboxes[`${variant.id}-${planId}`]);

            setAllVariantsChecked((prev) => {
                const newAllVariantsChecked = [...prev];
                const planIndex = sellingPlans.findIndex((plan) => plan.node.id === planId);
                if (planIndex !== -1) {
                    newAllVariantsChecked[planIndex] = allChecked;
                }
                return newAllVariantsChecked;
            });

            setIsModified(true); // Mark changes as modified
            return newCheckboxes;
        });
    };

    const handleDiscardChanges = () => {
        setVariantCheckboxes(originalVariantCheckboxes); // Reset to original values
        setIsModified(false);
    };

    const handleAllVariantsChange = (planIndex: number, checked: boolean) => {
        setAllVariantsChecked((prev) => {
            const newAllVariantsChecked = [...prev];
            newAllVariantsChecked[planIndex] = checked;
            return newAllVariantsChecked;
        });

        setVariantCheckboxes((prev) => {
            const newCheckboxes = { ...prev };
            tableData.forEach((variant) => {
                const key = `${variant.id}-${sellingPlans[planIndex].node.id}`;
                newCheckboxes[key] = checked;
            });
            return newCheckboxes;
        });

        setIsModified(true);
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const transformedVariantData = transformShopifyData(variantCheckboxes);
            const variantData = {
                groupId,
                transformedVariantData
            }
            const formData = new FormData();
            formData.append("variantData", JSON.stringify(variantData));
            formData.append("productId", id!);
            formData.append("appId", product.currentAppInstallation.app.id);
            fetcher.submit(formData, {
                method: "POST",
                action: `.`,
                encType: "multipart/form-data",
            });

        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setTimeout(() => {
                    navigate(-1); 
                }, 1000); 
            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }
    }, [fetcher.state, fetcher.data]);

    const transformShopifyData = (data: any) => {
        let result: { [key: string]: { sellingPlanId: string; restrictedVariants: string[]; addedVariants: string[] } } = {};

        for (let key in data) {
            let [variantId, sellingPlanId] = key.split('-gid://shopify/SellingPlan/');
            // variantId = variantId.replace("gid://shopify/ProductVariant/", ""); // Extract variant ID
            sellingPlanId = `gid://shopify/SellingPlan/${sellingPlanId}`; // Construct selling plan ID

            if (!result[sellingPlanId]) {
                result[sellingPlanId] = {
                    sellingPlanId: sellingPlanId,
                    restrictedVariants: [],
                    addedVariants: []
                };
            }

            if (data[key]) {
                result[sellingPlanId].addedVariants.push(variantId);
            } else {
                result[sellingPlanId].restrictedVariants.push(variantId);
            }
        }

        return Object.values(result);
    }

    return (
        <div className='w-full flex flex-col gap-4'>
            <VariantSellingPlanActions
                disabled={!isModified}
                handleDiscardChanges={() => setShowConfirmationModal(true)}
                handleSaveChanges={handleSaveChanges}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <div className="w-full border border-muted rounded-md">
                <VariantPlanListTable
                    sellingPlans={sellingPlans}
                    tableData={tableData}
                    handleCheckboxChange={handleCheckboxChange}
                    variantCheckboxes={variantCheckboxes}
                    handleAllVariantsChange={handleAllVariantsChange}
                    allVariantsChecked={allVariantsChecked}
                />
            </div>

            {/* Action Buttons */}
            <VariantSellingPlanActions
                disabled={!isModified}
                handleDiscardChanges={() => setShowConfirmationModal(true)}
                handleSaveChanges={handleSaveChanges}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />

            <ConfirmationModal
                isOpen={showConfirmationModal}
                title="Discard Changes"
                message="Are you sure you want to discard all changes?"
                onConfirm={handleDiscardChanges}
                onCancel={() => {
                    setShowConfirmationModal(false)
                }}
            />
        </div>
    );
};

export default VariantSellingPlanListing