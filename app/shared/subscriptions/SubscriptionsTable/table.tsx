'use client';

import { useTanStackTable } from 'app/packages/components/table/custom/use-TanStack-Table';
import TablePagination from 'app/packages/components/table/pagination';
import { contractColumns } from './columns';
import TableFooter from 'app/packages/components/table/footer';
import { TableClassNameProps } from 'app/packages/components/table/table-types';
import cn from 'app/packages/utils/class-names';
import { useNavigate } from '@remix-run/react';
import { useEffect, useMemo } from 'react';
import { usePaginationAndFilterHandlers } from 'app/packages/hooks/use-pagination-and-filters-handler';
import { extractNumericId, formatPrice } from 'app/packages/utils/shopifyIdUtils';
import MainTable from 'app/packages/components/table';
import { SubscriptionContractNode, SubscriptionContractsResponse, TableData } from 'app/types/subscription/subscriptionQueryTypes';
import { PageInfo } from 'app/types/product/ProductNode';
import Filters from './filters';
import { FiltersHandlerType } from './types';

export default function SubscriptionsTable({
  pageSize,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0 cursor-pointer',
  },
  paginationClassName,
  responseData
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
  responseData: SubscriptionContractsResponse
}) {

  const {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handleUpdatedDateChange,
    handleQuerySearch,
    handleLastBillingAttemptErrorChange,
    handleCreatedDateChange
  } = usePaginationAndFilterHandlers();
  const navigate = useNavigate();

  console.log('responseData', responseData);

  const { response: { subscriptionContracts: { pageInfo } } } = responseData;

  // Transform GraphQL response to fit `useTanStackTable`
  const tableData = useMemo(() => (responseData ? transformShopifyContract(responseData, navigate) : []), [responseData]);

  const { table, setData } = useTanStackTable<TableData>({
    tableData: tableData,
    columnConfig: contractColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    console.log('handleExportData products table')
  }

  const filtersHanlder: FiltersHandlerType = {
    handleStatusChange,
    handleQuerySearch,
    handleUpdatedDateChange,
    handleCreatedDateChange,
    handleLastBillingAttemptErrorChange
  }

  // Update table data here 
  useEffect(() => {
    setData(tableData)
  }, [tableData, setData]);

  return (
    <>
      {!hideFilters && <Filters table={table} filtersHanlder={filtersHanlder} />}
      <MainTable table={table} variant="minimal" classNames={classNames}  />
      {!hideFooter && <TableFooter table={table} onExport={handleExportData} />}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
          onPageSizeChange={handlePageSizeChange}
          pageInfo={pageInfo as PageInfo}
          onPageChange={(cursor, action) => handlePageChange(cursor, action)}
        />
      )}
    </>
  );
}

const transformShopifyContract = (responseData: SubscriptionContractsResponse, navigate: any): TableData[] => {
  const { response:
    { subscriptionContracts,
      shop:
      {
        currencyFormats: {
          moneyFormat
        }
      }
    }
  } = responseData
  return subscriptionContracts.edges.map(({ node }: { node: SubscriptionContractNode }) => ({
    id: extractNumericId(node.id),
    variantTitle: node.lines.edges[0]?.node.variantTitle || "Unknown Plan",
    quantity: node.lines.edges[0]?.node.quantity || 1,
    lineDiscountedPrice: formatPrice(parseFloat(node.lines.edges[0]?.node.lineDiscountedPrice?.amount), moneyFormat) || formatPrice(parseFloat("0.0"), moneyFormat),
    deliveryPolicyInterval: node.deliveryPolicy?.interval || "N/A",
    deliveryPolicyIntervalCount: node.deliveryPolicy?.intervalCount || 0,
    billingPolicyInterval: node.billingPolicy?.interval || "N/A",
    billingPolicyIntervalCount: node.billingPolicy?.intervalCount || 0,
    customerFirstName: node.customer?.firstName || "Unknown",
    customerLastName: node.customer?.lastName || "Unknown",
    customerName: node.customer?.displayName || "Unknown",
    customerEmail: node.customer?.email || "Unknown",
    status: node.status,
    moneyFormat: moneyFormat,
    nextBillingDate: node.nextBillingDate,
    onRowClick: () => { }
  }));
};
