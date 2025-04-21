import CheckCircleIcon from "app/packages/components/icons/check-circle";
import { useState, useEffect } from "react";
import { AdvancedRadio, RadioGroup, Text, Flex } from "rizzui";

export const PlanTypeSelection = ({ onPlanChange, currentPlan }: any) => {
    const [planType, setPlanType] = useState(currentPlan?.planType || "subscription");

    const planOptions = [
        { value: "subscription", title: "Subscription", description: "Subscribers receive shipments every time they pay." },
        { value: "prepaid", title: "Prepaid/Gift", description: "Subscribers pay in advance for multiple shipments." }
    ];

    // ✅ Sync selected plan type when `currentPlan` changes
    useEffect(() => {
        if (currentPlan?.planType) {
            setPlanType(currentPlan.planType);
        }
    }, []);

    const handleChange = (value: any) => {
        setPlanType(value);
        onPlanChange((prev: any) => ({ ...prev, planType: value }));
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Plan Type</h2>
            <RadioGroup value={planType} setValue={handleChange} className="grid grid-cols-1 gap-4">
                {planOptions.map((plan) => (
                    <AdvancedRadio key={plan.value} value={plan.value} name="plan" className="rounded-lg cursor-pointer transition-all">
                        <Flex justify="between" align="center">
                            <Text as="b">{plan.title}</Text>
                            <CheckCircleIcon className="icon hidden h-5 w-5 text-secondary" />
                        </Flex>
                        <Text className="text-gray-500 text-sm">{plan.description}</Text>
                    </AdvancedRadio>
                ))}
            </RadioGroup>
        </div>
    );
};
