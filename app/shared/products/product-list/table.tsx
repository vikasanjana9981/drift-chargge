'use client';

import { useTanStackTable } from 'app/packages/components/table/custom/use-TanStack-Table';
import TablePagination from 'app/packages/components/table/pagination';
import { productsListColumns } from './columns';
import Filters from './filters';
import TableFooter from 'app/packages/components/table/footer';
import { TableClassNameProps } from 'app/packages/components/table/table-types';
import cn from 'app/packages/utils/class-names';
import {  ProductSingleNode } from 'app/types/product/ProductNode';
import { useNavigate } from '@remix-run/react';
import { useEffect, useMemo } from 'react';
import { TableData } from 'app/types/product/tableData';
import { FiltersHandlerType } from 'app/types/product/filtersData';
import { usePaginationAndFilterHandlers } from 'app/packages/hooks/use-pagination-and-filters-handler';
import { extractNumericId } from 'app/packages/utils/shopifyIdUtils';
import { getSellingPlanGroup } from '../product-edit/utils/sellingPlansGroupUtils';
import MainTable from 'app/packages/components/table';

export default function ProductsTable({
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
  responseData: any
}) {

  const {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handlePublishedStatusChange,
    handleQuerySearch,
  } = usePaginationAndFilterHandlers();
  const navigate = useNavigate();

  const { response: { products: { pageInfo } } } = responseData;

  // Transform GraphQL response to fit `useTanStackTable`
  const tableData = useMemo(() => (responseData ? transformShopifyProducts(responseData, navigate) : []), [responseData]);


  const { table, setData } = useTanStackTable<TableData>({
    tableData: tableData,
    columnConfig: productsListColumns,
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
    handlePublishedStatusChange
  }

  // Update table data here 
  useEffect(() => {
    setData(tableData)
  }, [tableData, setData]);

  return (
    <>
      {!hideFilters && <Filters table={table} filtersHanlder={filtersHanlder} />}
      <MainTable table={table} variant="modern" classNames={classNames} />
      {!hideFooter && <TableFooter table={table} onExport={handleExportData} />}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
          onPageSizeChange={handlePageSizeChange}
          pageInfo={pageInfo}
          onPageChange={(cursor, action) => handlePageChange(cursor, action)}
        />
      )}
    </>
  );
}

const transformShopifyProducts = (responseData: any, navigate: any): TableData[] => {
  const { response: { products } } = responseData;
  
  return products.edges.map(({ node }: any) => ({
    id: node.id, // Ensure each row has a unique `id`
    title: node.title,
    handle: node.handle,
    createdAt: node.createdAt,
    requiresSellingPlan: node.requiresSellingPlan,
    status: node.status,
    image: {
      url: node.featuredMedia?.preview?.image?.url,
      alt: node.featuredMedia?.alt
    },
    variantsCount: node?.variantsCount?.count,
    onlineStorePreviewUrl: node?.onlineStorePreviewUrl,
    numericId: extractNumericId(node.id),
    purchaseType: getSellingPlanGroups(node, responseData),
    sellingPlanGroupsCount: getSellingPlanGroupsCount(node, responseData),
    onRowClick: () => navigate(`/merchant/products/${extractNumericId(node.id)}`)
  }));
};

const getSellingPlanGroupsCount = (node: ProductSingleNode, responseData: any) => {
  const appIdGraphQL = responseData?.response?.currentAppInstallation?.app?.id || "";
  const appIdNumeric = extractNumericId(appIdGraphQL);

  const filteredPlans = node.sellingPlanGroups.edges.filter(
    (edge: any) => extractNumericId(edge.node.appId) === appIdNumeric
  );

  return filteredPlans.length
}

const getSellingPlanGroups = (node: ProductSingleNode, responseData: any) => {
  if (!node?.sellingPlanGroups?.edges?.length) {
    return { oneTime: false, subscriptions: false };
  }

  const appIdGraphQL = responseData?.response?.currentAppInstallation?.app?.id || "";
  const appIdNumeric = extractNumericId(appIdGraphQL);

  const filteredPlans = node.sellingPlanGroups.edges.filter(
    (edge: any) => extractNumericId(edge.node.appId) === appIdNumeric
  );

  const hasOneTimeGroup = Boolean(getSellingPlanGroup(filteredPlans as any, "Onetime Plan Group"));
  const hasSubscriptionGroups =
    Boolean(getSellingPlanGroup(filteredPlans as any, "PayPerShipment Plan Group")) ||
    Boolean(getSellingPlanGroup(filteredPlans as any, "PrePaid Plan Group"));

  return {
    oneTime: hasOneTimeGroup,
    subscriptions: hasSubscriptionGroups,
  };
};
