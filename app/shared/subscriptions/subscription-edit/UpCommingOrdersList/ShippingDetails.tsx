import { Box, Text, Title } from "rizzui";

interface ShippingDetailsProps {
    address: any;
    displayName: string;
    addressId: number | null;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = ({ address, displayName, addressId }) => {
    if (!address) return null;

    return (
        <Box className="rounded-[10px] border border-muted w-full p-3">
            <Title as="h6" className="text-md font-semibold mb-3">
                Shipping Address (ID #{addressId})
            </Title>
            <Box>
                <Text className="text-sm">{displayName}</Text>
                <Text className="text-sm">{address.address1}</Text>
                {address.address2 && <Text className="text-sm">{address.address2}</Text>}
                <Text className="text-sm">
                    {address.city}, {address.province}, {address.country} - {address.zip}
                </Text>
            </Box>
        </Box>
    );
};

export default ShippingDetails;
