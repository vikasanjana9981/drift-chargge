export function extractNumericId(shopifyGraphQLId: string) {
  if (!shopifyGraphQLId) return null;

  try {
    // Extract numeric part from Shopify GID (e.g., "gid://shopify/Product/123456789")
    const parts = shopifyGraphQLId.split("/");
    const numericId = parts.length > 0 ? parts[parts.length - 1] : null;
    return numericId ? parseInt(numericId, 10) : null;
  } catch (error) {
    console.error("Invalid Shopify GraphQL ID:", error);
    return null;
  }
}


export enum ShopifyObjectType {
  Product = "Product",
  Collection = "Collection",
  Order = "Order",
  Customer = "Customer",
  Variant = "ProductVariant",
  SellingPlanGroup = 'SellingPlanGroup',
  SubscriptionContract = 'SubscriptionContract'
}

export function generateGraphQLId(numericId: number, type: ShopifyObjectType): string {
  if (!numericId || !type) {
    throw new Error("Invalid parameters: numericId and type are required.");
  }

  return `gid://shopify/${type}/${numericId}`;
}


export const formatPrice = (price: number | string, format: string): string => {
  if (!format.includes("{{amount}}")) {
    console.warn("Invalid money format provided:", format);
    return price.toString(); // Return price as a fallback
  }

  return format.replace("{{amount}}", Number(price).toFixed(2)); // Ensures 2 decimal places
};

export const formatDate = (isoDate: string, needTime: boolean = true) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(needTime && { hour: "numeric", minute: "2-digit", hour12: true }) // Include time only if needTime is true
  };
  return date.toLocaleString("en-US", options);
};


export const calculateTotalDiscountedPrice = (lines: any): number => {
  return lines.edges.reduce((total: any, edge: any) => {
    const itemTotal = parseFloat(edge.node.lineDiscountedPrice.amount) * edge.node.quantity;
    return total + itemTotal;
  }, 0);
};

export const getTruncatedText = (text: string, wordLimit = 3) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

export const formatToUtcHour = (dateInput:string) => {
  const date = new Date(dateInput);
  date.setUTCMinutes(0, 0, 0); // Reset minutes, seconds, milliseconds to 0
  return date.toISOString().replace('.000', '');
}
