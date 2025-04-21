import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
    Modal,
    Button,
    Title,
    Text,
    ActionIcon,
    Input,
    Password,
    Checkbox,
    Flex,
    Select,
    Loader,
} from "rizzui";

import { Country, State, City } from 'country-state-city';
import { Address } from "app/types/subscription/subscriptionQueryTypes";
import { PhoneNumber } from "app/packages/ui/phone-input";
import toast from "react-hot-toast";
import { useFetcher } from "@remix-run/react";
import { useAtom } from "jotai";
import { subscriptionContractAtom } from "app/states/subscriptionContractAtom";

type EditAddressMOdalProp = {
    modalState: boolean,
    setModalState: (state: boolean) => void
    defaultAddress?: Address;
}

const EditAddressModal = ({ modalState, setModalState, defaultAddress }: EditAddressMOdalProp) => {
    const [address, setAddress] = useState<Address>({
        firstName: "",
        lastName: "",
        company: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        zip: "",
        phone: "",
        countryCode: "",
        provinceCode: ""
    });
    const fetcher = useFetcher<any>();
    const [originalAddress, setOriginalAddress] = useState<Address | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Country and State options
    const countryOptions = Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.isoCode,
    }));

    const stateOptions = address.country
        ? State.getStatesOfCountry(address.countryCode).map((state) => ({
            label: state.name,
            value: state.isoCode,
        }))
        : [];

    // Set default values from props
    useEffect(() => {
        if (defaultAddress) {
            setAddress((prev) => ({ ...prev, ...defaultAddress }));
            setOriginalAddress({ ...defaultAddress });
        }
    }, [defaultAddress]);

    const handleChange = (field: keyof Address, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = () => {
        console.log("Updated Address:", address);
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", 'updateAddress');
        formData.append("address", JSON.stringify(address));

        fetcher.submit(formData, {
            method: "POST",
            action: `.`,
            encType: "multipart/form-data",
        });
    };

    const isAddressEqual = (a: Address, b: Address) => {
        const keys: (keyof Address)[] = [
            "firstName", "lastName", "company", "country", "countryCode",
            "address1", "address2", "city", "province", "provinceCode", "zip", "phone"
        ];

        return keys.every((key) => (a[key] || "") === (b[key] || ""));
    };

    useEffect(() => {
        console.log('fetcherdata', fetcher.data);
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher?.data?.success) {
                toast.success("Changes saved successfully!");
                setIsLoading(false);

            } else {
                toast.error(fetcher?.data?.error);
            }
            setIsLoading(false);
        }

    }, [fetcher.state, fetcher.data]);


    return (
        <Modal isOpen={modalState} onClose={() => setModalState(false)} containerClassName="min-w-[525px] max-h-[400px] overflow-y-auto">
            <div className="m-auto px-7 pt-6 pb-8">
                {/* Header */}
                <div className="mb-7 flex items-center justify-between">
                    <Title as="h3">Edit Shipping Address</Title>
                    <ActionIcon size="sm" variant={"text" as any} onClick={() => setModalState(false)}>
                        <FaXmark className="h-auto w-6" strokeWidth={1.8} />
                    </ActionIcon>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
                    {/* First Name */}
                    <Input
                        label="First Name"
                        placeholder="Enter first name"
                        value={address?.firstName || ''}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                    />

                    {/* Last Name */}
                    <Input
                        label="Last Name"
                        placeholder="Enter last name"
                        value={address?.lastName || ''}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        required
                    />

                    {/* Company Name (Full Width) */}
                    <div className="col-span-2">
                        <Input
                            label="Company Name"
                            placeholder="Enter company name"
                            value={address?.company || ''}
                            onChange={(e) => handleChange("company", e.target.value)}
                        />
                    </div>

                    {/* Country (Full Width) */}
                    <div className="col-span-2">
                        <Select
                            label="Country"
                            placeholder="Select a country"
                            searchable={true}
                            options={countryOptions}
                            value={address.country}
                            onChange={(option: any) => handleChange("country", option.value)}
                        />
                    </div>

                    <div className="col-span-1">
                        <Select
                            label="State/Province"
                            options={stateOptions}
                            searchable={true}
                            placeholder="Select State"
                            value={stateOptions.find((s) => s.value === address.provinceCode) || null}
                            onChange={(selectedOption: any) => handleChange("province", selectedOption?.value || "")}
                            disabled={!address.country} // Disable if no country is selected
                        />
                    </div>

                    {/* Address 1 */}
                    <Input
                        label="Address Line 1"
                        placeholder="Enter address line 1"
                        value={address?.address1 || ''}
                        onChange={(e) => handleChange("address1", e.target.value)}
                        required
                    />

                    {/* Address 2 */}
                    <Input
                        label="Address Line 2"
                        placeholder="Enter address line 2"
                        value={address?.address2 || ""}
                        onChange={(e) => handleChange("address2", e.target.value)}
                    />

                    {/* City */}
                    <Input
                        label="City"
                        placeholder="Enter city"
                        value={address.city || ''}
                        onChange={(e) => handleChange("city", e.target.value)}
                        required
                    />

                    {/* Zip Code */}
                    <Input
                        label="Zip Code"
                        placeholder="Enter zip code"
                        value={address.zip || ''}
                        onChange={(e) => handleChange("zip", e.target.value)}
                        required
                    />

                    <PhoneNumber
                        label="Phone"
                        placeholder="Enter phone number"
                        value={address.phone}
                        onChange={(phone: string) => handleChange("phone", phone)}
                    />
                </div>

                {/* Action Buttons */}
                <Flex justify="end" gap="1" className="mt-8 space-x-1">
                    <Button variant={"outline" as any} onClick={() => {
                        setIsLoading(false)
                        setModalState(false)
                    }}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        isLoading={isLoading}
                        loader={<Loader variant="spinner" />}
                        disabled={isLoading || !originalAddress || isAddressEqual(address, originalAddress)}
                    >
                        Update
                    </Button>
                </Flex>
            </div>
        </Modal>
    )
}

export default EditAddressModal