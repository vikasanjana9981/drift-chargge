export const UPDATE_SUBSCRIPTION_CONTRACT = `#graphql 
mutation subscriptionContractUpdate($contractId: ID!) {
  subscriptionContractUpdate(contractId: $contractId) {
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