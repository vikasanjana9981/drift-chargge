export const SUBSCRIPTION_DRAFT_UPDATE = `#graphql 
mutation subscriptionDraftUpdate($draftId: ID!, $input: SubscriptionDraftInput!) {
  subscriptionDraftUpdate(draftId: $draftId, input: $input) {
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