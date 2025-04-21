"use client";
import { Link } from "@remix-run/react";
import { routes } from "app/config/routes";
import PageHeader from "app/shared/page-header";
import { SubscriptionContractSingleNode } from "app/types/subscription/subscriptionQueryTypes";
import SubscriptionTopBlock from "./SubscriptionTopBlock";
import SubscriptionDetails from "./SubscriptionDetails";
import UpCommingOrdersList from "./UpCommingOrdersList";
import RecentOrdersList from "./RecentOrdersList";
import AdditionalDetails from "./AdditionalDetails";

const pageHeader = {
    breadcrumb: [
        {
            href: routes.subscriptions.dashboard,
            name: 'Subscriptions',
        },
        {
            name: 'Edit',
        },
    ],
};

export default function SubscriptionEditMain() {
    return (
        <>
            <PageHeader title={'Subscription'} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 lg:mt-0">
                    <Link
                        to={routes.products.products}
                        className="w-full lg:w-auto"
                    >
                    </Link>
                </div>
            </PageHeader>
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                        <SubscriptionTopBlock />
                        <SubscriptionDetails />
                        <UpCommingOrdersList />
                        <RecentOrdersList />
                    </div>
                    <div className="col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block">
                        <AdditionalDetails />
                    </div>
                </div>
            </div>
        </>
    )
}
