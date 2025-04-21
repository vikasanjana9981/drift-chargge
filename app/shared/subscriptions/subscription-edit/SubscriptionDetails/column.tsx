import { createColumnHelper } from "@tanstack/react-table";
import { formatPrice, getTruncatedText } from "app/packages/utils/shopifyIdUtils";
import { SubscripiontLinesTablesData, SubscriptionContractSubscriptionStatus } from "app/types/subscription/subscriptionQueryTypes";
import { Box, Checkbox, Flex, Text, Tooltip } from "rizzui";
import SubscriptionLineItemActions from "./SubscriptionLineItemActions";
import cn from "app/packages/utils/class-names";
import SubscriptionStatusBadge from "../SubscriptionTopBlock/SubscriptionStatusBadge";
import { FaCircleInfo } from "react-icons/fa6";

const columnHelper = createColumnHelper<SubscripiontLinesTablesData>();
export const lineColumns = [
    columnHelper.display({
        id: 'select',
        size: 50,
        header: ({ table }) => (
            <Checkbox
                className="ps-3.5"
                aria-label="Select all rows"
                checked={table.getIsAllPageRowsSelected()}
                onChange={() => table.toggleAllPageRowsSelected()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="ps-3.5"
                aria-label="Select row"
                checked={row.getIsSelected()}
                onChange={() => row.toggleSelected()}
            />
        ),
    }),

    columnHelper.display({
        id: 'Product',
        size: 300,
        header: 'Product',
        cell: ({ row }) => {
            const { id, title, variantTitle, variantImage, status } = row.original
            return (
                <Flex align="center">
                    <Box>
                        <img src={variantImage?.url || ''} alt={title} width={48} height={48} />
                    </Box>
                    <Box>
                        <Text
                            className={cn(
                                status === SubscriptionContractSubscriptionStatus.CANCELLED && 'line-through'
                            )}>{title}</Text>
                        <Text
                            className={cn(
                                status === SubscriptionContractSubscriptionStatus.CANCELLED && 'line-through'
                            )}
                        >{variantTitle}</Text>
                    </Box>
                </Flex>
            )
        },
    }),

    columnHelper.display({
        id: 'nextOrder',
        size: 120,
        header: 'Next Order',
        cell: ({ row }) => {
            const { nextBillingDate, status, note } = row.original
            return (
                <Box>
                    <Text>{nextBillingDate}</Text>
                    {status === SubscriptionContractSubscriptionStatus.CANCELLED && (
                        <Box>
                            <SubscriptionStatusBadge status={status} />
                            <span>
                                {note && (
                                    <>
                                        <Text className="text-xs">{getTruncatedText(note, 4)}</Text>
                                        <Tooltip content={note}>
                                            <FaCircleInfo />
                                        </Tooltip>
                                    </>
                                )}
                            </span>
                        </Box>
                    )}
                </Box>
            )
        },
    }),

    columnHelper.display({
        id: 'frequency',
        size: 180,
        header: 'Frequency',
        cell: ({ row }) => (
            <Box>
                <Text className="text-sm">
                    {`Ships every ${row.original.deliveryPolicyIntervalCount} ${row.original.deliveryPolicyInterval.toLowerCase()}`}
                </Text>
                <Text className="text-sm">
                    {`Charges ${row.original.billingPolicyIntervalCount} ${row.original.billingPolicyInterval.toLowerCase()}`}
                </Text>
            </Box>
        ),
    }),

    columnHelper.display({
        id: 'price',
        size: 120,
        header: 'Price',
        cell: ({ row }) => {
            const { lineDiscountedPrice: { amount, currencyCode }, quantity, shop: { currencyFormats: { moneyFormat } } } = row.original
            const formatedPrice = formatPrice(amount, moneyFormat)
            return (
                <Box>
                    <Text>
                        {quantity} x {formatedPrice} {currencyCode}
                    </Text>
                </Box>
            )
        }
    }),

    columnHelper.display({
        id: 'action',
        size: 100,
        header: 'Action',
        cell: ({ row }) => {
            return (
                <SubscriptionLineItemActions
                    OtherAactions={row.original.otherActions}
                    node={row.original.node!}
                />
            )
        }
    }),

];