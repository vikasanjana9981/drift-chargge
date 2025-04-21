import { useEffect, useRef, useState } from "react";
import { Modal, Title, Button, Select, Flex, Loader, Box, Text } from "rizzui";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { NumberInput } from "app/shared/products/selling-plan-groups/components/NumberInput";
import { DatePicker } from "app/packages/ui/datepicker";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import ProductItemSkeleton from "app/shared/skeletons/ProductItemSkeleton";
import type { ProductSingleNode } from "app/types/product/ProductNode";
import PriceRange from "../components/PriceRange";
import { extractNumericId, formatDate, formatPrice } from "app/packages/utils/shopifyIdUtils";
import { useAtom } from "jotai";
import { shopObject } from "app/states/shopAtom";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";
import { SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";

const SwapProductModal = ({
    modalState,
    setModalState,
    subscriptionLine
}: {
    modalState: boolean;
    setModalState: (val: boolean) => void;
    subscriptionLine?: SubscriptionLineItem;
}) => {
    const getFetcher = useFetcher<any>();
    const submitFetcher = useFetcher<any>();
    const [subscriptionContract] = useAtom(subscriptionContractAtom);
    const [step, setStep] = useState<1 | 2>(1);
    const [products, setProducts] = useState<any[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductSingleNode | null>(null);
    const [variantOptions, setVariantOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [sku, setSku] = useState<string>('');
    const [shop] = useAtom(shopObject);
    const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
    if (!subscriptionContract) return null
    const { nextBillingDate } = subscriptionContract

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalState) {
            setStep(1);
            setProducts([]);
            setCursor(null);
            fetchProducts(null);
        }
    }, [modalState]);

    const fetchProducts = (cursorParam: string | null) => {
        setLoadingProducts(true);
        const formData = new FormData();
        formData.append("action", "getProducts");
        if (cursorParam) formData.append("cursor", cursorParam);
        getFetcher.submit(formData, { method: "POST", action: ".", encType: "multipart/form-data" });
    };

    useEffect(() => {
        if (getFetcher.state === "idle" && getFetcher.data?.success && getFetcher.data?.products) {
            const newProducts = getFetcher.data.products.edges.map((edge: any) => edge.node);
            setProducts((prev) => [...prev, ...newProducts]);
            setCursor(getFetcher.data.products.pageInfo.endCursor || null);
            setHasNextPage(getFetcher.data.products.pageInfo.hasNextPage);
            setLoadingProducts(false);
        } else if (getFetcher.state === "idle" && getFetcher.data && !getFetcher.data.success) {
            toast.error(getFetcher.data.error || "Failed to fetch product info");
        }
    }, [getFetcher.state, getFetcher.data]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage && !loadingProducts) {
                fetchProducts(cursor);
            }
        }, { threshold: 1 });

        const current = containerRef.current;
        if (current) observer.observe(current);
        return () => current && observer.unobserve(current);
    }, [hasNextPage, loadingProducts, cursor]);

    const handleNext = () => {
        if (!selectedProduct) return toast.error("Please select a product");
        const firstVariant = selectedProduct.variants?.nodes?.[0];
        const options = selectedProduct.variants.nodes
            .filter((v: any) => v && v.title && v.id)
            .map((v: any) => ({ label: v.title, value: v.id }));

        setVariantOptions(options);
        setSelectedVariant(firstVariant?.id || null);
        setPrice(parseFloat(firstVariant?.price || "0"));
        setSku(firstVariant?.sku || "");
        setStep(2);
    };

    const handleSubmit = () => {
        if (!selectedProduct || !selectedVariant) return toast.error("Missing data");
        const formData = new FormData();
        formData.append("action", "subscriptionLineProductUpdate");
        const formState: Partial<SubscriptionLineItem> = {
            id: subscriptionLine?.id,
            productId: selectedProduct?.id,
            variantId: selectedVariant,
            quantity,
        };
        formData.append("updatedLine", JSON.stringify(formState));

        submitFetcher.submit(formData, { method: "POST", action: ".", encType: "multipart/form-data" });
    };

    useEffect(() => {
        if (submitFetcher.state === "idle" && submitFetcher.data) {
            if (submitFetcher.data.success) {
                toast.success("Product swapped successfully!");
                resetModal();
            } else {
                toast.error(submitFetcher.data.error || "Something went wrong");
            }
        }
    }, [submitFetcher.state, submitFetcher.data]);

    const resetModal = () => {
        setModalState(false);
        setStep(1);
        setProducts([]);
        setCursor(null);
        setSelectedProduct(null);
        setSelectedVariant(null);
        setVariantOptions([]);
    };

    const currentVariant = selectedProduct?.variants.nodes.find(
        (v: any) => v.id === selectedVariant
    );
    console.log('selectedProduct', selectedProduct);
    console.log('currentVariant', currentVariant);
    return (
        <Modal isOpen={modalState} onClose={resetModal} containerClassName="min-w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="p-4">
                <div className="flex justify-between mb-6">
                    <Title as="h3">{step === 1 ? "Swap Product" : "Edit Variant"}</Title>
                    <Button variant={"text" as any} onClick={resetModal}><FaXmark /></Button>
                </div>

                {step === 1 ? (
                    <div className="space-y-4">
                        {products.map((product: ProductSingleNode, index) => {
                            console.log('productssss', product)
                            return (
                                <div key={product.id + index} className="flex items-center justify-between border p-3 rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.featuredMedia?.preview?.image?.url || "/placeholder.png"}
                                            alt={product.featuredMedia?.preview?.image?.altText || product.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <div className="font-bold">{product.title}</div>
                                            <div className="text-sm text-[#606270] font-bold">
                                                {product.priceRangeV2 && (
                                                    <PriceRange
                                                        priceRangeV2={product.priceRangeV2}
                                                        className="text-sm font-bold"
                                                    />
                                                )}
                                            </div>
                                            <div className="text-xs font-bold text-[#606270]">
                                                Product ID: {extractNumericId(product.id)}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {selectedProduct?.id === product.id ? (
                                            <span className="flex items-center gap-2 text-green-600 font-semibold">
                                                <FaCheck /> Selected
                                            </span>
                                        ) : (
                                            <Button
                                                size="md"
                                                onClick={() => setSelectedProduct(product)}
                                                variant={"outline" as any}
                                            >
                                                Select
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        <div ref={containerRef} className="w-full py-4 text-center">
                            {loadingProducts && (
                                <Flex gap="2" direction="col" className="w-full">
                                    {[...Array(3)].map((_, index) => (
                                        <ProductItemSkeleton key={index} />
                                    ))}
                                </Flex>
                            )}
                        </div>

                        <Flex justify="end" className="sticky bottom-0 bg-white p-4">
                            <Button
                                variant={"outline" as any}
                                onClick={resetModal}
                            >Cancel</Button>
                            <Button onClick={handleNext} className="ml-2">Next</Button>
                        </Flex>
                    </div>
                ) : (
                    selectedProduct && (
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 border p-3 rounded-md">
                                <img
                                    src={selectedProduct.featuredMedia?.preview?.image?.url || "/placeholder.png"}
                                    className="w-14 h-14 rounded"
                                />
                                <div>
                                    <div className="font-semibold text-[#2E3685]">{selectedProduct.title}</div>
                                    <div className="text-sm text-[#606270]">SKU: {sku || "N/A"}</div>
                                    <div className="text-xs text-[#606270]">Product ID: {extractNumericId(selectedProduct.id)}</div>
                                </div>
                            </div>

                            <Select
                                label="Variant"
                                options={variantOptions}
                                value={variantOptions.find((opt) => opt.value === selectedVariant)}
                                onChange={(opt: any) => {
                                    setSelectedVariant(opt?.value);
                                    const variant = selectedProduct.variants.nodes.find(v => v.id === opt?.value);
                                    if (variant?.price) {
                                        setPrice(parseFloat(variant.price))
                                        setSku(variant.sku)
                                    };
                                }}
                            />

                            <NumberInput label="Quantity" value={quantity} onChange={setQuantity} />
                            {/* <NumberInput label="Price" value={price} onChange={setPrice}  /> */}
                            <Flex direction="col">
                                <Box>
                                    <Text className="font-semibold">Price</Text>
                                    <Text>{formatPrice(price, moneyWithCurrencyFormat)}</Text>
                                </Box>
                                <Box>
                                    <Text className="font-semibold">Next Billing Date</Text>
                                    <Text>{formatDate(nextBillingDate, false)}</Text>
                                </Box>
                            </Flex>

                            <Flex justify="end" className="pt-4">
                                <Button variant={"outline" as any} onClick={() => setStep(1)}>Back</Button>
                                <Button
                                    className="ml-2"
                                    onClick={handleSubmit}
                                    isLoading={submitFetcher.state !== "idle"}
                                    loader={<Loader variant="spinner" />}
                                >
                                    Save
                                </Button>
                            </Flex>
                        </div>
                    )
                )}
            </div>
        </Modal>
    );
};

export default SwapProductModal;
