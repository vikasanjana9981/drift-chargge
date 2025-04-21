export const SUBSCRIPTION_DRAFT_DISCOUNT_CODE_REMOVE = `#graphql 
mutation subscriptionDraftDiscountRemove($discountId: ID!, $draftId: ID!) {
  subscriptionDraftDiscountRemove(discountId: $discountId, draftId: $draftId) {
    discountRemoved {
        ... on SubscriptionManualDiscount {
            id
        }
        ... on SubscriptionAppliedCodeDiscount {
            id
        }
    }
    draft {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`