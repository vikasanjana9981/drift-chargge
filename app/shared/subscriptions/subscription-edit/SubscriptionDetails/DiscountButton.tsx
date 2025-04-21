import { Flex, Text, Button, type ButtonProps } from "rizzui";
import { FaTag } from "react-icons/fa6";

const DiscountButton = ({ discountTitle, ...props }: { discountTitle?: string } & ButtonProps) => (
    <Button variant={"outline" as any} {...props}>
        <Flex gap="1" align="center">
            <FaTag />
            <Text className="capitalize">{discountTitle || "No Discount"}</Text>
        </Flex>
    </Button>
);

export default DiscountButton;