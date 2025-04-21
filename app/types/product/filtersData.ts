export enum ProductStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
    DRAFT = "DRAFT",
}

export enum ProductPublicationStatus {
    APPROVED = "approved",
    REJECTED = "rejected",
    NEEDS_ACTION = "needs_action",
    AWAITING_REVIEW = "awaiting_review",
    PUBLISHED = "published",
    DEMOTED = "demoted",
    SCHEDULED = "scheduled",
    PROVISIONALLY_PUBLISHED = "provisionally_published",
}

// Corrected Mapping for Display Labels
export const ProductPublicationStatusLabels: Record<ProductPublicationStatus, string> = {
    [ProductPublicationStatus.APPROVED]: "Approved",
    [ProductPublicationStatus.REJECTED]: "Rejected",
    [ProductPublicationStatus.NEEDS_ACTION]: "Needs Action",
    [ProductPublicationStatus.AWAITING_REVIEW]: "Awaiting Review",
    [ProductPublicationStatus.PUBLISHED]: "Published",
    [ProductPublicationStatus.DEMOTED]: "Demoted",
    [ProductPublicationStatus.SCHEDULED]: "Scheduled",
    [ProductPublicationStatus.PROVISIONALLY_PUBLISHED]: "Provisionally Published",
};

// Fixed `publicationStatusOptions` Mapping
export const publicationStatusOptions = Object.values(ProductPublicationStatus).map((status) => ({
    value: status,
    label: ProductPublicationStatusLabels[status],
}));


// Mapping object for display labels
export const ProductStatusLabels: Record<ProductStatus, string> = {
    [ProductStatus.ACTIVE]: "Active",
    [ProductStatus.ARCHIVED]: "Archived",
    [ProductStatus.DRAFT]: "Draft",
};

export const statusOptions = Object.values(ProductStatus).map((status) => ({
    value: status,
    label: ProductStatusLabels[status],
}));


export type FiltersHandlerType = {
    handleStatusChange: (selectedStatus: string | null) => void;
    handleQuerySearch: (query: string, type?: string, SearchByOptions?: { label: string; value: string }[]) => void;
    handlePublishedStatusChange: (query: string) => void;
};

export enum PublishedStatus {
    PUBLISHED = "published",
    UNPUBLISHED = "unpublished",
    
}
export const PublishedStatusLabels: Record<PublishedStatus, string> = {
    [PublishedStatus.PUBLISHED]: "Published",
    [PublishedStatus.UNPUBLISHED]: "Unpublished",
};
export const publishedStatusOptions = Object.values(PublishedStatus).map((status) => ({
    value: status,
    label: PublishedStatusLabels[status], // Use readable labels
}));

export enum MainAppFilters {
    QUERY = "query",
    STORESTATUS = 'onlineStoreStatus',
    CUSTOMEREMAIL = 'customerEmail',
    ID = 'id',
    STATUS = 'status',
    UPDATEDATE = 'updatedAt',
    CREATEDATE = 'createdAt',
    LASTBILLINGATTEMPTERROR = 'lastBillingAttemptError',
}