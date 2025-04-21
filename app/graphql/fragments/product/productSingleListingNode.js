import { FEATURED_MEDIA_FRAGMENT } from "../featuredmedia";
import { SELLING_PLAN_GROUP_FRAGMENT } from "./sellingPlanGroup";
import { SEELING_PLAN_GROUPS_COUNT } from "./sellingPlanGroupsCount";

export const PRODUCT_LISTING_SINGLE_NODE_FRAGMENT = `#graphql
  ${SEELING_PLAN_GROUPS_COUNT}
  ${FEATURED_MEDIA_FRAGMENT}
  ${SELLING_PLAN_GROUP_FRAGMENT}
  fragment ProductNode on Product {
    id
    title
    descriptionHtml
    createdAt
    handle
    requiresSellingPlan
    status
    priceRangeV2{
      maxVariantPrice{
        amount
        currencyCode
      }
      minVariantPrice{
        amount
        currencyCode
      }
    }
    sellingPlanGroupsCount {
        ...sellingPlanGroupsCount
    }
    sellingPlanGroups(first: 3) {
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
    variants(first: 10){
      nodes{
       id
       sku
       title
       price
      }
    }
  }
`;
