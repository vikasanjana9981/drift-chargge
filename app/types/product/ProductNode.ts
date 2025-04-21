import { ShopObject } from "../shop/shopObject";
import { Money } from "../subscription/subscriptionQueryTypes";

export interface SellingPlanGroupsCount {
  count: number;
  precision: "EXACT" | "APPROXIMATE";
}

export interface ProductNode {
  id: string;
  title: string;
  createdAt: string;
  handle: string;
  requiresSellingPlan: boolean;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  sellingPlanGroupsCount: SellingPlanGroupsCount;
  featuredMedia?: FeaturedMedia;
  variantsCount: Count
  onlineStorePreviewUrl?: string
}

export interface ProductSingleNode {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  descriptionHtml: string;
  handle: string;
  requiresSellingPlan: boolean;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  sellingPlanGroupsCount: SellingPlanGroupsCount;
  featuredMedia?: FeaturedMedia;
  variantsCount: Count
  onlineStorePreviewUrl?: string
  variants: {
    nodes: ProductVariantNode[]; // Array of variants
  };
  sellingPlanGroups: {
    edges: SellingPlanGroupEdge[];
  };
  shop: ShopObject
  currentAppInstallation: any
  priceRangeV2?:PriceRangeV2
}

export interface PriceRangeV2 {
  minVariantPrice: Money
  maxVariantPrice: Money
}

// Selling Plan Group Edge
export interface SellingPlanGroupEdge {
  cursor: string;
  node: SellingPlanGroup;
}

// Selling Plan Group
export interface SellingPlanGroup {
  id: string;
  appId: string;
  createdAt: string;
  merchantCode: string;
  name: string;
  options: string[];
  position: number;
  sellingPlans: {
    edges: SellingPlanEdge[];
  };
}

// Selling Plan Edge
export interface SellingPlanEdge {
  cursor: string;
  node: SellingPlan;
}

// Selling Plan
export interface SellingPlan {
  id: string;
  name: string;
  options: string[];
  position: number | null;
  category: "SUBSCRIPTION" | "OTHER";
  createdAt: string;
  inventoryPolicy: InventoryPolicy;
  pricingPolicies: PricingPolicy[];
  billingPolicy: BillingPolicy;
  deliveryPolicy: DeliveryPolicy;
  Metafields: Metafields;
}


interface Metafield {
  key: string;
  value: string;
}

interface Metafields {
  nodes: Metafield[];
}


// Inventory Policy
export interface InventoryPolicy {
  reserve: "ON_FULFILLMENT" | "NOT_RESERVED";
}

// Pricing Policy
export interface PricingPolicy {
  __typename: string;
  adjustmentType: "PERCENTAGE" | "FIXED_AMOUNT";
  adjustmentValue: {
    __typename: string;
    percentage?: number;
  };
}

// Billing Policy
export interface BillingPolicy {
  maxCycles?: number | null;
  minCycles?: number | null;
  anchors?: any[];
  createdAt?: string;
  interval?: string;
  intervalCount?: number;
  remainingBalanceChargeExactTime?: string | null;
  remainingBalanceChargeTimeAfterCheckout?: string | null;
  checkoutCharge?: CheckoutCharge;
  remainingBalanceChargeTrigger?: string;
}

// Checkout Charge
export interface CheckoutCharge {
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: {
    __typename: string;
    percentage?: number;
  };
}

// Delivery Policy
export interface DeliveryPolicy {
  cutoff?: number | null;
  intent: "FULFILLMENT_BEGIN";
  createdAt: string;
  anchors: any[];
  interval: "WEEK" | "MONTH" | string;
  intervalCount: number;
  preAnchorBehavior: "ASAP";
  fulfillmentTrigger?: "ASAP";
  fulfillmentExactTime?: string | null;
}


export interface ProductVariantNode {
  id: string;
  title: string;
  createdAt: string;
  availableForSale: boolean;
  sku: string;
  price: string;
  sellingPlanGroups: {
    edges: SellingPlanGroupEdge[];
  };
  image: Image
}

export interface Count {
  count: number;
  precision: "EXACT" | "APPROXIMATE";
}

export interface FeaturedMedia {
  alt?: string;
  id: string;
  preview?: {
    image?: {
      altText?: string;
      url: string;
    };
  };
}

export interface Image {
  altText?: string;
  url: string;
}

export interface ProductEdge {
  cursor: string;
  node: ProductSingleNode;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  endCursor: string;
  startCursor: string;
}

export interface ProductsQueryResponse {
  edges: ProductEdge[];
  pageInfo: PageInfo;
}

export interface ProductQueryResponse {
  product: ProductNode
}
