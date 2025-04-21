export const SUBSCRIPTION_DRAFT_LINE_UPDATE = `#graphql 
mutation subscriptionDraftLineUpdate($draftId: ID!, $input: SubscriptionLineUpdateInput!, $lineId: ID!) {
  subscriptionDraftLineUpdate(draftId: $draftId, input: $input, lineId: $lineId) {
    draft {
      id
    }
    lineUpdated {
        id
    }
    userErrors {
      field
      message
    }
  }
}
`