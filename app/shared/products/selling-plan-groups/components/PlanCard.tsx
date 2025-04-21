// components/PlanCard.tsx
import { FC, useMemo } from 'react';
import { Button } from 'rizzui/button';
import { PiCheckCircleBold, PiPlusCircleBold, PiTrashBold } from 'react-icons/pi';
import { FaClock, FaGift, FaShip } from 'react-icons/fa6';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdSync } from 'react-icons/md';
import { PayPerShipmentSellingPlan, Plan, PlanActions } from 'app/types/product/sellingPlans';
import { Text } from 'rizzui/typography';
import { formatPrice } from 'app/packages/utils/shopifyIdUtils';
import { useAtom } from 'jotai';
import { shopObject } from 'app/states/shopAtom';

export const PlanCard: FC<{
    plan: PayPerShipmentSellingPlan;
    index: number;
    actions: PlanActions,
    prePaidFrom?: boolean
}> = ({
    plan,
    index,
    actions,
    prePaidFrom
}) => {
        const {
            billingRecurringPolicyInterval,
            billingRecurringPolicyIntervalCount,
            pricingPolicyEnable,
            pricingPolicyAdjustmentValue,
            pricingPolicyAfterCycleAdjustmentType,
            planName,
            deliveryRecurringPolicyIntervalCount,
            deliveryRecurringPolicyInterval,
            pricingPolicyAdjustmentType
        } = plan

        const [shop] = useAtom(shopObject);
        const { currencyFormats: { moneyWithCurrencyFormat } } = shop;

        const formattedPrice = useMemo(() => {
            if (pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PRICE") {
                return formatPrice(pricingPolicyAdjustmentValue, moneyWithCurrencyFormat);
            }
            return null;
        }, [pricingPolicyAdjustmentValue, pricingPolicyAdjustmentType, moneyWithCurrencyFormat]);

        return (
            <div className="p-5 border rounded-lg shadow-md bg-white flex flex-col gap-3 transition-all hover:shadow-lg w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <GiTakeMyMoney className="text-green-600 text-xl" />
                        <h4 className="text-base font-semibold text-gray-900">
                            {planName || "Unnamed Plan"}
                        </h4>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-700">
                    <div className="flex flex-col gap-1">
                        <div className='capitalize flex items-center'>
                            <FaClock className="inline-block text-blue-500 mr-2" />
                            <strong>Frequency:</strong>
                            <Text className='capitalize ms-2'>
                                {billingRecurringPolicyIntervalCount} {billingRecurringPolicyInterval}
                            </Text>
                        </div>
                        {
                            prePaidFrom &&
                            <div className='capitalize flex items-center'>
                                <FaShip className="inline-block text-blue-500 mr-2" />
                                <strong>Delivery Every:</strong>
                                <Text className='capitalize ms-2'>
                                    {deliveryRecurringPolicyIntervalCount} {deliveryRecurringPolicyInterval}
                                </Text>
                            </div>
                        }
                        {pricingPolicyEnable && (
                            <>
                                {pricingPolicyAdjustmentType === "PERCENTAGE" && (
                                    <p className="text-green-600 font-medium flex items-center">
                                        <FaGift className="inline-block text-yellow-500 mr-2" />
                                        <strong>Discount:</strong> {pricingPolicyAdjustmentValue}%
                                    </p>
                                )}

                                {formattedPrice && (
                                    <div className="text-green-600 font-medium flex items-center">
                                        <FaGift className="inline-block text-yellow-500 mr-2" />
                                        <strong>
                                            {pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PERCENTAGE"
                                                ? "Discount:"
                                                : "Price:"}
                                        </strong>
                                        <Text className='capitaliz'>
                                            {formattedPrice}
                                        </Text>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <Button variant={"outline" as any} size="sm" onClick={() => actions.onEdit(index)}>
                        <PiCheckCircleBold className="mr-1 text-blue-500" /> Edit
                    </Button>
                    <Button variant={"outline" as any} size="sm" onClick={() => actions.onDuplicate(index)}>
                        <PiPlusCircleBold className="mr-1 text-green-500" /> Duplicate
                    </Button>
                    <Button variant={"outline" as any} size="sm" color="danger" onClick={() => actions.onDelete(index)}>
                        <PiTrashBold className="mr-1 text-red-500" /> Delete
                    </Button>
                </div>
            </div>
        )
    }