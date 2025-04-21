export interface TransformedProduct {
    id: string;
    title: string;
    handle: string;
    createdAt: string;
    requiresSellingPlan: boolean;
    status: string;
    sellingPlanGroupsCount: number;
    image: {
        url?: string;
        alt?: string;
    };
    variantsCount?: number;
    onlineStorePreviewUrl?: string;
    purchaseType:any
}

export type TableData = TransformedProduct;
