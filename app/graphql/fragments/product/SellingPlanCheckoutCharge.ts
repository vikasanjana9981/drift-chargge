export const SELLING_PLANS_CHECKOUT_CHARGE_FRAGMENT = `#graphql
 fragment SellingPlanCheckoutCharge on SellingPlanCheckoutCharge {
    type
    value{
        ... on MoneyV2 {
            __typename
            amount
            currencyCode
        }

        ... on SellingPlanCheckoutChargePercentageValue{
            percentage
            __typename
        }
        
    }
 }
`