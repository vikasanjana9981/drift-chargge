import { SubscriptionContractStatus } from "app/shared/subscriptions/SubscriptionsTable/types";
import { ShopObject } from "../shop/shopObject";

// Interface for subcription query variables
export interface SubscriptionContractsVariables {
    first: number | null | undefined; // Number of products to fetch
    last: number | null | undefined; // Number of products to fetch
    after?: string | null; // Cursor for pagination (next page)
    before?: string | null; // Cursor for pagination (previous page)
    query?: string; // Filter query, e.g., "status:ACTIVE"
    reverse?: boolean; // Sorting order (true = DESC, false = ASC)
}


export interface SubscriptionContractsResponse {
    response: {
        shop: ShopObject
        subscriptionContracts: {
            edges: SubscriptionContractEdge[];
            pageInfo: PageInfo;
        };
        currentAppInstallation: CurrentAppInstallation
    }
}

export type CurrentAppInstallation = {
    app: {
        id: string
    }
    id: string

}

export type TableData = TransformedContract;

export type SubscripiontLinesTablesData = SubscriptionLinesTransformedData

export interface SubscriptionLinesTransformedData {
    id: string | null;
    title: string;
    variantTitle: string;
    quantity: number;
    lineDiscountedPrice: Money;
    variantImage?: VariantImage;
    nextBillingDate?: string;
    deliveryPolicyInterval: string;
    deliveryPolicyIntervalCount: number;
    billingPolicyInterval: string;
    billingPolicyIntervalCount: number;
    shop: ShopObject;
    otherActions: OtherAactions;
    status: SubscriptionContractSubscriptionStatus,
    note?: string;
    node?: SubscriptionLineItem
}


export interface TransformedContract {
    id: number | null;
    variantTitle: string;
    quantity: number;
    lineDiscountedPrice: string;
    deliveryPolicyInterval: string;
    deliveryPolicyIntervalCount: number;
    billingPolicyInterval: string;
    billingPolicyIntervalCount: number;
    customerFirstName: string;
    customerLastName: string;
    customerName: string;
    customerEmail: string;
    status: string;
    moneyFormat: string
    nextBillingDate: string
    onRowClick: () => void;
}

export interface SubscriptionContractsNextParams {
    first: number;
    after?: string | null;
    before?: string | null;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
}

export interface SubscriptionContractsFilterQuery {
    [key: string]: string | number | boolean | undefined;
}

export interface SubscriptionContractEdge {
    cursor: string;
    node: SubscriptionContractNode;
}

export interface SubscriptionContractNode {
    id: string;
    lines: {
        edges: SubscriptionLineEdge[];
    };
    deliveryPolicy: DeliveryPolicy;
    deliveryPrice?: Money;
    billingPolicy: BillingPolicy;
    customer: Customer;
    status: SubscriptionContractSubscriptionStatus
    nextBillingDate: string;
    deliveryMethod: DeliveryMethod;
    orders?: OrderResponse;
    createdAt?: string;
    customAttributes: CustomAttributes;
    note: string;
    billingAttempts: BillingAttempts;
}

export interface BillingAttempts {
    edges: {
        node: BillingAttempt;
    }[];
}

export interface BillingAttempt {
    id: string;
    createdAt: string;
    completedAt: string | null;
    nextActionUrl: string | null;
    idempotencyKey: string | null;
    ready: boolean;
    paymentGroupId: string | null;
    paymentSessionId: string | null;
    originTime: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    order: OrderNode;
}

export interface OrderResponse {
    edges: OrderEdge[];
}

export interface OrderEdge {
    cursor: string;
    node: OrderNode;
}

export interface OrderNode {
    id: string;
    lineItems: {
        edges: LineItemEdge[];
    };
    capturable: boolean;
    currentTaxLines: TaxLine[];
    currentTotalPriceSet: PriceSet;
    currentTotalTaxSet: PriceSet;
    currentSubtotalPriceSet: PriceSet;
    shippingLine: ShippingLine;
    currentShippingPriceSet: PriceSet;
    createdAt: string;
    name: string;
    customer: Customer
}

export interface LineItemEdge {
    cursor: string;
    node: LineItemNode;
}

export interface LineItemNode {
    variantTitle: string;
    title: string;
    variant: {
        image: Image | null;
    };
    sku: string;
    quantity: number;
    originalTotalSet: PriceSet;
    product: {
        featuredMedia: {
            preview: {
                image: Image;
            };
        };
    };
}

export interface Image {
    url: string;
}

export interface TaxLine {
    title: string;
    ratePercentage: number;
    priceSet: PriceSet;
}

export interface PriceSet {
    presentmentMoney: Money;
}

export interface ShippingLine {
    id: string | null;
    title: string;
}

export interface SubscriptionContractSingleNode extends SubscriptionContractNode {
    customerPaymentMethod: PaymentMethod
    discounts?: Discounts;
    shop: ShopObject;
    subscriptionBillingCycles: SubscriptionBillingCycles
}

export interface OtherAactions {
    setIsRescheduleModalOpen: (value: boolean) => void
    setIsEditOrderFrequencyModalOpen: (value: boolean) => void
    setIsCancelSubscriptionModalOpen: (value: boolean) => void
    setIsReactiveSubscriptionModalOpen: (value: boolean) => void
    setIsEditLineItemAttributesModalOpen: (value: boolean) => void
    setSubscriptionLine: (value: any) => void
    setIsEditSubscriptionProductModalOpen: (value: any) => void
    setIsSwapProductModalOpen: (value: any) => void
}

export interface OtherAactionsUpCommingOrders {
    setIsRescheduleModalOpen: (value: any) => void
    setSelectedUpcommingOrders: (value: any) => void
}


export interface SubscriptionBillingCycles {
    edges: BillingCycleEdge[];
}

export interface BillingCycleNode {
    billingAttemptExpectedDate: string;
    edited: boolean;
    skipped: boolean;
    status: string;
    sourceContract: SubscriptionContractNode;
    cycleIndex: number | string
}

export interface BillingCycleEdge {
    node: BillingCycleNode;
}


export interface Discounts {
    edges: {
        cursor: string;
        node: Discount;
    }[];
}

export interface Discount {
    id: string;
    title: string;
    type: string;
    value: DiscountValue;
}

export type DiscountValue =
    | SubscriptionDiscountFixedAmountValue
    | SubscriptionDiscountPercentageValue;


export interface SubscriptionDiscountFixedAmountValue {
    amount: Money;
}

export interface SubscriptionDiscountPercentageValue {
    percentage: number;
}

export enum SubscriptionContractSubscriptionStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
    FAILED = "FAILED",
    PAUSED = "PAUSED",
}

export enum SubscriptionBillingCycleScheduleEditInputScheduleEditReason {
    BUYER_INITIATED = "BUYER_INITIATED",
    DEV_INITIATED = "DEV_INITIATED",
    MERCHANT_INITIATED = "MERCHANT_INITIATED"
}


export interface SubscriptionLineEdge {
    cursor: string;
    node: SubscriptionLineItem;
}

export interface SubscriptionLineItem {
    id?: string;
    variantTitle: string;
    quantity: number;
    lineDiscountedPrice: Money
    variantImage?: VariantImage;
    title?: string;
    sku?: string;
    currentPrice?: Money
    productId?: string;
    variantId?: string;
    otherActions?: OtherAactions;
    customAttributes?: CustomAttributes,
    node?: SubscriptionLineItem
}


export interface ShippingOption {
    code: string;
    description: string | null;
    presentmentTitle: string;
    title: string;
}

export interface DeliveryMethod {
    shippingOption: ShippingOption;
    address: Address
}


export interface VariantImage {
    url: string;
}

export interface Money {
    amount: string;
    currencyCode: string;
}

export interface DeliveryPolicy {
    interval: string;
    intervalCount: number;
}

export interface BillingPolicy {
    interval: string;
    intervalCount: number;
}

export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    addressesV2?: AddressesV2;
    paymentMethods?: PaymentMethods;
    id?: string;
}

export interface PaymentMethods {
    edges: {
        cursor: string;
        node: PaymentMethod;
    }[];
}

export interface PaymentMethod {
    id: string;
    instrument: PaymentInstrument;
    revokedAt?: string | null;
    revokedReason?: string | null;
}

export interface PaymentInstrument {
    firstDigits: string;
    lastDigits: string;
    maskedNumber: string;
    source: string;
    brand: string;
    expiresSoon: boolean;
    expiryMonth: number;
    expiryYear: number;
    isRevocable: boolean;
    name: string;
    virtualLastDigits?: string | null;
}

export interface CustomAttribute {
    key: string;
    value: string;
}

export type CustomAttributes = CustomAttribute[];

export interface Address {
    address1: string;
    address2?: string | null;
    city: string;
    country: string;
    province?: string | null;
    zip: string;
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
    countryCode?: string
    countryCodeV2?: string;
    name?: string;
    provinceCode?: string
}

export interface AddressesV2 {
    edges: {
        cursor: string;
        node: Address;
    }[];
}



