import { Flex, Switch, Title } from 'rizzui';
import { MdAddShoppingCart } from 'react-icons/md';

export const PlanHeader = ({
    isPlanEnabled,
    onToggle,
}: {
    isPlanEnabled: boolean;
    onToggle: (checked: boolean) => void;
}) => (
    <Flex align="center" justify="between">
        <Flex align="center" gap="2">
            {/* <MdAddShoppingCart /> */}
            <Title as="h3" className="text-sm">
                One-time plan settings
            </Title>
        </Flex>
        <Switch checked={isPlanEnabled} onChange={() => onToggle(!isPlanEnabled)} />
    </Flex>
);