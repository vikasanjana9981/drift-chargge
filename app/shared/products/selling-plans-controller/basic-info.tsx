import { messages } from "app/config/messages";
import cn from "app/packages/utils/class-names";
import FormGroup from "app/shared/form-group";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui/input";
import { Select } from "rizzui/select";
import { Text } from "rizzui/typography";

export default function SellingPlanGroupBasicInfo({ className }: { className?: string }) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const basicInfo = messages.products.createSellingPlans.basicInfo
    return (
        <div className="p-3 cursor-pointer flex flex-col gap-y-4 rounded-[10px] border border-muted">
            <FormGroup
                title='Basic Info'
                description=""
                className={cn(className)}
            >
                <div className="grid grid-cols-1 gap-3">
                    <div>
                        <Input
                            label={basicInfo.title}
                            placeholder={basicInfo.inputs.planName.placeHolder}
                            {...register('name')}
                            error={errors.title?.message as string}
                        />
                        <Text as="p" className="text-sm text-gray-500">{basicInfo.description}</Text>
                    </div>
                </div>
            </FormGroup>
        </div>
    )

}