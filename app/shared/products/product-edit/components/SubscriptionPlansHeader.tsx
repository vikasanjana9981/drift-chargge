import { useNavigate } from "@remix-run/react";
import { messages } from "app/config/messages";
import CustomDropdown from "app/packages/components/dropdown";
import cn from "app/packages/utils/class-names";
import { PiGear, PiPencil, PiRepeatFill } from "react-icons/pi";
import { Flex, Title } from "rizzui";
import { ConfigureSettings, ConfigureSettingsOptions } from "../dropdownConfig";
import { extractNumericId } from "app/packages/utils/shopifyIdUtils";

export const SubscriptionPlansHeader = ({ productResponse }: any) => {
    const navigate = useNavigate();
    return <Flex justify="between" align="center">
        <Flex align="center">
            <span
                className={cn(
                    'me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5',
                    'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                )}
            >
                <PiRepeatFill />
            </span>
            <Title as="h3" className="text-base font-medium xl:text-lg">
                {messages.products.subscriptionPlanTitle}
            </Title>

        </Flex>

        <CustomDropdown
            label="Configure"
            options={ConfigureSettingsOptions}
            onSelect={(value) => {
                if (value === ConfigureSettings.MANAGE_PLANS) {
                    navigate(`/merchant/products/${extractNumericId(productResponse?.id)}/plans`);
                }else{
                    navigate(`/merchant/products/${extractNumericId(productResponse?.id)}/variant-plans`);
                }
            }}
            renderOption={renderConfigureOption}
            variant="solid"
            menuClassName="min-w-max whitespace-nowrap"
        />
    </Flex>
}

function renderConfigureOption(value: ConfigureSettings) {
    return (
        <div className="flex items-center">
            {value === ConfigureSettings.MANAGE_PLANS ? <PiPencil /> : <PiGear />}
            <span className="ml-2">{ConfigureSettingsOptions.find((opt) => opt.value === value)?.label}</span>
        </div>
    );
}
