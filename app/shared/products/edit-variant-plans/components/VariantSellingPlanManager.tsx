import { Flex } from "rizzui/flex";
import { VariantSellingPlanManagerProps } from "../types";
import VariantSellingPlanListing from "./VariantSellingPlanListing";

const VariantSellingPlanManager: React.FC<VariantSellingPlanManagerProps> = ({ product }) => {
    return (
        <Flex className="mt-5" direction="col">
            <VariantSellingPlanListing product={product} />
        </Flex>
    );
};

export default VariantSellingPlanManager