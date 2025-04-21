import { OneTimePlan } from "app/types/product/sellingPlans";
import { PricingPolicy } from "../components/Policies/PricingPolicy";
import { PlanNameInput } from "../components/PlanNameInput";
import { BillingPolicySection } from "../components/Policies/BillingPolicySection";
import { DeliveryPolicySection } from "../components/Policies/DeliveryPolicySection";
import { InventoryPolicySection } from "../components/Policies/InventoryPolicySection";
import { Button, ButtonProps } from "rizzui/button";
import { Tab } from "rizzui/tabs";

/** 
 * The overall form for creating/editing the one-time plan. 
 * It composes all the smaller sections.
 */
export const OneTimePlanForm = ({
    currentPlan,
    onChange,
    onSave,
    productTitle,
    tabListClassName = "w-[21%]",
    tabPanelClassName = "w-[79%]",
    saveButtonProps = {}
}: {
    currentPlan: OneTimePlan,
    onChange: <T extends keyof OneTimePlan>(field: T, value: OneTimePlan[T]) => void,
    onSave: () => void,
    productTitle: string,
    tabListClassName?: string,
    tabPanelClassName?: string,
    saveButtonProps?: ButtonProps
}) => (
    <div className="mt-4 space-y-4">
        <Tab
            vertical
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <Tab.List className={tabListClassName}>
                <Tab.ListItem>Basic</Tab.ListItem>
                <Tab.ListItem>Pricing Policy</Tab.ListItem>
                <Tab.ListItem>Inventory Policy</Tab.ListItem>
                <Tab.ListItem>Delivery Policy</Tab.ListItem>
                <Tab.ListItem>Billing Policy</Tab.ListItem>
            </Tab.List>
            <Tab.Panels className={tabPanelClassName}>
                <Tab.Panel>
                    <PlanNameInput
                        value={currentPlan.planName || ""}
                        onChange={(e) => onChange('planName', e.target.value)}
                        productTitle={productTitle}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <PricingPolicy
                        pricingPolicyEnable={currentPlan.pricingPolicyEnable}
                        pricingPolicyAdjustmentType={currentPlan.pricingPolicyAdjustmentType}
                        pricingPolicyAdjustmentValue={currentPlan.pricingPolicyAdjustmentValue}
                        onToggleDiscount={() => onChange('pricingPolicyEnable', !currentPlan.pricingPolicyEnable)}
                        onChangePricingPolicyAdjustmentType={(value: any) => onChange('pricingPolicyAdjustmentType', value)}
                        onChangePricingPolicyAdjustmentValue={(value: number) => onChange('pricingPolicyAdjustmentValue', value)}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <InventoryPolicySection
                        inventoryPolicyEnable={currentPlan.inventoryPolicyEnable}
                        inventoryPolicyReserve={currentPlan.inventoryPolicyReserve}
                        onToggleInventory={() => onChange('inventoryPolicyEnable', !currentPlan.inventoryPolicyEnable)}
                        onChangeInventoryReserve={(value: any) => onChange('inventoryPolicyReserve', value)}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <DeliveryPolicySection currentPlan={currentPlan} onChange={onChange} />
                </Tab.Panel>

                <Tab.Panel>
                    <BillingPolicySection currentPlan={currentPlan} onChange={onChange} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab>
        <Button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
                e.stopPropagation()
                onSave()
            }}
            {...saveButtonProps}
        >Save Plan</Button>
    </div>
);