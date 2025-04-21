export const SUBSCRIPTION_BILLING_CYCLES_QUERY = `#graphql
query subscriptionBillingCycles($subscriptionContractId: ID!,
$billingCyclesIndexRangeSelector:SubscriptionBillingCyclesIndexRangeSelector,
$billingCyclesDateRangeSelector:SubscriptionBillingCyclesDateRangeSelector
) {
  subscriptionBillingCycles(
    first: 50, 
    contractId: $subscriptionContractId,
    billingCyclesIndexRangeSelector:  $billingCyclesIndexRangeSelector
    billingCyclesDateRangeSelector:  $billingCyclesDateRangeSelector
    ) {
    edges {
      node {
        billingAttemptExpectedDate
        edited
        skipped
        status
        cycleIndex
        sourceContract {
            customer{
                firstName
                lastName
                email
                displayName
                addressesV2(first: 10) {
                edges{
                    cursor
                    node{
                        id
                        address1
                        address2
                        city
                        country
                        province
                        zip
                    }
                }
            }
            }
            deliveryPrice {
                amount
                currencyCode
            }
            deliveryMethod {
            ... on SubscriptionDeliveryMethodShipping {
              __typename
              shippingOption {
                code
                description
                presentmentTitle
                title
              }
            }
          }
          lines(first: 10) {
            edges {
              cursor
              node {
                variantTitle
                variantImage {
                  url(transform: {maxHeight: 48, maxWidth: 48})
                }
                title
                sku
                quantity
                lineDiscountedPrice {
                  amount
                  currencyCode
                }
                taxable
                currentPrice {
                  amount
                  currencyCode
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