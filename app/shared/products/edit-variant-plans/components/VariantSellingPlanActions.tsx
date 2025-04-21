import { Box } from "rizzui/box";
import { Button } from "rizzui/button";
import { Flex } from "rizzui/flex";
import { Loader } from "rizzui/loader";

interface VariantSellingPlanActionsProps {
    disabled: boolean;
    handleDiscardChanges: () => void;
    handleSaveChanges: () => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const VariantSellingPlanActions = ({
    disabled,
    handleDiscardChanges,
    handleSaveChanges,
    isLoading,
    setIsLoading
}: VariantSellingPlanActionsProps) => {
    return (
        <Flex>
            <Box className="ms-auto flex gap-4">
                <Button
                    disabled={disabled}
                    onClick={handleDiscardChanges}
                    variant={'outline' as any}
                    color='danger'
                >
                    Discard changes
                </Button>
                <Button
                    disabled={disabled}
                    onClick={handleSaveChanges}
                    isLoading={isLoading}
                    loader={<Loader variant="spinner" />}
                >
                    Save Changes
                </Button>
            </Box>
        </Flex>
    );
};

export default VariantSellingPlanActions