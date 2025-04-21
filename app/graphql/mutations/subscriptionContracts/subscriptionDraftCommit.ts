export const SUBSCRIPTION_DRAFT_COMMIT = `#graphql 
mutation subscriptionDraftCommit($draftId: ID!) {
  subscriptionDraftCommit(draftId: $draftId) {
    contract {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`