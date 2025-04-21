import { useEffect, useState, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { createPlanPageStates, plansAtom } from 'app/states/plansAtom';
import { PayPerShipmentPlanGroup, PayPerShipmentSellingPlan, Plan } from 'app/types/product/sellingPlans';
import { PlanCard } from '../components/PlanCard';
import { PlanForm } from '../components/PlanForm';
import { Button } from 'rizzui/button';
import { ConfirmationModal } from '../components/ConfirmationModal';
import toast from 'react-hot-toast';
import { Text } from 'rizzui/typography';
import { defaultPayPerShipmentGroup, defaultPayPerShipmentPlan } from './default.plan';
import SellingPlanGroupBasicInfo from '../SellingPlanGroupBasicInfo';
import { Link, useSearchParams } from '@remix-run/react';
import { Loader } from 'rizzui/loader'; // Importing Loader component
import { useDebounceWithLoader } from 'app/packages/hooks/useDebounceWithLoader';


const PayPerShipment = () => {
    const [plans, setPlans] = useAtom(plansAtom);
    const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
    const [currentPlan, setCurrentPlan] = useState<PayPerShipmentSellingPlan>(defaultPayPerShipmentPlan);
    const [currentGroup, setCurrentGroup] = useState<PayPerShipmentPlanGroup>(defaultPayPerShipmentGroup);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const plansUpdate = searchParams.get('plansUpdate') === 'yes';
    const formRef = useRef<HTMLDivElement | null>(null);

    // Debounced Plan Update with Loader
    const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);

    useEffect(() => {
        console.log('createPlanPageState', createPlanPageState)
        // Initialize state from createPlanPageState if URL param exists
        if (plansUpdate && createPlanPageState?.payPerShipmentGroup) {
            setCurrentGroup({
                groupName: createPlanPageState.payPerShipmentGroup.groupName,
                sellingPlansToUpdate: createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate,
                descriptionContent: createPlanPageState.payPerShipmentGroup.descriptionContent,
                sellingPlansToCreate: []
            });

            if (createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate) {
                setPlans(createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate);
            }
        }
    }, [plansUpdate, createPlanPageState?.payPerShipmentGroup]);

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
                (plan) =>
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
        if (!plansUpdate) {
            setCreatePlanPageState((prevState: any) => ({
                ...prevState,
                payPerShipmentGroup: {
                    groupName: currentGroup.groupName,
                    sellingPlansToCreate: plans,
                },
            }));
        }
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
        }
    };

    useEffect(() => {
        if (showForm) {
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
        } else window.scrollTo({ top: 0, behavior: "smooth" });
    }, [showForm])

    return (
        <div className="rounded-[10px] p-3 relative">
            <div className={`flex flex-col gap-4 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                {isLoading &&
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <Loader variant="spinner" />
                    </div>
                }
                <div>
                    {
                        (plans.length || showForm) && (
                            <SellingPlanGroupBasicInfo
                                currentGroup={currentGroup}
                                onChange={(field, value) => setCurrentGroup(prev => ({ ...prev, [field]: value }))}
                            />
                        )
                    }
                </div>
                <div className='flex flex-col gap-4'>
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={index}
                            plan={plan}
                            index={index}
                            actions={planActions}
                        />
                    ))}
                </div>
                <div className='flex'>
                    <Button variant={"text" as any}
                        onClick={() => debouncedSetShowForm(true)}
                        className='text-blue-600 cursor-pointer hover:underline text-sm'
                    >
                        Add another plan
                    </Button>
                </div>
                {
                    showForm && (
                        <>
                            <div
                                ref={formRef}
                                className='border border-muted rounded-[10px] p-3'
                            >
                                <PlanForm
                                    plan={currentPlan}
                                    onChange={setCurrentPlan}
                                />
                            </div>

                            <div className="flex gap-4 mt-5">
                                <Button onClick={handleAddOrUpdate}>
                                    {editingIndex !== null ? "Done" : "Done"}
                                    {isLoading &&
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-white/80"
                                        >
                                            <Loader variant="spinner" />
                                        </div>
                                    }
                                </Button>
                                {isDirty && (
                                    <Button
                                        variant={"outline" as any}
                                        onClick={() => setShowCancelModal(true)}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </>
                    )
                }
            </div>

            <ConfirmationModal
                isOpen={deletingIndex !== null}
                title="Delete Plan"
                message={`Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ''}"?`}
                onConfirm={() => {
                    debouncedSetPlans(plans.filter((_, i) => i !== deletingIndex));
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

export default PayPerShipment;
