
export const DELETE_SELLING_PLAN_GROUP = `#graphql
mutation sellingPlanGroupDelete($id: ID!) {
  sellingPlanGroupDelete(id: $id) {
    deletedSellingPlanGroupId
    userErrors {
      field
      message
    }
  }
}`;