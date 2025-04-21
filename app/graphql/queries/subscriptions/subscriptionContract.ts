export const SUBSCRIPTION_CONTRACT_QUERY = `#graphql
query SubscriptionContract(
    $subscriptionContractId: ID!
) {
   subscriptionContract(
    id: $subscriptionContractId
   ){
        id
        createdAt
        customAttributes{
            key
            value
        }
        note
        deliveryMethod{
            ... on SubscriptionDeliveryMethodShipping {
                address{
                    address1
                    address2
                    city
                    company
                    country
                    countryCode
                    firstName
                    lastName
                    name
                    phone
                    province
                    provinceCode
                    zip
                }
            }
        }
        lines(first: 10){
            edges{
                cursor
                node{
                    id
                    title
                    variantTitle
                    quantity
                    variantId
                    productId
                    lineDiscountedPrice{
                        amount
                        currencyCode
                    }
                    variantImage{
                        url(transform:  {
                           maxHeight: 48,
                           maxWidth: 48
                        })
                    }
                    customAttributes {
                        key
                        value
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
            id
            firstName
            lastName
            email
            displayName
            addressesV2(first: 10) {
                edges{
                    cursor
                    node{
                        address1
                        address2
                        city
                        country
                        province
                        zip
                        id
                        firstName
                        lastName
                        provinceCode
                        phone
                        company
                        countryCodeV2
                    }
                }
            }
            paymentMethods(first: 10) {
                edges{
                    cursor
                    node{
                        instrument{
                            ... on CustomerCreditCard {
                                firstDigits
                                source
                                brand
                                expiresSoon
                                expiryMonth
                                expiryYear
                                isRevocable
                                lastDigits
                                maskedNumber
                                name
                                virtualLastDigits
                            }
                            ... on CustomerPaypalBillingAgreement {
                                paypalAccountEmail
                                inactive
                                isRevocable
                            }
                            ... on CustomerShopPayAgreement {
                                __typename
                                expiresSoon
                                expiryMonth
                                expiryYear
                                inactive
                                isRevocable
                                lastDigits
                                maskedNumber
                                name
                            }

                        }
                        id
                        revokedAt
                        revokedReason
                    }
                }
            }
        }
        customerPaymentMethod{
            instrument{
                ... on CustomerCreditCard {
                    firstDigits
                    source
                    brand
                    expiresSoon
                    expiryMonth
                    expiryYear
                    isRevocable
                    lastDigits
                    maskedNumber
                    name
                    virtualLastDigits
                }
                ... on CustomerPaypalBillingAgreement {
                    paypalAccountEmail
                    inactive
                    isRevocable
                }
                ... on CustomerShopPayAgreement {
                    __typename
                    expiresSoon
                    expiryMonth
                    expiryYear
                    inactive
                    isRevocable
                    lastDigits
                    maskedNumber
                    name
                }

            }
        }
        discounts(first: 10) {
            edges{
                cursor
                node{
                    id
                    title
                    type
                    value{
                        ... on SubscriptionDiscountFixedAmountValue{
                            amount{
                                amount
                                currencyCode
                            }
                        }
                        ... on SubscriptionDiscountPercentageValue{
                            percentage
                        }
                    }   
                }

            }
        }
        billingAttempts(first: 10) {
            edges{
                node{
                    id
                    createdAt
                    completedAt
                    nextActionUrl
                    idempotencyKey
                    ready
                    paymentGroupId
                    paymentSessionId
                    originTime
                    errorCode
                    errorMessage
                    order{
                        id
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
                        lineItems(first: 10) {
                            edges {
                                cursor
                                node {
                                    variantTitle
                                    title
                                    variant {
                                        image {
                                            url(transform: {maxHeight: 48, maxWidth: 48})
                                        }
                                    }
                                    product{
                                        featuredMedia{
                                            preview{
                                                image{
                                                    url(transform: {maxHeight: 48, maxWidth: 48})
                                                }
                                            }
                                        }
                                    }
                                    sku
                                    quantity
                                    originalTotalSet{
                                        presentmentMoney{
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                        capturable
                        currentTaxLines{
                            title
                            ratePercentage
                            priceSet {
                                presentmentMoney {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                        currentTotalPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        currentTotalTaxSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        currentSubtotalPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        shippingLine{
                            id
                            title
                        }
                        currentShippingPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        createdAt
                        name
                    }
                }
            }
        }
        orders(first: 10) {
            edges{
                cursor
                node{
                    id
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
                    lineItems(first: 10) {
                        edges {
                            cursor
                            node {
                                variantTitle
                                title
                                variant {
                                    image {
                                        url(transform: {maxHeight: 48, maxWidth: 48})
                                    }
                                }
                                product{
                                    featuredMedia{
                                        preview{
                                            image{
                                                url(transform: {maxHeight: 48, maxWidth: 48})
                                            }
                                        }
                                    }
                                }
                                sku
                                quantity
                                originalTotalSet{
                                    presentmentMoney{
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                    capturable
                    currentTaxLines{
                        title
                        ratePercentage
                        priceSet {
                            presentmentMoney {
                                amount
                                currencyCode
                            }
                        }
                    }
                    currentTotalPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    currentTotalTaxSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    currentSubtotalPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    shippingLine{
                        id
                        title
                    }
                    currentShippingPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    createdAt
                    name
                }
            }
        }
        status
        nextBillingDate
        createdAt
        updatedAt
    }
}`;

