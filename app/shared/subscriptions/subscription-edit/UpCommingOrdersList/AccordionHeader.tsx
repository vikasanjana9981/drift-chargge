import { FaChevronDown } from "react-icons/fa6";

interface AccordionHeaderProps {
    open: boolean;
    title: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ open, title }) => {
    return (
        <div className="flex gap-2 w-full cursor-pointer items-center py-2 text-xl font-semibold">
            <FaChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`}
            />
            {title}
        </div>
    );
};

export default AccordionHeader;
