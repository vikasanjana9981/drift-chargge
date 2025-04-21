export const CUSTOMER_PAYMENT_METHOD_SEND_UPDATE_EMAIL = `#graphql 
mutation sendCustomerPaymentUpdateEmail($customerPaymentMethodId: ID!) {
  customerPaymentMethodSendUpdateEmail(customerPaymentMethodId: $customerPaymentMethodId) {
    customer {
      id
    }
    userErrors {
      field
      message
    }
  }
}

`