import { PAGE_INFO_FRAGMENT } from "app/graphql/fragments/pageInfo";

export const SUBSCRIPTION_CONTRACTS_QUERY = `#graphql
 ${PAGE_INFO_FRAGMENT}
query SubscriptionContracts(
    $first: Int
    $after: String
    $before: String
    $last: Int
    $query: String
    $reverse: Boolean
) {
   subscriptionContracts(
      first: $first
      after: $after
      before: $before
      last: $last
      query: $query
      reverse: $reverse
   ){
        edges{
            cursor
            node{
                id
                lines(first: 10){
                    edges{
                        cursor
                        node{
                            variantTitle
                            quantity
                            lineDiscountedPrice{
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                deliveryPolicy{
                    interval
                    intervalCount
                }
                billingPolicy{
                    intervalCount
                    interval
                }
                customer{
                    firstName
                    lastName
                    email
                    displayName
                }
                status
                nextBillingDate
                createdAt
                updatedAt
            }
        }
        pageInfo{
            ...PageInfo
        }
    }
}`;
