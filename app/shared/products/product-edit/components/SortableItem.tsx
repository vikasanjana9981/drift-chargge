import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ node }: { node: any }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: node.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-3 p-3 border rounded cursor-grab bg-white shadow"
        >
            <strong className="text-lg">{node.name}</strong>
            <p className="text-sm text-gray-600">{node.merchantCode}</p>
            {node.sellingPlans.edges.map(({ node: sellingPlan }: { node: any }) => (
                <p key={sellingPlan.id} className="text-gray-500">
                    - {sellingPlan.name} ({sellingPlan.deliveryPolicy.intervalCount} {sellingPlan.deliveryPolicy.interval})
                </p>
            ))}
        </li>
    );
};