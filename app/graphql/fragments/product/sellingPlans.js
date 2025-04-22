
export const SELLING_PLANS_FRAGMENT = `#graphql
  fragment SellingPlans on SellingPlan {
    description
    id
    name
    options
    position
    category
    createdAt
    metafields(namespace: "billion-grid-app", first: 10) 
    {
      nodes{
        value
        key
      }
    }                    
    inventoryPolicy {
      reserve
    }
    pricingPolicies {
      ... on SellingPlanFixedPricingPolicy {
        __typename
        adjustmentType
        adjustmentValue {
          ... on MoneyV2 {
            __typename
            amount
            currencyCode
          }
          ... on SellingPlanPricingPolicyPercentageValue {
            __typename
            percentage
          }
        }
      }
    }
    billingPolicy {
      ... on SellingPlanFixedBillingPolicy {
        remainingBalanceChargeExactTime
        remainingBalanceChargeTimeAfterCheckout
        checkoutCharge {
          type
          value {
            ... on MoneyV2 {
              __typename
              amount
              currencyCode
            }
            ... on SellingPlanCheckoutChargePercentageValue {
              __typename
              percentage
            }
          }
        }
        remainingBalanceChargeTrigger
      }
      ... on SellingPlanRecurringBillingPolicy {
        maxCycles
        minCycles
        anchors {
          cutoffDay
          day
          month
          type
        }
        createdAt
        interval
        intervalCount
      }
    }
    deliveryPolicy {
      ... on SellingPlanFixedDeliveryPolicy {
        cutoff
        fulfillmentExactTime
        anchors {
          cutoffDay
          day
          month
          type
        }
        fulfillmentTrigger
        intent
        preAnchorBehavior
      }
      ... on SellingPlanRecurringDeliveryPolicy {
        cutoff
        intent
        createdAt
        anchors {
          cutoffDay
          month
          day
          type
        }
        interval
        intervalCount
        preAnchorBehavior
      }
    }
  }
`;