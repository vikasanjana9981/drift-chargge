import { PayPerShipmentSellingPlan } from 'app/types/product/sellingPlans'
import { Select } from 'rizzui/select'
import { inventoryPolicyOptions, inventoryReserveOptions } from '../SellingPlanFormUtils'
import { Switch } from 'rizzui/switch'

const InventoryPolicyRecurring = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof PayPerShipmentSellingPlan>(field: T, value: PayPerShipmentSellingPlan[T]) => void,
    plan: PayPerShipmentSellingPlan
}) => {

    const {
        inventoryPolicyEnable,
        inventoryPolicyReserve
    } = plan

    return (
        <div className="space-y-4">
            <Switch
                checked={inventoryPolicyEnable}
                onChange={() => handleChange('inventoryPolicyEnable', !inventoryPolicyEnable)}
                label="Set Inventory Policy"
            />
            {
                inventoryPolicyEnable && (
                    <Select
                        value={inventoryReserveOptions.find(opt => opt.value === inventoryPolicyReserve)}
                        options={inventoryReserveOptions}
                        onChange={(option: any) => option && handleChange('inventoryPolicyReserve', option.value)}
                        label="When to reserve inventory for the order."
                    />
                )
            }

        </div>
    )
}

export default InventoryPolicyRecurring