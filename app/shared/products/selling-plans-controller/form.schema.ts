import { z } from 'zod';

export const SellingPlanSchema = z
  .object({
    // Billing Type
    billingType: z.enum(['payAsYouGo', 'prepaidOneTime', 'prepaidAutoRenew']).default('payAsYouGo'),

    // Order Frequency
    orderFrequency: z.number().min(1, "Order frequency must be at least 1").default(1),

    // Unit
    unit: z.enum(['month', 'week', 'day', 'year']).default('month'),

    // Frequency Name - Dynamically generated based on orderFrequency & unit
    frequencyName: z
      .string(),

    // Show Description (Checkbox)
    showDescription: z.boolean().default(false),

    // Content (Visible only if showDescription is true)
    content: z
      .string()
      .optional()
      .or(z.literal('')),

    // Subscription Renewal Date Type
    subscriptionRenewalDateType: z.enum(['sameDayOfMonth', 'specificDate']).default('sameDayOfMonth'),

    // Subscription Renewal Date (Only visible when subscriptionRenewalDateType is 'specificDate')
    subscriptionRenewalDate: z
      .number()
      .min(1)
      .max(31)
      .optional(),

    // Offer Discount (Checkbox)
    offerDiscount: z.boolean().default(false),

    // Discount Value (Only visible if offerDiscount is true)
    discountValue: z
      .number()
      .optional(),

    // Discount Type (Only visible if offerDiscount is true)
    discountType: z
      .enum(['percent', 'amountOff', 'fixedPrice'])
      .optional(),

    // Change Discount After Specific Number of Payments (Only if offerDiscount is true)
    changeDiscountAfterPayments: z.boolean().default(false),

    // Inventory Policy
    inventoryPolicy: z.enum(['onSale', 'onFulfilment']).default('onSale'),

    // Cancellation Policy
    cancellationPolicy: z.enum(['afterInitialOrder', 'chooseSpecificCharge']).default('afterInitialOrder'),

    // Allow Cancel After Charge (Only if cancellationPolicy is 'chooseSpecificCharge')
    allowCancelAfterCharge: z
      .number()
      .optional(),

    // Automatic Expiration
    automaticExpiration: z.enum(['unlimited', 'limited']).default('unlimited'),

    // Auto Cancel After Charge (Only if automaticExpiration is 'limited')
    autoCancelAfterCharge: z
      .number()
      .optional(),

    // Offer Trial (Checkbox)
    offerTrial: z.boolean().default(false),

    // Free Trial Ends Period (Only if offerTrial is checked)
    freeTrialEndsPeriod: z
      .number()
      .optional(),

    // Free Trial Ends Period Unit (Only if offerTrial is checked)
    freeTrialEndsPeriodUnit: z
      .enum(['days', 'week', 'month', 'year'])
      .optional(),

    // Free Trial Discount Offer (Only if offerTrial is checked)
    freeTrialDiscountOffer: z
      .number()
      .optional(),

    // Free Trial Discount Type (Only if offerTrial is checked)
    freeTrialDiscountType: z
      .enum(['percent', 'fixed'])
      .optional(),

  });

// **Convert Schema into an Array (Repeating Fields)**
export const SellingGroupInputSchema = z.object({
  groupName: z.string().min(1, "Group name is required").default(""),
  sellingPlans: z.array(SellingPlanSchema).default([]), // Array of selling plans
});

// **Export Type**
export type SellingGroupInputType = z.infer<typeof SellingGroupInputSchema>;

export type SellingPlansType = z.infer<typeof SellingPlanSchema>;
