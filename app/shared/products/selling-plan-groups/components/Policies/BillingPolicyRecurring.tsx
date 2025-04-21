import { PayPerShipmentSellingPlan } from 'app/types/product/sellingPlans'
import { DeliveryRecurringPolicySection } from './DeliveryPolicyRecurringSection'
import { Accordion } from 'rizzui/accordion';
import { FaChevronDown } from 'react-icons/fa6';
import { BillingPolicySection } from './BillingPolicySection';
import { BillingRecurringPolicySection } from './BillingRecurringPolicySection';

const accordionData = [
    {
        title: "First Order Delivery Policy",
        component: BillingPolicySection,
    },
    {
        title: "Recurring Order Delivery Policy",
        component: BillingRecurringPolicySection,
    }
];

const BillingPolicyRecurring = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void,
    plan: PayPerShipmentSellingPlan
}) => {

    return (
        <div>
             <BillingRecurringPolicySection currentPlan={plan} onChange={handleChange} />
        </div>
    )
}

export default BillingPolicyRecurring