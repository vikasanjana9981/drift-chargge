import { formatPrice } from "app/packages/utils/shopifyIdUtils";
import { shopObject } from "app/states/shopAtom";
import { PriceRangeV2 } from "app/types/product/ProductNode";
import { useAtom } from "jotai";
import React from "react";

interface PriceRangeProps extends React.HTMLAttributes<HTMLSpanElement> {
    priceRangeV2: PriceRangeV2;
}

const PriceRange: React.FC<PriceRangeProps> = ({ priceRangeV2, ...props }) => {
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;

    const { minVariantPrice, maxVariantPrice } = priceRangeV2;

    const isSamePrice = maxVariantPrice.amount === minVariantPrice.amount;
    const minPrice = formatPrice(minVariantPrice.amount, moneyWithCurrencyFormat);
    const maxPrice = formatPrice(maxVariantPrice.amount, moneyWithCurrencyFormat);

    return (
        <span  {...props}>
            Price: {isSamePrice ? minPrice : `${minPrice} - ${maxPrice}`}
        </span>
    );
};

export default PriceRange;
