"use client";

import cn from "app/packages/utils/class-names";
import { Badge, Flex } from "rizzui";
import { replaceUnderscoreDash } from "app/packages/utils/replace-underscore-dash";

const statusColors = {
  subscription: ["text-blue-600", "bg-blue-600"],
  onetime: ["text-gray-600", "bg-gray-600"],
};

export function getPurchaseTypeBadge(purchaseType: any) {
  const { oneTime, subscriptions } = purchaseType;

  // If neither oneTime nor subscriptions exist, return null
  if (!oneTime && !subscriptions) {
    return null;
  }

  return (
    <Flex direction={subscriptions && oneTime ? "col" : "row"} justify="center" align="center" gap="2" className="w-auto">
      {subscriptions && (
        <Badge className={cn("px-2 py-1 text-white", statusColors.subscription[1])}>
          {replaceUnderscoreDash("Subscription")}
        </Badge>
      )}
      {oneTime && (
        <Badge className={cn("px-2 py-1 text-white", statusColors.onetime[1])}>
          {replaceUnderscoreDash("One-Time")}
        </Badge>
      )}
    </Flex>
  );
}
