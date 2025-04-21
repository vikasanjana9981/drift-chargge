import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { productAtom } from 'app/states/productAtom';
import { useSearchParams } from '@remix-run/react';
import toast from 'react-hot-toast';
import { defaultOneTimePlan } from '../PayPerShipment/default.plan';
import { PlanHeader } from './PlanHeader';
import { OneTimePlanForm } from './OneTimePlanForm';
import { OneTimePlanCard } from './OneTimePlanCard';
import { Loader } from 'rizzui/loader';
import { createPlanPageStates } from 'app/states/plansAtom';

const OneTimePlanSettingsCreate = () => {
    const [currentPlan, setCurrentPlan] = useState(defaultOneTimePlan);
    const [isPlanEnabled, setIsPlanEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showFormOnetime, setShowFormOnetime] = useState(false);
    const [product] = useAtom(productAtom);
    const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);

    useEffect(() => {
        if (product) {
            defaultOneTimePlan.planName = product.title;
        }
    }, [product]);

    const handleChange = useCallback(<T extends keyof typeof defaultOneTimePlan>(field: T, value: any) => {
        setCurrentPlan((prevPlan) => ({
            ...prevPlan,
            [field]: value,
        }));

        setShowFormOnetime(true);
    }, []);

    const handleSavePlan = async () => {
        setIsLoading(true);
        try {
            toast.success("One-time plan saved successfully!");
            setIsPlanEnabled(true); // Enable the plan after saving
            setShowFormOnetime(false); // Hide the form

            // Store updated plans in sellingPlansToUpdate
            setCreatePlanPageState((prevState: any) => ({
                ...prevState,
                oneTimeGroup: {
                  groupName:currentPlan.planName,
                  sellingPlansToCreate: [currentPlan],
                },
            }));

        } finally {
            setIsLoading(false);
        }
    };

    const handleTogglePlan = useCallback((checked: boolean) => {
        setIsPlanEnabled(checked);
        setShowFormOnetime(checked);
    }, []);

    const handleEditPlan = useCallback(() => {
        setShowFormOnetime(true);
    }, []);

    const handleDeletePlan = useCallback(() => {
        setIsPlanEnabled(false);
        setShowFormOnetime(false);
        setCurrentPlan(defaultOneTimePlan);
        toast.success("Plan deleted successfully!");
    }, []);

    useEffect(() => {
        if (showFormOnetime) {
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
        }
    }, [showFormOnetime]);

    return (
        <div className="border border-muted rounded-[10px] p-3 relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <Loader variant="spinner" />
                </div>
            )}

            <PlanHeader isPlanEnabled={isPlanEnabled} onToggle={handleTogglePlan} />

            {isPlanEnabled && (
                showFormOnetime ? (
                    <OneTimePlanForm
                        currentPlan={currentPlan}
                        onChange={handleChange}
                        onSave={handleSavePlan}
                        productTitle={product?.title || ""}
                    />
                ) : (
                    <div className="mt-6">
                        <OneTimePlanCard
                            plan={currentPlan}
                            index={0}
                            actions={{
                                onEdit: handleEditPlan,
                                onDelete: handleDeletePlan,
                                onDuplicate: () => { },
                            }}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default OneTimePlanSettingsCreate;
