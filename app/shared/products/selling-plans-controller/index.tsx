import { ProductSingleNode } from "app/types/product/ProductNode";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import SellingPlanGroupBasicInfo from "./basic-info";
import { useState } from "react";
import toast from "react-hot-toast";
import { Text } from "rizzui/typography";
import cn from "app/packages/utils/class-names";
import { useIsMounted } from "app/packages/hooks/use-is-mounted";
import { Element } from 'react-scroll'
import SellingPlanFrequency from "./frequency";
import { SellingGroupInputSchema, SellingGroupInputType } from "./form.schema";
import { defaultValues, sellingPlanGroupDefault } from "./default.values";

interface IndexProps {
    slug?: string;
    className?: string;
    product?: ProductSingleNode;
}

const formParts = {
    basicInfo: 'basicInfo',
    frequency: "frequency",
};

const MAP_STEP_TO_COMPONENT = {
    [formParts.basicInfo]: SellingPlanGroupBasicInfo,
    [formParts.frequency]: SellingPlanFrequency
};

export default function CreatePlanForm({
    slug,
    product,
    className,
}: IndexProps) {
    const sellingPlanGroup: any = sellingPlanGroupDefault

    const [isLoading, setLoading] = useState(false);
    const isMounted = useIsMounted();

    // Initialize React Hook Form with Zod Schema
    const methods = useForm<SellingGroupInputType>({
        resolver: zodResolver(SellingGroupInputSchema), // Use Zod for validation
        defaultValues: defaultValues(sellingPlanGroup)
    })

    const onSubmit: SubmitHandler<SellingGroupInputType> = (data) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success(
                <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
            );
            methods.reset(); // Reset form after submission
        }, 600);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="container">
            <div className="grid grid-cols-[60%_38%] gap-4 mt-4 relative">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className={cn(
                            'relative z-[19] [&_label.block>span]:font-medium',
                            className
                        )}
                    >
                        <div className="grid col-span-full gap-4 2xl:grid-cols-2 4xl:col-span-8 4xl:gap-5 xl:gap-7 xyz">
                            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
                                <Element
                                    key={key}
                                    name={formParts[key as keyof typeof formParts]}
                                >
                                    {<Component className="2xl:pt-9 3xl:pt-11" />}
                                </Element>
                            ))}
                        </div>

                    </form>
                </FormProvider>
                <div className="p-3 border border-muted rounded-[10px] sticky top-0 right-0 h-full w-full">
                    Preview
                </div>
            </div>
        </div>
    )
}
