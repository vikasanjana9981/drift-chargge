
export const UPDATE_SELLING_PLAN_GROUP = `#graphql
mutation sellingPlanGroupUpdate($id: ID!, $input: SellingPlanGroupInput!) {
  sellingPlanGroupUpdate(id: $id, input: $input) {
    sellingPlanGroup {
      id
      sellingPlans(first: 250) {
        edges {
          node {
            id
            position
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`;