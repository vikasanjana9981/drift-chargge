import { ProductSingleNode } from "app/types/product/ProductNode";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Input, Select, Checkbox, Flex, Text, Box } from "rizzui";

export const PlanDetails = ({ onPlanChange, product, currentPlan }: { onPlanChange: (plan: any) => void, product: ProductSingleNode, currentPlan: any }) => {
    const [planDetails, setPlanDetails] = useState({
        frequency: 1,
        unit: "month",
        planName: "1 Month Subscription",
        offerDiscount: false,
        discount: 10,
        planType: "subscription",
    });


    const unitOptions = [
        { label: "Day(s)", value: "day" },
        { label: "Week(s)", value: "week" },
        { label: "Month(s)", value: "month" },
        { label: "Year(s)", value: "year" },
    ];

    useEffect(() => {
        if (currentPlan) {
            setPlanDetails(currentPlan);
        }
    }, [currentPlan]);

    // ✅ Fix: Extract unit value correctly
    useEffect(() => {
        const newPlanName = `${planDetails.frequency} ${planDetails.unit} Subscription`;
        setPlanDetails((prev) => {
            const updatedPlan = { ...prev, planName: newPlanName };
            onPlanChange(updatedPlan);
            return updatedPlan;
        });
    }, [planDetails.frequency, planDetails.unit]);

    const handleChange = (field: string, value: any) => {
        setPlanDetails((prev) => {
            const updatedPlan = { ...prev, [field]: value };
            if (field === "frequency" || field === "unit" || field === "planName") {
                updatedPlan.planName = `${updatedPlan.frequency} ${updatedPlan.unit} Subscription`; // ✅ Ensure correct unit
            }
            onPlanChange(updatedPlan);
            return updatedPlan;
        });
    };

    return (
        <Flex direction="col">
            <Text className="text-xl font-semibold">Plan Details</Text>

            {/* Frequency Selection */}
            <Flex direction="col">
                <label className="block text-sm font-medium text-gray-700">Ship this product every</label>
                <Flex className="gap-4 mt-2">
                    <Box className="flex-1">
                        <Input
                            type="number"
                            value={planDetails.frequency}
                            onChange={(e) => handleChange("frequency", Math.max(Number(e.target.value), 1))}
                            placeholder="1"
                            suffix={
                                <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                                    <button
                                        type="button"
                                        className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                        onClick={() => handleChange("frequency", Math.max(planDetails.frequency + 1, 1))}
                                    >
                                        <FaChevronUp className="h-3 w-3" />
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                                        onClick={() => handleChange("frequency", Math.max(planDetails.frequency - 1, 1))}
                                    >
                                        <FaChevronDown className="h-3 w-3" />
                                    </button>
                                </div>
                            }
                        />
                    </Box>
                    <Box className="flex-1">
                        <Select
                            value={planDetails.unit}
                            onChange={(value) => handleChange("unit", value.value)} // ✅ Extract only the value, not the object
                            options={unitOptions}
                        />
                    </Box>
                </Flex>
            </Flex>

            {/* Plan Name (Auto-generated) */}
            <label className="block text-sm font-medium text-gray-700 mt-4">Plan Name</label>
            <Input type="text" value={planDetails.planName} onChange={(e) => handleChange("planName", e.target.value)} />

            {/* Offer Discount Checkbox */}
            <Checkbox
                label="Offer a discount on this frequency"
                checked={planDetails.offerDiscount}
                onChange={(e) => handleChange("offerDiscount", e.target.checked)}
            />

            {/* Discount Input (Only when offerDiscount is true) */}
            {planDetails.offerDiscount && (
                <Input
                    type="number"
                    value={planDetails.discount}
                    onChange={(e) => handleChange("discount", Math.max(Number(e.target.value), 0))}
                    placeholder="Enter discount percentage"
                    min="1"
                    max="100"
                    suffix="%"
                />
            )}
        </Flex>
    );
};
