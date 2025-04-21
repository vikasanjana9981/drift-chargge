// productQueryTypes.ts

// Interface for product query variables
export interface ProductQueryVariables {
    first: number | null | undefined; // Number of products to fetch
    last: number | null | undefined; // Number of products to fetch
    after?: string | null; // Cursor for pagination (next page)
    before?: string | null ; // Cursor for pagination (previous page)
    query?: string; // Filter query, e.g., "status:ACTIVE"
    reverse?: boolean; // Sorting order (true = DESC, false = ASC)
    sortKey?: ProductSortKeys; // ✅ Use Enum for sorting options
    savedSearchId?: string; // Optional saved search filter
}

// Enum for sortKey options
export enum ProductSortKeys {
    ID = "ID",
    TITLE = "TITLE",
    VENDOR = "VENDOR",
    CREATED_AT = "CREATED_AT",
    UPDATED_AT = "UPDATED_AT",
    PUBLISHED_AT = "PUBLISHED_AT",
    BEST_SELLING = "BEST_SELLING",
    PRICE = "PRICE",
}