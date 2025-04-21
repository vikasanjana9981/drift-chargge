import QuillEditor from 'app/packages/ui/quill-editor'
import { PayPerShipmentSellingPlan, Plan } from 'app/types/product/sellingPlans'
import { useEffect, useState, useRef } from 'react'
import { Input } from 'rizzui/input'
import { Switch } from 'rizzui/switch'

const DisplayContentsTab = ({
    handleChange,
    plan,
    prePaidFrom
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(
        field: T,
        value: PayPerShipmentSellingPlan[T]
    ) => void,
    plan: PayPerShipmentSellingPlan
    prePaidFrom: boolean
}) => {
    const {
        billingRecurringPolicyInterval,
        billingRecurringPolicyIntervalCount,
        pricingPolicyEnable,
        pricingPolicyAdjustmentValue,
        pricingPolicyAfterCycleAdjustmentType,
        planName,
        showDescription,
        descriptionContent
    } = plan;

    const [planNameState, setPlanName] = useState<string>(plan.planName || '');
    const [isUserEdited, setIsUserEdited] = useState(false);
    const isUserEditedRef = useRef(isUserEdited);

    // Synchronize ref with state
    useEffect(() => {
        isUserEditedRef.current = isUserEdited;
    }, [isUserEdited]);

    // Reset state when plan changes
    useEffect(() => {
        setPlanName(plan.planName || '');
        setIsUserEdited(false);
        isUserEditedRef.current = false;
    }, [plan]); // Consider using a specific identifier if available

    // Update plan name when interval/count changes and not edited
    useEffect(() => {
        if (!isUserEditedRef.current) {
            const defaultPlanName = `${billingRecurringPolicyIntervalCount} ${billingRecurringPolicyInterval.toLowerCase()} Subscription`;
            if (planNameState !== defaultPlanName) {
                setPlanName(defaultPlanName);
                handleChange('planName', defaultPlanName);
            }
        }
    }, [billingRecurringPolicyIntervalCount, billingRecurringPolicyInterval]);

    const handlePlanNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setPlanName(newValue);
        handleChange('planName', newValue);

        if (!isUserEditedRef.current) {
            setIsUserEdited(true);
            isUserEditedRef.current = true;
        }
    };

    return (
        <>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Plan Name</label>
                    <Input
                        type="text"
                        value={planNameState}
                        onChange={handlePlanNameChange}
                        className="w-full p-2"
                    />
                </div>
                <Switch
                    checked={showDescription}
                    onChange={() => handleChange('showDescription', !showDescription)}
                    label="Show Description"
                />
                {showDescription && (
                    // <QuillEditor
                    //     value={descriptionContent}
                    //     onChange={(content) => handleChange('descriptionContent', content)}
                    //     label="Description"
                    // />
                    <>
                    </>
                )}
            </div>
        </>
    );
};

export default DisplayContentsTab;