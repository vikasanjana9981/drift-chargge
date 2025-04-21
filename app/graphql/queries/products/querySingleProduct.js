import { PRODUCT_SINGLE_NODE_FRAGMENT } from "../../fragments/product/productSingleNode";

export const PRODUCT_SINGLE_QUERY = `#graphql
 ${PRODUCT_SINGLE_NODE_FRAGMENT}
query product(
    $id: ID!
) {
    product(
        id: $id
    ) {
        ...ProductNode
    }
}`;
