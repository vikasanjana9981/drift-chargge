import { FEATURED_MEDIA_FRAGMENT } from "../featuredmedia";
import { SEELING_PLAN_GROUPS_COUNT } from "./sellingPlanGroupsCount";

export const PRODUCT_NODE_FRAGMENT = `#graphql
  ${SEELING_PLAN_GROUPS_COUNT}
  ${FEATURED_MEDIA_FRAGMENT}
  fragment ProductNode on Product {
    id
    title
    createdAt
    handle
    requiresSellingPlan
    status
    sellingPlanGroupsCount {
        ...sellingPlanGroupsCount
    }
    featuredMedia{
      ...featuredMedia
    }
    variantsCount{
      count
      precision
    }
    onlineStorePreviewUrl
  }
`;
