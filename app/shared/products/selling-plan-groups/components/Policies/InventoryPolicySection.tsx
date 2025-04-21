import { Select } from "rizzui/select";
import { Switch } from "rizzui/switch";
import { inventoryReserveOptions } from "../SellingPlanFormUtils";

/** Renders the inventory policy section. */
export const InventoryPolicySection = ({
    inventoryPolicyEnable,
    inventoryPolicyReserve,
    onToggleInventory,
    onChangeInventoryReserve
}: {
    inventoryPolicyEnable: boolean,
    inventoryPolicyReserve: string,
    onToggleInventory: () => void,
    onChangeInventoryReserve: (value: string) => void,
}) => (
    <div>
        <Switch
            checked={inventoryPolicyEnable}
            onChange={onToggleInventory}
            label="Set Inventory Policy"
        />
        {inventoryPolicyEnable && (
            <div className="flex gap-4 mt-3">
                <div className="flex-1">
                    <Select
                        value={inventoryReserveOptions.find(opt => opt.value === inventoryPolicyReserve)}
                        options={inventoryReserveOptions}
                        onChange={(option: any) => option && onChangeInventoryReserve(option.value)}
                        label="When to reserve inventory for the order."
                    />
                </div>
            </div>
        )}
    </div>
);