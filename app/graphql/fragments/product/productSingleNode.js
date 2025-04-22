import { FEATURED_MEDIA_FRAGMENT } from "../featuredMedia";
import { PRODUCT_VARIANTNODE_FRAGMENT } from "./variantNode";
import { SELLING_PLAN_GROUP_FRAGMENT } from "./sellingPlanGroup";
import { SEELING_PLAN_GROUPS_COUNT } from "./sellingPlanGroupsCount";

export const PRODUCT_SINGLE_NODE_FRAGMENT = `#graphql
  ${SEELING_PLAN_GROUPS_COUNT}
  ${FEATURED_MEDIA_FRAGMENT}
  ${SELLING_PLAN_GROUP_FRAGMENT}
  ${PRODUCT_VARIANTNODE_FRAGMENT}
  fragment ProductNode on Product {
    id
    title
    descriptionHtml
    createdAt
    updatedAt
    handle
    requiresSellingPlan
    status
    sellingPlanGroupsCount {
        ...sellingPlanGroupsCount
    }
    sellingPlanGroups(first: 20) {
      edges {
            cursor
            node {
              ...sellingPlanGroup
            }
      }
    }
    featuredMedia{
      ...featuredMedia
    }
    variantsCount{
      count
      precision
    }
    onlineStorePreviewUrl
    variants(first: 100){
      nodes{
        ...ProductVariantNode
      }
    }
  }
`;
