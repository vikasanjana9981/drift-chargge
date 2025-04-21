'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { SubscriptionContractSubscriptionStatus, TableData, TransformedContract } from 'app/types/subscription/subscriptionQueryTypes';
import { Badge, Box, Button, Checkbox, Dropdown, Flex, Text } from 'rizzui';
import { BsCalendarDate } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from 'app/packages/utils/shopifyIdUtils';
import { Link } from '@remix-run/react';

const columnHelper = createColumnHelper<TableData>();

export const contractColumns = [

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

  columnHelper.accessor('id', {
    id: 'subscripitionId',
    size: 200,
    header: 'Subscription ID',
    cell: ({ row }) => <Link to={`${row.original.id}`} className="text-sm text-primary">{row.original.id}</Link>,
  }),

  columnHelper.display({
    id: 'variantTitle',
    size: 200,
    header: 'Product/Variant',
    cell: ({ row }) => <Text className="text-sm">{row.original.variantTitle}</Text>,
  }),

  columnHelper.display({
    id: 'price',
    size: 150,
    header: 'Price',
    cell: ({ row }) => {
      const price = row.original.lineDiscountedPrice
      return (
        <Text className="text-sm">
          {price}
        </Text>
      )
    },
  }),

  columnHelper.display({
    id: 'quantity',
    size: 100,
    header: 'Quantity',
    cell: ({ row }) => <Text className="text-sm">{row.original.quantity}</Text>,
  }),

  columnHelper.display({
    id: 'deliveryPolicy',
    size: 200,
    header: 'Delivery Policy',
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
    id: 'nextBillingDate',
    size: 250,
    header: 'Next Charge Date',
    cell: ({ row }) => {
      const nextChargeDate = row.original.nextBillingDate;
      const convertedDate = formatDate(nextChargeDate);
      return (
        <Box className='flex flex-col'>
          <Text className="text-sm">
            {convertedDate}
          </Text>
        </Box>
      )
    }
  }),

  columnHelper.display({
    id: 'customer',
    size: 250,
    header: 'Customer',
    cell: ({ row }) => (
      <Box className='flex flex-col'>
        <Text className="text-sm">
          {`${row.original.customerName}`}
        </Text>
        <Text className="text-sm">{row.original.customerEmail}</Text>
      </Box>
    ),
  }),

  columnHelper.display({
    id: 'status',
    size: 250,
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status as SubscriptionContractSubscriptionStatus

      // Map status to badge colors
      const statusColors: Record<SubscriptionContractSubscriptionStatus, string> = {
        [SubscriptionContractSubscriptionStatus.ACTIVE]: "success",
        [SubscriptionContractSubscriptionStatus.CANCELLED]: "danger",
        [SubscriptionContractSubscriptionStatus.EXPIRED]: "gray",
        [SubscriptionContractSubscriptionStatus.FAILED]: "warning",
        [SubscriptionContractSubscriptionStatus.PAUSED]: "info",
      };
      return (
        <Box className='flex gap-3 items-center'>
          <Badge renderAsDot color={statusColors[status] as any} />
          <Text className='capitalize'>{status}</Text>
        </Box>
      )
    }
  }),


  columnHelper.display({
    id: 'actions',
    size: 100,
    header: 'Actions',
    cell: ({ row }) => {
      const subscripition = row.original
      return (
        <SubscriptionActions subscripition={subscripition} />
      )
    }
  }),
];


const SubscriptionActions = ({ subscripition }: { subscripition: TransformedContract }) => {

  const actionItems = [
    { icon: <BsCalendarDate />, label: "Reschedule next order" },
    { icon: <GoPencil />, label: "Edit frequency" },
    { icon: <GoPencil />, label: "Edit subscription product" },
    { icon: <MdOutlineCancel />, label: "Cancel" },
    { icon: <FaRegTrashAlt />, label: "Delete" }
  ];
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          as='span'
          color='primary'
          variant={"text" as any}
        >
          <Text className='text-primary text-sm'>Actions</Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className='min-w-[285px]'>
        {actionItems.map(({ icon, label }, index) => (
          <Dropdown.Item key={index}>
            <Flex align='center' gap='2'>
              {icon && <span className="mr-2">{icon}</span>}
              <Text>{label}</Text>
            </Flex>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}