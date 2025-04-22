import { SELLING_PLANS_FRAGMENT } from "./sellingPlans";

export const SELLING_PLAN_GROUP_FRAGMENT = `#graphql
  ${SELLING_PLANS_FRAGMENT}
  fragment sellingPlanGroup on SellingPlanGroup {
    appId
    createdAt
    id
    merchantCode
    name
    options
    position
    sellingPlans(first: 10) {
      edges{
          cursor
          node{
              ...SellingPlans
          }
      }
    }
  }
`;
