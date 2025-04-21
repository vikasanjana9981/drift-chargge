export enum SubscriptionContractStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled",
    EXPIRED = "expired",
    FAILED = "failed",
    PAUSED = "paused",
}

export const statusLabels: Record<SubscriptionContractStatus, string> = {
    [SubscriptionContractStatus.ACTIVE]: "Active",
    [SubscriptionContractStatus.CANCELLED]: "Cancelled",
    [SubscriptionContractStatus.EXPIRED]: "Expired",
    [SubscriptionContractStatus.FAILED]: "Failed",
    [SubscriptionContractStatus.PAUSED]: "Paused",
};

export type FiltersHandlerType = {
    handleStatusChange: (selectedStatus: string | null) => void;
    handleQuerySearch: (query: string, type?: string, SearchByOptions?: { label: string; value: string }[]) => void;
    handleUpdatedDateChange: (date: string | null) => void;
    handleCreatedDateChange: (date: string | null) => void;
    handleLastBillingAttemptErrorChange: (selectedValue: string | null) => void;
};

export enum SubscriptionContractLastBillingErrorType{
    CUSTOMER_ERROR = "CUSTOMER_ERROR",
    PAYMENT_ERROR = "PAYMENT_ERROR",
    INVENTORY_ERROR = "INVENTORY_ERROR",
    OTHER = "OTHER",
}

export const lastBillingErrorTypeLabels: Record<SubscriptionContractLastBillingErrorType, string> = {
    [SubscriptionContractLastBillingErrorType.CUSTOMER_ERROR]: "Customer Error",
    [SubscriptionContractLastBillingErrorType.PAYMENT_ERROR]: "Payment Error",
    [SubscriptionContractLastBillingErrorType.INVENTORY_ERROR]: "Inventory Error",
    [SubscriptionContractLastBillingErrorType.OTHER]: "Other",
};