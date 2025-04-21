import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Text, Title } from "rizzui/typography";


export const SellingPlanGroupsList = ({ group }: { group: any }) => {
    const [plans, setPlans] = useState(group);

    if (!group) return null

    /** Handles reordering when dragging ends */
    // const handleDragEnd = (event: any) => {
    //     const { active, over } = event;
    //     if (!over || active.id === over.id) return;

    //     const oldIndex = plans.findIndex(({ node }) => node.id === active.id);
    //     const newIndex = plans.findIndex(({ node }) => node.id === over.id);

    //     setPlans(arrayMove(plans, oldIndex, newIndex));
    // };

    return (
        <div className="w-full">
            <Title as="h2" className="text-base font-lg xl:text-lg">{group.name}</Title>
            
        </div>
        // <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        //     <SortableContext items={plans.map(({ node }) => node.id)} strategy={verticalListSortingStrategy}>
        //         <ul className="mt-2">
        //             {plans.map(({ node }) => (
        //                 <SortableItem key={node.id} node={node} />
        //             ))}
        //         </ul>
        //     </SortableContext>
        // </DndContext>
    );
};

/** Individual sortable item */

