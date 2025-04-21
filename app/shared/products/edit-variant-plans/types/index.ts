import { ProductSingleNode, ProductVariantNode } from "app/types/product/ProductNode";

export interface VariantPlanHeaderProps {
    product: ProductSingleNode;
}

export interface VariantSellingPlanManagerProps {
    product: ProductSingleNode;
}

export interface VariantSellingPlanListingProps {
    product: ProductSingleNode;
}

export interface VariantDetailColumnsProps {
    variant: ProductVariantNode;
}