import { ProductSingleNode } from "app/types/product/ProductNode"
import VariantPlanHeader from "./components/VariantPlanHeader"
import VariantSellingPlanManager from "./components/VariantSellingPlanManager"

interface VariantPlanHeaderProps {
    product: ProductSingleNode
}

export default function EditVariantPlans({ product }: VariantPlanHeaderProps) {
    return (
        <div className="position-relative">
            <VariantPlanHeader product={product} />
            <VariantSellingPlanManager product={product} />
        </div>
    )
}
