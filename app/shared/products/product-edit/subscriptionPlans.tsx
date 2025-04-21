import { ProductSingleNode } from "app/types/product/ProductNode";
import { PlansGroupsInformation } from "./components/PlansGroupsInformation";
import { SubscriptionPlansHeader } from "./components/SubscriptionPlansHeader";

export default function SubscriptionPlansGroups({ productResponse }: { productResponse: ProductSingleNode }) {
    return (
        <div className="">
            <SubscriptionPlansHeader productResponse={productResponse} />
            <hr />
            <div className="my-6">
                <PlansGroupsInformation productResponse={productResponse} />
            </div>
        </div>
    )
}