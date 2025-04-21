"use client";

import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Select,
  SelectOption,
  Text,
} from "rizzui";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";
import cn from "app/packages/utils/class-names";
import { PageInfo } from "app/types/product/ProductNode";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 250, label: "250" },
];

export default function TablePagination<TData extends Record<string, any>>({
  table,
  showSelectedCount = false,
  className,
  onPageSizeChange,
  onPageChange,
  pageInfo
}: {
  table: ReactTableType<TData>;
  showSelectedCount?: boolean;
  className?: string;
  onPageSizeChange?: (newSize: number) => void;
  onPageChange?: (cursor: string | null, direction: "prev" | "next") => void;
  pageInfo: PageInfo
}) {
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo

  // Handle Page Size Change
  const handlePageSizeChange = (v: SelectOption) => {
    if (onPageSizeChange) {
      table.setPageSize(Number(v.value));
      onPageSizeChange(Number(v.value)); // Calls API when the value is changed
    }
  };

  return (
    <Flex
      gap="6"
      align="center"
      justify="between"
      className={cn("container", className)}
    >
      <Flex align="center" className="w-auto shrink-0">
        <Text className="hidden font-normal text-gray-600 md:block">
          Rows per page
        </Text>
        <Select
          size="sm"
          variant="flat"
          options={options}
          className="w-13"
          value={table.getState().pagination.pageSize}
          onChange={handlePageSizeChange}
          suffixClassName="[&>svg]:size-3"
          selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
          optionClassName="font-medium text-xs px-2 justify-center"
        />
      </Flex>

      {showSelectedCount && (
        <Box className="hidden @2xl:block w-full">
          <Text>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Text>
        </Box>
      )}

      {
        (hasNextPage || hasPreviousPage) && (
          <Flex justify="end" align="center">
            <Text className="hidden font-normal text-gray-600 3xl:block">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </Text>
            <Grid gap="2" columns="2">
              <ActionIcon
                size="sm"
                rounded="lg"
                variant={"outline" as any}
                aria-label="Go to previous page"
                onClick={() => onPageChange?.(startCursor, "prev")}
                disabled={!hasPreviousPage}
                className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
              >
                <PiCaretLeftBold className="size-3.5" />
              </ActionIcon>
              <ActionIcon
                size="sm"
                rounded="lg"
                variant={"outline" as any}
                aria-label="Go to next page"
                onClick={() => onPageChange?.(endCursor, "next")}
                disabled={!hasNextPage}
                className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
              >
                <PiCaretRightBold className="size-3.5" />
              </ActionIcon>
            </Grid>
          </Flex>
        )}
    </Flex>
  );
}
