import OneTimePlanSettings from "./OneTimePlanSettings";
import PayPerShipment from "./PayPerShipment";
import PrePaidSubscriptions from "./PrePaidSubscription";
import { Tab } from "rizzui/tabs";
import { GiTakeMyMoney } from "react-icons/gi";
import { Flex } from "rizzui/flex";
import { Button } from "rizzui/button";
import { Title } from "rizzui/typography";
import { useSearchParams } from "@remix-run/react";
import OneTimePlanSettingsCreate from "./OneTimePlanSettings/OneTimePlanSettingsCreate";
import PayPerShipmentCreate from "./PayPerShipment/PayPerShipmentCreate";
import PrePaidSubscriptionsCreate from "./PrePaidSubscription/PrePaidSubscriptionsCreate";


export default function CreateSellingPlans({
    handleSavePlans,
    createPlanLoader
}: any) {
    const [searchParams] = useSearchParams();
    const plansUpdate = searchParams.get('plansUpdate') === 'yes';
    return (
        <div className="container">
            <div className="grid grid-cols-[80%_15%] gap-4 mt-4 relative">
                <div>
                    <div className="grid col-span-full gap-4 2xl:grid-cols-2 4xl:col-span-8 4xl:gap-5 xl:gap-7 xyz">
                        <Tab>
                            <Tab.List>
                                <Tab.ListItem>Onetime Settings</Tab.ListItem>
                                <Tab.ListItem>
                                    <Flex align="center">
                                        <GiTakeMyMoney />
                                        <Title as='h3' className='text-sm'>
                                            Pay Per Shipment
                                        </Title>
                                    </Flex>
                                </Tab.ListItem>
                                <Tab.ListItem>Prepaid Subscriptions</Tab.ListItem>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    {
                                        plansUpdate ? (
                                            <OneTimePlanSettings />
                                        ) : (
                                            <OneTimePlanSettingsCreate />
                                        )
                                    }

                                </Tab.Panel>
                                <Tab.Panel>
                                    {
                                        plansUpdate ? (
                                            <PayPerShipment />
                                        ) : (
                                            <PayPerShipmentCreate />
                                        )
                                    }
                                </Tab.Panel>
                                <Tab.Panel>
                                    {
                                        plansUpdate ? (
                                            <PrePaidSubscriptions />
                                        ) : (
                                            <PrePaidSubscriptionsCreate />
                                        )
                                    }
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab>

                    </div>
                </div>
                <div className="p-3 border border-muted rounded-[10px] sticky top-0 right-0 h-full w-full">
                    <div className='flex'>
                        <Button
                            className='ml-auto'
                            isLoading={createPlanLoader}
                            onClick={() => handleSavePlans()}
                        >
                            {plansUpdate ? "Update Plan" : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )

}