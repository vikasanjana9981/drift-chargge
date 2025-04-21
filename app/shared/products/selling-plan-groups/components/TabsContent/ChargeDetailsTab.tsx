import { Plan } from 'app/types/product/sellingPlans';
import { Select } from 'rizzui/select';
import {
    subscriptionRenewalDateTypeOptions,
    subscriptionRenewalCuttOffDateOptions,
    weeklyRenewalOptions,
    yearlyRenewalMonthOptions,
    yearlyRenewalDayOptions,
} from '../SellingPlanFormUtils';

const ChargeDetailsTab = ({
    handleChange,
    plan
}: {
    handleChange: <T extends keyof Plan>(field: T, value: Plan[T]) => void,
    plan: Plan
}) => {
    // Determine options based on frequencyUnit
    const renewalOptions = plan.frequencyUnit === 'week'
        ? weeklyRenewalOptions
        : plan.frequencyUnit === 'year'
            ? yearlyRenewalMonthOptions
            : subscriptionRenewalDateTypeOptions;

    const cutoffOptions = plan.frequencyUnit === 'week'
        ? subscriptionRenewalCuttOffDateOptions.slice(0, 7) // Only 1-7 for weekly plans
        : subscriptionRenewalCuttOffDateOptions;

    return (
        <div className="space-y-4">
            {/* Subscription Renewal Field */}
            <Select
                value={renewalOptions.find(opt => opt.value === plan.subscriptionRenewalDayType)}
                options={renewalOptions}
                onChange={(option: any) => option && handleChange('subscriptionRenewalDayType', option.value)}
                label={
                    plan.frequencyUnit === 'year'
                        ? 'Subscription Renewal Month'
                        : 'Subscription Renewal Day Type'
                }
            />

            {/* Additional Day Selector for Yearly Plans */}
            {plan.frequencyUnit === 'year' && (
                <Select
                    value={yearlyRenewalDayOptions.find((opt: { value: string }) => opt.value === plan.subscriptionCuttOffDate)}
                    options={yearlyRenewalDayOptions}
                    onChange={(option: any) => option && handleChange('yearlyRenewalDay', option.value)}
                    label="Subscription Renewal Day"
                />
            )}

            {/* Cut-off Date Field (for non-yearly plans) */}
            {plan.subscriptionRenewalDayType !== "SAME_DAY" && (
                <Select
                    value={cutoffOptions.find(opt => opt.value === plan.subscriptionCuttOffDate)}
                    options={cutoffOptions}
                    onChange={(option: any) => option && handleChange('subscriptionCuttOffDate', option.value)}
                    label="Cut-off Date"
                />
            )}
        </div>
    );
};

export default ChargeDetailsTab;