
export const CURRENT_SHOP = `#graphql
   query CurrentShop {
    shop{
        currencyCode
        currencyFormats{
            moneyFormat
            moneyWithCurrencyFormat
        }
    }
}
`;