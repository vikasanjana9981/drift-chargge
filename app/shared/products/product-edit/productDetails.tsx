import { Link } from "@remix-run/react";
import { messages } from "app/config/messages";
import CustomDropdown from "app/packages/components/dropdown";
import cn from "app/packages/utils/class-names";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { PiArchiveThin, PiGear, PiPencil } from "react-icons/pi";
import { Accordion, Box, Flex, Title } from "rizzui";
import VariantDetailColumns from "../edit-variant-plans/components/VariantPlanListTable/VariantDetailColumns";
import { BsChevronDown } from "react-icons/bs";
// import { IoChevronDownSharp } from "react-icons/io5"

enum ConfigureSettings {
    MANAGE_PLANS = "manage_plans",
    MANAGE_VARIANTS_PLANS = "manage_variants_plans",
}
const ConfigureSettingsLabels: Record<ConfigureSettings, string> = {
    [ConfigureSettings.MANAGE_PLANS]: "Manage Plans",
    [ConfigureSettings.MANAGE_VARIANTS_PLANS]: "Manage Variants Plans",
};
const ConfigureSettingsOptions = Object.values(ConfigureSettings).map((status) => ({
    value: status,
    label: ConfigureSettingsLabels[status], // Use readable labels
}));

export default function ProductDetails(
    { productResponse }: {
        productResponse: ProductSingleNode
    }
) {
    return (
        <div className="mb-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 lg:gap-y-6 sm:p-[30px]">
            <ProductDetailsHeader productResponse={productResponse} />
            <hr />
            <ProductInformation productResponse={productResponse} />
        </div>
    )
}

const ProductInformation = ({ productResponse }: { productResponse: ProductSingleNode }) => {
    const { title, descriptionHtml, variants: { nodes } } = productResponse
    return (
        <Flex direction="col">
            <Box className="flex gap-4">
                <img src={productResponse.featuredMedia?.preview?.image?.url || ''} alt={title} />
                <Box>
                    <Link to={`/merchant/products/${productResponse.id}`}>
                        <Title as="h3" className="text-base font-medium xl:text-lg">
                            {title}
                        </Title>
                        {/* How price here */}
                        <div className="text-sm" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    </Link>
                </Box>
            </Box>
            {
                nodes.length && (
                    <ProductVariantBlock productResponse={productResponse} />
                )
            }
        </Flex>
    )
}

const ProductDetailsHeader = ({ productResponse }: {
    productResponse: ProductSingleNode
}) => {
    const {
        variants: { nodes }
    } = productResponse
    return <Flex justify="between" align="center" direction="col">
        <div className="w-full flex">
            <Flex align="center">
                <span
                    className={cn(
                        'me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5',
                        'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                    )}
                >
                    <PiArchiveThin />
                </span>
                <Title as="h3" className="text-base font-medium xl:text-lg">
                    {messages.products.productDetails.title}
                </Title>
            </Flex>
            <CustomDropdown
                label="Configure"
                options={ConfigureSettingsOptions}
                onSelect={handleSelect}
                renderOption={renderConfigureOption}
                variant="solid"
                menuClassName="min-w-max whitespace-nowrap"
            />
        </div>
    </Flex>
}

const handleSelect = (value: ConfigureSettings) => {
    console.log("Selected:", value);
};

// Render function for items
function renderConfigureOption(value: ConfigureSettings) {
    return (
        <div className="flex items-center">
            {value === ConfigureSettings.MANAGE_PLANS ? <PiPencil /> : <PiGear />}
            <span className="ml-2">{ConfigureSettingsOptions.find((opt) => opt.value === value)?.label}</span>
        </div>
    );
}

export const ProductVariantBlock = ({ productResponse }: { productResponse: ProductSingleNode }) => {
    const { variants: { nodes } } = productResponse
    return (
        <Accordion
            className="border-b last-of-type:border-b-0"
        >
            <Accordion.Header className="items-start" >
                {({ open }) => (
                    <div className="flex cursor-pointer items-center pb-3 text-md font-semibold">
                        Variants
                        <BsChevronDown 
                            className={cn(
                                "h-4 w-4 -rotate-90 transform transition-transform duration-300 ms-2",
                                open && "-rotate-0"
                            )}
                        />
                    </div>
                )}
            </Accordion.Header>
            <Accordion.Body className="mb-7">
                {nodes.map((variant) => (
                    <div key={variant.id}>
                        <VariantDetailColumns variant={variant} />
                    </div>
                ))}
            </Accordion.Body>
        </Accordion >
    )
}

