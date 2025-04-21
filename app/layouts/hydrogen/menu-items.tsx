import { DUMMY_ID } from 'app/config/constants';
import { routes } from 'app/config/routes';
import {
  PiChartBarDuotone,
  PiClipboardTextDuotone,
  PiCurrencyCircleDollarDuotone,
  PiFolderDuotone,
  PiGearDuotone,
  PiHeadsetDuotone,
  PiShoppingCartDuotone,
  PiStorefrontDuotone,
  PiTagDuotone,
  PiToolboxDuotone,
  PiUsersDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: routes.home,
    icon: <PiFolderDuotone />,
    badge: ''
  },
  {
    name: 'Analytics',
    href: routes.analytics,
    icon: <PiChartBarDuotone />,
  },
  {
    name: 'Subscriptions',
    href: routes.subscriptions.dashboard,
    icon: <PiCurrencyCircleDollarDuotone />,
  },
  {
    name: 'Customers',
    href: routes.customers.dashboard,
    icon: <PiUsersDuotone />,
  },
  {
    name: 'Orders',
    href: routes.orders.dashboard,
    icon: <PiClipboardTextDuotone />,
  },
  {
    name: 'Products',
    href: '#',
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: 'Products',
        href: routes.products.products,
        badge: ''
      },
      {
        name: 'Selling Plans',
        href: routes.products.sellingPlans,
        badge: ''
      },
      {
        name: 'Collections',
        href: routes.products.collections,
        badge: ''
      },
      {
        name: 'Gifts',
        href: routes.products.gifts,
        badge: ''
      }
    ]
  },
  {
    name: 'Discounts',
    href: routes.discounts.dashboard,
    icon: <PiTagDuotone />,
  },
  {
    name: 'Tools & Apps',
    href: '#',
    icon: <PiToolboxDuotone />,
    dropdownItems: [
      {
        name: 'Bulk Updates',
        href: routes.tools.bulkUpdates,
        badge: ''
      },
      {
        name: 'Migrations',
        href: routes.tools.migrations,
        badge: ''
      },
      {
        name: 'Data Exports',
        href: routes.tools.dataExports,
        badge: ''
      },
    ],
  },
  {
    name: 'Storefront Settings',
    href: '#',
    icon: <PiStorefrontDuotone />,
    dropdownItems: [
      {
        name: 'Customer Portal',
        href: routes.storefront.customerPortal,
        badge: ''
      },
      {
        name: 'Widgets',
        href: routes.storefront.widgets,
        badge: ''
      },
      {
        name: 'Translations',
        href: routes.storefront.translations,
        badge: ''
      },
    ],
  },
  {
    name: 'Settings',
    href: '#',
    icon: <PiGearDuotone />,
    dropdownItems: [
      {
        name: 'General Settings',
        href: routes.settings.general,
        badge: ''
      },
      {
        name: 'Notifications',
        href: routes.settings.notifications,
        badge: ''
      },
    ],
  },
  {
    name: 'Help',
    href: routes.help,
    icon: <PiHeadsetDuotone />,
  },
];
