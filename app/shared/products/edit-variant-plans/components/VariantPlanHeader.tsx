import { Link, useParams } from "@remix-run/react";
import { VariantPlanHeaderProps } from "../types";
import { Flex } from "rizzui/flex";
// import { ActionIcon } from "rizzui/action-icon";
import { FaArrowLeft } from "react-icons/fa6";
import { Title } from "rizzui/typography";
import { ActionIcon } from "rizzui/action-icon";

const VariantPlanHeader = ({ product }: VariantPlanHeaderProps) => {
    const { title } = product;
    const { productId } = useParams();

    return (
        <Flex className="w-full">
            <Link to={`/merchant/products/${productId}`}>
                <ActionIcon variant={"outline" as any}>
                    <FaArrowLeft />
                </ActionIcon>
            </Link>
            <Title>Manage variant plans for {title}</Title>
        </Flex>
    );
};

export default VariantPlanHeader