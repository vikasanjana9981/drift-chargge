export const PRODUCT_VARIANTNODE_FRAGMENT = `#graphql
    fragment ProductVariantNode on ProductVariant {
        id
        title
        createdAt
        availableForSale
        sku
        price
        sellingPlanGroupsCount{
            count
            precision
        }
        image{
            id
            url(transform: {maxHeight: 100, maxWidth: 100})
        }
        sellingPlanGroups(first: 3) {
            edges{
                cursor
                node{
                    appId
                    id
                    name
                    options
                    position
                    sellingPlans(first: 20){
                        edges{
                            cursor
                            node{
                                id
                                name
                                options
                                position
                                metafields(first: 2, namespace: "billion-grid-app"){
                                    nodes{
                                        value
                                        key
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
`;