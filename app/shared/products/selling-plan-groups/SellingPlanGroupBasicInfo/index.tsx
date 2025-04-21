import { messages } from "app/config/messages";
import QuillEditor from "app/packages/ui/quill-editor";
import cn from "app/packages/utils/class-names";
import FormGroup from "app/shared/form-group";
import { PayPerShipmentPlanGroup } from "app/types/product/sellingPlans";
import { Input } from "rizzui/input";
import { Text } from "rizzui/typography";

export default function SellingPlanGroupBasicInfo({
    onChange,
    currentGroup
}: {
    onChange: <T extends keyof PayPerShipmentPlanGroup>(field: T, value: PayPerShipmentPlanGroup[T]) => void,
    currentGroup: PayPerShipmentPlanGroup
}) {
    const basicInfo = messages.products.createSellingPlans.basicInfo;

    return (
        <div className="border border-muted rounded-[10px] p-3">
            <FormGroup title='Basic Info' description="" className={cn('')}>
                <div>
                    <Input
                        label={basicInfo.title}
                        placeholder={basicInfo.inputs.planName.placeHolder}
                        value={currentGroup.groupName}
                        onChange={(e) => onChange('groupName', e.target.value)} // ✅ Directly updating groupName
                    />
                    <Text as="p" className="text-sm text-gray-500">{basicInfo.description}</Text>
                </div>

                {/* <div>
                    <QuillEditor
                        value={currentGroup?.descriptionContent || ''}
                        onChange={(content) => onChange('descriptionContent', content)}
                        label="Group Description"
                    />
                </div> */}
            </FormGroup>
        </div>
    );
}
