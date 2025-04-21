import { Link } from "@remix-run/react";
import { routes } from "app/config/routes";
import PageHeader from "app/shared/page-header";
import { ProductSingleNode } from "app/types/product/ProductNode";
import ProductDetails from "./productDetails";
import SubscriptionPlansGroups from "./subscriptionPlans";
import { useEffect, useState } from "react";
import { Badge, Box, MultiSelect, Text, Title } from "rizzui";
import { formatDate } from "app/packages/utils/shopifyIdUtils";

const pageHeader = {
    breadcrumb: [
        {
            href: routes.products.products,
            name: 'Products',
        },
        {
            name: 'Edit',
        },
    ],
};


export default function ProductEditMain({ productResponse }: {
    productResponse: ProductSingleNode | any
}) {
    console.log('productResponse', productResponse)
    return (
        <>
            <PageHeader title={productResponse.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 lg:mt-0">
                    <Link
                        to={routes.products.products}
                        className="w-full lg:w-auto"
                    >
                    </Link>
                </div>
            </PageHeader>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                        <ProductDetails productResponse={productResponse} />
                        <SubscriptionPlansGroups productResponse={productResponse} />
                    </div>

                    <div className="col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block">
                        <ProductSatusBlock productResponse={productResponse} />
                        <ProductInCollection productResponse={productResponse} />
                        <ProductChangeBlock productResponse={productResponse} />
                    </div>
                </div>
            </div >

        </>
    )
}

const ProductInCollection = ({ productResponse }: { productResponse: ProductSingleNode }) => {
    const options = [
        { label: 'Apple 🍎', value: 'apple' },
        { label: 'Banana 🍌', value: 'banana' },
        { label: 'Cherry 🍒', value: 'cherry' },
    ];

    const [value, setValue] = useState([]);
    return (
        <Box className="rounded-[10px] border border-muted p-4 mt-5">
            <Title as="h3" className="text-[#848BD4] font-medium xl:text-lg">Billion Grid Collection</Title>
            <div className="flex items-center gap-3">
                <MultiSelect
                    value={value}
                    options={options}
                    label="Multi Select"
                    onChange={setValue as any}
                />
            </div>
        </Box>
    )
}

const ProductSatusBlock = ({ productResponse }: { productResponse: ProductSingleNode }) => {
    const {
        status
    } = productResponse
    return (
        <Box className="rounded-[10px] border border-muted p-4">
            <div>
                <Title as="h3" className="text-[#848BD4] font-medium xl:text-lg">Product Status</Title>
                <div className="flex items-center gap-3">
                    <Badge
                        renderAsDot
                        color={status.toLowerCase() === 'active' ? 'success' : 'danger'}
                        size="md"
                    />
                    <Text>{productResponse.status}</Text>
                </div>
            </div>

            <div>
                <Title as="h3" className="text-[#848BD4] font-medium xl:text-lg">Online Store Status</Title>
                <div className="flex items-center gap-3">
                    <Badge
                        renderAsDot
                        color={status.toLowerCase() === 'active' ? 'success' : 'danger'}
                        size="md"
                    />
                    <Text>Published</Text>
                </div>
            </div>
        </Box>
    )
}


const ProductChangeBlock = ({ productResponse }: { productResponse: ProductSingleNode }) => {
    const {
        createdAt,
        updatedAt
    } = productResponse

    return (
        <Box className="rounded-[10px] border border-muted p-4 mt-5">
            <div>
                <Title as="h3" className="text-[#848BD4] font-medium xl:text-lg">Last Updated</Title>
                <div className="flex items-center gap-3">
                    <Text className="text-sm">{formatDate(updatedAt)}</Text>
                </div>
            </div>

            <div className="mt-3">
                <Title as="h3" className="text-[#848BD4] font-medium xl:text-lg">Created At</Title>
                <div className="flex items-center gap-3">
                    <Text className="text-sm">{formatDate(createdAt)}</Text>
                </div>
            </div>
        </Box>
    )
}