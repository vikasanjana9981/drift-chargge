import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { createPlanPageStates, payPerShipmentPlanAtom } from 'app/states/plansAtom'; // Updated atom import
import { PayPerShipmentPlanGroup, PayPerShipmentSellingPlan } from 'app/types/product/sellingPlans';
import { PlanCard } from '../components/PlanCard';
import { PlanForm } from '../components/PlanForm';
import { Button } from 'rizzui/button';
import { ConfirmationModal } from '../components/ConfirmationModal';
import toast from 'react-hot-toast';
import { Text } from 'rizzui/typography';
import { defaultPayPerShipmentGroup, defaultPayPerShipmentPlan } from './default.plan';
import SellingPlanGroupBasicInfo from '../SellingPlanGroupBasicInfo';
import { useSearchParams } from '@remix-run/react';
import { Loader } from 'rizzui/loader';
import { useDebounceWithLoader } from 'app/packages/hooks/useDebounceWithLoader';
import sellingPlanValidators from '../../create-plans/sellingPlanValidators';

const PayPerShipmentCreate = () => {
    const [plans, setPlans] = useAtom(payPerShipmentPlanAtom); // Updated atom usage
    const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
    const [currentPlan, setCurrentPlan] = useState<PayPerShipmentSellingPlan>(defaultPayPerShipmentPlan);
    const [currentGroup, setCurrentGroup] = useState<PayPerShipmentPlanGroup>(defaultPayPerShipmentGroup);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<HTMLDivElement | null>(null);

    // Debounced Plan Update with Loader
    const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);

    const handleAddOrUpdate = () => {

        if (editingIndex !== null) {
            const updatedPlans = [...plans];
            updatedPlans[editingIndex] = currentPlan;
            debouncedSetPlans(updatedPlans);

            // Store updated plans in sellingPlansToUpdate
            setCreatePlanPageState((prevState: any) => ({
                ...prevState,
                payPerShipmentGroup: {
                    ...prevState?.payPerShipmentGroup,
                    sellingPlansToUpdate: updatedPlans,
                },
            }));

            toast.success(<Text as="b">Plan updated</Text>);
        } else {
            const isDuplicate = plans.some(
                (plan: any) =>
                    plan.orderFrequency === currentPlan.billingRecurringPolicyIntervalCount &&
                    plan.frequencyUnit === currentPlan.billingRecurringPolicyInterval
            );

            if (isDuplicate) {
                toast.error(
                    <Text as="b" className="text-red-600">A plan already exists.</Text>
                );
                return;
            }

            const newPlans = [...plans, currentPlan];
            debouncedSetPlans(newPlans);

            // Store newly created plans in sellingPlansToCreate
            setCreatePlanPageState((prevState: any) => ({
                ...prevState,
                payPerShipmentGroup: {
                    ...prevState?.payPerShipmentGroup,
                    sellingPlansToCreate: newPlans,
                },
            }));

            toast.success(<Text as="b">Plan added successfully!</Text>);
        }

        resetForm();
        debouncedSetShowForm(false);
    };

    useEffect(() => {
        // Only update if not in plansUpdate mode
        setCreatePlanPageState((prevState: any) => ({
            ...prevState,
            payPerShipmentGroup: {
                groupName: currentGroup.groupName,
                sellingPlansToCreate: plans,
            },
        }));
    }, [currentGroup, plans, setCreatePlanPageState]);

    useEffect(() => {
        const hasChanged = JSON.stringify(currentPlan) !== JSON.stringify(defaultPayPerShipmentPlan);
        setIsDirty(hasChanged);
    }, [currentPlan]);

    const resetForm = () => {
        setCurrentPlan(defaultPayPerShipmentPlan);
        setEditingIndex(null);
        setIsDirty(false);
    };

    const debouncedSetShowForm = useDebounceWithLoader(setShowForm, 50, setIsLoading);

    const planActions = {
        onEdit: (index: number) => {
            setCurrentPlan(plans[index]);
            setEditingIndex(index);
            debouncedSetShowForm(true);
        },
        onDelete: (index: number) => setDeletingIndex(index),
        onDuplicate: (index: number) => {
            setCurrentPlan({ ...plans[index], frequencyName: `${plans[index].frequencyName}` });
            setEditingIndex(null);
            debouncedSetShowForm(true);
        },
    };

    useEffect(() => {
        if (showForm) {
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
        } else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [showForm]);

    return (
        <div className="rounded-[10px] p-3 relative">
            <div className={`flex flex-col gap-4 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <Loader variant="spinner" />
                    </div>
                )}
                <div>
                    {(plans.length || showForm) && (
                        <SellingPlanGroupBasicInfo
                            currentGroup={currentGroup}
                            onChange={(field, value) => setCurrentGroup((prev) => ({ ...prev, [field]: value }))}
                        />
                    )}
                </div>

                {/* Conditionally render plan cards only if plans are saved or plansUpdate is set */}
                {(plans.length > 0) && (
                    <div className="flex flex-col gap-4">
                        {plans.map((plan: any, index: any) => (
                            <PlanCard
                                key={index}
                                plan={plan}
                                index={index}
                                actions={planActions}
                            />
                        ))}
                    </div>
                )}

                <div className="flex">
                    <Button
                        variant={'text' as any}
                        onClick={() => debouncedSetShowForm(true)}
                        className="text-blue-600 cursor-pointer hover:underline text-sm"
                    >
                        Add another plan
                    </Button>
                </div>

                {showForm && (
                    <>
                        <div ref={formRef} className="border border-muted rounded-[10px] p-3">
                            <PlanForm plan={currentPlan} onChange={setCurrentPlan} />
                        </div>

                        <div className="flex gap-4 mt-5">
                            <Button onClick={handleAddOrUpdate}>
                                {editingIndex !== null ? 'Done' : 'Done'}
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                        <Loader variant="spinner" />
                                    </div>
                                )}
                            </Button>
                            {isDirty && (
                                <Button
                                    variant={'outline' as any}
                                    onClick={() => setShowCancelModal(true)}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>

            <ConfirmationModal
                isOpen={deletingIndex !== null}
                title="Delete Plan"
                message={`Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ''}"?`}
                onConfirm={() => {
                    debouncedSetPlans(plans.filter((_: any, i: any) => i !== deletingIndex));
                    setDeletingIndex(null);
                }}
                onCancel={() => setDeletingIndex(null)}
            />

            <ConfirmationModal
                isOpen={showCancelModal}
                title="Discard Changes"
                message="Are you sure you want to discard changes?"
                onConfirm={resetForm}
                onCancel={() => setShowCancelModal(false)}
            />
        </div>
    );
};

export default PayPerShipmentCreate;