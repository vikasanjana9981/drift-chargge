import React from "react";
import { Flex, Text, Dropdown } from "rizzui";
import { IconType } from "react-icons";

interface DropdownActionItemProps {
    icon: IconType;
    label: string;
    onClick?: () => void;
}

const DropdownActionItem: React.FC<DropdownActionItemProps> = ({ icon: Icon, label, onClick }) => {
    return (
        <Dropdown.Item onClick={onClick}>
            <Flex align="center" gap="2">
                <Icon />
                <Text>{label}</Text>
            </Flex>
        </Dropdown.Item>
    );
};

export default DropdownActionItem;
