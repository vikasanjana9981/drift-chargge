export const SUBSCRIPTION_BILLING_CYCLE_SCHEDULE_EDIT = `#graphql 
mutation subscriptionBillingCycleScheduleEdit(
    $billingCycleInput: SubscriptionBillingCycleInput!, 
    $input: SubscriptionBillingCycleScheduleEditInput!, 
) {
  subscriptionBillingCycleScheduleEdit(
    billingCycleInput: $billingCycleInput, 
    input: $input
) {
    billingCycle {
      cycleIndex
      billingAttemptExpectedDate
    }
    userErrors {
      field
      message
    }
  }
}

`