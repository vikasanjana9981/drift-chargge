import { Flex, Text, Button, type ButtonProps } from "rizzui";
import { FaRegCreditCard } from "react-icons/fa6";
// Extracted PaymentMethod Button Component

const PaymentMethodButton = ({ brand, lastDigits, ...props }: { brand: string; lastDigits: string } & ButtonProps) => (
    <Button variant={"outline" as any} {...props}>
        <Flex gap="1" align="center">
            <FaRegCreditCard />
            <Text className="capitalize">{brand}</Text>
            <Text>••••{lastDigits}</Text>
        </Flex>
    </Button>
);

export default PaymentMethodButton