export const SUBSCRIPTION_DRAFT_DISCOUNT_CODE_APPLY = `#graphql 
mutation subscriptionDraftDiscountCodeApply($draftId: ID!, $discountCode: String!) {
  subscriptionDraftDiscountCodeApply(draftId: $draftId, redeemCode: $discountCode) {
    appliedDiscount {
        id
        rejectionReason
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