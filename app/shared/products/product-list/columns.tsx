'use client';

import { getStatusBadge } from 'app/packages/components/table-utils/get-status-badge';
import AvatarCard from 'app/packages/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Text } from 'rizzui';
import { Link } from '@remix-run/react';
import { TableData } from 'app/types/product/tableData';
import { getPurchaseTypeBadge } from 'app/packages/components/table-utils/get-purchase-type-badge';
import DateCell from 'app/packages/ui/date-cell';

const columnHelper = createColumnHelper<TableData>();

export const productsListColumns = [
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
    id: 'product',
    size: 300,
    header: 'Product',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.image.url || ''}
        name={row.original.title}
        description={`${row.original.variantsCount} variants`}
        avatarProps={{
          name: row.original.title,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />

    ),
  }),

  columnHelper.display({
    id: 'status',
    size: 150,
    header: 'Shopify status',
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div>
          <div>
            <span>Product</span>
            <span>
              {getStatusBadge(row.original.status)}
            </span>
          </div>
        </div>
      )
    }
  }),

  columnHelper.display({
    id: 'purchase_type',
    size: 150,
    header: 'Purchase types',
    cell: ({ row }) => {
      const { purchaseType } = row.original;
      return getPurchaseTypeBadge(purchaseType)
    }
  }),

  columnHelper.display({
    id: 'frquencies',
    size: 150,
    header: 'Selling Plans ',
    cell: ({ row }) => <Text className="text-sm">{row.original.sellingPlanGroupsCount}</Text>,
  }),

  columnHelper.display({
    id: 'createdAt',
    size: 150,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  
];
