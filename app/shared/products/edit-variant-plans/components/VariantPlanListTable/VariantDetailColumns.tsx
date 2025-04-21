import { extractNumericId, formatPrice } from "app/packages/utils/shopifyIdUtils";
import { shopObject } from "app/states/shopAtom";
import { useAtom } from "jotai";
import { Box, Flex, Text } from "rizzui";
import { VariantDetailColumnsProps } from "../../types";

const VariantDetailColumns: React.FC<VariantDetailColumnsProps> = ({ variant }) => {
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
    const { price, sku, id } = variant;
    const formattedPrice = formatPrice(price, moneyWithCurrencyFormat);
    const ID = extractNumericId(id);

    return (
        <Flex className="flex gap-4">
            <Box>
                <img
                    src={variant?.image?.url || '/no-image.png'}
                    alt={variant?.title || ''}
                    height={56}
                    width={56}
                />
            </Box>
            <Box>
                <Text as='p' className='text-sm'>{variant?.title}</Text>
                <Text as='p' className="text-xs text-gray-400 font-normal">{formattedPrice} | SKU: {sku} </Text>
                <Text as='p' className="text-xs text-gray-400">
                    Variant Id {ID}
                </Text>
            </Box>
        </Flex>
    );
};

export default VariantDetailColumns