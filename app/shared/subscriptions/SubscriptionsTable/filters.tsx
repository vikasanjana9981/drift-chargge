'use client';

import DateFiled from 'app/packages/components/controlled-table/date-field';
import PriceField from 'app/packages/components/controlled-table/price-field';
import StatusField from 'app/packages/components/controlled-table/status-field';
import { FilterDrawerView } from 'app/packages/components/controlled-table/table-filter';
import ToggleColumns from 'app/packages/components/table-utils/toggle-columns';
import { getDateRangeStateValues } from 'app/packages/utils/get-formatted-date';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrash,
  PiTrashDuotone,
} from 'react-icons/pi';
import { Badge, Box, Button, Flex, Input, Select, Text } from 'rizzui';
import { messages } from 'app/config/messages';
import { useSearchParams } from '@remix-run/react';
import { useDebounce } from 'app/packages/hooks/use-debounce';
import { basename } from 'path/posix';
import { FiltersHandlerType, lastBillingErrorTypeLabels, statusLabels, SubscriptionContractLastBillingErrorType, SubscriptionContractStatus } from './types';
import { DatePicker } from 'app/packages/ui/datepicker';

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

  const { handleQuerySearch, handleStatusChange } = filtersHanlder
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);
  const [searchObj, setSearchObj] = useState({})
  const [searchBy, setSearchBy] = useState<string>('')
  const prevSearchByRef = useRef<string>();
  const [placeholderMappingState, setPlaceholderMapping] = useState("Search for anything...")



  const SearchByOptions = [
    { label: 'All', value: 'all' },
    { label: 'Customer Email', value: 'customer_email' },
    { label: 'Subscription ID', value: 'id' },
    { label: 'Product ID', value: 'productId' },
    { label: 'Variant ID', value: 'variantId' },
  ];

  const clearFilters = () => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
    setSearchValue("");
    handleQuerySearch("");
    handleStatusChange(null);
    setSearchParams({});
  };
  const placeholderMapping: { [key: string]: string } = {
    "all": 'Search for anything...',
    "customer_email": 'johndoe@gmail.com',
    "id": '12345',
    "productId": 'Product ID 12345',
    "variantId": 'Variant Id 12345',
  };


  const handleSearchValue = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Flex align="center" justify="between" className="mb-4">
      <Box className='flex items-center gap-3 flex-grow'>
        <Select
          placeholder='Search By '
          label=""
          options={SearchByOptions}
          value={searchBy}
          onChange={(option: any) => {
            setSearchValue("")
            setPlaceholderMapping(placeholderMapping[option.value])
            setSearchBy(option.value)
          }}
          className='w-[25%]'
        />
        <Input
          type="search"
          placeholder={placeholderMappingState}
          value={searchValue}
          onClear={() => {
            clearFilters();
            setSearchValue('')
          }}
          onChange={(e) => handleSearchValue(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          className='w-[50%]'
        />

        <Button
          variant={"flat" as any}
          onClick={() => {
            SearchByOptions.forEach(option => searchParams.delete(option.value));
            handleQuerySearch(debouncedSearch, searchBy, SearchByOptions);
          }}
          className="h-9"
        >
          Search
        </Button>
      </Box>

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

  const { handleStatusChange, handleUpdatedDateChange, handleCreatedDateChange, handleLastBillingAttemptErrorChange } = filtersHanlder
  const [searchParams] = useSearchParams();

  // Generate status options array
  const statusOptions = Object.values(SubscriptionContractStatus).map((status) => ({
    value: status,
    label: statusLabels[status],
  }));

  // Generate last billing attempt error
  const lastBillingAttemptErrorOptions = Object.values(SubscriptionContractLastBillingErrorType).map((status) => ({
    value: status,
    label: lastBillingErrorTypeLabels[status],
  }));

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
      <DatePicker
        selected={searchParams.get('updatedAt') ? new Date(searchParams.get('updatedAt')!) : null}
        onChange={(date: Date | null) => {
          const isoDate = date ? date.toISOString() : null;
          handleUpdatedDateChange(isoDate);
        }}
        dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
        placeholderText="Select Updated Date"
        popperPlacement="bottom-end"
        showMonthYearPicker={false}
        inputProps={{
          variant: "text",
          inputClassName:
            "rizzui-input-container flex items-center peer w-full transition duration-200 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
          label: "Select Updated Date"
        }}
        className="w-full"
      />

      <DatePicker
        selected={searchParams.get('createdAt') ? new Date(searchParams.get('createdAt')!) : null}
        onChange={(date: Date | null) => {
          const isoDate = date ? date.toISOString() : null;
          handleCreatedDateChange(isoDate);
        }}
        dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
        placeholderText="Select Created Date"
        popperPlacement="bottom-end"
        showMonthYearPicker={false}
        inputProps={{
          variant: "text",
          inputClassName:
            "rizzui-input-container flex items-center peer w-full transition duration-200 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
          label: "Select Created Date"
        }}
        className="w-full"
      />

      <StatusField
        options={lastBillingAttemptErrorOptions}
        value={searchParams.get('lastBillingAttemptError')}
        onChange={(value: string) => {
          handleLastBillingAttemptErrorChange(value);
        }
        }
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderBillingAttemptError(option.value)
        }
        displayValue={(selected: any) => renderBillingAttemptError(selected)}
        dropdownClassName="!z-20 h-auto top-15"
        className={'w-auto'}
        label={`Billing Attempt Error`}
      />

    </>
  );
}

export function renderBillingAttemptError(value: SubscriptionContractLastBillingErrorType) {
  switch (value) {
    case SubscriptionContractLastBillingErrorType.CUSTOMER_ERROR:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-warning">
            Customer Error
          </Text>
        </div>
      );
    case SubscriptionContractLastBillingErrorType.INVENTORY_ERROR:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-danger">
            Inventory Error
          </Text>
        </div>
      );
    case SubscriptionContractLastBillingErrorType.PAYMENT_ERROR:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-secondary">
            Payment Error
          </Text>
        </div>
      );
    case SubscriptionContractLastBillingErrorType.OTHER:
      return (
        <div className="flex items-center">
          <Badge color={"secondary" as any} renderAsDot />
          <Text className="ms-2 font-medium capitalize">
            Other Error
          </Text>
        </div>
      );
  }
}


export function renderOptionDisplayValue(value: SubscriptionContractStatus) {
  switch (value) {
    case SubscriptionContractStatus.ACTIVE:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-success">
            {statusLabels[value]}
          </Text>
        </div>
      );
    case SubscriptionContractStatus.CANCELLED:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-warning">
            {statusLabels[value]}
          </Text>
        </div>
      );
    case SubscriptionContractStatus.EXPIRED:
      return (
        <div className="flex items-center">
          <Badge color="secondary" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-secondary">
            {statusLabels[value]}
          </Text>
        </div>
      );
    case SubscriptionContractStatus.FAILED:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-danger">
            {statusLabels[value]}
          </Text>
        </div>
      );
    case SubscriptionContractStatus.PAUSED:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-info">
            {statusLabels[value]}
          </Text>
        </div>
      );
  }
}


