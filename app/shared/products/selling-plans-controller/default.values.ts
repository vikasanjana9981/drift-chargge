import { isEmpty } from "lodash";
import { SellingGroupInputType } from "./form.schema";
export const sellingPlans = [
  {
    billingType: "payAsYouGo",
    orderFrequency: 1,
    unit: "month",
    frequencyName: "", // This should be dynamically generated
    showDescription: false,
    content: "",
    subscriptionRenewalDateType: "sameDayOfMonth",
    subscriptionRenewalDate: undefined,
    offerDiscount: false,
    discountValue: undefined,
    discountType: undefined,
    changeDiscountAfterPayments: false,
    inventoryPolicy: "onSale",
    cancellationPolicy: "afterInitialOrder",
    allowCancelAfterCharge: undefined,
    automaticExpiration: "unlimited",
    autoCancelAfterCharge: undefined,
    offerTrial: false,
    freeTrialEndsPeriod: undefined,
    freeTrialEndsPeriodUnit: undefined,
    freeTrialDiscountOffer: undefined,
    freeTrialDiscountType: undefined,
  },
]

export const sellingPlanGroupDefault = {
  groupName: '',
  sellingPlans: sellingPlans
}

export const defaultValues = (sellingPlanGroup: SellingGroupInputType): SellingGroupInputType => ({
  groupName: sellingPlanGroup.groupName,
  sellingPlans: sellingPlanGroup.sellingPlans || [],
});
