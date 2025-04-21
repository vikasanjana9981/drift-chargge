// components/PlanForm.tsx
import { FC } from 'react';
import { Tab } from 'rizzui/tabs';
import { PayPerShipmentSellingPlan, Plan } from 'app/types/product/sellingPlans';
import PricingPolicyRecurring from './Policies/PricingPolicyRecurring';
import InventoryPolicyRecurring from './Policies/InventoryPolicyRecurring';
import DeliveryPolicyRecurring from './Policies/DeliveryPolicyRecurring';
import BillingPolicyRecurring from './Policies/BillingPolicyRecurring';
import DisplayContentsTab from './TabsContent/DisplayContentsTab';


export interface FormTab {
  label: string;
  value: string;
  content: (plan: PayPerShipmentSellingPlan, handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void, prePaidFrom: boolean | undefined) => JSX.Element;
}

const tabs: FormTab[] = [
  {
    label: 'Pricing Policy',
    value: 'pricing-policy',
    content: (
      plan,
      handleChange,
      prePaidFrom = false
    ) => <PricingPolicyRecurring
        plan={plan}
        handleChange={handleChange}
      />
  },
  {
    label: 'Inventory Policy',
    value: 'inventory-policy',
    content: (plan,
      handleChange,
      prePaidFrom = false
    ) => <InventoryPolicyRecurring
        plan={plan}
        handleChange={handleChange}
      />
  },
  {
    label: 'Billing Policy',
    value: 'billing-policy',
    content: (
      plan,
      handleChange,
      prePaidFrom = false
    ) => <BillingPolicyRecurring
        plan={plan}
        handleChange={handleChange}
      />
  },
  {
    label: 'Delivery Policy',
    value: 'delivery-policy',
    content: (
      plan,
      handleChange,
      prePaidFrom = false
    ) => <DeliveryPolicyRecurring
        plan={plan}
        handleChange={handleChange}
        prePaidFrom={prePaidFrom}
      />
  },
  {
    label: 'Display Contents',
    value: 'display',
    content: (plan,
      handleChange,
      prePaidFrom = false
    ) => <DisplayContentsTab
        prePaidFrom={prePaidFrom}
        plan={plan}
        handleChange={handleChange}
      />
  },
];

interface PlanFormProps {
  plan: PayPerShipmentSellingPlan;
  onChange: (updatedPlan: PayPerShipmentSellingPlan) => void;
  prePaidFrom?: boolean;
}

export const PlanForm: FC<PlanFormProps> = ({
  plan,
  onChange, 
  prePaidFrom
}) => {
  const handleChange = <T extends keyof PayPerShipmentSellingPlan>(
    field: T,
    value: PayPerShipmentSellingPlan[T]
  ) => {
    onChange({ ...plan, [field]: value });
  };

  return (
    <Tab vertical className="w-full">
      <Tab.List className="w-[28%]">
        {tabs.map((tab) => (
          <Tab.ListItem key={tab.value}>{tab.label}</Tab.ListItem>
        ))}
      </Tab.List>

      <Tab.Panels className="w-full">
        {tabs.map((tab: any) => (
          <Tab.Panel key={tab.value}>
            {tab.content(plan, handleChange, prePaidFrom)}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab>
  );
};