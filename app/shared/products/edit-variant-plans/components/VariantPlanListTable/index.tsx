import VariantDetailColumns from './VariantDetailColumns';
import { ProductVariantNode, SellingPlanEdge } from 'app/types/product/ProductNode';
import { Checkbox, Table } from 'rizzui';

interface VariantPlanListTableProps {
    sellingPlans: SellingPlanEdge[];
    tableData: ProductVariantNode[];
    handleCheckboxChange: (variantId: string, planId: string, checked: boolean) => void;
    variantCheckboxes: Record<string, boolean>;
    handleAllVariantsChange: any,
    allVariantsChecked:any
}

const VariantPlanListTable = ({
    sellingPlans,
    tableData,
    handleCheckboxChange,
    variantCheckboxes,
    handleAllVariantsChange,
    allVariantsChecked
}: VariantPlanListTableProps) => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Variant Title</Table.Head>
                    {sellingPlans.map((plan: SellingPlanEdge) => (
                        <Table.Head key={plan.node.id}>{plan.node.name}</Table.Head>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Head>All</Table.Head>
                    {sellingPlans.map((plan: SellingPlanEdge, planIndex: number) => (
                        <Table.Head key={plan.node.id}>
                            <Checkbox
                                checked={allVariantsChecked[planIndex]}
                                onChange={(e) => handleAllVariantsChange(planIndex, e.target.checked)}
                            />
                        </Table.Head>
                    ))}
                </Table.Row>

                {tableData.map((variant: ProductVariantNode) => (
                    <Table.Row key={variant.id}>
                        <Table.Cell>
                            <VariantDetailColumns variant={variant} />
                        </Table.Cell>
                        {sellingPlans.map((plan: SellingPlanEdge) => {
                            const key = `${variant.id}-${plan.node.id}`;
                            return (
                                <Table.Cell key={key}>
                                    <Checkbox
                                        checked={variantCheckboxes[key] || false}
                                        onChange={(e) => handleCheckboxChange(variant.id, plan.node.id, e.target.checked)}
                                    />
                                </Table.Cell>
                            );
                        })}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default VariantPlanListTable