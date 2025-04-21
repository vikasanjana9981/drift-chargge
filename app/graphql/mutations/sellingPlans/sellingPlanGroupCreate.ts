
export const CREATE_SELLING_PLAN_GROUP = `#graphql
 mutation createSellingPlanGroup(
    $input: SellingPlanGroupInput!, 
    $resources: SellingPlanGroupResourceInput
) {
  sellingPlanGroupCreate(
  input: $input, 
  resources: $resources
) {
    sellingPlanGroup {
      id
      sellingPlans(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`;