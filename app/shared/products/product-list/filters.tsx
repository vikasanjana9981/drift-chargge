'use client';

import DateFiled from 'app/packages/components/controlled-table/date-field';
import PriceField from 'app/packages/components/controlled-table/price-field';
import StatusField from 'app/packages/components/controlled-table/status-field';
import { FilterDrawerView } from 'app/packages/components/controlled-table/table-filter';
import ToggleColumns from 'app/packages/components/table-utils/toggle-columns';
import { getDateRangeStateValues } from 'app/packages/utils/get-formatted-date';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrash,
  PiTrashDuotone,
} from 'react-icons/pi';
import { Badge, Button, Flex, Input, Text } from 'rizzui';
import { FiltersHandlerType, ProductPublicationStatus, ProductPublicationStatusLabels, ProductStatus, ProductStatusLabels, publicationStatusOptions, PublishedStatus, PublishedStatusLabels, publishedStatusOptions, statusOptions } from 'app/types/product/filtersData';
import { messages } from 'app/config/messages';
import { useSearchParams } from '@remix-run/react';
import { useDebounce } from 'app/packages/hooks/use-debounce';

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
  filtersHanlder: FiltersHandlerType
}

export default function Filters<TData extends Record<string, any>>({
  table,
  filtersHanlder
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;
  const {
    options: { meta },
  } = table;

  const { handleQuerySearch, handleStatusChange, handlePublishedStatusChange } = filtersHanlder
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') ?? "");
  const debouncedSearch = useDebounce(searchValue, 300); // ✅ Apply debounce

  // Apply debounced value to the table filter
  useEffect(() => {
    handleQuerySearch(debouncedSearch);
  }, [debouncedSearch]);

  const clearFilters = () => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
    setSearchValue(""); 
    handleQuerySearch(""); 
    handleStatusChange(null); 
    handlePublishedStatusChange(''); 
    setSearchParams({});
  };

  return (
    <Flex align="center" justify="between" className="mb-4">
      <Input
        type="search"
        placeholder={messages.products.filters.search.placeholder}
        value={searchValue}
        onClear={() => setSearchValue('')}
        onChange={(e) => setSearchValue(e.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="size-4" />}
      />

      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle={messages.products.filters.title}
        setOpenDrawer={setOpenDrawer}
      >
        <div className="grid grid-cols-1 gap-6">
          <FilterElements table={table} filtersHanlder={filtersHanlder} />
        </div>
      </FilterDrawerView>

      <Flex align="center" gap="3" className="w-auto">
        {isMultipleSelected ? (
          <Button
            color="danger"
            variant={"outline" as any}
            className="h-[34px] gap-2 text-sm"
            onClick={() => { }}
          >
            <PiTrash size={18} />
            Delete
          </Button>
        ) : null}

        <Button
          variant={"outline" as any}
          onClick={() => setOpenDrawer(!openDrawer)}
          className="h-9 pe-3 ps-2.5"
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          Filters
        </Button>

        <Button variant={"flat" as any} className="h-9 bg-gray-200/70" onClick={clearFilters}>
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear Filters
        </Button>

        <ToggleColumns table={table} />
      </Flex>
    </Flex>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
  filtersHanlder
}: TableToolbarProps<T>) {
  // const priceFieldValue = (table.getColumn('amount')?.getFilterValue() ?? [
  //   '',
  //   '',
  // ]) as string[];
  // const createdDate = table.getColumn('createdAt')?.getFilterValue() ?? ([null, null] as any);
  // const dueDate = table.getColumn('dueDate')?.getFilterValue() ?? ([null, null] as any);
  // const isFiltered = table.getState().globalFilter || table.getState().columnFilters.length > 0;
  const { handleStatusChange, handlePublishedStatusChange } = filtersHanlder
  const [searchParams] = useSearchParams();

  return (
    <>
      <StatusField
        options={statusOptions}
        value={searchParams.get('status')}
        onChange={(value: string) => {
          handleStatusChange(value);
        }
        }
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value)
        }
        displayValue={(selected: any) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-20 h-auto top-15"
        className={'w-auto'}
        label={`${messages.products.filters.status.title}`}
      />

      <StatusField
        options={publishedStatusOptions}
        value={searchParams.get('onlineStoreStatus')}
        onChange={(value: string) => {
          handlePublishedStatusChange(value);
        }
        }
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderPublishedStatusOption(option.value)
        }
        displayValue={(selected: any) => renderPublishedStatusOption(selected)}
        dropdownClassName="!z-20 h-auto top-15"
        className={'w-auto'}
        label={`${messages.products.filters.publishedStatus.title}`}
      />




      {/* <PriceField
        value={priceFieldValue}
        onChange={(v) => table.getColumn('amount')?.setFilterValue(v)}
        label="Amount"
      /> */}
      {/* <DateFiled
        selectsRange
        dateFormat={'dd-MMM-yyyy'}
        className="w-full"
        placeholderText="Select created date"
        endDate={getDateRangeStateValues(createdDate[1])!}
        selected={getDateRangeStateValues(createdDate[0])}
        startDate={getDateRangeStateValues(createdDate[0])!}
        onChange={(date) => table.getColumn('createdAt')?.setFilterValue(date)}
        inputProps={{
          label: 'Created Date',
        }}
      /> */}
      {/* {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          variant={"flat" as any}
          className="h-9 bg-gray-200/70"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      )} */}
    </>
  );
}


export function renderPublishedStatusOption(value: PublishedStatus) {
  switch (value) {
    case PublishedStatus.PUBLISHED:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {PublishedStatusLabels[value]}
          </Text>
        </div>
      );
    case PublishedStatus.UNPUBLISHED:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {PublishedStatusLabels[value]}
          </Text>
        </div>
      );

  }
}


export function renderPublicationStatusOption(value: ProductPublicationStatus) {
  switch (value) {
    case ProductPublicationStatus.APPROVED:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.REJECTED:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.NEEDS_ACTION:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.AWAITING_REVIEW:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-blue-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.PUBLISHED:
      return (
        <div className="flex items-center">
          <Badge color="primary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-blue-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.DEMOTED:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-gray-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.SCHEDULED:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-purple-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductPublicationStatus.PROVISIONALLY_PUBLISHED:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-gray-dark">
            {ProductPublicationStatusLabels[value]}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            Unknown
          </Text>
        </div>
      );
  }
}



export function renderOptionDisplayValue(value: ProductStatus) {
  switch (value) {
    case ProductStatus.ACTIVE:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {ProductStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductStatus.ARCHIVED:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {ProductStatusLabels[value]}
          </Text>
        </div>
      );
    case ProductStatus.DRAFT:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {ProductStatusLabels[value]}
          </Text>
        </div>
      );
  }
}
