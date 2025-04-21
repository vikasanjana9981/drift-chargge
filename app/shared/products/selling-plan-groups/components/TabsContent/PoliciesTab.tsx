import { Plan } from 'app/types/product/sellingPlans'
import { Select } from 'rizzui/select'
import { inventoryPolicyOptions } from '../SellingPlanFormUtils'
import { NumberInput } from '../NumberInput'
import { Switch } from 'rizzui/switch'

const PoliciesTab = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof Plan>(field: T, value: Plan[T]) => void,
    plan: Plan
}) => {
    return (
        <div className="space-y-4">
            <Select
                value={inventoryPolicyOptions.find(opt => opt.value === plan.inventoryPolicy)}
                options={inventoryPolicyOptions}
                onChange={(option: any) => option && handleChange('inventoryPolicy', option.value)}
                label="Inventory Policy"
            />
            <NumberInput
                label="Cancellation Policy Days"
                value={plan.cancelationPolicy}
                onChange={(v) => handleChange('cancelationPolicy', v)}
            />
            <Switch
                checked={plan.enableAutomaticExpiration}
                onChange={() => handleChange('enableAutomaticExpiration', !plan.enableAutomaticExpiration)}
                label="Enable Automatic Expiration"
            />
            {plan.enableAutomaticExpiration && (
                <NumberInput
                    label="Expire After Charges"
                    value={plan.automaticExpiration}
                    onChange={(v) => handleChange('automaticExpiration', v)}
                />
            )}
        </div>
    )
}

export default PoliciesTab