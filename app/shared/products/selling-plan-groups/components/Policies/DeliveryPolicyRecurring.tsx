import { PayPerShipmentSellingPlan } from 'app/types/product/sellingPlans'
import { DeliveryPolicySection } from './DeliveryPolicySection'
import { Title } from 'rizzui/typography'
import { DeliveryRecurringPolicySection } from './DeliveryPolicyRecurringSection'
import { Accordion } from 'rizzui/accordion';
import { FaChevronDown } from 'react-icons/fa6';

const accordionData = [
    {
        title: "First Order Delivery Policy",
        component: DeliveryPolicySection,
    },
    {
        title: "Recurring Delivery Policy",
        component: DeliveryRecurringPolicySection,
    },
];

const DeliveryPolicyRecurring = ({
    handleChange,
    plan,
    prePaidFrom = false
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void,
    plan: PayPerShipmentSellingPlan,
    prePaidFrom?: boolean
}) => {

    return (
        <div className=''>
            <DeliveryRecurringPolicySection currentPlan={plan} onChange={handleChange} prePaidFrom={prePaidFrom} />
            {/* {accordionData.map(({ title, component: Component }) => (
                <Accordion key={title} className="mx-8 border-b last-of-type:border-b-0">
                    <Accordion.Header>
                        {({ open }) => (
                            <div className="flex w-full cursor-pointer items-center justify-between py-5 text-md ">
                                {title}
                                <FaChevronDown
                                    className={`h-3 w-3 -rotate-90 transform transition-transform duration-300 ${open ? "rotate-0" : ""}`}
                                />
                            </div>
                        )}
                    </Accordion.Header>
                    <Accordion.Body className="mb-7">
                        <Component currentPlan={plan} onChange={handleChange} />
                    </Accordion.Body>
                </Accordion>
            ))} */}
        </div>
    )
}

export default DeliveryPolicyRecurring