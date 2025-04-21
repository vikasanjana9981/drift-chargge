import { PRODUCT_LISTING_SINGLE_NODE_FRAGMENT } from "app/graphql/fragments/product/productSingleListingNode";
import { PAGE_INFO_FRAGMENT } from "../../fragments/pageInfo";

export const PRODUCTS_QUERY = `#graphql
 ${PAGE_INFO_FRAGMENT}
 ${PRODUCT_LISTING_SINGLE_NODE_FRAGMENT}
query products(
    $first: Int
    $after: String
    $before: String
    $last: Int
    $query: String
    $reverse: Boolean
    $savedSearchId: ID
    $sortKey: ProductSortKeys
) {
    products(
        first: $first
        after: $after
        before: $before
        last: $last
        query: $query
        reverse: $reverse
        savedSearchId: $savedSearchId
        sortKey: $sortKey
    ) {
        edges {
            cursor
            node {
               ...ProductNode
            }
        }
        pageInfo {
          ...PageInfo
        }
    }
}`;
