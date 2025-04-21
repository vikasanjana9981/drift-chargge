import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import {
  Modal,
  Title,
  ActionIcon,
  Button,
  Flex,
  Loader,
  Input,
  Select,
} from "rizzui";
import type { ButtonProps } from 'rizzui'
import { SubscriptionLineItem } from "app/types/subscription/subscriptionQueryTypes";
import { ProductSingleNode } from "app/types/product/ProductNode";
import { NumberInput } from "app/shared/products/selling-plan-groups/components/NumberInput";
import SubscriptionProductFormSkeleton from "app/shared/skeletons/SubscriptionProductFormSkeleton";

const EditSubscriptionProductModal = ({
  modalState,
  setModalState,
  subscriptionLine,
}: {
  modalState: boolean;
  setModalState: (val: boolean) => void;
  subscriptionLine?: SubscriptionLineItem;
}) => {
  const getFetcher = useFetcher<any>(); // For getProductData
  const updateFetcher = useFetcher<any>(); // For subscriptionLineUpdate

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [formState, setFormState] = useState<SubscriptionLineItem | null>(null);
  const [initialState, setInitialState] = useState<SubscriptionLineItem | null>(null);
  const [variantOptions, setVariantOptions] = useState<{ label: string; value: string }[]>([]);

  const handleChange = (field: keyof SubscriptionLineItem, value: any) => {
    setFormState((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdate = () => {
    if (!formState?.id) return;
    setIsSubmitLoading(true);
    const formData = new FormData();
    formData.append("action", "subscriptionLineUpdate");
    formData.append("updatedLine", JSON.stringify(formState));

    updateFetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data",
    });
  };

  // Initial fetch on open
  useEffect(() => {
    if (modalState && subscriptionLine?.productId) {
      const formData = new FormData();
      formData.append("action", "getProductData");
      formData.append("productId", subscriptionLine.productId);
      getFetcher.submit(formData, {
        method: "POST",
        action: `.`,
        encType: "multipart/form-data",
      });
    }
  }, [modalState]);

  // Handle response for product data
  useEffect(() => {
    if (getFetcher.state === "idle" && getFetcher.data) {
      if (getFetcher.data.success && getFetcher.data.product) {
        const product = getFetcher.data.product as ProductSingleNode;
        const variants = product.variants.nodes || [];

        setVariantOptions(
          variants.map((v: any) => ({ label: v.title, value: v.id }))
        );

        if (!subscriptionLine) return;

        const updatedLine = {
          ...subscriptionLine,
          variantId: variants[0]?.id,
          variantTitle: variants[0]?.title,
          quantity: subscriptionLine.quantity ?? 1,
          lineDiscountedPrice: {
            amount: variants[0]?.price || "0",
            currencyCode: subscriptionLine.lineDiscountedPrice.currencyCode,
          },
        };

        setFormState(updatedLine);
        setInitialState(updatedLine);
      } else {
        toast.error(getFetcher.data.error || "Failed to fetch product info");
      }

      setIsLoading(false);
    }
  }, [getFetcher.state, getFetcher.data]);

  // Handle response for update
  useEffect(() => {
    if (updateFetcher.state === "idle" && updateFetcher.data) {
      if (updateFetcher.data.success) {
        toast.success("Subscription product updated!");
        setModalState(false);
      } else {
        toast.error(updateFetcher.data.error || "Something went wrong");
      }
      setIsSubmitLoading(false);
    }
  }, [updateFetcher.state, updateFetcher.data]);

  const hasChanged =
    JSON.stringify(formState) !== JSON.stringify(initialState);

  return (
    <Modal
      isOpen={modalState}
      onClose={() => setFormState(null)}
      containerClassName="min-w-[500px]"
    >
      <div className="m-auto p-3 relative min-h-[200px]">
        <div className="mb-7 flex items-center justify-between">
          <Title as="h3">Edit Subscription Product</Title>
          <ActionIcon
            size="sm"
            variant={"text" as any}
            onClick={() => setModalState(false)}
          >
            <FaXmark className="h-auto w-6" strokeWidth={1.8} />
          </ActionIcon>
        </div>

        {isLoading || !formState ? (
          <div className="w-full flex justify-center items-center min-h-[200px]">
            <SubscriptionProductFormSkeleton />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <Input label="Product Name" value={subscriptionLine?.title || ""} disabled />

              <Select
                label="Variant"
                options={variantOptions}
                value={variantOptions.find((opt: any) => opt.value === formState.variantId)}
                onChange={(opt: any) => {
                  handleChange("variantId", opt.value);
                  const selected = variantOptions.find(v => v.value === opt.value);
                  handleChange("variantTitle", selected?.label || "");
                }}
              />

              <Input label="Variant Name" value={formState.variantTitle || ""} disabled />

              <NumberInput
                label="Quantity"
                value={formState.quantity}
                onChange={(value: number) => handleChange("quantity", value)}
              />

              <NumberInput
                label="Recurring Price"
                value={parseFloat(formState.lineDiscountedPrice.amount)}
                onChange={(value: number) =>
                  setFormState((prev: any) =>
                    prev
                      ? {
                          ...prev,
                          lineDiscountedPrice: {
                            ...prev.lineDiscountedPrice,
                            amount: value,
                          },
                        }
                      : prev
                  )
                }
              />
            </div>

            <Flex justify="end" gap="1" className="mt-8 space-x-1">
              <Button variant={"text" as any} onClick={() => setModalState(false)}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleUpdate}
                isLoading={isSubmitLoading}
                loader={<Loader variant="spinner" />}
                disabled={!hasChanged || isLoading}
              >
                Save
              </Button>
            </Flex>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EditSubscriptionProductModal;
