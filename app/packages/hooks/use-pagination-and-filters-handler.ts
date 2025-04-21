import { useNavigate, useSearchParams } from '@remix-run/react';

export const usePaginationAndFilterHandlers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Function to trigger GraphQL API reload when page size changes
  const handlePageSizeChange = (newSize: number) => {
    searchParams.set("first", newSize.toString());
    navigate(`?${searchParams.toString()}`); // Triggers Remix loader to fetch new data
  };

  // Handle Pagination Changes (Single `action` Param)
  const handlePageChange = (cursor: string | null, action: "next" | "prev") => {
    if (cursor) {
      searchParams.set("action", action);
      searchParams.set("cursor", cursor);
    } else {
      searchParams.delete("action");
      searchParams.delete("cursor");
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleStatusChange = (selectedStatus: string | null) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("status", queryFilter);
    } else {
      searchParams.delete("status");
    }

    navigate(`?${searchParams.toString()}`);
  };

  const handlePublishedStatusChange = (selectedStatus: string | null) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("onlineStoreStatus", queryFilter);
    } else {
      searchParams.delete("onlineStoreStatus");
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleUpdatedDateChange = (selectedStatus: string | null) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("updatedAt", queryFilter);
    } else {
      searchParams.delete("updatedAt");
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleCreatedDateChange = (selectedStatus: string | null) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("createdAt", queryFilter);
    } else {
      searchParams.delete("createdAt");
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleQuerySearch = (query: string, type = "query", SearchByOptions: { label: string; value: string }[] = []) => {
    if (SearchByOptions && SearchByOptions.length) {
      SearchByOptions.forEach(option => searchParams.delete(option.value));
    }
    if (query) {
      searchParams.set(type, query);
    } else {
      searchParams.delete(type);
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleLastBillingAttemptErrorChange = (selectedStatus: string | null) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("lastBillingAttemptError", queryFilter);
    } else {
      searchParams.delete("lastBillingAttemptError");
    }
    navigate(`?${searchParams.toString()}`);
  };

  return {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handlePublishedStatusChange,
    handleQuerySearch,
    handleUpdatedDateChange,
    handleCreatedDateChange,
    handleLastBillingAttemptErrorChange
  };
};