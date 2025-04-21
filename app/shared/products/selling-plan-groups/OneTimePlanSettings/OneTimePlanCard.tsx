import { FC } from 'react';
import { Button } from 'rizzui/button';
import { PiCheckCircleBold, PiTrashBold } from 'react-icons/pi';
import { FaClock, FaGift } from 'react-icons/fa6';
import { GiTakeMyMoney } from 'react-icons/gi';
import { OneTimePlan, PlanActions } from 'app/types/product/sellingPlans';

export const OneTimePlanCard: FC<{ plan: OneTimePlan; index: number; actions: PlanActions }> = ({
    plan,
    index,
    actions
}) => (
    <div className="p-5 border rounded-lg shadow-md bg-white flex flex-col gap-3 transition-all hover:shadow-lg w-full">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <GiTakeMyMoney className="text-green-600 text-xl" />
                <h4 className="text-base font-semibold text-gray-900">
                    {plan.planName || "Unnamed Plan"}
                </h4>
            </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex flex-col gap-1">
                <p>
                    <FaClock className="inline-block text-blue-500 mr-1" />
                    <strong>Plan Type:</strong> One-time Purchase
                </p>
                {plan.pricingPolicyAdjustmentValue && (
                    <p className="text-green-600 font-medium">
                        <FaGift className="inline-block text-yellow-500 mr-1" />
                        <strong>Discount:</strong> {plan.pricingPolicyAdjustmentValue}% 
                    </p>
                )}
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
            <Button variant={"outline" as any} size="sm" onClick={() => actions.onEdit(index)}>
                <PiCheckCircleBold className="mr-1 text-blue-500" /> Edit
            </Button>
            <Button variant={"outline" as any} size="sm" color="danger" onClick={() => actions.onDelete(index)}>
                <PiTrashBold className="mr-1 text-red-500" /> Delete
            </Button>
        </div>
    </div>
);