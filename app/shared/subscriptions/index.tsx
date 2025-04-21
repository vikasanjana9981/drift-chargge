import React from 'react'
import PageHeader from '../page-header'
import { Link } from '@remix-run/react'
import { routes } from 'app/config/routes'
import SubscriptionsTable from './SubscriptionsTable/table';
import { SubscriptionContractsResponse } from 'app/types/subscription/subscriptionQueryTypes';

const pageHeader = {
    title: 'Subscriptions',
    breadcrumb: [
        {
            href: routes.subscriptions.dashboard,
            name: 'Products',
        },
        {
            name: 'List',
        },
    ],
};


const SubscriptionsList = ({ responseData, first }: { responseData: SubscriptionContractsResponse, first: number }) => {
    return (
        <div>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
                <div className="mt-4 flex items-center gap-3 lg:mt-0">
                    <Link
                        to={routes.subscriptions.dashboard}
                        className="w-full lg:w-auto"
                    >
                    </Link>
                </div>
            </PageHeader>

            <SubscriptionsTable responseData={responseData} pageSize={first} />
        </div>
    )
}

export default SubscriptionsList