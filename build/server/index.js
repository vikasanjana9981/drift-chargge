var _a;
import { jsx, Fragment as Fragment$1, jsxs } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer, useLocation, Link, useNavigation, useMatches, Meta, Links, Outlet, ScrollRestoration, Scripts, useSearchParams, useFetcher, useParams, useNavigate, useLoaderData, useActionData, Form, useRouteError, redirect as redirect$1 } from "@remix-run/react";
import { createReadableStreamFromReadable, createCookie, json, redirect } from "@remix-run/node";
import { isbot } from "isbot";
import "@shopify/shopify-app-remix/adapters/node";
import { shopifyApp, ApiVersion, AppDistribution, LoginErrorType, boundary } from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import React, { Fragment, useRef, useState, useEffect, lazy, startTransition, Suspense, useCallback, useMemo } from "react";
import { PiFolderDuotone, PiChartBarDuotone, PiCurrencyCircleDollarDuotone, PiUsersDuotone, PiClipboardTextDuotone, PiShoppingCartDuotone, PiTagDuotone, PiToolboxDuotone, PiStorefrontDuotone, PiGearDuotone, PiHeadsetDuotone, PiCaretDownBold, PiMagnifyingGlassBold, PiCommand, PiXBold, PiFileTextDuotone, PiCheck, PiCalendarBlank, PiCheckCircleBold, PiTrashBold, PiPlusCircleBold, PiPencil, PiCaretUpFill, PiCaretDownFill, PiArchiveThin, PiGear, PiRepeatFill, PiCaretLeftBold, PiCaretRightBold, PiTextColumns, PiTrash, PiFunnel, PiTrashDuotone } from "react-icons/pi";
import { Collapse } from "rizzui/collapse";
import { atom, useAtom, useAtomValue, useSetAtom, Provider } from "jotai";
import { Badge } from "rizzui/badge";
import { Title, Text as Text$1 } from "rizzui/typography";
import { ActionIcon, Input, Button, Empty, SearchNotFoundIcon, Title as Title$1, cn as cn$1, Modal, Popover, Checkbox, Text, Badge as Badge$1, Avatar, Drawer, Flex, Switch, Box as Box$1, Table, Dropdown, FieldClearButton, FieldHelperText, FieldError, Select as Select$1, Loader as Loader$1, Textarea, RadioGroup, AdvancedRadio, Alert, Tooltip, Radio, Accordion, MultiSelect, Grid } from "rizzui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { useTheme, ThemeProvider as ThemeProvider$1 } from "next-themes";
import { Modal as Modal$1 } from "rizzui/modal";
import toast, { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { Select } from "rizzui/select";
import { Switch as Switch$1 } from "rizzui/switch";
import { Input as Input$1 } from "rizzui/input";
import { FaChevronUp, FaChevronDown, FaClock, FaGift, FaShip, FaArrowLeft, FaXmark, FaTrash, FaHashtag, FaBars, FaRegCreditCard, FaTag, FaLocationDot, FaRegCalendar, FaPencil, FaArrowsRotate, FaRegTrashCan, FaPowerOff, FaCircleInfo, FaCalendar, FaCheck as FaCheck$1, FaShopify, FaMoneyBill, FaGear, FaRepeat, FaEllipsisVertical, FaCopy } from "react-icons/fa6";
import ReactDatePicker from "react-datepicker";
import { Button as Button$1 } from "rizzui/button";
import { Tab } from "rizzui/tabs";
import { GiTakeMyMoney } from "react-icons/gi";
import { Loader } from "rizzui/loader";
import { Flex as Flex$1 } from "rizzui/flex";
import { ActionIcon as ActionIcon$1 } from "rizzui/action-icon";
import { Box } from "rizzui/box";
import { BsChevronDown, BsCalendarDate } from "react-icons/bs";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import { FaCheck, FaRegCopy, FaRegWindowClose, FaRegTrashAlt } from "react-icons/fa";
import { useSensors, useSensor, MouseSensor, TouchSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { arraySwap, SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFacetedRowModel, getFilteredRowModel, getExpandedRowModel, getPaginationRowModel, getFacetedUniqueValues, createColumnHelper, flexRender } from "@tanstack/react-table";
import pkg from "lodash";
import { useScroll, useSize } from "ahooks";
import { CSS } from "@dnd-kit/utilities";
import { GoPencil } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import "rc-table";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { AppProvider as AppProvider$1, Page, Card, FormLayout, Text as Text$2, TextField, Button as Button$2, Layout, BlockStack, Link as Link$1, List, Box as Box$2 } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}
const prisma = global.prisma || new PrismaClient();
dotenv.config();
const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  isEmbeddedApp: false,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
ApiVersion.October24;
const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
const authenticate = shopify.authenticate;
shopify.unauthenticated;
const login = shopify.login;
shopify.registerWebhooks;
shopify.sessionStorage;
const streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url
        }
      ),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const globalCss = "/assets/tailwind-DESqeHT1.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const routes$1 = {
  home: "/merchant/home",
  analytics: "/merchant/analytics",
  subscriptions: {
    dashboard: "/merchant/subscriptions"
  },
  customers: {
    dashboard: "/merchant/customers"
  },
  orders: {
    dashboard: "/merchant/orders"
  },
  products: {
    products: "/merchant/products",
    collections: "/merchant/collections",
    gifts: "/merchant/gifts",
    sellingPlans: "/merchant/sellingPlans"
  },
  discounts: {
    dashboard: "/merchant/discounts"
  },
  tools: {
    bulkUpdates: "/merchant/tools/bulk-updates",
    migrations: "/merchant/tools/migrations",
    dataExports: "/merchant/tools/data-exports"
  },
  storefront: {
    customerPortal: "/merchant/storefront/customer-portal",
    widgets: "/merchant/storefront/widgets",
    translations: "/merchant/storefront/translations"
  },
  settings: {
    general: "/merchant/settings/general",
    notifications: "/merchant/settings/notifications"
  },
  help: "/merchant/help"
};
const menuItems$1 = [
  {
    name: "Dashboard",
    href: routes$1.home,
    icon: /* @__PURE__ */ jsx(PiFolderDuotone, {}),
    badge: ""
  },
  {
    name: "Analytics",
    href: routes$1.analytics,
    icon: /* @__PURE__ */ jsx(PiChartBarDuotone, {})
  },
  {
    name: "Subscriptions",
    href: routes$1.subscriptions.dashboard,
    icon: /* @__PURE__ */ jsx(PiCurrencyCircleDollarDuotone, {})
  },
  {
    name: "Customers",
    href: routes$1.customers.dashboard,
    icon: /* @__PURE__ */ jsx(PiUsersDuotone, {})
  },
  {
    name: "Orders",
    href: routes$1.orders.dashboard,
    icon: /* @__PURE__ */ jsx(PiClipboardTextDuotone, {})
  },
  {
    name: "Products",
    href: "#",
    icon: /* @__PURE__ */ jsx(PiShoppingCartDuotone, {}),
    dropdownItems: [
      {
        name: "Products",
        href: routes$1.products.products,
        badge: ""
      },
      {
        name: "Selling Plans",
        href: routes$1.products.sellingPlans,
        badge: ""
      },
      {
        name: "Collections",
        href: routes$1.products.collections,
        badge: ""
      },
      {
        name: "Gifts",
        href: routes$1.products.gifts,
        badge: ""
      }
    ]
  },
  {
    name: "Discounts",
    href: routes$1.discounts.dashboard,
    icon: /* @__PURE__ */ jsx(PiTagDuotone, {})
  },
  {
    name: "Tools & Apps",
    href: "#",
    icon: /* @__PURE__ */ jsx(PiToolboxDuotone, {}),
    dropdownItems: [
      {
        name: "Bulk Updates",
        href: routes$1.tools.bulkUpdates,
        badge: ""
      },
      {
        name: "Migrations",
        href: routes$1.tools.migrations,
        badge: ""
      },
      {
        name: "Data Exports",
        href: routes$1.tools.dataExports,
        badge: ""
      }
    ]
  },
  {
    name: "Storefront Settings",
    href: "#",
    icon: /* @__PURE__ */ jsx(PiStorefrontDuotone, {}),
    dropdownItems: [
      {
        name: "Customer Portal",
        href: routes$1.storefront.customerPortal,
        badge: ""
      },
      {
        name: "Widgets",
        href: routes$1.storefront.widgets,
        badge: ""
      },
      {
        name: "Translations",
        href: routes$1.storefront.translations,
        badge: ""
      }
    ]
  },
  {
    name: "Settings",
    href: "#",
    icon: /* @__PURE__ */ jsx(PiGearDuotone, {}),
    dropdownItems: [
      {
        name: "General Settings",
        href: routes$1.settings.general,
        badge: ""
      },
      {
        name: "Notifications",
        href: routes$1.settings.notifications,
        badge: ""
      }
    ]
  },
  {
    name: "Help",
    href: routes$1.help,
    icon: /* @__PURE__ */ jsx(PiHeadsetDuotone, {})
  }
];
var LAYOUT_OPTIONS = /* @__PURE__ */ ((LAYOUT_OPTIONS2) => {
  LAYOUT_OPTIONS2["HYDROGEN"] = "hydrogen";
  LAYOUT_OPTIONS2["HELIUM"] = "helium";
  LAYOUT_OPTIONS2["LITHIUM"] = "lithium";
  LAYOUT_OPTIONS2["BERYLLIUM"] = "beryllium";
  LAYOUT_OPTIONS2["BORON"] = "boron";
  LAYOUT_OPTIONS2["CARBON"] = "carbon";
  return LAYOUT_OPTIONS2;
})(LAYOUT_OPTIONS || {});
const isomorphicLayoutAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("isomorphic-layout") : LAYOUT_OPTIONS.HYDROGEN
);
const isomorphicLayoutAtomWithPersistence = atom(
  (get) => get(isomorphicLayoutAtom),
  (get, set, newStorage) => {
    set(isomorphicLayoutAtom, newStorage);
    localStorage.setItem("isomorphic-layout", newStorage);
  }
);
function useLayout() {
  const [layout, setLayout] = useAtom(isomorphicLayoutAtomWithPersistence);
  return {
    layout: layout === null ? LAYOUT_OPTIONS.HYDROGEN : layout,
    setLayout
  };
}
const classes = {
  base: "text-xs px-2 duration-200 py-0.5 font-normal capitalize border tracking-wider font-lexend bg-opacity-50 dark:bg-opacity-40 dark:text-opacity-90 dark:text-gray-900 dark:backdrop-blur",
  color: {
    success: "border-green bg-green-lighter text-green-dark dark:bg-green",
    danger: "border-red bg-red-lighter text-red-dark dark:bg-red"
  },
  layout: {
    helium: {
      base: "bg-opacity-40 text-opacity-90 text-gray-0 dark:text-gray-900 backdrop-blur group-hover:bg-opacity-100 group-hover:text-opacity-100",
      success: "bg-green",
      danger: "bg-red"
    }
  }
};
function StatusBadge({ status }) {
  var _a2, _b;
  const { layout } = useLayout();
  const colorStatus = (status == null ? void 0 : status.toLowerCase()) === "new" ? "danger" : "success";
  const layoutKey = layout;
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "flat",
      size: "sm",
      color: colorStatus,
      className: cn(
        classes.base,
        classes.color[colorStatus],
        (_a2 = classes.layout[layoutKey]) == null ? void 0 : _a2.base,
        (_b = classes.layout[layoutKey]) == null ? void 0 : _b[colorStatus]
      ),
      children: status
    }
  );
}
function SidebarMenu() {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsx("div", { className: "mt-4 pb-3 3xl:mt-6", children: menuItems$1.map((item, index) => {
    var _a2, _b, _c;
    const isActive = pathname === (item == null ? void 0 : item.href);
    const pathnameExistInDropdowns = (_a2 = item == null ? void 0 : item.dropdownItems) == null ? void 0 : _a2.filter(
      (dropdownItem) => dropdownItem.href === pathname
    );
    const isDropdownOpen = Boolean(pathnameExistInDropdowns == null ? void 0 : pathnameExistInDropdowns.length);
    return /* @__PURE__ */ jsx(Fragment, { children: (item == null ? void 0 : item.href) ? /* @__PURE__ */ jsx(Fragment$1, { children: (item == null ? void 0 : item.dropdownItems) ? /* @__PURE__ */ jsx(
      Collapse,
      {
        defaultOpen: isDropdownOpen,
        header: ({ open, toggle }) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: toggle,
            className: cn(
              "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
              isDropdownOpen ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5" : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
            ),
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                (item == null ? void 0 : item.icon) && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cn(
                      "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                      isDropdownOpen ? "text-primary" : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                    ),
                    children: item == null ? void 0 : item.icon
                  }
                ),
                item.name
              ] }),
              /* @__PURE__ */ jsx(
                PiCaretDownBold,
                {
                  strokeWidth: 3,
                  className: cn(
                    "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                    open && "rotate-0 rtl:rotate-0"
                  )
                }
              )
            ]
          }
        ),
        children: (_b = item == null ? void 0 : item.dropdownItems) == null ? void 0 : _b.map((dropdownItem, index2) => {
          var _a3;
          const isChildActive = pathname === (dropdownItem == null ? void 0 : dropdownItem.href);
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: dropdownItem == null ? void 0 : dropdownItem.href,
              className: cn(
                "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                isChildActive ? "text-primary" : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
              ),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center truncate", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                        isChildActive ? "bg-primary ring-[1px] ring-primary" : "opacity-40"
                      )
                    }
                  ),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: dropdownItem == null ? void 0 : dropdownItem.name })
                ] }),
                ((_a3 = dropdownItem == null ? void 0 : dropdownItem.badge) == null ? void 0 : _a3.length) ? /* @__PURE__ */ jsx(StatusBadge, { status: dropdownItem == null ? void 0 : dropdownItem.badge }) : null
              ]
            },
            (dropdownItem == null ? void 0 : dropdownItem.name) + index2
          );
        })
      }
    ) : /* @__PURE__ */ jsxs(
      Link,
      {
        to: item == null ? void 0 : item.href,
        className: cn(
          "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
          isActive ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5" : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center truncate", children: [
            (item == null ? void 0 : item.icon) && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5",
                  isActive ? "text-primary" : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                ),
                children: item == null ? void 0 : item.icon
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: item.name })
          ] }),
          ((_c = item == null ? void 0 : item.badge) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsx(StatusBadge, { status: item == null ? void 0 : item.badge }) : null
        ]
      }
    ) }) : /* @__PURE__ */ jsx(
      Title,
      {
        as: "h6",
        className: cn(
          "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
          index !== 0 && "mt-6 3xl:mt-7"
        ),
        children: item.name
      }
    ) }, item.name + "-" + index);
  }) });
}
function Logo({ iconOnly = false, ...props }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: `0 0 ${iconOnly ? "48 26" : "155 28"}`,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "10.16",
            height: "19.93",
            fill: "currentColor",
            rx: "5.08",
            transform: "rotate(29.49 -5.18 20.77) skewX(.85)"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "10.16",
            height: "25.62",
            fill: "currentColor",
            rx: "5.08",
            transform: "matrix(.87 .492 -.48 .878 27.17 0)"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "10.16",
            height: "10.25",
            fill: "currentColor",
            opacity: ".5",
            rx: "5.08",
            transform: "rotate(29.49 -8.24 75.34) skewX(.85)"
          }
        ),
        !iconOnly && /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M58.94 21.4h-2.66v-9.83h2.66v9.84ZM55.96 8.36c0-.46.16-.84.48-1.16.32-.34.7-.5 1.16-.5.45 0 .84.16 1.16.48.32.32.48.71.48 1.18 0 .44-.16.82-.48 1.14-.32.32-.7.48-1.16.48-.45 0-.84-.16-1.16-.48-.32-.32-.48-.7-.48-1.14Zm4.49 10.32 2.28-.5c.02.42.2.78.5 1.08.32.28.75.42 1.3.42.41 0 .73-.1.96-.28a.87.87 0 0 0 .34-.7c0-.5-.36-.82-1.06-.96l-1.3-.3a3.78 3.78 0 0 1-2.08-1.08 2.96 2.96 0 0 1 .36-4.14c.7-.63 1.58-.94 2.64-.94.66 0 1.25.1 1.76.3.5.18.9.43 1.18.74.28.29.5.59.64.9.14.3.24.6.28.9l-2.22.5a1.63 1.63 0 0 0-.48-.92c-.26-.27-.64-.4-1.14-.4-.35 0-.65.1-.9.28a.85.85 0 0 0-.36.7c0 .48.3.77.9.88l1.4.3c.94.2 1.66.56 2.16 1.1.5.53.76 1.17.76 1.92 0 .88-.34 1.64-1 2.28a3.9 3.9 0 0 1-2.82.96c-.7 0-1.32-.1-1.86-.3a3.51 3.51 0 0 1-1.28-.8c-.3-.34-.52-.66-.68-.98a3.52 3.52 0 0 1-.28-.96Zm12.16-.12c.5.5 1.08.74 1.78.74s1.28-.25 1.76-.74c.5-.5.74-1.18.74-2.06 0-.88-.25-1.57-.74-2.06a2.36 2.36 0 0 0-1.76-.74c-.7 0-1.29.24-1.78.74-.48.5-.72 1.18-.72 2.06 0 .88.24 1.56.72 2.06Zm-1.92-5.8a5.02 5.02 0 0 1 3.7-1.48 5.07 5.07 0 0 1 5.16 5.22 5.07 5.07 0 0 1-5.16 5.22 5.02 5.02 0 0 1-5.16-5.22c0-1.5.48-2.76 1.46-3.74ZM83.8 21.4h-2.66v-9.84h2.54v1.2c.25-.46.65-.82 1.2-1.08a3.8 3.8 0 0 1 1.68-.4c1.42 0 2.4.54 2.92 1.64a3.48 3.48 0 0 1 3.12-1.64c1 0 1.84.31 2.52.94.7.62 1.04 1.56 1.04 2.8v6.38h-2.58v-5.84c0-.56-.15-1.01-.44-1.34-.28-.35-.72-.52-1.3-.52-.55 0-.99.18-1.32.56a2 2 0 0 0-.5 1.38v5.76h-2.64v-5.84c0-.56-.15-1.01-.44-1.34-.3-.35-.73-.52-1.3-.52-.56 0-1.01.18-1.34.56-.34.36-.5.82-.5 1.38v5.76Zm17.2-2.86c.48.5 1.08.74 1.77.74.7 0 1.28-.25 1.76-.74.5-.5.74-1.18.74-2.06 0-.88-.25-1.57-.74-2.06a2.36 2.36 0 0 0-1.76-.74c-.7 0-1.28.24-1.78.74-.48.5-.72 1.18-.72 2.06 0 .88.24 1.56.72 2.06Zm-1.93-5.8a5.02 5.02 0 0 1 3.7-1.48 5.07 5.07 0 0 1 5.16 5.22 5.07 5.07 0 0 1-5.16 5.22 5.02 5.02 0 0 1-5.16-5.22c0-1.5.49-2.76 1.46-3.74Zm16.46-1.22v2.68a4.08 4.08 0 0 0-.8-.08c-.76 0-1.37.22-1.84.66-.47.42-.7 1.13-.7 2.12v4.5h-2.66v-9.84h2.58v1.46c.48-1.03 1.41-1.54 2.8-1.54.15 0 .36.01.62.04Zm4.03 13.68h-2.66V11.57h2.58v1.2c.24-.4.63-.74 1.16-1a3.94 3.94 0 0 1 1.86-.42c1.4 0 2.5.48 3.32 1.44a5.45 5.45 0 0 1 1.22 3.68c0 1.5-.43 2.74-1.3 3.72a4.23 4.23 0 0 1-3.34 1.46c-1.3 0-2.25-.4-2.84-1.2v4.76Zm4.16-6.68c.47-.51.7-1.19.7-2.04 0-.86-.23-1.53-.7-2.02a2.26 2.26 0 0 0-1.74-.74c-.7 0-1.3.25-1.76.76-.46.49-.7 1.16-.7 2 0 .84.24 1.51.7 2.02.47.5 1.06.76 1.76.76s1.29-.25 1.74-.74Zm7.59-2.9v5.78h-2.66V6.93h2.66v5.46c.6-.72 1.49-1.08 2.66-1.08 1.2 0 2.1.36 2.72 1.1.63.72.94 1.65.94 2.8v6.2h-2.66v-5.74c0-.59-.15-1.06-.46-1.42-.3-.36-.75-.54-1.36-.54-.55 0-.99.18-1.32.54-.32.36-.5.82-.52 1.38Zm11.18 5.78h-2.66v-9.84h2.66v9.84Zm-2.98-13.06c0-.46.16-.84.48-1.16.32-.34.7-.5 1.16-.5.45 0 .84.16 1.16.48.32.32.48.71.48 1.18 0 .44-.16.82-.48 1.14-.32.32-.7.48-1.16.48-.45 0-.84-.16-1.16-.48-.32-.32-.48-.7-.48-1.14Zm9.75 5.38c-.71 0-1.3.24-1.78.74-.48.49-.72 1.16-.72 2.02 0 .85.24 1.53.72 2.04.49.49 1.09.74 1.8.74.62 0 1.12-.16 1.5-.48.37-.34.62-.73.76-1.18l2.34.78c-.24.9-.76 1.68-1.56 2.34-.8.65-1.82.98-3.04.98a5.06 5.06 0 0 1-5.18-5.22c0-1.5.48-2.76 1.46-3.74a4.95 4.95 0 0 1 3.64-1.48c1.25 0 2.28.32 3.08.98.8.64 1.31 1.42 1.54 2.34l-2.38.8c-.32-1.11-1.05-1.66-2.18-1.66Z"
          }
        )
      ]
    }
  );
}
function Sidebar({ className }) {
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6", children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/merchant/home",
            "aria-label": "Site Logo",
            className: "text-gray-800 hover:text-gray-900",
            children: /* @__PURE__ */ jsx(Logo, { className: "max-w-[155px]" })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "custom-scrollbar h-[calc(100%-80px)] overflow-y-auto", children: /* @__PURE__ */ jsx(SidebarMenu, {}) })
      ]
    }
  );
}
const drawerAtom = atom({
  isOpen: false,
  view: null,
  placement: "right",
  containerClassName: ""
});
function useDrawer() {
  const state = useAtomValue(drawerAtom);
  const setState = useSetAtom(drawerAtom);
  const openDrawer = ({
    view,
    placement,
    containerClassName
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      containerClassName
    });
  };
  const closeDrawer = () => {
    setState({
      ...state,
      isOpen: false
    });
  };
  return {
    ...state,
    openDrawer,
    closeDrawer
  };
}
function HamburgerButton({
  view,
  placement = "left",
  containerClassName = "max-w-[320px]",
  className
}) {
  const { openDrawer } = useDrawer();
  return /* @__PURE__ */ jsx(
    ActionIcon,
    {
      "aria-label": "Open Sidebar Menu",
      variant: "text",
      className: cn("me-3 h-auto w-auto p-0 sm:me-4 xl:hidden", className),
      onClick: () => openDrawer({
        view,
        placement,
        containerClassName
      }),
      children: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 2,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            }
          )
        }
      )
    }
  );
}
function SearchTrigger({
  icon,
  className,
  placeholderClassName,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      "aria-label": "Search",
      className: cn(
        "group inline-flex items-center focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-lg xl:border xl:border-muted xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200 xl:hover:border-gray-900 xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-gray-900 xl:focus-visible:border-gray-900 xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-gray-900",
        className
      ),
      ...props,
      children: [
        icon ? icon : /* @__PURE__ */ jsx(PiMagnifyingGlassBold, { className: "magnifying-glass me-2 h-[18px] w-[18px]" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex",
              placeholderClassName
            ),
            children: "Search your page..."
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "search-command ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-primary lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold lg:text-primary-foreground xl:justify-normal", children: [
          /* @__PURE__ */ jsx(
            PiCommand,
            {
              strokeWidth: 1.3,
              className: "h-[15px] w-[15px]"
            }
          ),
          "K"
        ] })
      ]
    }
  );
}
const pageLinks = [
  // label start
  {
    name: "Home"
  }
  // label end
];
function SearchList({ onClose }) {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  let menuItemsFiltered = pageLinks;
  if (searchText.length > 0) {
    menuItemsFiltered = pageLinks.filter((item) => {
      const label = item.name;
      return label.match(searchText.toLowerCase()) || label.toLowerCase().match(searchText.toLowerCase()) && label;
    });
  }
  useEffect(() => {
    if (inputRef == null ? void 0 : inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      inputRef.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center px-5 py-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          variant: "flat",
          value: searchText,
          ref: inputRef,
          onChange: (e) => setSearchText(() => e.target.value),
          placeholder: "Search pages here",
          className: "flex-1",
          prefix: /* @__PURE__ */ jsx(PiMagnifyingGlassBold, { className: "h-[18px] w-[18px] text-gray-600" }),
          suffix: searchText && /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "text",
              className: "h-auto w-auto px-0",
              onClick: (e) => {
                e.preventDefault();
                setSearchText(() => "");
              },
              children: "Clear"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        ActionIcon,
        {
          size: "sm",
          variant: "text",
          className: "ms-3 text-gray-500 hover:text-gray-700",
          onClick: onClose,
          children: /* @__PURE__ */ jsx(PiXBold, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4", children: [
      /* @__PURE__ */ jsx(Fragment$1, { children: menuItemsFiltered.length === 0 ? /* @__PURE__ */ jsx(
        Empty,
        {
          className: "scale-75",
          image: /* @__PURE__ */ jsx(SearchNotFoundIcon, {}),
          text: "No Result Found",
          textClassName: "text-xl"
        }
      ) : /* @__PURE__ */ jsx(
        Title$1,
        {
          as: "h6",
          className: "mb-5 px-3 font-semibold dark:text-gray-700",
          children: "Quick Page Links"
        }
      ) }),
      menuItemsFiltered.map((item, index) => {
        return /* @__PURE__ */ jsx(Fragment, { children: (item == null ? void 0 : item.href) ? /* @__PURE__ */ jsxs(
          Link,
          {
            to: item == null ? void 0 : item.href,
            className: "relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-50/50 dark:hover:backdrop-blur-lg",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-500", children: /* @__PURE__ */ jsx(PiFileTextDuotone, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("span", { className: "ms-3 grid gap-0.5", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium capitalize text-gray-900 dark:text-gray-700", children: item.name }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: item == null ? void 0 : item.href })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsx(
          Title$1,
          {
            as: "h6",
            className: cn$1(
              "mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500",
              index !== 0 && "mt-6 4xl:mt-7"
            ),
            children: item.name
          }
        ) }, item.name + "-" + index);
      })
    ] })
  ] });
}
function SearchWidget({
  className,
  placeholderClassName,
  icon
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  const pathname = useLocation();
  useEffect(() => {
    setOpen(() => false);
    return () => setOpen(() => false);
  }, [pathname]);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      SearchTrigger,
      {
        icon,
        className,
        onClick: () => setOpen(true),
        placeholderClassName
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen: open,
        onClose: () => setOpen(false),
        overlayClassName: "dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm vikas1",
        containerClassName: "dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl vikas2",
        className: "z-[9999]",
        children: /* @__PURE__ */ jsx(SearchList, { onClose: () => setOpen(false) })
      }
    )
  ] });
}
function TruckSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 14",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M19.969 6.75a1.155 1.155 0 0 0-.219-.438l-1.625-1.625c-.063-.062-.125-.093-.188-.156a.865.865 0 0 0-.406-.093h-1v3.03H20v-.562c0-.062 0-.125-.031-.156Zm-4.125 1.063V1.718A.84.84 0 0 0 15 .875H4.656a.84.84 0 0 0-.843.844v7.656h12.03V7.812Zm-8.719 3.125c-.594 0-1.063.468-1.063 1.062 0 .594.47 1.063 1.063 1.063.594 0 1.063-.47 1.063-1.063 0-.563-.47-1.063-1.063-1.063Zm10.25 0c-.594 0-1.063.468-1.063 1.062 0 .594.47 1.063 1.063 1.063.594 0 1.063-.47 1.063-1.063.03-.563-.47-1.063-1.063-1.063Zm-.844-2.782V9.72a.347.347 0 0 1-.343.344H3.844v1.374c0 .25.187.438.437.438h1.125a1.735 1.735 0 0 1 1.719-1.594c.906 0 1.656.719 1.719 1.594h6.812a1.735 1.735 0 0 1 1.719-1.594c.906 0 1.656.719 1.719 1.594h.437c.25 0 .438-.188.438-.438v-3.28H16.53Zm1.094 1.031h-.469a.347.347 0 0 1-.343-.343c0-.188.156-.344.343-.344h.469c.188 0 .344.156.344.344-.032.187-.157.344-.344.344ZM2.844 2.438H1.313a.347.347 0 0 1-.344-.344c0-.188.156-.344.344-.344h1.53c.188 0 .345.156.345.344 0 .219-.157.344-.344.344ZM2.844 4.031h-2.5A.347.347 0 0 1 0 3.688c0-.188.156-.344.344-.344h2.531c.188 0 .344.156.344.344-.031.218-.188.343-.375.343ZM2.844 5.625H1.313a.347.347 0 0 1-.344-.344c0-.187.156-.343.344-.343h1.53c.188 0 .345.156.345.343 0 .219-.157.344-.344.344ZM2.844 7.219h-2.5A.347.347 0 0 1 0 6.875c0-.188.156-.344.344-.344h2.531c.188 0 .344.157.344.344 0 .188-.188.344-.375.344ZM2.844 8.813H1.313a.347.347 0 0 1-.344-.344c0-.188.156-.344.344-.344h1.53c.188 0 .345.156.345.344a.347.347 0 0 1-.344.344Z"
        }
      )
    }
  );
}
function CubeSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M11 16.998a1 1 0 0 0 1.447.895l4-2a1 1 0 0 0 .553-.895V9.234a1 1 0 0 0-1.447-.894l-4 2a1 1 0 0 0-.553.894v5.764ZM15.21 6.276a1 1 0 0 0 0-1.788l-4.763-2.382a1 1 0 0 0-.894 0L4.789 4.488a1 1 0 0 0 0 1.788l4.764 2.382a1 1 0 0 0 .894 0l4.764-2.382ZM4.447 8.34A1 1 0 0 0 3 9.234v5.764a1 1 0 0 0 .553.895l4 2A1 1 0 0 0 9 16.998v-5.764a1 1 0 0 0-.553-.894l-4-2Z"
        }
      )
    }
  );
}
function FileStackIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx("g", { fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7.46 0H4.14c-.753 0-1.367.613-1.367 1.367v3.125c0 .754.614 1.367 1.368 1.367h3.32V0ZM15.86 0H8.632v5.86h7.226c.754 0 1.368-.614 1.368-1.368V1.367C17.227.613 16.613 0 15.859 0Zm-.977 3.516h-3.906a.586.586 0 1 1 0-1.172h3.906a.586.586 0 1 1 0 1.172ZM10.234 14.14h-3.32c-.754 0-1.367.614-1.367 1.368v3.125c0 .754.613 1.367 1.367 1.367h3.32v-5.86ZM18.633 14.14h-7.227V20h7.227c.754 0 1.367-.613 1.367-1.367v-3.125c0-.754-.613-1.367-1.367-1.367Zm-.977 3.516H13.75a.586.586 0 1 1 0-1.172h3.906a.586.586 0 1 1 0 1.172ZM4.688 7.07h-3.32C.612 7.07 0 7.684 0 8.437v3.126c0 .753.613 1.367 1.367 1.367h3.32V7.07ZM13.086 7.07H5.859v5.86h7.227c.754 0 1.367-.614 1.367-1.367V8.437c0-.753-.613-1.367-1.367-1.367Zm-.977 3.516H8.203a.586.586 0 1 1 0-1.172h3.906a.586.586 0 0 1 0 1.172ZM15.875 10.367a.586.586 0 0 0 0 .828l1.562 1.563c.23.229.6.229.829 0l1.562-1.563a.586.586 0 1 0-.828-.828l-.563.562V7.656a.586.586 0 0 0-1.171 0v3.273l-.563-.562a.586.586 0 0 0-.828 0ZM2.563 14.312a.586.586 0 0 0-.829 0L.172 15.875a.586.586 0 0 0 .828.828l.562-.562v3.273a.586.586 0 1 0 1.172 0v-3.273l.563.562a.586.586 0 0 0 .828-.828l-1.562-1.563Z" }) })
    }
  );
}
function CloudTaskIcon({
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "fill-current opacity-40",
            d: "m16 17.143-1.666-.952v1.806a.333.333 0 0 0 .166.29l1.5.857v-2Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "m9.836 5.759-1.5.857 1.664.95 1.667-.95-1.5-.857a.333.333 0 0 0-.331 0Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "fill-current opacity-40",
            d: "M5.667 17.997v-1.806L4 17.143v2l1.5-.857a.333.333 0 0 0 .167-.289ZM8 8.996a.333.333 0 0 0 .167.29l1.5.857v-2L8 7.191v1.805Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "m3.666 16.568 1.665-.975-1.498-.88a.326.326 0 0 0-.33 0l-1.5.88 1.663.975Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "fill-current opacity-40",
            d: "m1.833 18.286 1.5.858v-2l-1.667-.953v1.806a.334.334 0 0 0 .167.29Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "m11.665 15.592-1.498-.879a.326.326 0 0 0-.331 0l-1.5.88 1.664.975 1.665-.976Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "fill-current opacity-40",
            d: "m16.666 19.143 1.5-.856a.333.333 0 0 0 .167-.29v-1.806l-1.666.952v2Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "m17.998 15.592-1.498-.879a.326.326 0 0 0-.33 0l-1.5.88 1.663.975 1.665-.976ZM6.625 4.001a.328.328 0 0 1-.162-.042 2.338 2.338 0 0 0-2.012-.116 2.333 2.333 0 0 0 .882 4.492h2V6.81a.672.672 0 0 1 .334-.578l2-1.145a.687.687 0 0 1 .659-.003l2.007 1.146a.673.673 0 0 1 .334.58v1.524h2a2.333 2.333 0 1 0-1.458-4.155.333.333 0 0 1-.54-.297.334.334 0 0 1 .122-.223 3.005 3.005 0 0 1 1.503-.634 1.327 1.327 0 0 0-2.053-.786c-.002 0-.005 0-.007.003-.2.14-.358.334-.457.558a.334.334 0 0 1-.61-.266 2 2 0 0 1 .427-.618 3.323 3.323 0 0 0-5.782 1.125c.342.054.672.167.975.334A.333.333 0 0 1 6.625 4Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M12 17.997v-1.806l-1.666.952v2l1.5-.857a.333.333 0 0 0 .166-.289ZM11.834 9.287a.334.334 0 0 0 .166-.29V7.191l-1.666.952v2l1.5-.856ZM8 17.996a.333.333 0 0 0 .167.29l1.5.857v-2L8 16.191v1.805ZM16.66 14.084l.007.003v-1.086a1.003 1.003 0 0 0-1-1h-5.333v-1.087a.71.71 0 0 1-.334.087.662.662 0 0 1-.326-.084l-.007-.003v1.087H4.334a1.003 1.003 0 0 0-1 1v1.086a.692.692 0 0 1 .66-.003l.006.003v-1.086a.333.333 0 0 1 .333-.334h5.334v1.42a.692.692 0 0 1 .66-.003l.007.003v-1.42h5.333a.333.333 0 0 1 .333.334v1.086a.692.692 0 0 1 .66-.003Z",
            opacity: 0.4
          }
        )
      ]
    }
  );
}
function ShoppingBagSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M3.187 4.316a.227.227 0 0 0-.227.207l-1.364 15a.23.23 0 0 0 .228.248H12.48l1.405-15.455H3.187ZM5.998 3.346a2.917 2.917 0 0 1 3.62-2.58 3.369 3.369 0 0 0-1.525 2.539l-.05.557h.455l.048-.516a2.93 2.93 0 0 1 1.64-2.378 2.93 2.93 0 0 1 1.65 2.894h.457a3.385 3.385 0 0 0-6.747-.557l-.05.557h.454l.048-.516Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M11.466.681a2.93 2.93 0 0 1 2.918 3.182h.454a3.382 3.382 0 0 0-4.01-3.577c.2.113.391.245.567.395h.07ZM17.05 4.523a.227.227 0 0 0-.226-.207h-.91V17.61l2.49 1.81L17.05 4.524ZM13.177 19.772l.01.002h4.927l-2.429-1.766-2.508 1.764ZM15.46 4.316h-1.117l-1.367 15.038 2.484-1.747V4.317Z"
          }
        )
      ]
    }
  );
}
function BulbSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M11.602 5.018a4.346 4.346 0 0 1 2.742 4.04c0 2.447-1.525 2.278-1.932 5.523h-2.138v-2.924a.274.274 0 0 0-.547 0v2.924H7.588c-.407-3.245-1.932-3.076-1.932-5.524a4.345 4.345 0 0 1 4.027-4.332L7.397 7.17A.625.625 0 0 0 7.69 8.2l1.354.363L7.83 11.05a.625.625 0 0 0 1.018.701l3.757-4.018a.625.625 0 0 0-.295-1.03l-1.354-.363.647-1.322Zm-1.43 1.678 1.508-3.082a.078.078 0 0 0-.127-.088L7.796 7.544a.078.078 0 0 0 .037.13l1.996.534L8.32 11.29a.078.078 0 0 0 .128.088l3.756-4.018a.079.079 0 0 0-.002-.11.078.078 0 0 0-.035-.019l-1.995-.535ZM7.6 15.128h4.8a.72.72 0 0 1 .719.718v1.55a.72.72 0 0 1-.718.718h-.739v.72a.68.68 0 0 1-.677.678h-1.97a.68.68 0 0 1-.677-.678v-.72H7.6a.72.72 0 0 1-.719-.718v-1.55a.72.72 0 0 1 .719-.718Zm7.085-.998a.274.274 0 0 1 .387-.387l.988.987a.273.273 0 0 1-.09.447.274.274 0 0 1-.297-.06l-.988-.988ZM16.9 9.33a.274.274 0 0 1 0-.547h1.397a.273.273 0 0 1 0 .547H16.9Zm-1.827-4.958a.273.273 0 1 1-.387-.387l.988-.988a.274.274 0 0 1 .387.387l-.988.988Zm-10.144 9.37a.273.273 0 1 1 .387.387l-.988.987a.273.273 0 1 1-.386-.387l.987-.987ZM3.101 8.784a.273.273 0 0 1 0 .547H1.704a.273.273 0 1 1 0-.547h1.397Zm2.214-4.798a.273.273 0 0 1-.387.387l-.987-.988a.273.273 0 1 1 .386-.387l.988.988Zm4.958-1.828a.273.273 0 1 1-.546 0V.762a.273.273 0 0 1 .546 0v1.396Z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function ParcelMapIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "m5.792 10.638 1.451.565-4.298 1.671-1.565-.609 4.185-1.627c.076-.03.15-.03.227 0ZM8.618.395a2.777 2.777 0 0 1 2.777 2.776c0 2.478-2.777 4.668-2.777 4.668S5.842 5.649 5.842 3.17A2.777 2.777 0 0 1 8.618.395Zm0 1.107a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34Zm1.61 5.643c-.13.147-.265.294-.405.438.157.053.248.115.248.183 0 .18-.65.327-1.453.327-.802 0-1.452-.146-1.452-.327 0-.068.09-.13.247-.183-.14-.144-.275-.291-.404-.438-.872.129-1.453.359-1.453.621 0 .403 1.371.73 3.062.73 1.222 0 2.277-.17 2.768-.417h5.356c.588 0 1.07.482 1.07 1.07 0 .587-.482 1.07-1.07 1.07h-.84a1.7 1.7 0 0 0-1.694 1.694 1.7 1.7 0 0 0 1.695 1.695h1.01c.83 0 1.511.681 1.511 1.512s-.68 1.512-1.511 1.512h-6.507v-3.865l-4.415 1.717v5.125l4.216-1.64c.123-.047.2-.16.2-.29v-.422h6.506a2.142 2.142 0 0 0 2.136-2.137 2.142 2.142 0 0 0-2.136-2.137h-1.01c-.588 0-1.07-.482-1.07-1.07 0-.587.482-1.07 1.07-1.07h.84a1.7 1.7 0 0 0 1.694-1.694 1.7 1.7 0 0 0-1.695-1.695h-5.356c-.253-.128-.658-.235-1.159-.309ZM8.84 11.824l-4.298 1.671 1.135.442 4.299-1.671-1.136-.442Zm-3.475 7.785v-5.125l-1.253-.487v.978a.063.063 0 0 1-.103.048l-.73-.622-.683.213a.063.063 0 0 1-.082-.06v-1.179L.95 12.767v4.911c0 .132.077.244.2.291l4.216 1.64Z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function BrushSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "fill-current opacity-40",
            d: "M18.52.885C16.95-.317 14.765 3.07 13.23 5.002c-1.828 1.945-4.997 6.41-5.017 6.46-2.56-.594-4.737 2.159-5.714 4.813C2.075 17.428.78 17.485.976 18.11c.516 1.651 4.536 1.94 6.278 1.793 2.452-.494 5.716-3.228 4.153-5.916-.495-.69-1.446-1.669-1.432-1.693.65-.785 1.572-1.681 2.056-2.348 1.526-2.017 2.584-3.539 4.31-5.383.676-1.108 3.185-2.231 2.179-3.678Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M7.306 6.624c-.094-2.061-3.398-2.929-4.104-.788a2.515 2.515 0 0 0-.11.846c.006.435.689.418.67-.019-.01-.39.064-.749.307-1.027.766-.776 2.272-.209 2.48.82.238 1.26-.899 2.311-2.052 2.603-2.794.845-4.221-2.165-3.151-4.45.65-1.695 2.247-2.863 4.007-3.192 2.292-.472 4.66-.123 6.975.017.417.014.495-.566.093-.665-3.192-.654-6.935-1.39-9.859.526C.403 2.765-.785 5.945.586 8.312c1.51 2.991 6.85 1.678 6.72-1.688ZM19.55 8.035c-.151-.364-.682-.234-.653.156.378 4.314-1.435 9.283-5.951 10.556-.274.08-.736.111-.654.509.043.19.242.3.427.245 4.82-1.09 8.618-6.629 6.831-11.466ZM13.09 11.343a.39.39 0 0 0-.067-.528c-.791-.676-1.611-1.317-2.384-2.017a426.614 426.614 0 0 1 4.884-6.145c.582-.91 1.689-2.073 2.835-1.522 1.084.824.013 2.316-.74 3.002-1.16 1.169-2.352 2.311-3.262 3.705-.429.666.598 1.311 1.01.632.794-1.34 1.918-2.474 2.974-3.62.939-.926 1.821-2.352 1.22-3.695-1.147-2.196-3.972-.516-4.7 1.029-2.312 2.92-4.614 6.083-7.054 8.909-2.13-.286-4.568 1.282-5.309 3.382a.59.59 0 0 0 .09.584c-.48 1.06-.963 2.345-2.154 2.74-.265.085-.302.455-.06.593 2.548 1.517 6.076 2.106 8.675.405 1.542-1.013 2.415-2.99 2.013-4.709.71-.882 1.437-1.789 2.029-2.745Zm-3.086 4.865c-.277.671-.703 1.3-1.278 1.75-1.123.904-2.638 1.158-4.046 1.065a9.375 9.375 0 0 1-3.422-.907c.95-.632 1.404-1.777 1.837-2.834.204-.01.404-.126.514-.38.536-1.376 1.818-2.564 3.305-2.773 1.199-.172 2.334.55 2.916 1.565-.448.421-.911.826-1.395 1.206-.543.43-1.113.819-1.692 1.2a.27.27 0 0 0 .244.477c1.14-.452 2.214-1.057 3.229-1.744.055.458-.005.929-.212 1.375Zm.582-3.231a3.586 3.586 0 0 0-.626-.72 3.45 3.45 0 0 0-1.272-.927c.475-.623.951-1.244 1.43-1.863.197.125.434.229.574.362.544.4 1.031.87 1.52 1.336a16.916 16.916 0 0 1-1.627 1.812Z"
          }
        )
      ] })
    }
  );
}
const notificationsData = [
  {
    id: 1,
    name: "Invitation for crafting engaging designs",
    icon: BrushSolidIcon,
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 2,
    name: "Isomorphic dashboard redesign",
    icon: CubeSolidIcon,
    unRead: true,
    sendTime: "2023-05-30T09:35:31.820Z"
  },
  {
    id: 3,
    name: "3 New Incoming Project Files:",
    icon: FileStackIcon,
    unRead: false,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 4,
    name: "Swornak purchased isomorphic",
    icon: ShoppingBagSolidIcon,
    unRead: false,
    sendTime: "2023-05-21T09:35:31.820Z"
  },
  {
    id: 5,
    name: "Task #45890 merged with #45890 in “Ads Pro Admin Dashboard project:",
    icon: CloudTaskIcon,
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 6,
    name: "3 new application design concepts added",
    icon: BulbSolidIcon,
    unRead: true,
    sendTime: "2023-05-15T09:35:31.820Z"
  },
  {
    id: 7,
    name: "Your order has been placed",
    icon: ParcelMapIcon,
    unRead: false,
    sendTime: "2023-05-16T09:35:31.820Z"
  },
  {
    id: 8,
    name: "Order has been shipped to #123221",
    icon: TruckSolidIcon,
    unRead: false,
    sendTime: "2023-05-01T09:35:31.820Z"
  }
];
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", handleChange);
    setMatches(mediaQueryList.matches);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);
  return matches;
};
dayjs.extend(relativeTime);
function NotificationsList({
  setIsOpen
}) {
  return /* @__PURE__ */ jsxs("div", { className: "w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between ps-6", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h5", fontWeight: "semibold", children: "Notifications" }),
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          size: "sm",
          label: "Mark all as read",
          labelWeight: "normal",
          labelClassName: "text-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "custom-scrollbar max-h-[420px] overflow-y-auto scroll-smooth", children: /* @__PURE__ */ jsx("div", { className: "grid cursor-pointer grid-cols-1 gap-1 ps-4", children: notificationsData.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5", children: /* @__PURE__ */ jsx(item.icon, {}) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx(Text, { className: "mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700", children: item.name }),
              /* @__PURE__ */ jsx(Text, { className: "ms-auto whitespace-nowrap pe-8 text-xs text-gray-500", children: dayjs(item.sendTime).fromNow(true) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ms-auto flex-shrink-0", children: item.unRead ? /* @__PURE__ */ jsx(
              Badge$1,
              {
                renderAsDot: true,
                size: "lg",
                color: "primary",
                className: "scale-90"
              }
            ) : /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50", children: /* @__PURE__ */ jsx(PiCheck, { className: "h-auto w-[9px]" }) }) })
          ] })
        ]
      },
      item.name + item.id
    )) }) }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "#",
        onClick: () => setIsOpen(false),
        className: "-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline",
        children: "View All Activity"
      }
    )
  ] });
}
function NotificationDropdown({
  children
}) {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      isOpen,
      setIsOpen,
      shadow: "sm",
      placement: isMobile ? "bottom" : "bottom-end",
      children: [
        /* @__PURE__ */ jsx(Popover.Trigger, { children }),
        /* @__PURE__ */ jsx(Popover.Content, { className: "z-[9999] px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex", children: /* @__PURE__ */ jsx(NotificationsList, { setIsOpen }) })
      ]
    }
  );
}
function RingBellSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 18 18",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "fill-current opacity-40",
            d: "M16.5 8.162a.75.75 0 0 1-.75-.75 7.824 7.824 0 0 0-2.306-5.569.75.75 0 0 1 1.06-1.06 9.315 9.315 0 0 1 2.746 6.629.752.752 0 0 1-.75.75ZM1.5 8.162a.75.75 0 0 1-.751-.75c0-2.505.975-4.86 2.746-6.63a.751.751 0 0 1 1.061 1.06 7.824 7.824 0 0 0-2.306 5.57.75.75 0 0 1-.75.75Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M16.034 12.684A5.025 5.025 0 0 1 14.25 8.84V6.75c0-2.64-1.96-4.824-4.5-5.19V.75a.75.75 0 1 0-1.5 0v.81c-2.54.366-4.5 2.55-4.5 5.19v2.091c0 1.484-.65 2.885-1.792 3.85a1.312 1.312 0 0 0 .854 2.31h12.375a1.314 1.314 0 0 0 .847-2.317Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "fill-current opacity-40",
            d: "M9 18a2.816 2.816 0 0 0 2.755-2.25H6.244A2.818 2.818 0 0 0 9 18Z"
          }
        )
      ]
    }
  );
}
const messagesData = [
  {
    id: 1,
    message: `It is nice to be chatting with you. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/men/51.jpg"],
    name: "Wade Warren",
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 2,
    message: ` Oh... Let's move on to something else for a bit. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/men/40.jpg"],
    name: "Jane Cooper",
    unRead: true,
    sendTime: "2023-05-30T09:35:31.820Z"
  },
  {
    id: 3,
    message: `You: I never received any phone calls about it. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/women/11.jpg"],
    name: "Leslie Alexander",
    unRead: false,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 4,
    message: `You: But you'll need to type in every possible word. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/men/36.jpg"],
    name: "John Doe",
    unRead: false,
    sendTime: "2023-05-21T09:35:31.820Z"
  },
  {
    id: 5,
    message: `They were delighted and set to work immediately. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://randomuser.me/api/portraits/men/50.jpg",
      "https://randomuser.me/api/portraits/women/57.jpg"
    ],
    name: "Design & Frontend",
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z"
  },
  {
    id: 6,
    message: `Hows going everything in our laravel project. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: [
      "https://randomuser.me/api/portraits/women/0.jpg",
      "https://randomuser.me/api/portraits/men/22.jpg"
    ],
    name: "Laravel",
    unRead: true,
    sendTime: "2023-05-15T09:35:31.820Z"
  },
  {
    id: 7,
    name: "WordPress",
    avatar: [
      "https://randomuser.me/api/portraits/men/94.jpg",
      "https://randomuser.me/api/portraits/women/11.jpg"
    ],
    unRead: false,
    sendTime: "2023-05-16T09:35:31.820Z"
  },
  {
    id: 8,
    message: `You: which is actually pretty clever and funny, inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/men/43.jpg"],
    name: "Jenny Doe",
    unRead: false,
    sendTime: "2023-05-01T09:35:31.820Z"
  },
  {
    id: 9,
    message: `You could try ELIZA bot, it was a software tween herself. Omnis,
        quidem non. Sint inventore quasi temporibus architecto eaque,
        natus aspernatur minus?`,
    avatar: ["https://randomuser.me/api/portraits/men/75.jpg"],
    name: "Bruce Warren",
    unRead: true,
    sendTime: "2023-04-01T09:35:31.820Z"
  }
];
function MessagesList({
  setIsOpen
}) {
  return /* @__PURE__ */ jsxs("div", { className: "w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between ps-6", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h5", fontWeight: "semibold", children: "Messages" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: routes$1.help,
          onClick: () => setIsOpen(false),
          className: "hover:underline",
          children: "View all"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "custom-scrollbar overflow-y-auto scroll-smooth max-h-[406px]", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 ps-4", children: messagesData.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-md px-2 py-2.5 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50",
        children: [
          /* @__PURE__ */ jsxs("div", { className: cn("relative", item.avatar.length > 1 && "me-1"), children: [
            /* @__PURE__ */ jsx(
              Avatar,
              {
                src: item.avatar[0],
                name: item.name,
                className: cn(
                  item.avatar.length > 1 && "relative -end-1 -top-0.5 !h-9 !w-9"
                )
              }
            ),
            item.avatar.length > 1 && /* @__PURE__ */ jsx(
              Avatar,
              {
                src: item.avatar[1],
                name: item.name,
                className: "absolute -bottom-1 end-1.5 !h-9 !w-9 border-2 border-gray-0 dark:border-gray-100"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx(Text, { className: "mb-0.5 w-11/12 truncate text-sm font-semibold text-gray-900 dark:text-gray-700", children: item.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsx(Text, { className: "w-10/12 truncate pe-7 text-xs text-gray-500", children: item.message }),
                /* @__PURE__ */ jsx(Text, { className: "ms-auto whitespace-nowrap pe-8 text-xs text-gray-500", children: dayjs(item.sendTime).fromNow(true) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ms-auto flex-shrink-0", children: item.unRead ? /* @__PURE__ */ jsx(
              Badge$1,
              {
                renderAsDot: true,
                size: "lg",
                color: "primary",
                className: "scale-90"
              }
            ) : /* @__PURE__ */ jsx("span", { className: "inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50", children: /* @__PURE__ */ jsx(PiCheck, { className: "h-auto w-[9px]" }) }) })
          ] })
        ]
      },
      item.name + item.id
    )) }) })
  ] });
}
function MessagesDropdown({
  children
}) {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      isOpen,
      setIsOpen,
      shadow: "sm",
      placement: isMobile ? "bottom" : "bottom-end",
      children: [
        /* @__PURE__ */ jsx(Popover.Trigger, { children }),
        /* @__PURE__ */ jsx(Popover.Content, { className: "z-[9999] pb-6 pe-6 ps-0 pt-5 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex", children: /* @__PURE__ */ jsx(MessagesList, { setIsOpen }) })
      ]
    }
  );
}
function ChatSolidIcon({
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 19 19",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "fill-current opacity-40",
            d: "M16.172 5.313h-.375v3.562a3.19 3.19 0 0 1-3.187 3.188H3.798v1.687c0 1.137.925 2.062 2.062 2.062h.937V17.5a.562.562 0 0 0 .977.38l1.895-2.068h6.503a2.064 2.064 0 0 0 2.062-2.062V7.375a2.065 2.065 0 0 0-2.062-2.063Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M12.61.813H1.734A1.69 1.69 0 0 0 .047 2.5v6.375c0 .93.757 1.688 1.688 1.688H12.61a1.69 1.69 0 0 0 1.688-1.688V2.5A1.691 1.691 0 0 0 12.609.812Zm.187 3.33L7.742 6.595a1.273 1.273 0 0 1-1.14 0L1.547 4.143V2.897L7.09 5.584c.053.03.112.03.165 0l5.543-2.686-.001 1.244Z"
          }
        )
      ]
    }
  );
}
const presetLight = {
  lighter: "#f1f1f1",
  light: "#666666",
  default: "#111111",
  dark: "#000000",
  foreground: "#ffffff"
};
const presetDark = {
  lighter: "#222222",
  light: "#929292",
  default: "#f1f1f1",
  dark: "#ffffff",
  foreground: "#111111"
};
const DEFAULT_PRESET_COLORS = {
  lighter: "#d7e3fe",
  light: "#608efb",
  default: "#3872fa",
  dark: "#1d58d8",
  foreground: "#ffffff"
};
const DEFAULT_PRESET_COLOR_NAME = "Black";
const usePresets = () => {
  const { theme } = useTheme();
  return [
    {
      name: DEFAULT_PRESET_COLOR_NAME,
      colors: DEFAULT_PRESET_COLORS
    },
    {
      name: "Black",
      colors: {
        lighter: theme === "light" ? presetLight.lighter : presetDark.lighter,
        light: theme === "light" ? presetLight.light : presetDark.light,
        default: theme === "light" ? presetLight.default : presetDark.default,
        dark: theme === "light" ? presetLight.dark : presetDark.dark,
        foreground: theme === "light" ? presetLight.foreground : presetDark.foreground
      }
    },
    {
      name: "Teal",
      colors: {
        lighter: "#ccfbf1",
        // Teal 100
        light: "#5eead4",
        // Teal 300
        default: "#0d9488",
        // Teal 600
        dark: "#115e59",
        // Teal 800
        foreground: "#ffffff"
      }
    },
    {
      name: "Violet",
      colors: {
        lighter: "#ede9fe",
        // Violet 100
        light: "#a5b4fc",
        // Violet 300
        default: "#7c3aed",
        // Violet 600
        dark: "#4c1d95",
        // Violet 900
        foreground: "#ffffff"
      }
    },
    {
      name: "Rose",
      colors: {
        lighter: "#ffe4e6",
        // Rose 100
        light: "#fda4af",
        // Rose 300
        default: "#e11d48",
        // Rose 600
        dark: "#be123c",
        // Rose 700
        foreground: "#ffffff"
      }
    },
    {
      name: "Yellow",
      colors: {
        lighter: "#fef9c3",
        // Yellow 100
        light: "#fde047",
        // Yellow 300
        default: "#ca8a04",
        // Yellow 600
        dark: "#a16207",
        // Yellow 800
        foreground: "#ffffff"
      }
    }
  ];
};
const isomorphicDirectionAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("iso-direction") : "ltr"
);
const isomorphicDirectionAtomWithPersistence = atom(
  (get) => get(isomorphicDirectionAtom),
  (get, set, newStorage) => {
    set(isomorphicDirectionAtom, newStorage);
    localStorage.setItem("iso-direction", newStorage);
  }
);
function useDirection() {
  const [direction, setDirection] = useAtom(
    isomorphicDirectionAtomWithPersistence
  );
  return {
    direction: direction === null ? "ltr" : direction,
    setDirection
  };
}
function hexToRGB(hex) {
  if (!hex) return "";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}
function updateThemeColor(primaryLighter, primaryLight, primaryDefault, primaryDark, primaryForeground) {
  document.documentElement.style.setProperty(
    "--primary-dark",
    hexToRGB(primaryDark)
  );
  document.documentElement.style.setProperty(
    "--primary-light",
    hexToRGB(primaryLight)
  );
  document.documentElement.style.setProperty(
    "--primary-lighter",
    hexToRGB(primaryLighter)
  );
  document.documentElement.style.setProperty(
    "--primary-default",
    hexToRGB(primaryDefault)
  );
  document.documentElement.style.setProperty(
    "--primary-foreground",
    hexToRGB(primaryForeground)
  );
}
function getLocalStoragePreset() {
  if (typeof window !== "undefined") {
    const localStorageValue = localStorage.getItem("isomorphic-preset");
    return JSON.parse(String(localStorageValue));
  }
}
const colorPresetsAtom = atom(
  typeof window !== "undefined" ? getLocalStoragePreset() : DEFAULT_PRESET_COLORS
);
const colorPresetsAtomWithPersistence = atom(
  (get) => get(colorPresetsAtom),
  (get, set, newStorage) => {
    set(colorPresetsAtom, newStorage);
    localStorage.setItem("isomorphic-preset", JSON.stringify(newStorage));
  }
);
function useColorPresets() {
  const [colorPresets, setColorPresets] = useAtom(
    colorPresetsAtomWithPersistence
  );
  return {
    colorPresets: colorPresets === null ? DEFAULT_PRESET_COLORS : colorPresets,
    setColorPresets
  };
}
const colorPresetNameAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("isomorphic-preset-name") : DEFAULT_PRESET_COLOR_NAME
);
atom(
  (get) => get(colorPresetNameAtom),
  (get, set, newStorage) => {
    set(colorPresetNameAtom, newStorage);
    localStorage.setItem("isomorphic-preset-name", newStorage);
  }
);
function useApplyColorPreset(colorPresets) {
  const COLOR_PRESETS = usePresets();
  useEffect(() => {
    let colorLighter = COLOR_PRESETS[0].colors.lighter;
    let colorLight = COLOR_PRESETS[0].colors.light;
    let colorDefault = COLOR_PRESETS[0].colors.default;
    let colorDark = COLOR_PRESETS[0].colors.dark;
    let colorForeground = COLOR_PRESETS[0].colors.foreground;
    if (colorPresets) {
      colorLighter = colorPresets.lighter;
      colorLight = colorPresets.light;
      colorDefault = colorPresets.default;
      colorDark = colorPresets.dark;
      colorForeground = colorPresets.foreground;
    }
    updateThemeColor(
      colorLighter,
      colorLight,
      colorDefault,
      colorDark,
      colorForeground
    );
  }, [colorPresets]);
}
function DrawerHeader({ onClose }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-muted px-5 py-3.5", children: [
    /* @__PURE__ */ jsx(Title$1, { as: "h5", className: cn("font-semibold"), children: "Settings" }),
    /* @__PURE__ */ jsx(
      ActionIcon,
      {
        variant: "text",
        onClick: onClose,
        className: cn("h-7 w-7"),
        rounded: "full",
        children: /* @__PURE__ */ jsx(PiXBold, { className: "h-[18px] w-[18px]" })
      }
    )
  ] });
}
function CogSolidIcon({
  strokeWidth,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: strokeWidth ?? 1.5,
      stroke: "currentColor",
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "fill-current opacity-30",
            d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
            className: "fill-current"
          }
        )
      ]
    }
  );
}
const SettingsDrawer = lazy(() => import("./assets/settings-drawer-CbXAT9n4.js"));
function SettingsButton({
  className,
  children
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();
  useApplyColorPreset(colorPresets ?? COLOR_PRESETS[0].colors);
  useEffect(() => {
    document.documentElement.dir = direction ?? "ltr";
  }, [direction]);
  return /* @__PURE__ */ jsx(
    ActionIcon,
    {
      "aria-label": "Settings",
      variant: "text",
      className: cn(
        "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9",
        className
      ),
      onClick: () => {
        startTransition(() => {
          openDrawer({
            view: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "p-4 text-gray-600", children: "Loading settings..." }), children: [
              /* @__PURE__ */ jsx(DrawerHeader, { onClose: closeDrawer }),
              /* @__PURE__ */ jsx(SettingsDrawer, {})
            ] }),
            placement: "right",
            containerClassName: "max-w-[420px]"
          });
        });
      },
      children: children ? children : /* @__PURE__ */ jsx(
        CogSolidIcon,
        {
          strokeWidth: 1.8,
          className: "h-[22px] w-auto animate-spin-slow"
        }
      )
    }
  );
}
function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false
}) {
  return /* @__PURE__ */ jsxs(ProfileMenuPopover, { children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(
          "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
          buttonClassName
        ),
        children: [
          /* @__PURE__ */ jsx(
            Avatar,
            {
              src: "/avatar.webp",
              name: "John Doe",
              className: cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)
            }
          ),
          !!username && /* @__PURE__ */ jsx("span", { className: "username hidden text-gray-200 dark:text-gray-700 md:inline-flex", children: "Hi, Andry" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Content, { className: "z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100", children: /* @__PURE__ */ jsx(DropdownMenu, {}) })
  ] });
}
function ProfileMenuPopover({ children }) {
  const pathname = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return /* @__PURE__ */ jsx(
    Popover,
    {
      isOpen,
      setIsOpen,
      shadow: "sm",
      placement: "bottom-end",
      children
    }
  );
}
const menuItems = [
  {
    name: "My Profile",
    href: routes$1.home
  },
  {
    name: "Account Settings",
    href: routes$1.home
  },
  {
    name: "Activity Log",
    href: "#"
  }
];
function DropdownMenu() {
  return /* @__PURE__ */ jsxs("div", { className: "w-64 text-left rtl:text-right", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b border-gray-300 px-6 pb-5 pt-6", children: [
      /* @__PURE__ */ jsx(Avatar, { src: "/avatar.webp", name: "Albert Flores" }),
      /* @__PURE__ */ jsxs("div", { className: "ms-3", children: [
        /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "font-semibold", children: "Albert Flores" }),
        /* @__PURE__ */ jsx(Text, { className: "text-gray-600", children: "flores@doe.io" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid px-3.5 py-3.5 font-medium text-gray-700", children: menuItems.map((item) => /* @__PURE__ */ jsx(
      Link,
      {
        to: item.href,
        className: "group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50",
        children: item.name
      },
      item.name
    )) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 px-6 pb-6 pt-5", children: /* @__PURE__ */ jsx(
      Button,
      {
        className: "h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0",
        variant: "text",
        onClick: () => console.log("sign out button click profile-menu module"),
        children: "Sign Out"
      }
    ) })
  ] });
}
function HeaderMenuRight() {
  return /* @__PURE__ */ jsxs("div", { className: "ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4", children: [
    /* @__PURE__ */ jsx(NotificationDropdown, { children: /* @__PURE__ */ jsxs(
      ActionIcon,
      {
        "aria-label": "Notification",
        variant: "text",
        className: "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9",
        children: [
          /* @__PURE__ */ jsx(RingBellSolidIcon, { className: "h-[18px] w-auto" }),
          /* @__PURE__ */ jsx(
            Badge$1,
            {
              renderAsDot: true,
              color: "warning",
              enableOutlineRing: true,
              className: "absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(MessagesDropdown, { children: /* @__PURE__ */ jsxs(
      ActionIcon,
      {
        "aria-label": "Messages",
        variant: "text",
        className: "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9",
        children: [
          /* @__PURE__ */ jsx(ChatSolidIcon, { className: "h-[18px] w-auto" }),
          /* @__PURE__ */ jsx(
            Badge$1,
            {
              renderAsDot: true,
              color: "success",
              enableOutlineRing: true,
              className: "absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(SettingsButton, {}),
    /* @__PURE__ */ jsx(ProfileMenu, {})
  ] });
}
function StickyHeader({
  offset = 2,
  className,
  children
}) {
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: cn(
        "sticky top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6",
        className
      ),
      children
    }
  );
}
function Header() {
  return /* @__PURE__ */ jsxs(StickyHeader, { className: "z-[990] 2xl:py-5 3xl:px-8 4xl:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-2xl items-center", children: [
      /* @__PURE__ */ jsx(
        HamburgerButton,
        {
          view: /* @__PURE__ */ jsx(Sidebar, { className: "static w-full 2xl:w-full" })
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          "aria-label": "Site Logo",
          className: "me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden",
          children: /* @__PURE__ */ jsx(Logo, { iconOnly: true })
        }
      ),
      /* @__PURE__ */ jsx(SearchWidget, {})
    ] }),
    /* @__PURE__ */ jsx(HeaderMenuRight, {})
  ] });
}
function ThemeProvider({ children }) {
  return /* @__PURE__ */ jsx(
    ThemeProvider$1,
    {
      enableSystem: false,
      themes: ["light", "dark"],
      defaultTheme: String("light"),
      children
    }
  );
}
function JotaiProvider({ children }) {
  return /* @__PURE__ */ jsx(Provider, { children });
}
function GlobalDrawer() {
  const { isOpen, view, placement, containerClassName, closeDrawer } = useDrawer();
  const { pathname } = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [pathname]);
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      isOpen,
      onClose: closeDrawer,
      placement,
      overlayClassName: "dark:bg-opacity-40 dark:backdrop-blur-md",
      containerClassName: cn(
        "min-w-[320px] max-w-[420px] dark:bg-gray-100",
        containerClassName
      ),
      className: "z-[9999]",
      children: view
    }
  );
}
const modalAtom = atom({
  isOpen: false,
  view: null,
  customSize: "320px",
  size: "sm"
});
function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);
  const openModal = ({
    view,
    customSize,
    size
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      size
    });
  };
  const closeModal = () => {
    setState({
      ...state,
      isOpen: false
    });
  };
  return {
    ...state,
    openModal,
    closeModal
  };
}
function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size } = useModal();
  const { pathname } = useLocation();
  useEffect(() => {
    closeModal();
  }, [pathname]);
  return /* @__PURE__ */ jsx(
    Modal$1,
    {
      isOpen,
      onClose: closeModal,
      customSize,
      size,
      overlayClassName: "dark:bg-opacity-40 dark:backdrop-blur-lg",
      containerClassName: "dark:bg-gray-100",
      className: "z-[9999] [&_.pointer-events-none]:overflow-visible",
      children: view
    }
  );
}
function ProgressBar() {
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);
  return null;
}
const links$2 = () => [
  { rel: "stylesheet", href: globalCss },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend+Deca:wght@100..900&display=swap"
  }
];
function App$1() {
  const matches = useMatches();
  const isAuthRoute = matches.some((match) => match.pathname.startsWith("/auth"));
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "font-[Inter]", children: [
      /* @__PURE__ */ jsx("main", { className: "flex min-h-screen flex-grow", children: isAuthRoute ? /* @__PURE__ */ jsx(Outlet, {}) : /* @__PURE__ */ jsxs(ThemeProvider, { children: [
        /* @__PURE__ */ jsx(ProgressBar, {}),
        /* @__PURE__ */ jsxs(JotaiProvider, { children: [
          /* @__PURE__ */ jsx(Sidebar, { className: "fixed hidden dark:bg-gray-50 xl:block" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]", children: [
            /* @__PURE__ */ jsx(Header, {}),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9", children: [
              /* @__PURE__ */ jsx(Outlet, {}),
              /* @__PURE__ */ jsx(Toaster, {})
            ] })
          ] }),
          /* @__PURE__ */ jsx(GlobalDrawer, {}),
          /* @__PURE__ */ jsx(GlobalModal, {})
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1,
  links: links$2
}, Symbol.toStringTag, { value: "Module" }));
function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
function extractNumericId(shopifyGraphQLId) {
  if (!shopifyGraphQLId) return null;
  try {
    const parts = shopifyGraphQLId.split("/");
    const numericId = parts.length > 0 ? parts[parts.length - 1] : null;
    return numericId ? parseInt(numericId, 10) : null;
  } catch (error) {
    console.error("Invalid Shopify GraphQL ID:", error);
    return null;
  }
}
var ShopifyObjectType = /* @__PURE__ */ ((ShopifyObjectType2) => {
  ShopifyObjectType2["Product"] = "Product";
  ShopifyObjectType2["Collection"] = "Collection";
  ShopifyObjectType2["Order"] = "Order";
  ShopifyObjectType2["Customer"] = "Customer";
  ShopifyObjectType2["Variant"] = "ProductVariant";
  ShopifyObjectType2["SellingPlanGroup"] = "SellingPlanGroup";
  ShopifyObjectType2["SubscriptionContract"] = "SubscriptionContract";
  return ShopifyObjectType2;
})(ShopifyObjectType || {});
function generateGraphQLId(numericId, type) {
  if (!numericId || !type) {
    throw new Error("Invalid parameters: numericId and type are required.");
  }
  return `gid://shopify/${type}/${numericId}`;
}
const formatPrice = (price, format) => {
  if (!format.includes("{{amount}}")) {
    console.warn("Invalid money format provided:", format);
    return price.toString();
  }
  return format.replace("{{amount}}", Number(price).toFixed(2));
};
const formatDate$1 = (isoDate, needTime = true) => {
  const date = new Date(isoDate);
  const options2 = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...needTime && { hour: "numeric", minute: "2-digit", hour12: true }
    // Include time only if needTime is true
  };
  return date.toLocaleString("en-US", options2);
};
const calculateTotalDiscountedPrice = (lines) => {
  return lines.edges.reduce((total, edge) => {
    const itemTotal = parseFloat(edge.node.lineDiscountedPrice.amount) * edge.node.quantity;
    return total + itemTotal;
  }, 0);
};
const getTruncatedText = (text, wordLimit = 3) => {
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};
const formatToUtcHour = (dateInput) => {
  const date = new Date(dateInput);
  date.setUTCMinutes(0, 0, 0);
  return date.toISOString().replace(".000", "");
};
const getsellingPlansToCreateOneTimeVariables = (oneTimeGroup2) => {
  const billingPolicy = generateOneTimeBillingPolicy(oneTimeGroup2);
  const deliveryPolicy = generateOneTimeDeliveryPolicy(oneTimeGroup2);
  const inventoryPolicy = generateInventoryPolicy$1(oneTimeGroup2);
  const pricingPolicies = generateOneTimePricingPolicies(oneTimeGroup2);
  return [
    {
      name: oneTimeGroup2.planName || "One-Time Purchase",
      id: oneTimeGroup2.sellingPlanId,
      options: [oneTimeGroup2.planName || "One-Time Purchase"],
      category: "OTHER",
      billingPolicy,
      inventoryPolicy,
      deliveryPolicy,
      pricingPolicies
    }
  ];
};
const generateInventoryPolicy$1 = (plan) => {
  const {
    inventoryPolicyEnable,
    inventoryPolicyReserve
  } = plan;
  if (!inventoryPolicyEnable) {
    return { reserve: "ON_FULFILLMENT" };
  }
  return { reserve: inventoryPolicyReserve };
};
const generateOneTimeDeliveryPolicy = (plan) => {
  const {
    deliveryPolicyAnchorsCutoffDay,
    deliveryPolicyAnchorsDay,
    deliveryPolicyAnchorsMonth,
    deliveryPolicyAnchorsType,
    deliveryPolicyCutoff,
    deliveryPolicyFulfillmentExactTime,
    deliveryPolicyFulfillmentTrigger,
    deliveryPolicyIntent,
    deliveryPolicyPreAnchorBehavior
  } = plan;
  if (deliveryPolicyFulfillmentTrigger === "ASAP") {
    return {
      fixed: {
        fulfillmentTrigger: "ASAP"
      }
    };
  }
  const deliveryPolicy = {
    fixed: {
      fulfillmentTrigger: deliveryPolicyFulfillmentTrigger,
      ...deliveryPolicyFulfillmentTrigger === "EXACT_TIME" && deliveryPolicyFulfillmentExactTime ? { fulfillmentExactTime: deliveryPolicyFulfillmentExactTime } : {},
      ...deliveryPolicyFulfillmentTrigger === "ANCHOR" ? {
        anchors: {
          cutoffDay: deliveryPolicyAnchorsType === "YEARDAY" ? null : deliveryPolicyAnchorsCutoffDay,
          day: deliveryPolicyAnchorsDay,
          ...deliveryPolicyAnchorsType === "YEARDAY" ? { month: deliveryPolicyAnchorsMonth } : {},
          // Conditionally include month
          type: deliveryPolicyAnchorsType
        }
      } : {},
      cutoff: deliveryPolicyCutoff,
      intent: deliveryPolicyIntent,
      preAnchorBehavior: deliveryPolicyPreAnchorBehavior
    }
  };
  return deliveryPolicy;
};
const generateOneTimeBillingPolicy = (plan) => {
  const {
    billingPolicyEnable,
    billingPolicyCheckoutChargeType,
    billingPolicyCheckoutChargeValue,
    billingPolicyRemainingBalanceChargeTrigger,
    billingPolicyRemainingBalanceChargeTimeAfterCheckout,
    billingPolicyRemainingBalanceChargeExactTime
  } = plan;
  if (!billingPolicyEnable) {
    return {
      fixed: {
        checkoutCharge: { type: "PERCENTAGE", value: { percentage: 100 } },
        remainingBalanceChargeTrigger: "NO_REMAINING_BALANCE"
      }
    };
  }
  let checkoutChargeValue;
  if (billingPolicyCheckoutChargeType === "PERCENTAGE") {
    checkoutChargeValue = { percentage: billingPolicyCheckoutChargeValue };
  } else if (billingPolicyCheckoutChargeType === "PRICE") {
    checkoutChargeValue = { fixedValue: billingPolicyCheckoutChargeValue };
  } else {
    throw new Error("Invalid checkout charge value");
  }
  const policy = {
    fixed: {
      checkoutCharge: { type: billingPolicyCheckoutChargeType, value: checkoutChargeValue },
      remainingBalanceChargeTrigger: billingPolicyRemainingBalanceChargeTrigger,
      ...billingPolicyRemainingBalanceChargeTimeAfterCheckout ? { remainingBalanceChargeTimeAfterCheckout: billingPolicyRemainingBalanceChargeTimeAfterCheckout } : {},
      ...billingPolicyRemainingBalanceChargeTrigger === "EXACT_TIME" && billingPolicyRemainingBalanceChargeExactTime ? { remainingBalanceChargeExactTime: billingPolicyRemainingBalanceChargeExactTime } : {}
    }
  };
  return policy;
};
const generateOneTimePricingPolicies = (plan) => {
  const {
    pricingPolicyAdjustmentType,
    pricingPolicyAdjustmentValue
  } = plan;
  const adjustmentValue = {};
  switch (pricingPolicyAdjustmentType) {
    case "FIXED_AMOUNT":
    case "PRICE":
      adjustmentValue.fixedValue = pricingPolicyAdjustmentValue;
      break;
    case "PERCENTAGE":
      adjustmentValue.percentage = pricingPolicyAdjustmentValue;
      break;
    default:
      throw new Error(`Invalid discountType: ${pricingPolicyAdjustmentType}`);
  }
  return [
    {
      fixed: {
        adjustmentType: pricingPolicyAdjustmentType,
        adjustmentValue
      }
    }
  ];
};
const createGraphQLVariablesOneTimesUpdate = (group) => {
  const sellingPlansToUpdate = getsellingPlansToCreateOneTimeVariables(group);
  return {
    variables: {
      id: group.groupId,
      input: {
        name: group.planName || "Default Plan Group",
        sellingPlansToUpdate
      }
    }
  };
};
const createGraphQLVariablesOneTimes = (group, appGraphqlId, productId, isUpdate = false) => {
  const appId = extractNumericId(appGraphqlId);
  let sellingPlansToCreate = getsellingPlansToCreateOneTimeVariables(group.sellingPlansToCreate[0]);
  return {
    variables: {
      input: {
        appId: `${appId}` || "",
        name: group.groupName || "Default Plan Group",
        merchantCode: "Onetime Plan Group",
        options: [group.groupName],
        position: 1,
        sellingPlansToCreate
      },
      resources: {
        productIds: [`gid://shopify/Product/${productId}`]
      }
    }
  };
};
const createOnetimePlanUtils = {
  createGraphQLVariablesOneTimesUpdate,
  getsellingPlansToCreateOneTimeVariables,
  generateOneTimeBillingPolicy,
  generateOneTimeDeliveryPolicy,
  generateOneTimePricingPolicies,
  createGraphQLVariablesOneTimes
};
const authCookie = createCookie("auth", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/"
});
const setAuthCookie = async (data) => {
  const encodedData = encodeURIComponent(JSON.stringify(data));
  return authCookie.serialize({ query: encodedData });
};
const getAuthCookie = async (cookieHeader) => {
  if (!cookieHeader) return null;
  const cookieData = await authCookie.parse(cookieHeader);
  if (!(cookieData == null ? void 0 : cookieData.query)) return null;
  return JSON.parse(decodeURIComponent(cookieData.query));
};
function mergeQueryParams(request, storedQuery) {
  const url = new URL(request.url);
  const existingQueryParams = new URLSearchParams(url.search);
  const storedQueryParams = new URLSearchParams(storedQuery || "");
  storedQueryParams.forEach((value, key) => {
    existingQueryParams.set(key, value);
  });
  url.search = existingQueryParams.toString();
  return new Request(url.toString(), request);
}
class MissingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingDataError";
  }
}
const authenticateAction = async (request, doShopifyAuth = authenticate.admin) => {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const authData = await getAuthCookie(cookieHeader);
    if (!authData) return false;
    const updatedRequest = mergeQueryParams(request, authData.query);
    const response = await doShopifyAuth(updatedRequest);
    if (!response || !response.admin) return false;
    return { admin: response.admin };
  } catch (error) {
    console.error("Authentication Error:", error);
    return false;
  }
};
const authenticateRequest = async (request) => {
  const authResult = await authenticateAction(request);
  return authResult ? authResult.admin : null;
};
const extractFormData = async (request, params) => {
  const body = await request.formData();
  const plansString = body.get("plans");
  const appGraphqlId = body.get("appId");
  if (!plansString || !params.productId || !appGraphqlId) {
    throw new MissingDataError("Missing required data: plans, productId, or appId");
  }
  return { plansString, productId: params.productId, appGraphqlId };
};
const parsePlansJson = (plansString) => {
  try {
    return JSON.parse(plansString);
  } catch (error) {
    throw new Error("Invalid JSON format in plans");
  }
};
const executeShopifyMutation = async (query, admin, variables) => {
  try {
    const createResponse = await admin.graphql(query, variables);
    const jsonData = await createResponse.json();
    return jsonData;
  } catch (error) {
    console.error("Error executing Shopify mutation:", error);
    throw new Error("Failed to execute Shopify mutation");
  }
};
const createPlanAPIUtils = {
  authenticateRequest,
  authenticateAction,
  extractFormData,
  parsePlansJson,
  executeShopifyMutation
};
const createGraphQLVariablesPayPerShipment = (group2, productId, appGraphqlId, prePaidPlan = false) => {
  const appId = extractNumericId(appGraphqlId);
  const sellingPlansToCreate = getsellingPlansToCreatePayPerShipment(group2);
  return {
    variables: {
      input: {
        appId: `${appId}` || "",
        name: group2.groupName || "Default Plan Group",
        merchantCode: prePaidPlan ? "PrePaid Plan Group" : "PayPerShipment Plan Group",
        options: [group2.groupName],
        position: 1,
        sellingPlansToCreate
      },
      resources: {
        productIds: [`gid://shopify/Product/${productId}`],
        productVariantIds: []
      }
    }
  };
};
const getsellingPlansToCreatePayPerShipment = (payPerShipmentGroup) => {
  const plans = payPerShipmentGroup == null ? void 0 : payPerShipmentGroup.sellingPlansToCreate;
  if (!plans) {
    return [];
  }
  if ((plans == null ? void 0 : plans.length) === 0) {
    return [];
  }
  const sellingPlansToCreate = plans.map((plan, index) => {
    const billingPolicy = generateSubscriptionBillingPolicy(plan);
    const deliveryPolicy = generateSubscriptionDeliveryPolicy(plan);
    const inventoryPolicy = generateInventoryPolicy(plan);
    const pricingPolicies = generateSubscriptionPricingPolicy(plan);
    const {
      planName,
      category,
      showDescription,
      descriptionContent
    } = plan;
    return {
      category,
      ...showDescription ? { description: descriptionContent } : {},
      name: planName,
      options: [planName],
      billingPolicy,
      deliveryPolicy,
      inventoryPolicy,
      pricingPolicies
    };
  });
  return sellingPlansToCreate;
};
const generateInventoryPolicy = (plan) => {
  const {
    inventoryPolicyEnable,
    inventoryPolicyReserve
  } = plan;
  if (!inventoryPolicyEnable) {
    return { reserve: "ON_FULFILLMENT" };
  }
  return { reserve: inventoryPolicyReserve };
};
const generateSubscriptionPricingPolicy = (plan) => {
  try {
    const pricingPolicies = createOnetimePlanUtils.generateOneTimePricingPolicies(plan);
    const pricingRecurringPolicy = generateRecurringPricingPolicy(plan);
    if (!pricingRecurringPolicy) {
      return [{
        fixed: pricingPolicies[0].fixed
      }];
    }
    return [{
      fixed: pricingPolicies[0].fixed,
      recurring: pricingRecurringPolicy[0].recurring
    }];
  } catch (error) {
    console.error("Error in generateSubscriptionPricingPolicy:");
  }
};
const generateSubscriptionDeliveryPolicy = (plan) => {
  try {
    const deliveryPolicyRecurring = generateRecurringDeliveryPolicy(plan);
    return {
      // fixed: deliveryPolicy.fixed,
      recurring: deliveryPolicyRecurring.recurring
    };
  } catch (error) {
    console.error("Error in generateSubscriptionDeliveryPolicy:");
  }
};
const generateSubscriptionBillingPolicy = (plan) => {
  try {
    const billingRecurringPolicy = generateRecurringBillingPolicy(plan);
    return {
      recurring: billingRecurringPolicy.recurring
    };
  } catch (error) {
    console.error("Error in generateSubscriptionBillingPolicy:");
  }
};
const generateRecurringBillingPolicy = (plan) => {
  const {
    billingRecurringPolicyEnable,
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    billingRecurringPolicyMinCycles,
    billingRecurringPolicyMaxCycles
  } = plan;
  if (!billingRecurringPolicyEnable) {
    return {
      recurring: {
        interval: billingRecurringPolicyInterval,
        intervalCount: billingRecurringPolicyIntervalCount
      }
    };
  }
  const policy = {
    recurring: {
      interval: billingRecurringPolicyInterval,
      intervalCount: billingRecurringPolicyIntervalCount,
      ...billingRecurringPolicyMinCycles === 0 ? {} : { minCycles: billingRecurringPolicyMinCycles },
      ...billingRecurringPolicyMaxCycles === 0 ? {} : { maxCycles: billingRecurringPolicyMaxCycles }
    }
  };
  return policy;
};
const generateRecurringPricingPolicy = (plan) => {
  const {
    pricingPolicyAfterCycleEnable,
    pricingPolicyAfterCycle,
    pricingPolicyAfterCycleAdjustmentType,
    pricingPolicyAfterCycleAdjustmentValue
  } = plan;
  if (!pricingPolicyAfterCycleEnable) {
    return false;
  }
  const adjustmentValue = {};
  switch (pricingPolicyAfterCycleAdjustmentType) {
    case "FIXED_AMOUNT":
    case "PRICE":
      adjustmentValue.fixedValue = pricingPolicyAfterCycleAdjustmentValue;
      break;
    case "PERCENTAGE":
      adjustmentValue.percentage = pricingPolicyAfterCycleAdjustmentValue;
      break;
    default:
      throw new Error(`Invalid discountType: ${pricingPolicyAfterCycleAdjustmentType}`);
  }
  return [
    {
      recurring: {
        adjustmentType: pricingPolicyAfterCycleAdjustmentType,
        adjustmentValue,
        afterCycle: pricingPolicyAfterCycle
      }
    }
  ];
};
const generateRecurringDeliveryPolicy = (plan) => {
  const {
    deliveryRecurringPolicyAnchorsCutoffDay,
    deliveryRecurringPolicyAnchorsDay,
    deliveryRecurringPolicyAnchorsMonth,
    deliveryRecurringPolicyAnchorsType,
    deliveryRecurringPolicyCutoff,
    deliveryRecurringPolicyFulfillmentExactTime,
    deliveryRecurringPolicyFulfillmentTrigger,
    deliveryRecurringPolicyIntent,
    deliveryRecurringPolicyInterval,
    deliveryRecurringPolicyIntervalCount,
    deliveryRecurringPreAnchorBehavior,
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    category
  } = plan;
  if (deliveryRecurringPolicyFulfillmentTrigger === "ASAP") {
    return {
      recurring: {
        interval: category === "SUBSCRIPTION" ? billingRecurringPolicyInterval : deliveryRecurringPolicyInterval,
        intervalCount: category === "SUBSCRIPTION" ? billingRecurringPolicyIntervalCount : deliveryRecurringPolicyIntervalCount
      }
    };
  }
  const deliveryPolicy = {
    recurring: {
      fulfillmentTrigger: deliveryRecurringPolicyFulfillmentTrigger,
      ...deliveryRecurringPolicyFulfillmentTrigger === "ANCHOR" ? {
        anchors: {
          cutoffDay: deliveryRecurringPolicyAnchorsType === "YEARDAY" ? null : deliveryRecurringPolicyAnchorsCutoffDay,
          day: deliveryRecurringPolicyAnchorsDay,
          ...deliveryRecurringPolicyAnchorsType === "YEARDAY" ? { month: deliveryRecurringPolicyAnchorsMonth } : {},
          // Conditionally include month
          type: deliveryRecurringPolicyAnchorsType
        }
      } : {},
      cutoff: deliveryRecurringPolicyCutoff,
      intent: deliveryRecurringPolicyIntent,
      preAnchorBehavior: deliveryRecurringPreAnchorBehavior,
      interval: category === "SUBSCRIPTION" ? billingRecurringPolicyInterval : deliveryRecurringPolicyInterval,
      intervalCount: category === "SUBSCRIPTION" ? billingRecurringPolicyIntervalCount : deliveryRecurringPolicyIntervalCount
    }
  };
  return deliveryPolicy;
};
const createVariablesSellingPlanReorder = (groupId, sellingPlans) => {
  const sellingPlansToUpdate = sellingPlans.map((plan, index) => ({
    id: plan.id,
    // Use the plan's ID
    position: index + 1
    // Position starts from 1
  }));
  return {
    variables: {
      id: groupId,
      // The group ID
      input: {
        sellingPlansToUpdate
        // The mapped selling plans
      }
    }
  };
};
const createVariablesSellingPlanUpdate = (groupId, sellingPlan) => {
  console.log(groupId);
  const billingPolicy = generateSubscriptionBillingPolicy(sellingPlan);
  const deliveryPolicy = generateSubscriptionDeliveryPolicy(sellingPlan);
  const inventoryPolicy = generateInventoryPolicy(sellingPlan);
  const pricingPolicies = generateSubscriptionPricingPolicy(sellingPlan);
  const {
    planName,
    category,
    showDescription,
    descriptionContent
  } = sellingPlan;
  const sellingPlansToUpdate = [{
    id: sellingPlan.id,
    category,
    ...showDescription ? { description: descriptionContent } : {},
    name: planName,
    options: [planName],
    billingPolicy,
    deliveryPolicy,
    inventoryPolicy,
    pricingPolicies
  }];
  return {
    variables: {
      id: groupId,
      input: {
        sellingPlansToUpdate
      }
    }
  };
};
const getsellingPlansToUpdate = (group2) => {
  const plans = group2.sellingPlansToUpdate;
  if (plans.length === 0) {
    return [];
  }
  const sellingPlansToUpdate = plans.map((plan, index) => {
    const billingPolicy = generateSubscriptionBillingPolicy(plan);
    const deliveryPolicy = generateSubscriptionDeliveryPolicy(plan);
    const inventoryPolicy = generateInventoryPolicy(plan);
    const pricingPolicies = generateSubscriptionPricingPolicy(plan);
    const {
      planName,
      showDescription,
      descriptionContent
    } = plan;
    return {
      id: plan.id,
      ...showDescription ? { description: descriptionContent } : {},
      name: planName,
      options: [planName],
      billingPolicy,
      deliveryPolicy,
      inventoryPolicy,
      pricingPolicies
    };
  });
  return sellingPlansToUpdate;
};
const updateGraphQLVariables = (group2) => {
  const sellingPlansToUpdate = getsellingPlansToUpdate(group2);
  const sellingPlansToCreate = getsellingPlansToCreatePayPerShipment(group2);
  return {
    variables: {
      id: group2.groupId,
      input: {
        name: group2.groupName || "Default Plan Group",
        sellingPlansToUpdate,
        sellingPlansToCreate
      }
    }
  };
};
const createRecurringPlanUtils = {
  generateRecurringBillingPolicy,
  generateRecurringDeliveryPolicy,
  generateRecurringPricingPolicy,
  generateSubscriptionDeliveryPolicy,
  generateSubscriptionPricingPolicy,
  generateSubscriptionBillingPolicy,
  createGraphQLVariablesPayPerShipment,
  createVariablesSellingPlanReorder,
  createVariablesSellingPlanUpdate,
  updateGraphQLVariables
};
const productAtom = atom(null);
const defaultPayPerShipmentPlan = {
  planName: "2 Week Subscription",
  showDescription: false,
  descriptionContent: "",
  category: "SUBSCRIPTION",
  pricingPolicyEnable: true,
  pricingPolicyAdjustmentType: "PERCENTAGE",
  pricingPolicyAdjustmentValue: 10,
  pricingPolicyAfterCycleEnable: false,
  pricingPolicyAfterCycle: 0,
  pricingPolicyAfterCycleAdjustmentType: "PERCENTAGE",
  pricingPolicyAfterCycleAdjustmentValue: 0,
  inventoryPolicyEnable: true,
  inventoryPolicyReserve: "ON_FULFILLMENT",
  deliveryPolicyEnable: true,
  deliveryPolicyAnchorsCutoffDay: 2,
  deliveryPolicyAnchorsDay: 1,
  deliveryPolicyAnchorsMonth: 1,
  deliveryPolicyAnchorsType: "WEEKDAY",
  deliveryPolicyCutoff: 2,
  deliveryPolicyFulfillmentExactTime: "",
  deliveryPolicyFulfillmentTrigger: "ASAP",
  deliveryPolicyIntent: "FULFILLMENT_BEGIN",
  deliveryPolicyPreAnchorBehavior: "ASAP",
  deliveryRecurringPolicyEnable: true,
  preAnchorBehavior: "ASAP",
  deliveryRecurringPolicyAnchorsCutoffDay: 1,
  deliveryRecurringPolicyAnchorsDay: 1,
  deliveryRecurringPolicyAnchorsMonth: 1,
  deliveryRecurringPolicyAnchorsType: "WEEKDAY",
  deliveryRecurringPolicyCutoff: 1,
  deliveryRecurringPolicyIntent: "FULFILLMENT_BEGIN",
  deliveryRecurringPolicyInterval: "WEEK",
  deliveryRecurringPolicyIntervalCount: 1,
  deliveryRecurringPreAnchorBehavior: "ASAP",
  billingRecurringPolicyEnable: true,
  billingRecurringPolicyInterval: "WEEK",
  billingRecurringPolicyIntervalCount: 2,
  billingRecurringPolicyMinCycles: 0,
  billingRecurringPolicyMaxCycles: 0,
  billingRecurringPolicyAnchorsCutoffDay: 1,
  billingRecurringPolicyAnchorsDay: 1,
  billingRecurringPolicyAnchorsMonth: 1,
  billingRecurringPolicyAnchorsType: "WEEKDAY"
};
const defaultPrePaidSubscriptionPlan = {
  ...defaultPayPerShipmentPlan,
  category: "PRE_ORDER"
};
const defaultPayPerShipmentGroup = {
  groupName: "Pay Per Shipment Plan Group",
  sellingPlansToCreate: [defaultPayPerShipmentPlan]
};
const defaultOneTimePlan = {
  enable: false,
  planName: "",
  pricingPolicyEnable: true,
  pricingPolicyAdjustmentType: "PERCENTAGE",
  pricingPolicyAdjustmentValue: 10,
  inventoryPolicyEnable: false,
  inventoryPolicyReserve: "ON_FULFILLMENT",
  deliveryPolicyEnable: false,
  deliveryPolicyAnchorsCutoffDay: 0,
  deliveryPolicyAnchorsDay: 1,
  deliveryPolicyAnchorsMonth: 0,
  deliveryPolicyAnchorsType: "MONTHDAY",
  deliveryPolicyCutoff: 0,
  deliveryPolicyFulfillmentExactTime: (/* @__PURE__ */ new Date()).toISOString(),
  deliveryPolicyFulfillmentTrigger: "ASAP",
  deliveryPolicyIntent: "FULFILLMENT_BEGIN",
  deliveryPolicyPreAnchorBehavior: "ASAP",
  preAnchorBehavior: "ASAP",
  billingPolicyEnable: false,
  billingPolicyCheckoutChargeType: "PERCENTAGE",
  billingPolicyCheckoutChargeValue: 100,
  billingPolicyRemainingBalanceChargeExactTime: "",
  billingPolicyRemainingBalanceChargeTimeAfterCheckout: "",
  billingPolicyRemainingBalanceChargeTrigger: "NO_REMAINING_BALANCE"
};
const PlanHeader$1 = ({
  isPlanEnabled,
  onToggle
}) => /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "between", children: [
  /* @__PURE__ */ jsx(Flex, { align: "center", gap: "2", children: /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-sm", children: "One-time plan settings" }) }),
  /* @__PURE__ */ jsx(Switch, { checked: isPlanEnabled, onChange: () => onToggle(!isPlanEnabled) })
] });
const NumberInput = ({ label, value, min = 1, percent = false, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleChange = (e) => {
    const newValue = e.target.value === "" ? "" : Number(e.target.value);
    setInternalValue(newValue);
  };
  const handleBlur = () => {
    const finalValue = Math.max(min, Math.min(internalValue || min, percent ? 100 : Infinity));
    setInternalValue(finalValue);
    onChange(finalValue);
  };
  return /* @__PURE__ */ jsx(
    Input$1,
    {
      type: "number",
      value: internalValue,
      onChange: handleChange,
      onBlur: handleBlur,
      label,
      suffix: /* @__PURE__ */ jsxs("div", { className: "-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200",
            onClick: () => {
              const newValue = Math.min(internalValue + 1, percent ? 100 : Infinity);
              setInternalValue(newValue);
              onChange(newValue);
            },
            children: /* @__PURE__ */ jsx(FaChevronUp, { className: "h-3 w-3" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200",
            onClick: () => {
              const newValue = Math.max(internalValue - 1, min);
              setInternalValue(newValue);
              onChange(newValue);
            },
            children: /* @__PURE__ */ jsx(FaChevronDown, { className: "h-3 w-3" })
          }
        )
      ] })
    }
  );
};
const unitOptions = [
  { label: "Day(s)", value: "DAY" },
  { label: "Week(s)", value: "WEEK" },
  { label: "Month(s)", value: "MONTH" },
  { label: "Year(s)", value: "YEAR" }
];
const PricingPolicyAdjustmentTypeOptions = [
  { label: "Fixed amount off", value: "FIXED_AMOUNT" },
  { label: "Percentage off", value: "PERCENTAGE" },
  { label: "Set Price", value: "PRICE" }
];
const inventoryReserveOptions = [
  { label: "Reserve Inventory on Fulfillment", value: "ON_FULFILLMENT" },
  { label: "Reserve Inventory on Sale", value: "ON_SALE" }
];
const deliveryPolicyFulfillmentTriggerOptions = [
  { label: "Anchor-based Fulfillment", value: "ANCHOR" },
  { label: "Fulfill as Soon as Possible", value: "ASAP" },
  { label: "Fulfill at an Exact Time", value: "EXACT_TIME" },
  { label: "Unknown Fulfillment Trigger", value: "UNKNOWN" }
];
const dayOptions = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 }
];
const anchorTypeOptions = [
  { label: "Day of the Week (Monday–Sunday)", value: "WEEKDAY" },
  { label: "Day of the Month (1st–31st)", value: "MONTHDAY" },
  { label: "Specific Date in the Year (Month & Day)", value: "YEARDAY" }
];
const preAnchorBehaviorOptions = [
  { label: "On the Same Day", value: "ASAP" },
  { label: "On Next Anchor", value: "NEXT" }
];
const monthDayOptions = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}${["st", "nd", "rd"][(i + 1) % 10 - 1] || "th"}`,
  value: i + 1
}));
[
  { label: "Same day of month", value: "SAME_DAY" },
  ...Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}${["st", "nd", "rd"][(i + 1) % 10 - 1] || "th"}`,
    value: (i + 1).toString()
  }))
];
const checkoutChargeTypeOptions = [
  { label: "The checkout charge is a percentage", value: "PERCENTAGE" },
  { label: "The checkout charge is a fixed price amount", value: "PRICE" }
];
const remainingBalanceChargeTriggerOptions = [
  { label: "At an exact time ", value: "EXACT_TIME" },
  // { label: "There's no remaining balance", value: "NO_REMAINING_BALANCE" },
  { label: "After the duration defined in the plan", value: "TIME_AFTER_CHECKOUT" }
];
Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}${["st", "nd", "rd"][(i + 1) % 10 - 1] || "th"}`,
  value: (i + 1).toString()
}));
const yearlyRenewalMonthOptions = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 }
];
Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}${["st", "nd", "rd"][(i + 1) % 10 - 1] || "th"}`,
  value: (i + 1).toString()
}));
const PricingPolicy = ({
  pricingPolicyEnable,
  pricingPolicyAdjustmentType,
  pricingPolicyAdjustmentValue,
  onToggleDiscount,
  onChangePricingPolicyAdjustmentType,
  onChangePricingPolicyAdjustmentValue
}) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx(
    Switch$1,
    {
      checked: pricingPolicyEnable,
      onChange: onToggleDiscount,
      label: "Offer a discount"
    }
  ),
  pricingPolicyEnable && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
      Select,
      {
        value: PricingPolicyAdjustmentTypeOptions.find((opt) => opt.value === pricingPolicyAdjustmentType),
        options: PricingPolicyAdjustmentTypeOptions,
        onChange: (option) => option && onChangePricingPolicyAdjustmentType(option.value),
        label: "Discount Type"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
      NumberInput,
      {
        label: pricingPolicyAdjustmentType === "PERCENTAGE" ? "Discount value" : "Set Price",
        value: pricingPolicyAdjustmentValue ?? 0,
        onChange: onChangePricingPolicyAdjustmentValue,
        percent: true
      }
    ) })
  ] })
] });
const PlanNameInput = ({
  value,
  onChange,
  productTitle
}) => /* @__PURE__ */ jsx(
  Input,
  {
    label: "Plan Name",
    value: value || productTitle,
    onChange,
    placeholder: "Enter plan name"
  }
);
const calendarContainerClasses = {
  base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md",
  monthContainer: {
    padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3"
  }
};
const prevNextButtonClasses = {
  base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
  border: "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md",
  size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]",
  children: {
    position: "[&.react-datepicker>button>span]:top-0",
    border: "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400",
    size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]"
  }
};
const timeOnlyClasses = {
  base: "[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28"
};
const popperClasses = {
  base: "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted dark:[&>svg]:!text-muted"
};
const DatePicker = ({
  inputProps,
  customInput,
  onCalendarOpen,
  onCalendarClose,
  popperClassName,
  calendarClassName,
  dateFormat = "d MMMM yyyy",
  showPopperArrow = false,
  ...props
}) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const handleCalenderOpen = () => setIsCalenderOpen(true);
  const handleCalenderClose = () => setIsCalenderOpen(false);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex [&_.react-datepicker-wrapper]:flex [&_.react-datepicker-wrapper]:w-full",
        props == null ? void 0 : props.className
      ),
      children: /* @__PURE__ */ jsx(
        ReactDatePicker,
        {
          customInput: customInput || /* @__PURE__ */ jsx(
            Input,
            {
              prefix: /* @__PURE__ */ jsx(PiCalendarBlank, { className: "w-5 h-5 text-gray-500" }),
              suffix: /* @__PURE__ */ jsx(
                PiCaretDownBold,
                {
                  className: cn(
                    "h-4 w-4 text-gray-500 transition",
                    isCalenderOpen && "rotate-180"
                  )
                }
              ),
              ...inputProps
            }
          ),
          onCalendarOpen: onCalendarOpen || handleCalenderOpen,
          onCalendarClose: onCalendarClose || handleCalenderClose,
          calendarClassName: cn(
            calendarContainerClasses.base,
            calendarContainerClasses.monthContainer.padding,
            prevNextButtonClasses.base,
            prevNextButtonClasses.border,
            prevNextButtonClasses.size,
            prevNextButtonClasses.children.position,
            prevNextButtonClasses.children.border,
            prevNextButtonClasses.children.size,
            timeOnlyClasses.base,
            calendarClassName
          ),
          popperClassName: cn(popperClasses.base, popperClassName),
          dateFormat,
          showPopperArrow,
          ...props
        }
      )
    }
  );
};
const BillingPolicySection = ({
  currentPlan,
  onChange
}) => {
  const {
    billingPolicyEnable,
    billingPolicyCheckoutChargeType,
    billingPolicyCheckoutChargeValue,
    billingPolicyRemainingBalanceChargeTrigger,
    billingPolicyRemainingBalanceChargeExactTime,
    billingPolicyRemainingBalanceChargeTimeAfterCheckout
  } = currentPlan;
  return /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Switch$1,
        {
          checked: billingPolicyEnable,
          onChange: () => onChange("billingPolicyEnable", !billingPolicyEnable),
          label: "Set Billing Policy"
        }
      ),
      /* @__PURE__ */ jsx(Text$1, { children: "If not set, it will treat as a normal order" })
    ] }),
    billingPolicyEnable && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-3 flex-wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-[50%]", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: checkoutChargeTypeOptions.find((opt) => opt.value === billingPolicyCheckoutChargeType),
          options: checkoutChargeTypeOptions,
          onChange: (option) => option && onChange("billingPolicyCheckoutChargeType", option.value),
          label: "Checkout Charge Type"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-[50%]", children: /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Set Value",
          value: billingPolicyCheckoutChargeValue ?? 0,
          onChange: (v) => onChange("billingPolicyCheckoutChargeValue", v),
          percent: true
        }
      ) }),
      billingPolicyCheckoutChargeType === "PERCENTAGE" && billingPolicyCheckoutChargeValue < 100 && /* @__PURE__ */ jsx("div", { className: "w-[100%]", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: remainingBalanceChargeTriggerOptions.find((opt) => opt.value === billingPolicyRemainingBalanceChargeTrigger),
          options: remainingBalanceChargeTriggerOptions,
          onChange: (option) => option && onChange("billingPolicyRemainingBalanceChargeTrigger", option.value),
          label: "Remaining Balance Charge Trigger"
        }
      ) }),
      billingPolicyRemainingBalanceChargeTrigger === "EXACT_TIME" && /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        DatePicker,
        {
          selected: billingPolicyRemainingBalanceChargeExactTime ? new Date(billingPolicyRemainingBalanceChargeExactTime) : null,
          onChange: (date) => {
            const isoDate = date ? date.toISOString() : null;
            onChange("billingPolicyRemainingBalanceChargeExactTime", isoDate);
          },
          dateFormat: "yyyy-MM-dd'T'HH:mm:ss'Z'",
          placeholderText: "Select Date & Time",
          showTimeSelect: true,
          timeFormat: "HH:mm",
          timeIntervals: 15,
          timeCaption: "Time",
          popperPlacement: "bottom-end",
          showMonthYearPicker: false,
          inputProps: {
            variant: "text",
            inputClassName: "rizzui-input-container flex items-center peer w-full transition duration-200 [&.is-focus]:ring-[0.8px] ring-[0.6px] [&.is-hover]:border-primary [&.is-focus]:border-primary [&.is-focus]:ring-primary [&_input::placeholder]:opacity-60 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
            label: "Select Date Time"
          },
          className: "w-full"
        }
      ) }),
      billingPolicyRemainingBalanceChargeTrigger === "TIME_AFTER_CHECKOUT" && /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Remaining Balance Charge Time After Checkout",
          value: parseInt(billingPolicyRemainingBalanceChargeTimeAfterCheckout.replace(/\D/g, ""), 10) || "",
          onChange: (v) => onChange("billingPolicyRemainingBalanceChargeTimeAfterCheckout", `P${v}${billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) || "D"}`),
          suffix: /* @__PURE__ */ jsx(
            Select,
            {
              options: [
                { value: "D", label: "Days" },
                { value: "W", label: "Weeks" },
                { value: "M", label: "Months" },
                { value: "Y", label: "Years" }
              ],
              value: {
                value: billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) || "D",
                label: billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "D" ? "Days" : billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "W" ? "Weeks" : billingPolicyRemainingBalanceChargeTimeAfterCheckout.slice(-1) === "M" ? "Months" : "Years"
              },
              onChange: (option) => option && onChange("billingPolicyRemainingBalanceChargeTimeAfterCheckout", `P${parseInt(billingPolicyRemainingBalanceChargeTimeAfterCheckout.replace(/\D/g, ""), 10) || 1}${option.value}`)
            }
          )
        }
      )
    ] })
  ] });
};
const DeliveryPolicySection = ({
  currentPlan,
  onChange
}) => {
  const {
    deliveryPolicyFulfillmentTrigger,
    deliveryPolicyFulfillmentExactTime,
    preAnchorBehavior,
    deliveryPolicyAnchorsType,
    deliveryPolicyAnchorsDay,
    deliveryPolicyAnchorsCutoffDay,
    deliveryPolicyAnchorsMonth,
    deliveryPolicyCutoff
  } = currentPlan;
  return /* @__PURE__ */ jsxs("div", { className: "pt-3 w-full", children: [
    /* @__PURE__ */ jsx(Text$1, { children: "Set Delivery Policy" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4 mt-3", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
      Select,
      {
        value: deliveryPolicyFulfillmentTriggerOptions.find((opt) => opt.value === deliveryPolicyFulfillmentTrigger),
        options: deliveryPolicyFulfillmentTriggerOptions,
        onChange: (option) => option && onChange("deliveryPolicyFulfillmentTrigger", option.value),
        label: "What triggers the fulfillment."
      }
    ) }) }),
    deliveryPolicyFulfillmentTrigger === "EXACT_TIME" && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        DatePicker,
        {
          selected: deliveryPolicyFulfillmentExactTime ? new Date(deliveryPolicyFulfillmentExactTime) : null,
          onChange: (date) => {
            const isoDate = date ? date.toISOString() : null;
            onChange("deliveryPolicyFulfillmentExactTime", isoDate);
          },
          dateFormat: "yyyy-MM-dd'T'HH:mm:ss'Z'",
          placeholderText: "Select Date & Time",
          showTimeSelect: true,
          timeFormat: "HH:mm",
          timeIntervals: 15,
          timeCaption: "Time",
          popperPlacement: "bottom-end",
          showMonthYearPicker: false,
          inputProps: {
            variant: "text",
            inputClassName: "rizzui-input-container flex items-center peer w-full transition duration-200 [&.is-focus]:ring-[0.8px] ring-[0.6px] [&.is-hover]:border-primary [&.is-focus]:border-primary [&.is-focus]:ring-primary [&_input::placeholder]:opacity-60 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
            label: "Select Date Time"
          },
          className: "w-full"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: preAnchorBehaviorOptions.find((opt) => opt.value === preAnchorBehavior),
          options: preAnchorBehaviorOptions,
          onChange: (option) => option && onChange("preAnchorBehavior", option.value),
          label: "The pre-anchor behavior."
        }
      ) })
    ] }),
    deliveryPolicyFulfillmentTrigger === "ANCHOR" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: anchorTypeOptions.find((opt) => opt.value === deliveryPolicyAnchorsType),
          options: anchorTypeOptions,
          onChange: (option) => option && onChange("deliveryPolicyAnchorsType", option.value),
          label: "When Should Delivery Be Scheduled?"
        }
      ) }),
      deliveryPolicyAnchorsType == "WEEKDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === deliveryPolicyAnchorsDay),
            options: dayOptions,
            onChange: (option) => option && onChange("deliveryPolicyAnchorsDay", option.value),
            label: "Select Day"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === deliveryPolicyAnchorsCutoffDay),
            options: dayOptions,
            onChange: (option) => option && onChange("deliveryPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      deliveryPolicyAnchorsType === "MONTHDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === deliveryPolicyAnchorsMonth),
            options: monthDayOptions,
            onChange: (option) => option && onChange("deliveryPolicyAnchorsMonth", option.value),
            label: "Select Month"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === deliveryPolicyAnchorsCutoffDay),
            options: monthDayOptions,
            onChange: (option) => option && onChange("deliveryPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      deliveryPolicyAnchorsType == "YEARDAY" && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: yearlyRenewalMonthOptions.find((opt) => opt.value === deliveryPolicyAnchorsDay),
          options: yearlyRenewalMonthOptions,
          onChange: (option) => option && onChange("deliveryPolicyAnchorsDay", option.value),
          label: "Select Day"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 mt-3", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: preAnchorBehaviorOptions.find((opt) => opt.value === preAnchorBehavior),
          options: preAnchorBehaviorOptions,
          onChange: (option) => option && onChange("preAnchorBehavior", option.value),
          label: "The pre-anchor behavior."
        }
      ) }) })
    ] })
  ] });
};
const InventoryPolicySection = ({
  inventoryPolicyEnable,
  inventoryPolicyReserve,
  onToggleInventory,
  onChangeInventoryReserve
}) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx(
    Switch$1,
    {
      checked: inventoryPolicyEnable,
      onChange: onToggleInventory,
      label: "Set Inventory Policy"
    }
  ),
  inventoryPolicyEnable && /* @__PURE__ */ jsx("div", { className: "flex gap-4 mt-3", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
    Select,
    {
      value: inventoryReserveOptions.find((opt) => opt.value === inventoryPolicyReserve),
      options: inventoryReserveOptions,
      onChange: (option) => option && onChangeInventoryReserve(option.value),
      label: "When to reserve inventory for the order."
    }
  ) }) })
] });
const OneTimePlanForm = ({
  currentPlan,
  onChange,
  onSave,
  productTitle,
  tabListClassName = "w-[21%]",
  tabPanelClassName = "w-[79%]",
  saveButtonProps = {}
}) => /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
  /* @__PURE__ */ jsxs(
    Tab,
    {
      vertical: true,
      onPointerDown: (e) => e.stopPropagation(),
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxs(Tab.List, { className: tabListClassName, children: [
          /* @__PURE__ */ jsx(Tab.ListItem, { children: "Basic" }),
          /* @__PURE__ */ jsx(Tab.ListItem, { children: "Pricing Policy" }),
          /* @__PURE__ */ jsx(Tab.ListItem, { children: "Inventory Policy" }),
          /* @__PURE__ */ jsx(Tab.ListItem, { children: "Delivery Policy" }),
          /* @__PURE__ */ jsx(Tab.ListItem, { children: "Billing Policy" })
        ] }),
        /* @__PURE__ */ jsxs(Tab.Panels, { className: tabPanelClassName, children: [
          /* @__PURE__ */ jsx(Tab.Panel, { children: /* @__PURE__ */ jsx(
            PlanNameInput,
            {
              value: currentPlan.planName || "",
              onChange: (e) => onChange("planName", e.target.value),
              productTitle
            }
          ) }),
          /* @__PURE__ */ jsx(Tab.Panel, { children: /* @__PURE__ */ jsx(
            PricingPolicy,
            {
              pricingPolicyEnable: currentPlan.pricingPolicyEnable,
              pricingPolicyAdjustmentType: currentPlan.pricingPolicyAdjustmentType,
              pricingPolicyAdjustmentValue: currentPlan.pricingPolicyAdjustmentValue,
              onToggleDiscount: () => onChange("pricingPolicyEnable", !currentPlan.pricingPolicyEnable),
              onChangePricingPolicyAdjustmentType: (value) => onChange("pricingPolicyAdjustmentType", value),
              onChangePricingPolicyAdjustmentValue: (value) => onChange("pricingPolicyAdjustmentValue", value)
            }
          ) }),
          /* @__PURE__ */ jsx(Tab.Panel, { children: /* @__PURE__ */ jsx(
            InventoryPolicySection,
            {
              inventoryPolicyEnable: currentPlan.inventoryPolicyEnable,
              inventoryPolicyReserve: currentPlan.inventoryPolicyReserve,
              onToggleInventory: () => onChange("inventoryPolicyEnable", !currentPlan.inventoryPolicyEnable),
              onChangeInventoryReserve: (value) => onChange("inventoryPolicyReserve", value)
            }
          ) }),
          /* @__PURE__ */ jsx(Tab.Panel, { children: /* @__PURE__ */ jsx(DeliveryPolicySection, { currentPlan, onChange }) }),
          /* @__PURE__ */ jsx(Tab.Panel, { children: /* @__PURE__ */ jsx(BillingPolicySection, { currentPlan, onChange }) })
        ] })
      ]
    }
  ),
  /* @__PURE__ */ jsx(
    Button$1,
    {
      onPointerDown: (e) => e.stopPropagation(),
      onClick: (e) => {
        e.stopPropagation();
        onSave();
      },
      ...saveButtonProps,
      children: "Save Plan"
    }
  )
] });
const OneTimePlanCard = ({
  plan,
  index,
  actions
}) => /* @__PURE__ */ jsxs("div", { className: "p-5 border rounded-lg shadow-md bg-white flex flex-col gap-3 transition-all hover:shadow-lg w-full", children: [
  /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(GiTakeMyMoney, { className: "text-green-600 text-xl" }),
    /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-gray-900", children: plan.planName || "Unnamed Plan" })
  ] }) }),
  /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center text-sm text-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx(FaClock, { className: "inline-block text-blue-500 mr-1" }),
      /* @__PURE__ */ jsx("strong", { children: "Plan Type:" }),
      " One-time Purchase"
    ] }),
    plan.pricingPolicyAdjustmentValue && /* @__PURE__ */ jsxs("p", { className: "text-green-600 font-medium", children: [
      /* @__PURE__ */ jsx(FaGift, { className: "inline-block text-yellow-500 mr-1" }),
      /* @__PURE__ */ jsx("strong", { children: "Discount:" }),
      " ",
      plan.pricingPolicyAdjustmentValue,
      "%"
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
    /* @__PURE__ */ jsxs(Button$1, { variant: "outline", size: "sm", onClick: () => actions.onEdit(index), children: [
      /* @__PURE__ */ jsx(PiCheckCircleBold, { className: "mr-1 text-blue-500" }),
      " Edit"
    ] }),
    /* @__PURE__ */ jsxs(Button$1, { variant: "outline", size: "sm", color: "danger", onClick: () => actions.onDelete(index), children: [
      /* @__PURE__ */ jsx(PiTrashBold, { className: "mr-1 text-red-500" }),
      " Delete"
    ] })
  ] })
] });
const plansAtom = atom([]);
atom([]);
const payPerShipmentPlanAtom = atom([]);
atom([]);
const createPlanPageStates = atom();
const OneTimePlanSettings = () => {
  const [currentPlan, setCurrentPlan] = useState(defaultOneTimePlan);
  const [isPlanEnabled, setIsPlanEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormOnetime, setShowFormOnetime] = useState(false);
  const [product] = useAtom(productAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  useEffect(() => {
    if (product) {
      defaultOneTimePlan.planName = product.title;
    }
  }, [product]);
  useEffect(() => {
    var _a2;
    if ((_a2 = createPlanPageState == null ? void 0 : createPlanPageState.oneTimeGroup) == null ? void 0 : _a2.groupId) {
      const alreadyExistPlan = createPlanPageState.oneTimeGroup.sellingPlansToCreate[0];
      setCurrentPlan(alreadyExistPlan);
      setIsPlanEnabled(true);
      setShowFormOnetime(true);
    }
  }, []);
  const handleChange = useCallback((field, value) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value
    }));
    setShowFormOnetime(true);
  }, []);
  const handleSavePlan = async () => {
    setIsLoading(true);
    try {
      toast.success("One-time plan saved successfully!");
      setIsPlanEnabled(true);
      setShowFormOnetime(false);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        oneTimeGroup: {
          groupName: currentPlan.planName,
          sellingPlansToCreate: [currentPlan]
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const handleTogglePlan = useCallback((checked) => {
    setIsPlanEnabled(checked);
    setShowFormOnetime(checked);
  }, []);
  const handleEditPlan = useCallback(() => {
    setShowFormOnetime(true);
  }, []);
  const handleDeletePlan = useCallback(() => {
    setIsPlanEnabled(false);
    setShowFormOnetime(false);
    setCurrentPlan(defaultOneTimePlan);
    toast.success("Plan deleted successfully!");
  }, []);
  useEffect(() => {
    if (showFormOnetime) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [showFormOnetime]);
  return /* @__PURE__ */ jsxs("div", { className: "border border-muted rounded-[10px] p-3 relative", children: [
    isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
    /* @__PURE__ */ jsx(PlanHeader$1, { isPlanEnabled, onToggle: handleTogglePlan }),
    isPlanEnabled && (showFormOnetime ? /* @__PURE__ */ jsx(
      OneTimePlanForm,
      {
        currentPlan,
        onChange: handleChange,
        onSave: handleSavePlan,
        productTitle: (product == null ? void 0 : product.title) || ""
      }
    ) : /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      OneTimePlanCard,
      {
        plan: currentPlan,
        index: 0,
        actions: {
          onEdit: handleEditPlan,
          onDelete: handleDeletePlan,
          onDuplicate: () => {
          }
        }
      }
    ) }))
  ] });
};
const shopObject = atom(null);
const PlanCard = ({
  plan,
  index,
  actions,
  prePaidFrom
}) => {
  const {
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    pricingPolicyEnable,
    pricingPolicyAdjustmentValue,
    pricingPolicyAfterCycleAdjustmentType,
    planName,
    deliveryRecurringPolicyIntervalCount,
    deliveryRecurringPolicyInterval,
    pricingPolicyAdjustmentType
  } = plan;
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const formattedPrice = useMemo(() => {
    if (pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PRICE") {
      return formatPrice(pricingPolicyAdjustmentValue, moneyWithCurrencyFormat);
    }
    return null;
  }, [pricingPolicyAdjustmentValue, pricingPolicyAdjustmentType, moneyWithCurrencyFormat]);
  return /* @__PURE__ */ jsxs("div", { className: "p-5 border rounded-lg shadow-md bg-white flex flex-col gap-3 transition-all hover:shadow-lg w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(GiTakeMyMoney, { className: "text-green-600 text-xl" }),
      /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-gray-900", children: planName || "Unnamed Plan" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center text-sm text-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "capitalize flex items-center", children: [
        /* @__PURE__ */ jsx(FaClock, { className: "inline-block text-blue-500 mr-2" }),
        /* @__PURE__ */ jsx("strong", { children: "Frequency:" }),
        /* @__PURE__ */ jsxs(Text$1, { className: "capitalize ms-2", children: [
          billingRecurringPolicyIntervalCount,
          " ",
          billingRecurringPolicyInterval
        ] })
      ] }),
      prePaidFrom && /* @__PURE__ */ jsxs("div", { className: "capitalize flex items-center", children: [
        /* @__PURE__ */ jsx(FaShip, { className: "inline-block text-blue-500 mr-2" }),
        /* @__PURE__ */ jsx("strong", { children: "Delivery Every:" }),
        /* @__PURE__ */ jsxs(Text$1, { className: "capitalize ms-2", children: [
          deliveryRecurringPolicyIntervalCount,
          " ",
          deliveryRecurringPolicyInterval
        ] })
      ] }),
      pricingPolicyEnable && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        pricingPolicyAdjustmentType === "PERCENTAGE" && /* @__PURE__ */ jsxs("p", { className: "text-green-600 font-medium flex items-center", children: [
          /* @__PURE__ */ jsx(FaGift, { className: "inline-block text-yellow-500 mr-2" }),
          /* @__PURE__ */ jsx("strong", { children: "Discount:" }),
          " ",
          pricingPolicyAdjustmentValue,
          "%"
        ] }),
        formattedPrice && /* @__PURE__ */ jsxs("div", { className: "text-green-600 font-medium flex items-center", children: [
          /* @__PURE__ */ jsx(FaGift, { className: "inline-block text-yellow-500 mr-2" }),
          /* @__PURE__ */ jsx("strong", { children: pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PERCENTAGE" ? "Discount:" : "Price:" }),
          /* @__PURE__ */ jsx(Text$1, { className: "capitaliz", children: formattedPrice })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
      /* @__PURE__ */ jsxs(Button$1, { variant: "outline", size: "sm", onClick: () => actions.onEdit(index), children: [
        /* @__PURE__ */ jsx(PiCheckCircleBold, { className: "mr-1 text-blue-500" }),
        " Edit"
      ] }),
      /* @__PURE__ */ jsxs(Button$1, { variant: "outline", size: "sm", onClick: () => actions.onDuplicate(index), children: [
        /* @__PURE__ */ jsx(PiPlusCircleBold, { className: "mr-1 text-green-500" }),
        " Duplicate"
      ] }),
      /* @__PURE__ */ jsxs(Button$1, { variant: "outline", size: "sm", color: "danger", onClick: () => actions.onDelete(index), children: [
        /* @__PURE__ */ jsx(PiTrashBold, { className: "mr-1 text-red-500" }),
        " Delete"
      ] })
    ] })
  ] });
};
const PricingPolicyRecurring = ({
  handleChange,
  plan
}) => {
  const {
    pricingPolicyEnable,
    pricingPolicyAdjustmentValue,
    pricingPolicyAdjustmentType,
    pricingPolicyAfterCycleEnable,
    pricingPolicyAfterCycle,
    pricingPolicyAfterCycleAdjustmentValue,
    pricingPolicyAfterCycleAdjustmentType
  } = plan;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      Switch$1,
      {
        checked: pricingPolicyEnable,
        onChange: () => handleChange("pricingPolicyEnable", !pricingPolicyEnable),
        label: "Offer a discount on this frequency"
      }
    ),
    pricingPolicyEnable && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
          NumberInput,
          {
            label: "Discount Value",
            value: pricingPolicyAdjustmentValue,
            onChange: (v) => handleChange("pricingPolicyAdjustmentValue", v)
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: PricingPolicyAdjustmentTypeOptions.find((opt) => opt.value === pricingPolicyAdjustmentType),
            options: PricingPolicyAdjustmentTypeOptions,
            onChange: (option) => option && handleChange("pricingPolicyAdjustmentType", option.value),
            label: "Discount Type"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        Switch$1,
        {
          checked: pricingPolicyAfterCycleEnable,
          onChange: () => handleChange("pricingPolicyAfterCycleEnable", !pricingPolicyAfterCycleEnable),
          label: "Change discount after specific number of payments"
        }
      ),
      pricingPolicyAfterCycleEnable && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          NumberInput,
          {
            label: "Change After Charges",
            value: pricingPolicyAfterCycle,
            onChange: (v) => handleChange("pricingPolicyAfterCycle", v)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            NumberInput,
            {
              label: "New Discount Value",
              value: pricingPolicyAfterCycleAdjustmentValue,
              onChange: (v) => handleChange("pricingPolicyAfterCycleAdjustmentValue", v)
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            Select,
            {
              value: PricingPolicyAdjustmentTypeOptions.find((opt) => opt.value === pricingPolicyAfterCycleAdjustmentType),
              options: PricingPolicyAdjustmentTypeOptions,
              onChange: (option) => option && handleChange("pricingPolicyAfterCycleAdjustmentType", option.value),
              label: "New Discount Type"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
};
const InventoryPolicyRecurring = ({
  handleChange,
  plan
}) => {
  const {
    inventoryPolicyEnable,
    inventoryPolicyReserve
  } = plan;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
      Switch$1,
      {
        checked: inventoryPolicyEnable,
        onChange: () => handleChange("inventoryPolicyEnable", !inventoryPolicyEnable),
        label: "Set Inventory Policy"
      }
    ),
    inventoryPolicyEnable && /* @__PURE__ */ jsx(
      Select,
      {
        value: inventoryReserveOptions.find((opt) => opt.value === inventoryPolicyReserve),
        options: inventoryReserveOptions,
        onChange: (option) => option && handleChange("inventoryPolicyReserve", option.value),
        label: "When to reserve inventory for the order."
      }
    )
  ] });
};
const getDays = (interval, count) => {
  switch (interval) {
    case "DAY":
      return count;
    case "WEEK":
      return count * 7;
    case "MONTH":
      return count * 30;
    case "YEAR":
      return count * 365;
    default:
      return 0;
  }
};
const getMaxDeliveryCount = (billingDays, deliveryUnit) => {
  if (!deliveryUnit) return 0;
  const daysPerUnit = {
    DAY: 1,
    WEEK: 7,
    MONTH: 30,
    YEAR: 365
  }[deliveryUnit] || 1;
  return Math.floor((billingDays - 1) / daysPerUnit);
};
const validatePlanBeforeApiCall = (plan) => {
  const errors = [];
  return errors;
};
const sellingPlanValidators = {
  getDays,
  getMaxDeliveryCount,
  validatePlanBeforeApiCall
};
const DeliveryRecurringPolicySection = ({
  currentPlan,
  onChange,
  prePaidFrom = false
}) => {
  const {
    deliveryRecurringPolicyAnchorsCutoffDay,
    deliveryRecurringPolicyAnchorsDay,
    deliveryRecurringPolicyAnchorsMonth,
    deliveryRecurringPolicyAnchorsType,
    deliveryRecurringPolicyCutoff,
    deliveryRecurringPolicyInterval,
    deliveryRecurringPolicyIntervalCount,
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    deliveryRecurringPreAnchorBehavior
  } = currentPlan;
  const billingDays = sellingPlanValidators.getDays(
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount || 1
  );
  const deliveryDays = sellingPlanValidators.getDays(
    deliveryRecurringPolicyInterval,
    deliveryRecurringPolicyIntervalCount || 0
  );
  unitOptions.map((opt) => ({
    ...opt,
    disabled: sellingPlanValidators.getMaxDeliveryCount(billingDays, opt.value) < 1
  }));
  const maxDeliveryCount = sellingPlanValidators.getMaxDeliveryCount(billingDays, deliveryRecurringPolicyInterval);
  return /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
    prePaidFrom && /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-4 mb-3 flex-wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "w-[48%]", children: /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Delivery Frequency",
          value: deliveryRecurringPolicyIntervalCount ?? 0,
          onChange: (v) => onChange("deliveryRecurringPolicyIntervalCount", v),
          min: 1,
          max: maxDeliveryCount
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-[48%]", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: unitOptions.find((opt) => opt.value === deliveryRecurringPolicyInterval),
          options: unitOptions,
          onChange: (option) => {
            if (option) {
              onChange("deliveryRecurringPolicyInterval", option.value);
            }
          },
          label: "Unit"
        }
      ) }),
      deliveryDays >= billingDays && /* @__PURE__ */ jsx(Text$1, { className: "text-red-500 mt-2 w-[100%]", children: "Delivery interval must be shorter than the billing interval" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
      Select,
      {
        value: preAnchorBehaviorOptions.find((opt) => opt.value === deliveryRecurringPreAnchorBehavior),
        options: preAnchorBehaviorOptions,
        onChange: (option) => option && onChange("deliveryRecurringPreAnchorBehavior", option.value),
        label: "The pre-anchor behavior."
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: anchorTypeOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsType),
          options: anchorTypeOptions,
          onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsType", option.value),
          label: "When Should Delivery Be Scheduled?"
        }
      ) }),
      deliveryRecurringPolicyAnchorsType == "WEEKDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsDay),
            options: dayOptions,
            onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsDay", option.value),
            label: "Select Day"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsCutoffDay),
            options: dayOptions,
            onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      deliveryRecurringPolicyAnchorsType === "MONTHDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsMonth),
            options: monthDayOptions,
            onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsMonth", option.value),
            label: "Select Month"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsCutoffDay),
            options: monthDayOptions,
            onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      deliveryRecurringPolicyAnchorsType == "YEARDAY" && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: yearlyRenewalMonthOptions.find((opt) => opt.value === deliveryRecurringPolicyAnchorsDay),
          options: yearlyRenewalMonthOptions,
          onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsDay", option.value),
          label: "Select Day"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 mt-3", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: preAnchorBehaviorOptions.find((opt) => opt.value === deliveryRecurringPreAnchorBehavior),
          options: preAnchorBehaviorOptions,
          onChange: (option) => option && onChange("deliveryRecurringPreAnchorBehavior", option.value),
          label: "The pre-anchor behavior."
        }
      ) }) })
    ] })
  ] });
};
const DeliveryPolicyRecurring = ({
  handleChange,
  plan,
  prePaidFrom = false
}) => {
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(DeliveryRecurringPolicySection, { currentPlan: plan, onChange: handleChange, prePaidFrom }) });
};
const BillingRecurringPolicySection = ({
  currentPlan,
  onChange
}) => {
  const {
    billingRecurringPolicyEnable,
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    billingRecurringPolicyMinCycles,
    billingRecurringPolicyMaxCycles,
    billingRecurringPolicyAnchorsType,
    billingRecurringPolicyAnchorsDay,
    billingRecurringPolicyAnchorsCutoffDay,
    billingRecurringPolicyAnchorsMonth
  } = currentPlan;
  useEffect(() => {
    const defaultPlanName = `${billingRecurringPolicyIntervalCount} ${billingRecurringPolicyInterval.toLowerCase()} Subscription`;
    onChange("planName", defaultPlanName);
  }, [billingRecurringPolicyIntervalCount, billingRecurringPolicyInterval]);
  return /* @__PURE__ */ jsx("div", { className: "pt-3 border-t-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-3 flex-wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-[50%]", children: /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Billing Frequency",
          value: billingRecurringPolicyIntervalCount,
          onChange: (v) => onChange("billingRecurringPolicyIntervalCount", v)
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-[50%]", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: unitOptions.find((opt) => opt.value === billingRecurringPolicyInterval),
          options: unitOptions,
          onChange: (option) => {
            if (option) {
              onChange("billingRecurringPolicyInterval", option.value);
            }
          },
          label: "Unit"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-[50%]", children: /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Billing Policy Min Cycles",
          value: billingRecurringPolicyMinCycles ?? 0,
          onChange: (v) => onChange("billingRecurringPolicyMinCycles", v)
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-[50%]", children: /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Billing Policy Max Cycles",
          value: billingRecurringPolicyMaxCycles ?? 0,
          onChange: (v) => onChange("billingRecurringPolicyMaxCycles", v)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-3 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: anchorTypeOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsType),
          options: anchorTypeOptions,
          onChange: (option) => option && onChange("billingRecurringPolicyAnchorsType", option.value),
          label: "When Should Delivery Be Scheduled?"
        }
      ) }),
      billingRecurringPolicyAnchorsType == "WEEKDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsDay),
            options: dayOptions,
            onChange: (option) => option && onChange("billingRecurringPolicyAnchorsDay", option.value),
            label: "Select Day"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: dayOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsCutoffDay),
            options: dayOptions,
            onChange: (option) => option && onChange("billingRecurringPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      billingRecurringPolicyAnchorsType === "MONTHDAY" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsMonth),
            options: monthDayOptions,
            onChange: (option) => option && onChange("deliveryRecurringPolicyAnchorsMonth", option.value),
            label: "Select Month"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Select,
          {
            value: monthDayOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsCutoffDay),
            options: monthDayOptions,
            onChange: (option) => option && onChange("billingRecurringPolicyAnchorsCutoffDay", option.value),
            label: "Cutfoff Time Interval"
          }
        ) })
      ] }),
      billingRecurringPolicyAnchorsType == "YEARDAY" && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
        Select,
        {
          value: yearlyRenewalMonthOptions.find((opt) => opt.value === billingRecurringPolicyAnchorsDay),
          options: yearlyRenewalMonthOptions,
          onChange: (option) => option && onChange("billingRecurringPolicyAnchorsDay", option.value),
          label: "Select Day"
        }
      ) })
    ] })
  ] }) });
};
const BillingPolicyRecurring = ({
  handleChange,
  plan
}) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BillingRecurringPolicySection, { currentPlan: plan, onChange: handleChange }) });
};
const DisplayContentsTab = ({
  handleChange,
  plan,
  prePaidFrom
}) => {
  const {
    billingRecurringPolicyInterval,
    billingRecurringPolicyIntervalCount,
    pricingPolicyEnable,
    pricingPolicyAdjustmentValue,
    pricingPolicyAfterCycleAdjustmentType,
    planName,
    showDescription,
    descriptionContent
  } = plan;
  const [planNameState, setPlanName] = useState(plan.planName || "");
  const [isUserEdited, setIsUserEdited] = useState(false);
  const isUserEditedRef = useRef(isUserEdited);
  useEffect(() => {
    isUserEditedRef.current = isUserEdited;
  }, [isUserEdited]);
  useEffect(() => {
    setPlanName(plan.planName || "");
    setIsUserEdited(false);
    isUserEditedRef.current = false;
  }, [plan]);
  useEffect(() => {
    if (!isUserEditedRef.current) {
      const defaultPlanName = `${billingRecurringPolicyIntervalCount} ${billingRecurringPolicyInterval.toLowerCase()} Subscription`;
      if (planNameState !== defaultPlanName) {
        setPlanName(defaultPlanName);
        handleChange("planName", defaultPlanName);
      }
    }
  }, [billingRecurringPolicyIntervalCount, billingRecurringPolicyInterval]);
  const handlePlanNameChange = (e) => {
    const newValue = e.target.value;
    setPlanName(newValue);
    handleChange("planName", newValue);
    if (!isUserEditedRef.current) {
      setIsUserEdited(true);
      isUserEditedRef.current = true;
    }
  };
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Plan Name" }),
      /* @__PURE__ */ jsx(
        Input$1,
        {
          type: "text",
          value: planNameState,
          onChange: handlePlanNameChange,
          className: "w-full p-2"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Switch$1,
      {
        checked: showDescription,
        onChange: () => handleChange("showDescription", !showDescription),
        label: "Show Description"
      }
    ),
    showDescription && // <QuillEditor
    //     value={descriptionContent}
    //     onChange={(content) => handleChange('descriptionContent', content)}
    //     label="Description"
    // />
    /* @__PURE__ */ jsx(Fragment$1, {})
  ] }) });
};
const tabs = [
  {
    label: "Pricing Policy",
    value: "pricing-policy",
    content: (plan, handleChange, prePaidFrom = false) => /* @__PURE__ */ jsx(
      PricingPolicyRecurring,
      {
        plan,
        handleChange
      }
    )
  },
  {
    label: "Inventory Policy",
    value: "inventory-policy",
    content: (plan, handleChange, prePaidFrom = false) => /* @__PURE__ */ jsx(
      InventoryPolicyRecurring,
      {
        plan,
        handleChange
      }
    )
  },
  {
    label: "Billing Policy",
    value: "billing-policy",
    content: (plan, handleChange, prePaidFrom = false) => /* @__PURE__ */ jsx(
      BillingPolicyRecurring,
      {
        plan,
        handleChange
      }
    )
  },
  {
    label: "Delivery Policy",
    value: "delivery-policy",
    content: (plan, handleChange, prePaidFrom = false) => /* @__PURE__ */ jsx(
      DeliveryPolicyRecurring,
      {
        plan,
        handleChange,
        prePaidFrom
      }
    )
  },
  {
    label: "Display Contents",
    value: "display",
    content: (plan, handleChange, prePaidFrom = false) => /* @__PURE__ */ jsx(
      DisplayContentsTab,
      {
        prePaidFrom,
        plan,
        handleChange
      }
    )
  }
];
const PlanForm = ({
  plan,
  onChange,
  prePaidFrom
}) => {
  const handleChange = (field, value) => {
    onChange({ ...plan, [field]: value });
  };
  return /* @__PURE__ */ jsxs(Tab, { vertical: true, className: "w-full", children: [
    /* @__PURE__ */ jsx(Tab.List, { className: "w-[28%]", children: tabs.map((tab) => /* @__PURE__ */ jsx(Tab.ListItem, { children: tab.label }, tab.value)) }),
    /* @__PURE__ */ jsx(Tab.Panels, { className: "w-full", children: tabs.map((tab) => /* @__PURE__ */ jsx(Tab.Panel, { children: tab.content(plan, handleChange, prePaidFrom) }, tab.value)) })
  ] });
};
const ConfirmationModal = ({
  isOpen,
  title,
  ref,
  message,
  onConfirm,
  onCancel
}) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  return /* @__PURE__ */ jsx(Modal$1, { isOpen, onClose: onCancel, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-2", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-4", children: [
      /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "outline",
          color: "secondary",
          onClick: onCancel,
          onPointerDown: (e) => e.stopPropagation(),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "solid",
          color: "danger",
          onClick: handleConfirm,
          onPointerDown: (e) => e.stopPropagation(),
          children: "Confirm"
        }
      )
    ] })
  ] }) });
};
const messages = {
  passwordOneUppercase: `The Password must contain at least one uppercase character`,
  passwordOneLowercase: `The Password must contain at least one lowercase character`,
  passwordOneNumeric: `The password must contain at least one numerical character.`,
  passwordRequired: "Password is required",
  passwordLengthMin: "Password must be at least 6 characters",
  passwordLengthMax: `Password can't be more than 32 characters`,
  newPasswordRequired: "New Password is required",
  newPasswordLength: "New Password must be at least 6 characters",
  confirmPasswordRequired: "Confirm Password is required",
  passwordsDidNotMatch: "Passwords don't match",
  nameIsRequired: "Name is required",
  firstNameRequired: "First name is required",
  phoneNumberIsRequired: "Phone Number is required",
  customerNameIsRequired: "Customer name is required",
  lastNameRequired: "Last name is required",
  streetIsRequired: "Street Address is required",
  emailIsRequired: "Email address is required",
  invalidEmail: "Invalid email address",
  roleIsRequired: "Role is required",
  permissionIsRequired: "Permission is required",
  teamIsRequired: "New member must be assigned to a team",
  productNameIsRequired: "Product name is required",
  productTypeIsRequired: "Product type is required",
  priceIsRequired: "Product price is required",
  retailPriceIsRequired: "Retail price is required",
  salePriceIsRequired: "Sale price is required",
  shippingPriceIsRequired: "Shipping price is required",
  cityIsRequired: "City is required",
  stateIsRequired: "State is required",
  countryIsRequired: "Country is required",
  addressLineOneRequired: "Address line 1 is required",
  zipCodeRequired: "ZIP code is required",
  cardHolderNameIsRequired: "Card holder name is required",
  cardNumberIsRequired: "Card Number is required",
  cardExpireIsRequired: "Expire Date is required",
  cvcNumberIsRequired: "CVC Number is required",
  catNameIsRequired: "Category name is required",
  slugIsRequired: "Slug is required",
  addressIsRequired: "Address is required",
  createDateIsRequired: "Create Date is required",
  dueDateIsRequired: "Due Date is required",
  statusIsRequired: "Status is required",
  discountIsRequired: "Discount amount is required",
  taxIsRequired: "Tax amount is required",
  itemNameIsRequired: "Item Name is required",
  itemDescIsRequired: "Item Description is required",
  itemQtyIsRequired: "Item Quantity is required",
  itemPriceIsRequired: "Item Price is required",
  fullNameIsRequired: "Full name is required",
  propertyTypeIsRequired: "Property type is required",
  placeTypeIsRequired: "Place type is required",
  amenitiesAreRequired: "Amenities are required",
  thisFieldIsRequired: "This Field is required",
  propertyNameIsRequired: "Property name is required",
  snippetNameIsRequired: "Snippet name is required",
  snippetDirIsRequired: "You must have to select a snippet folder",
  templateNameIsRequired: "Template name is required",
  templateDirIsRequired: "You must have to select a template folder",
  folderNameIsRequired: "Folder name is required",
  folderNameLengthMin: "Folder name must be at least 3 letters",
  productColorRequired: "Product Color is Required",
  productSizeRequired: "Product Size is Required",
  descriptionIsRequired: "Description is Required",
  locationIsRequired: "Location is Required",
  startDateIsRequired: "Start Date is required",
  startTimeIsRequired: "Start Time is required",
  endDateIsRequired: "End Date is required",
  endTimeIsRequired: "End Time is required",
  roleNameIsRequired: "Role Name is Required",
  roleNameLengthMin: "Role name must be at least 3 letters",
  errorSendingEmail: "Error sending email",
  emailSentSuccessfully: "Your email has been sent successfully.",
  products: {
    filters: {
      title: "Products Filters",
      status: {
        title: "Status"
      },
      publicationStatus: {
        title: "Publication Status"
      },
      publishedStatus: {
        title: "Online Store Status"
      },
      search: {
        placeholder: "Product title, Variant title, Product ID, Variant ID, SKU"
      }
    },
    productDetails: {
      title: "Product Details"
    },
    subscriptionPlanTitle: "Subscription Groups",
    subscriptionPlanDnD: "Drag & drop your plans into the order they should display. Existing subscribers will not be affected by any changes.",
    sellingPlans: {
      groupDefaultName: "Custom Subscription Plans",
      mechantCode: "billions_grid_selling_plans"
    },
    createSellingPlans: {
      basicInfo: {
        title: "Plan Name",
        description: "For internal purpose only. Customers won't see this.",
        inputs: {
          planName: {
            title: "Plan Name",
            placeHolder: "Subscribe and save",
            value: "Subscribe and save"
          }
        }
      },
      frequency: {
        title: "Subscription Frequency",
        description: "",
        inputs: {
          internfrequencyalName: {
            title: "Frequency prefix (optional)",
            placeHolder: "Delivery every",
            value: "Delivery every"
          }
        },
        buttons: {
          createPlanBtn: {
            title: "Add New Frequency Plan"
          }
        },
        noPlanText: "No Plan created Yet"
      }
    }
  }
};
function FormGroup({
  title,
  className,
  description,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-5 3xl:grid-cols-12", className), children: [
    title && /* @__PURE__ */ jsxs("div", { className: "col-span-full 4xl:col-span-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-base font-medium", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-2", children: description })
    ] }),
    children && /* @__PURE__ */ jsx("div", { className: "col-span-full grid gap-4 2xl:grid-cols-2 4xl:col-span-8 4xl:gap-5 xl:gap-7", children })
  ] });
}
function SellingPlanGroupBasicInfo({
  onChange,
  currentGroup
}) {
  const basicInfo = messages.products.createSellingPlans.basicInfo;
  return /* @__PURE__ */ jsx("div", { className: "border border-muted rounded-[10px] p-3", children: /* @__PURE__ */ jsx(FormGroup, { title: "Basic Info", description: "", className: cn(""), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      Input$1,
      {
        label: basicInfo.title,
        placeholder: basicInfo.inputs.planName.placeHolder,
        value: currentGroup.groupName,
        onChange: (e) => onChange("groupName", e.target.value)
      }
    ),
    /* @__PURE__ */ jsx(Text$1, { as: "p", className: "text-sm text-gray-500", children: basicInfo.description })
  ] }) }) });
}
const useDebounceWithLoader = (callback, delay, setLoading) => {
  const [timer, setTimer] = useState(null);
  return useCallback(
    (...args) => {
      setLoading(true);
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        callback(...args);
        setLoading(false);
      }, delay);
      setTimer(newTimer);
    },
    [callback, delay, setLoading]
  );
};
const PayPerShipment = () => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(defaultPayPerShipmentPlan);
  const [currentGroup, setCurrentGroup] = useState(defaultPayPerShipmentGroup);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const plansUpdate = searchParams.get("plansUpdate") === "yes";
  const formRef = useRef(null);
  const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);
  useEffect(() => {
    console.log("createPlanPageState", createPlanPageState);
    if (plansUpdate && (createPlanPageState == null ? void 0 : createPlanPageState.payPerShipmentGroup)) {
      setCurrentGroup({
        groupName: createPlanPageState.payPerShipmentGroup.groupName,
        sellingPlansToUpdate: createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate,
        descriptionContent: createPlanPageState.payPerShipmentGroup.descriptionContent,
        sellingPlansToCreate: []
      });
      if (createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate) {
        setPlans(createPlanPageState.payPerShipmentGroup.sellingPlansToUpdate);
      }
    }
  }, [plansUpdate, createPlanPageState == null ? void 0 : createPlanPageState.payPerShipmentGroup]);
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = currentPlan;
      debouncedSetPlans(updatedPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        payPerShipmentGroup: {
          ...prevState == null ? void 0 : prevState.payPerShipmentGroup,
          sellingPlansToUpdate: updatedPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan updated" }));
    } else {
      const isDuplicate = plans.some(
        (plan) => plan.orderFrequency === currentPlan.billingRecurringPolicyIntervalCount && plan.frequencyUnit === currentPlan.billingRecurringPolicyInterval
      );
      if (isDuplicate) {
        toast.error(
          /* @__PURE__ */ jsx(Text$1, { as: "b", className: "text-red-600", children: "A plan already exists." })
        );
        return;
      }
      const newPlans = [...plans, currentPlan];
      debouncedSetPlans(newPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        payPerShipmentGroup: {
          ...prevState == null ? void 0 : prevState.payPerShipmentGroup,
          sellingPlansToCreate: newPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan added successfully!" }));
    }
    resetForm();
    debouncedSetShowForm(false);
  };
  useEffect(() => {
    if (!plansUpdate) {
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        payPerShipmentGroup: {
          groupName: currentGroup.groupName,
          sellingPlansToCreate: plans
        }
      }));
    }
  }, [currentGroup, plans, setCreatePlanPageState]);
  useEffect(() => {
    const hasChanged = JSON.stringify(currentPlan) !== JSON.stringify(defaultPayPerShipmentPlan);
    setIsDirty(hasChanged);
  }, [currentPlan]);
  const resetForm = () => {
    setCurrentPlan(defaultPayPerShipmentPlan);
    setEditingIndex(null);
    setIsDirty(false);
  };
  const debouncedSetShowForm = useDebounceWithLoader(setShowForm, 50, setIsLoading);
  const planActions = {
    onEdit: (index) => {
      setCurrentPlan(plans[index]);
      setEditingIndex(index);
      debouncedSetShowForm(true);
    },
    onDelete: (index) => setDeletingIndex(index),
    onDuplicate: (index) => {
      setCurrentPlan({ ...plans[index], frequencyName: `${plans[index].frequencyName}` });
      setEditingIndex(null);
      debouncedSetShowForm(true);
    }
  };
  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[10px] p-3 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-4 ${isLoading ? "opacity-50 pointer-events-none" : ""}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
      /* @__PURE__ */ jsx("div", { children: (plans.length || showForm) && /* @__PURE__ */ jsx(
        SellingPlanGroupBasicInfo,
        {
          currentGroup,
          onChange: (field, value) => setCurrentGroup((prev) => ({ ...prev, [field]: value }))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: plans.map((plan, index) => /* @__PURE__ */ jsx(
        PlanCard,
        {
          plan,
          index,
          actions: planActions
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "text",
          onClick: () => debouncedSetShowForm(true),
          className: "text-blue-600 cursor-pointer hover:underline text-sm",
          children: "Add another plan"
        }
      ) }),
      showForm && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: formRef,
            className: "border border-muted rounded-[10px] p-3",
            children: /* @__PURE__ */ jsx(
              PlanForm,
              {
                plan: currentPlan,
                onChange: setCurrentPlan
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5", children: [
          /* @__PURE__ */ jsxs(Button$1, { onClick: handleAddOrUpdate, children: [
            editingIndex !== null ? "Done" : "Done",
            isLoading && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 flex items-center justify-center bg-white/80",
                children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" })
              }
            )
          ] }),
          isDirty && /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: "outline",
              onClick: () => setShowCancelModal(true),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: deletingIndex !== null,
        title: "Delete Plan",
        message: `Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ""}"?`,
        onConfirm: () => {
          debouncedSetPlans(plans.filter((_, i) => i !== deletingIndex));
          setDeletingIndex(null);
        },
        onCancel: () => setDeletingIndex(null)
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showCancelModal,
        title: "Discard Changes",
        message: "Are you sure you want to discard changes?",
        onConfirm: resetForm,
        onCancel: () => setShowCancelModal(false)
      }
    )
  ] });
};
const PrePaidSubscriptions = () => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(defaultPayPerShipmentPlan);
  const [currentGroup, setCurrentGroup] = useState(defaultPayPerShipmentGroup);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const plansUpdate = searchParams.get("plansUpdate") === "yes";
  const formRef = useRef(null);
  const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);
  useEffect(() => {
    console.log("createPlanPageState", createPlanPageState);
    if (plansUpdate && (createPlanPageState == null ? void 0 : createPlanPageState.prePaidSubscriptionsGroup)) {
      setCurrentGroup({
        groupName: createPlanPageState.prePaidSubscriptionsGroup.groupName,
        sellingPlansToUpdate: createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate,
        descriptionContent: createPlanPageState.prePaidSubscriptionsGroup.descriptionContent,
        sellingPlansToCreate: []
      });
      if (createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate) {
        setPlans(createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate);
      }
    }
  }, [plansUpdate, createPlanPageState == null ? void 0 : createPlanPageState.prePaidSubscriptionsGroup]);
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = currentPlan;
      debouncedSetPlans(updatedPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          ...prevState == null ? void 0 : prevState.prePaidSubscriptionsGroup,
          sellingPlansToUpdate: updatedPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan updated" }));
    } else {
      const isDuplicate = plans.some(
        (plan) => plan.orderFrequency === currentPlan.billingRecurringPolicyIntervalCount && plan.frequencyUnit === currentPlan.billingRecurringPolicyInterval
      );
      if (isDuplicate) {
        toast.error(
          /* @__PURE__ */ jsx(Text$1, { as: "b", className: "text-red-600", children: "A plan already exists." })
        );
        return;
      }
      const newPlans = [...plans, currentPlan];
      debouncedSetPlans(newPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          ...prevState == null ? void 0 : prevState.prePaidSubscriptionsGroup,
          sellingPlansToCreate: newPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan added successfully!" }));
    }
    resetForm();
    debouncedSetShowForm(false);
  };
  useEffect(() => {
    if (!plansUpdate) {
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          groupName: currentGroup.groupName,
          sellingPlansToCreate: plans
        }
      }));
    }
  }, [currentGroup, plans, setCreatePlanPageState]);
  useEffect(() => {
    const hasChanged = JSON.stringify(currentPlan) !== JSON.stringify(defaultPayPerShipmentPlan);
    setIsDirty(hasChanged);
  }, [currentPlan]);
  const resetForm = () => {
    setCurrentPlan(defaultPayPerShipmentPlan);
    setEditingIndex(null);
    setIsDirty(false);
  };
  const debouncedSetShowForm = useDebounceWithLoader(setShowForm, 50, setIsLoading);
  const planActions = {
    onEdit: (index) => {
      setCurrentPlan(plans[index]);
      setEditingIndex(index);
      debouncedSetShowForm(true);
    },
    onDelete: (index) => setDeletingIndex(index),
    onDuplicate: (index) => {
      setCurrentPlan({ ...plans[index], frequencyName: `${plans[index].frequencyName}` });
      setEditingIndex(null);
      debouncedSetShowForm(true);
    }
  };
  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[10px] p-3 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-4 ${isLoading ? "opacity-50 pointer-events-none" : ""}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
      /* @__PURE__ */ jsx("div", { children: (plans.length || showForm) && /* @__PURE__ */ jsx(
        SellingPlanGroupBasicInfo,
        {
          currentGroup,
          onChange: (field, value) => setCurrentGroup((prev) => ({ ...prev, [field]: value }))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: plans.map((plan, index) => /* @__PURE__ */ jsx(
        PlanCard,
        {
          plan,
          index,
          actions: planActions
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "text",
          onClick: () => debouncedSetShowForm(true),
          className: "text-blue-600 cursor-pointer hover:underline text-sm",
          children: "Add another plan"
        }
      ) }),
      showForm && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: formRef,
            className: "border border-muted rounded-[10px] p-3",
            children: /* @__PURE__ */ jsx(
              PlanForm,
              {
                plan: currentPlan,
                onChange: setCurrentPlan,
                prePaidFrom: true
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5", children: [
          /* @__PURE__ */ jsxs(Button$1, { onClick: handleAddOrUpdate, children: [
            editingIndex !== null ? "Done" : "Done",
            isLoading && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 flex items-center justify-center bg-white/80",
                children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" })
              }
            )
          ] }),
          isDirty && /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: "outline",
              onClick: () => setShowCancelModal(true),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: deletingIndex !== null,
        title: "Delete Plan",
        message: `Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ""}"?`,
        onConfirm: () => {
          debouncedSetPlans(plans.filter((_, i) => i !== deletingIndex));
          setDeletingIndex(null);
        },
        onCancel: () => setDeletingIndex(null)
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showCancelModal,
        title: "Discard Changes",
        message: "Are you sure you want to discard changes?",
        onConfirm: resetForm,
        onCancel: () => setShowCancelModal(false)
      }
    )
  ] });
};
const OneTimePlanSettingsCreate = () => {
  const [currentPlan, setCurrentPlan] = useState(defaultOneTimePlan);
  const [isPlanEnabled, setIsPlanEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormOnetime, setShowFormOnetime] = useState(false);
  const [product] = useAtom(productAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  useEffect(() => {
    if (product) {
      defaultOneTimePlan.planName = product.title;
    }
  }, [product]);
  const handleChange = useCallback((field, value) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value
    }));
    setShowFormOnetime(true);
  }, []);
  const handleSavePlan = async () => {
    setIsLoading(true);
    try {
      toast.success("One-time plan saved successfully!");
      setIsPlanEnabled(true);
      setShowFormOnetime(false);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        oneTimeGroup: {
          groupName: currentPlan.planName,
          sellingPlansToCreate: [currentPlan]
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const handleTogglePlan = useCallback((checked) => {
    setIsPlanEnabled(checked);
    setShowFormOnetime(checked);
  }, []);
  const handleEditPlan = useCallback(() => {
    setShowFormOnetime(true);
  }, []);
  const handleDeletePlan = useCallback(() => {
    setIsPlanEnabled(false);
    setShowFormOnetime(false);
    setCurrentPlan(defaultOneTimePlan);
    toast.success("Plan deleted successfully!");
  }, []);
  useEffect(() => {
    if (showFormOnetime) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [showFormOnetime]);
  return /* @__PURE__ */ jsxs("div", { className: "border border-muted rounded-[10px] p-3 relative", children: [
    isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
    /* @__PURE__ */ jsx(PlanHeader$1, { isPlanEnabled, onToggle: handleTogglePlan }),
    isPlanEnabled && (showFormOnetime ? /* @__PURE__ */ jsx(
      OneTimePlanForm,
      {
        currentPlan,
        onChange: handleChange,
        onSave: handleSavePlan,
        productTitle: (product == null ? void 0 : product.title) || ""
      }
    ) : /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      OneTimePlanCard,
      {
        plan: currentPlan,
        index: 0,
        actions: {
          onEdit: handleEditPlan,
          onDelete: handleDeletePlan,
          onDuplicate: () => {
          }
        }
      }
    ) }))
  ] });
};
const PayPerShipmentCreate = () => {
  const [plans, setPlans] = useAtom(payPerShipmentPlanAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(defaultPayPerShipmentPlan);
  const [currentGroup, setCurrentGroup] = useState(defaultPayPerShipmentGroup);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = currentPlan;
      debouncedSetPlans(updatedPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        payPerShipmentGroup: {
          ...prevState == null ? void 0 : prevState.payPerShipmentGroup,
          sellingPlansToUpdate: updatedPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan updated" }));
    } else {
      const isDuplicate = plans.some(
        (plan) => plan.orderFrequency === currentPlan.billingRecurringPolicyIntervalCount && plan.frequencyUnit === currentPlan.billingRecurringPolicyInterval
      );
      if (isDuplicate) {
        toast.error(
          /* @__PURE__ */ jsx(Text$1, { as: "b", className: "text-red-600", children: "A plan already exists." })
        );
        return;
      }
      const newPlans = [...plans, currentPlan];
      debouncedSetPlans(newPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        payPerShipmentGroup: {
          ...prevState == null ? void 0 : prevState.payPerShipmentGroup,
          sellingPlansToCreate: newPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan added successfully!" }));
    }
    resetForm();
    debouncedSetShowForm(false);
  };
  useEffect(() => {
    setCreatePlanPageState((prevState) => ({
      ...prevState,
      payPerShipmentGroup: {
        groupName: currentGroup.groupName,
        sellingPlansToCreate: plans
      }
    }));
  }, [currentGroup, plans, setCreatePlanPageState]);
  useEffect(() => {
    const hasChanged = JSON.stringify(currentPlan) !== JSON.stringify(defaultPayPerShipmentPlan);
    setIsDirty(hasChanged);
  }, [currentPlan]);
  const resetForm = () => {
    setCurrentPlan(defaultPayPerShipmentPlan);
    setEditingIndex(null);
    setIsDirty(false);
  };
  const debouncedSetShowForm = useDebounceWithLoader(setShowForm, 50, setIsLoading);
  const planActions = {
    onEdit: (index) => {
      setCurrentPlan(plans[index]);
      setEditingIndex(index);
      debouncedSetShowForm(true);
    },
    onDelete: (index) => setDeletingIndex(index),
    onDuplicate: (index) => {
      setCurrentPlan({ ...plans[index], frequencyName: `${plans[index].frequencyName}` });
      setEditingIndex(null);
      debouncedSetShowForm(true);
    }
  };
  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[10px] p-3 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-4 ${isLoading ? "opacity-50 pointer-events-none" : ""}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
      /* @__PURE__ */ jsx("div", { children: (plans.length || showForm) && /* @__PURE__ */ jsx(
        SellingPlanGroupBasicInfo,
        {
          currentGroup,
          onChange: (field, value) => setCurrentGroup((prev) => ({ ...prev, [field]: value }))
        }
      ) }),
      plans.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: plans.map((plan, index) => /* @__PURE__ */ jsx(
        PlanCard,
        {
          plan,
          index,
          actions: planActions
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "text",
          onClick: () => debouncedSetShowForm(true),
          className: "text-blue-600 cursor-pointer hover:underline text-sm",
          children: "Add another plan"
        }
      ) }),
      showForm && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx("div", { ref: formRef, className: "border border-muted rounded-[10px] p-3", children: /* @__PURE__ */ jsx(PlanForm, { plan: currentPlan, onChange: setCurrentPlan }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5", children: [
          /* @__PURE__ */ jsxs(Button$1, { onClick: handleAddOrUpdate, children: [
            editingIndex !== null ? "Done" : "Done",
            isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) })
          ] }),
          isDirty && /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: "outline",
              onClick: () => setShowCancelModal(true),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: deletingIndex !== null,
        title: "Delete Plan",
        message: `Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ""}"?`,
        onConfirm: () => {
          debouncedSetPlans(plans.filter((_, i) => i !== deletingIndex));
          setDeletingIndex(null);
        },
        onCancel: () => setDeletingIndex(null)
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showCancelModal,
        title: "Discard Changes",
        message: "Are you sure you want to discard changes?",
        onConfirm: resetForm,
        onCancel: () => setShowCancelModal(false)
      }
    )
  ] });
};
const PrePaidSubscriptionsCreate = () => {
  const [plans, setPlans] = useAtom(plansAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(defaultPrePaidSubscriptionPlan);
  const [currentGroup, setCurrentGroup] = useState(defaultPayPerShipmentGroup);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const plansUpdate = searchParams.get("plansUpdate") === "yes";
  const formRef = useRef(null);
  const debouncedSetPlans = useDebounceWithLoader(setPlans, 50, setIsLoading);
  useEffect(() => {
    console.log("createPlanPageState", createPlanPageState);
    if (plansUpdate && (createPlanPageState == null ? void 0 : createPlanPageState.prePaidSubscriptionsGroup)) {
      setCurrentGroup({
        groupName: createPlanPageState.prePaidSubscriptionsGroup.groupName,
        sellingPlansToUpdate: createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate,
        descriptionContent: createPlanPageState.prePaidSubscriptionsGroup.descriptionContent,
        sellingPlansToCreate: []
      });
      if (createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate) {
        setPlans(createPlanPageState.prePaidSubscriptionsGroup.sellingPlansToUpdate);
      }
    }
  }, [plansUpdate, createPlanPageState == null ? void 0 : createPlanPageState.prePaidSubscriptionsGroup]);
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = currentPlan;
      debouncedSetPlans(updatedPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          ...prevState == null ? void 0 : prevState.prePaidSubscriptionsGroup,
          sellingPlansToUpdate: updatedPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan updated" }));
    } else {
      const isDuplicate = plans.some(
        (plan) => plan.orderFrequency === currentPlan.billingRecurringPolicyIntervalCount && plan.frequencyUnit === currentPlan.billingRecurringPolicyInterval
      );
      if (isDuplicate) {
        toast.error(
          /* @__PURE__ */ jsx(Text$1, { as: "b", className: "text-red-600", children: "A plan already exists." })
        );
        return;
      }
      const newPlans = [...plans, currentPlan];
      debouncedSetPlans(newPlans);
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          ...prevState == null ? void 0 : prevState.prePaidSubscriptionsGroup,
          sellingPlansToCreate: newPlans
        }
      }));
      toast.success(/* @__PURE__ */ jsx(Text$1, { as: "b", children: "Plan added successfully!" }));
    }
    resetForm();
    debouncedSetShowForm(false);
  };
  useEffect(() => {
    if (!plansUpdate) {
      setCreatePlanPageState((prevState) => ({
        ...prevState,
        prePaidSubscriptionsGroup: {
          groupName: currentGroup.groupName,
          sellingPlansToCreate: plans
        }
      }));
    }
  }, [currentGroup, plans, setCreatePlanPageState]);
  useEffect(() => {
    const hasChanged = JSON.stringify(currentPlan) !== JSON.stringify(defaultPrePaidSubscriptionPlan);
    setIsDirty(hasChanged);
  }, [currentPlan]);
  const resetForm = () => {
    setCurrentPlan(defaultPrePaidSubscriptionPlan);
    setEditingIndex(null);
    setIsDirty(false);
  };
  const debouncedSetShowForm = useDebounceWithLoader(setShowForm, 50, setIsLoading);
  const planActions = {
    onEdit: (index) => {
      setCurrentPlan(plans[index]);
      setEditingIndex(index);
      debouncedSetShowForm(true);
    },
    onDelete: (index) => setDeletingIndex(index),
    onDuplicate: (index) => {
      setCurrentPlan({ ...plans[index], frequencyName: `${plans[index].frequencyName}` });
      setEditingIndex(null);
      debouncedSetShowForm(true);
    }
  };
  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [showForm]);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[10px] p-3 relative", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-4 ${isLoading ? "opacity-50 pointer-events-none" : ""}`, children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-white/80", children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }) }),
      /* @__PURE__ */ jsx("div", { children: (plans.length || showForm) && /* @__PURE__ */ jsx(
        SellingPlanGroupBasicInfo,
        {
          currentGroup,
          onChange: (field, value) => setCurrentGroup((prev) => ({ ...prev, [field]: value }))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: plans.map((plan, index) => /* @__PURE__ */ jsx(
        PlanCard,
        {
          plan,
          index,
          actions: planActions
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
        Button$1,
        {
          variant: "text",
          onClick: () => debouncedSetShowForm(true),
          className: "text-blue-600 cursor-pointer hover:underline text-sm",
          children: "Add another plan"
        }
      ) }),
      showForm && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: formRef,
            className: "border border-muted rounded-[10px] p-3",
            children: /* @__PURE__ */ jsx(
              PlanForm,
              {
                plan: currentPlan,
                onChange: setCurrentPlan,
                prePaidFrom: true
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5", children: [
          /* @__PURE__ */ jsxs(Button$1, { onClick: handleAddOrUpdate, children: [
            editingIndex !== null ? "Done" : "Done",
            isLoading && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 flex items-center justify-center bg-white/80",
                children: /* @__PURE__ */ jsx(Loader, { variant: "spinner" })
              }
            )
          ] }),
          isDirty && /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: "outline",
              onClick: () => setShowCancelModal(true),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: deletingIndex !== null,
        title: "Delete Plan",
        message: `Delete plan "${deletingIndex !== null ? plans[deletingIndex].planName : ""}"?`,
        onConfirm: () => {
          debouncedSetPlans(plans.filter((_, i) => i !== deletingIndex));
          setDeletingIndex(null);
        },
        onCancel: () => setDeletingIndex(null)
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showCancelModal,
        title: "Discard Changes",
        message: "Are you sure you want to discard changes?",
        onConfirm: resetForm,
        onCancel: () => setShowCancelModal(false)
      }
    )
  ] });
};
function CreateSellingPlans({
  handleSavePlans,
  createPlanLoader
}) {
  const [searchParams] = useSearchParams();
  const plansUpdate = searchParams.get("plansUpdate") === "yes";
  return /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[80%_15%] gap-4 mt-4 relative", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "grid col-span-full gap-4 2xl:grid-cols-2 4xl:col-span-8 4xl:gap-5 xl:gap-7 xyz", children: /* @__PURE__ */ jsxs(Tab, { children: [
      /* @__PURE__ */ jsxs(Tab.List, { children: [
        /* @__PURE__ */ jsx(Tab.ListItem, { children: "Onetime Settings" }),
        /* @__PURE__ */ jsx(Tab.ListItem, { children: /* @__PURE__ */ jsxs(Flex$1, { align: "center", children: [
          /* @__PURE__ */ jsx(GiTakeMyMoney, {}),
          /* @__PURE__ */ jsx(Title, { as: "h3", className: "text-sm", children: "Pay Per Shipment" })
        ] }) }),
        /* @__PURE__ */ jsx(Tab.ListItem, { children: "Prepaid Subscriptions" })
      ] }),
      /* @__PURE__ */ jsxs(Tab.Panels, { children: [
        /* @__PURE__ */ jsx(Tab.Panel, { children: plansUpdate ? /* @__PURE__ */ jsx(OneTimePlanSettings, {}) : /* @__PURE__ */ jsx(OneTimePlanSettingsCreate, {}) }),
        /* @__PURE__ */ jsx(Tab.Panel, { children: plansUpdate ? /* @__PURE__ */ jsx(PayPerShipment, {}) : /* @__PURE__ */ jsx(PayPerShipmentCreate, {}) }),
        /* @__PURE__ */ jsx(Tab.Panel, { children: plansUpdate ? /* @__PURE__ */ jsx(PrePaidSubscriptions, {}) : /* @__PURE__ */ jsx(PrePaidSubscriptionsCreate, {}) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "p-3 border border-muted rounded-[10px] sticky top-0 right-0 h-full w-full", children: /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(
      Button$1,
      {
        className: "ml-auto",
        isLoading: createPlanLoader,
        onClick: () => handleSavePlans(),
        children: plansUpdate ? "Update Plan" : "Save Changes"
      }
    ) }) })
  ] }) });
}
const CREATE_SELLING_PLAN_GROUP = `#graphql
 mutation createSellingPlanGroup(
    $input: SellingPlanGroupInput!, 
    $resources: SellingPlanGroupResourceInput
) {
  sellingPlanGroupCreate(
  input: $input, 
  resources: $resources
) {
    sellingPlanGroup {
      id
      sellingPlans(first: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}`;
const UPDATE_SELLING_PLAN_GROUP = `#graphql
mutation sellingPlanGroupUpdate($id: ID!, $input: SellingPlanGroupInput!) {
  sellingPlanGroupUpdate(id: $id, input: $input) {
    sellingPlanGroup {
      id
      sellingPlans(first: 250) {
        edges {
          node {
            id
            position
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`;
const GROUP_KEYS = {
  ONE_TIME: "oneTimeGroup",
  PAY_PER_SHIPMENT: "payPerShipmentGroup",
  PRE_PAID: "prePaidSubscriptionsGroup"
};
const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  METHOD_NOT_ALLOWED: "Method not allowed",
  INVALID_REQUEST: "Invalid request data",
  INTERNAL_SERVER_ERROR: "Internal server error",
  PRODUCT_ID_NOT_FOUND: "Product ID not found",
  REQUIRED_PARAMS_MISSING: "Required parameters are missing",
  ACTION_NOT_FOUND: "Action not found",
  CONTRACTID_MISSING: "Subscription contract id missing"
};
async function action$7({
  request,
  params
}) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
  if (request.method !== "POST") {
    return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
  }
  try {
    const admin = await createPlanAPIUtils.authenticateRequest(request);
    console.log(admin);
    if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    const formData = await request.formData();
    const plansString = (_a2 = formData.get("plans")) == null ? void 0 : _a2.toString();
    const productId = (_b = formData.get("productId")) == null ? void 0 : _b.toString();
    const appGraphqlId = (_c = formData.get("appId")) == null ? void 0 : _c.toString();
    if (!plansString || !productId || !appGraphqlId) {
      return json({ error: ERROR_MESSAGES.INVALID_REQUEST }, { status: 400 });
    }
    const groups = JSON.parse(plansString);
    const response = {};
    let hasPartialFailure = false;
    const isUpdate = ((_d = formData.get("plansUpdate")) == null ? void 0 : _d.toString()) === "yes";
    for (const [groupKey, groupData] of Object.entries(groups)) {
      try {
        if (!Object.values(GROUP_KEYS).includes(groupKey)) {
          continue;
        }
        if (!groupData) continue;
        const plansToUpdate = (groupData == null ? void 0 : groupData.sellingPlansToUpdate) || [];
        const plansToCreate = (groupData == null ? void 0 : groupData.sellingPlansToCreate) || [];
        const plans = isUpdate ? [...plansToUpdate, ...plansToCreate] : plansToCreate;
        const filteredPlans = plans.filter((plan) => plan !== null);
        if (filteredPlans.length === 0) {
          continue;
        }
        const variables = await createVariablesForGroup(
          groupKey,
          groupData,
          productId,
          appGraphqlId,
          isUpdate
        );
        console.log("variables here", groupKey, JSON.stringify(variables));
        const query = isUpdate && ((groupData == null ? void 0 : groupData.groupId) || ((_e = groupData == null ? void 0 : groupData.sellingPlansToCreate[0]) == null ? void 0 : _e.groupId)) ? UPDATE_SELLING_PLAN_GROUP : CREATE_SELLING_PLAN_GROUP;
        console.log("query here", groupKey, JSON.stringify(query));
        const result = await createPlanAPIUtils.executeShopifyMutation(
          query,
          admin,
          variables
        );
        console.log("result here", groupKey, JSON.stringify(result));
        const userErrors = ((_g = (_f = result == null ? void 0 : result.data) == null ? void 0 : _f.sellingPlanGroupCreate) == null ? void 0 : _g.userErrors) || ((_i = (_h = result == null ? void 0 : result.data) == null ? void 0 : _h.sellingPlanGroupUpdate) == null ? void 0 : _i.userErrors);
        if (userErrors.length > 0) {
          hasPartialFailure = true;
          response[groupKey] = {
            success: false,
            errors: userErrors.map((err) => err.message)
          };
        } else {
          response[groupKey] = { success: true };
        }
      } catch (error) {
        hasPartialFailure = true;
        response[groupKey] = {
          success: false,
          errors: [ERROR_MESSAGES.INTERNAL_SERVER_ERROR]
        };
        console.error(`Error processing ${groupKey}:`, error);
      }
    }
    return json(response, { status: hasPartialFailure ? 207 : 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}
async function createVariablesForGroup(groupKey, groupData, productId, appGraphqlId, isUpdate) {
  var _a2;
  switch (groupKey) {
    case GROUP_KEYS.ONE_TIME:
      var groupId = (_a2 = groupData == null ? void 0 : groupData.sellingPlansToCreate[0]) == null ? void 0 : _a2.groupId;
      if (isUpdate && groupId) {
        const oneTimeGroup = groupData.sellingPlansToCreate ? groupData.sellingPlansToCreate[0] : groupData;
        return createOnetimePlanUtils.createGraphQLVariablesOneTimesUpdate(oneTimeGroup);
      }
      return createOnetimePlanUtils.createGraphQLVariablesOneTimes(
        groupData,
        appGraphqlId,
        productId
      );
    case GROUP_KEYS.PAY_PER_SHIPMENT:
      var groupId = groupData == null ? void 0 : groupData.groupId;
      if (isUpdate && groupId) {
        return createRecurringPlanUtils.updateGraphQLVariables(
          groupData
        );
      }
      return createRecurringPlanUtils.createGraphQLVariablesPayPerShipment(
        groupData,
        productId,
        appGraphqlId
      );
    case GROUP_KEYS.PRE_PAID:
      var groupId = groupData == null ? void 0 : groupData.groupId;
      if (isUpdate && groupId) {
        return createRecurringPlanUtils.updateGraphQLVariables(
          groupData
        );
      }
      return createRecurringPlanUtils.createGraphQLVariablesPayPerShipment(
        groupData,
        productId,
        appGraphqlId,
        true
      );
    default:
      throw new Error(`Unsupported group type: ${groupKey}`);
  }
}
const CreatePlansHome = () => {
  const isMounted = useIsMounted();
  const fetcher = useFetcher();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const plansUpdate = searchParams.get("plansUpdate") === "yes";
  const [
    createPlanLoader,
    setCreatePlanLoader
  ] = useState(false);
  const [createPlanPageState] = useAtom(createPlanPageStates);
  const [product] = useAtom(productAtom);
  useEffect(() => {
    if (!fetcher.data) return;
    setCreatePlanLoader(false);
    const response = fetcher.data;
    if ("error" in response) {
      toast.error(response.error);
      return;
    }
    let successMessages = [];
    let errorMessages = [];
    Object.entries(response).forEach(([group, result]) => {
      const groupName = formatGroupName(group);
      if (result == null ? void 0 : result.success) {
        successMessages.push(`${groupName} created successfully!`);
      } else if (result == null ? void 0 : result.errors) {
        result.errors.forEach((err) => {
          errorMessages.push(`${groupName}: ${err}`);
        });
      }
    });
    if (errorMessages.length > 0) {
      toast.error(errorMessages.join("\n"));
    } else if (successMessages.length > 0) {
      toast.success(successMessages.join("\n"));
      window.history.back();
    }
  }, [fetcher.data]);
  const organizeSellingPlans = (planData) => {
    const updatedPlanData = { ...planData };
    Object.keys(updatedPlanData).forEach((groupKey) => {
      const group = updatedPlanData[groupKey];
      if (!group || !group.sellingPlansToCreate && !group.sellingPlansToUpdate) {
        return;
      }
      const sellingPlansToCreate = group.sellingPlansToCreate || [];
      const sellingPlansToUpdate = group.sellingPlansToUpdate || [];
      const newSellingPlansToUpdate = sellingPlansToCreate.filter((plan) => plan == null ? void 0 : plan.id);
      const newSellingPlansToCreate = sellingPlansToCreate.filter((plan) => !(plan == null ? void 0 : plan.id));
      updatedPlanData[groupKey] = {
        ...group,
        sellingPlansToCreate: newSellingPlansToCreate,
        sellingPlansToUpdate: [...sellingPlansToUpdate, ...newSellingPlansToUpdate]
      };
    });
    return updatedPlanData;
  };
  const handleSavePlans = () => {
    var _a2;
    if (!((_a2 = product == null ? void 0 : product.currentAppInstallation) == null ? void 0 : _a2.app)) {
      toast.error("Missing required product information");
      return;
    }
    const updatedPlans = plansUpdate ? createPlanPageState : organizeSellingPlans(createPlanPageState);
    setCreatePlanLoader(true);
    const formData = new FormData();
    formData.append("plans", JSON.stringify(updatedPlans));
    formData.append("productId", productId);
    formData.append("appId", product.currentAppInstallation.app.id);
    if (plansUpdate) {
      formData.append("plansUpdate", "yes");
    }
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  if (!isMounted) return null;
  if (!product) {
    return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Loader, { variant: "spinner", className: "h-8 w-8" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Need to load data here..." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "position-relative", children: /* @__PURE__ */ jsx(
    CreateSellingPlans,
    {
      handleSavePlans,
      createPlanLoader
    }
  ) });
};
function formatGroupName(groupKey) {
  return groupKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).replace(" Group", "");
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ERROR_MESSAGES,
  action: action$7,
  default: CreatePlansHome
}, Symbol.toStringTag, { value: "Module" }));
const VariantPlanHeader = ({ product }) => {
  const { title } = product;
  const { productId } = useParams();
  return /* @__PURE__ */ jsxs(Flex$1, { className: "w-full", children: [
    /* @__PURE__ */ jsx(Link, { to: `/merchant/products/${productId}`, children: /* @__PURE__ */ jsx(ActionIcon$1, { variant: "outline", children: /* @__PURE__ */ jsx(FaArrowLeft, {}) }) }),
    /* @__PURE__ */ jsxs(Title, { children: [
      "Manage variant plans for ",
      title
    ] })
  ] });
};
const VariantSellingPlanActions = ({
  disabled,
  handleDiscardChanges,
  handleSaveChanges,
  isLoading,
  setIsLoading
}) => {
  return /* @__PURE__ */ jsx(Flex$1, { children: /* @__PURE__ */ jsxs(Box, { className: "ms-auto flex gap-4", children: [
    /* @__PURE__ */ jsx(
      Button$1,
      {
        disabled,
        onClick: handleDiscardChanges,
        variant: "outline",
        color: "danger",
        children: "Discard changes"
      }
    ),
    /* @__PURE__ */ jsx(
      Button$1,
      {
        disabled,
        onClick: handleSaveChanges,
        isLoading,
        loader: /* @__PURE__ */ jsx(Loader, { variant: "spinner" }),
        children: "Save Changes"
      }
    )
  ] }) });
};
const VariantDetailColumns = ({ variant }) => {
  var _a2;
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const { price, sku, id } = variant;
  const formattedPrice = formatPrice(price, moneyWithCurrencyFormat);
  const ID = extractNumericId(id);
  return /* @__PURE__ */ jsxs(Flex, { className: "flex gap-4", children: [
    /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsx(
      "img",
      {
        src: ((_a2 = variant == null ? void 0 : variant.image) == null ? void 0 : _a2.url) || "/no-image.png",
        alt: (variant == null ? void 0 : variant.title) || "",
        height: 56,
        width: 56
      }
    ) }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Text, { as: "p", className: "text-sm", children: variant == null ? void 0 : variant.title }),
      /* @__PURE__ */ jsxs(Text, { as: "p", className: "text-xs text-gray-400 font-normal", children: [
        formattedPrice,
        " | SKU: ",
        sku,
        " "
      ] }),
      /* @__PURE__ */ jsxs(Text, { as: "p", className: "text-xs text-gray-400", children: [
        "Variant Id ",
        ID
      ] })
    ] })
  ] });
};
const VariantPlanListTable = ({
  sellingPlans,
  tableData,
  handleCheckboxChange,
  variantCheckboxes,
  handleAllVariantsChange,
  allVariantsChecked
}) => {
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
      /* @__PURE__ */ jsx(Table.Head, { children: "Variant Title" }),
      sellingPlans.map((plan) => /* @__PURE__ */ jsx(Table.Head, { children: plan.node.name }, plan.node.id))
    ] }) }),
    /* @__PURE__ */ jsxs(Table.Body, { children: [
      /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.Head, { children: "All" }),
        sellingPlans.map((plan, planIndex) => /* @__PURE__ */ jsx(Table.Head, { children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: allVariantsChecked[planIndex],
            onChange: (e) => handleAllVariantsChange(planIndex, e.target.checked)
          }
        ) }, plan.node.id))
      ] }),
      tableData.map((variant) => /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(VariantDetailColumns, { variant }) }),
        sellingPlans.map((plan) => {
          const key = `${variant.id}-${plan.node.id}`;
          return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: variantCheckboxes[key] || false,
              onChange: (e) => handleCheckboxChange(variant.id, plan.node.id, e.target.checked)
            }
          ) }, key);
        })
      ] }, variant.id))
    ] })
  ] });
};
const VariantSellingPlanListing = ({ product }) => {
  const { variants: { nodes }, id } = product;
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const selectedGroup = nodes.flatMap((variant) => variant.sellingPlanGroups.edges).find((edge) => edge.node.id === `gid://shopify/SellingPlanGroup/${groupId}`);
  const sellingPlans = (selectedGroup == null ? void 0 : selectedGroup.node.sellingPlans.edges) || [];
  const [allVariantsChecked, setAllVariantsChecked] = useState(sellingPlans.map(() => false));
  const [variantCheckboxes, setVariantCheckboxes] = useState({});
  const [originalVariantCheckboxes, setOriginalVariantCheckboxes] = useState({});
  const [isModified, setIsModified] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tableData = useMemo(() => nodes ? nodes : [], [product]);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  useEffect(() => {
    const initialCheckboxes = {};
    console.log("sellingPlans", sellingPlans);
    tableData.forEach((variant) => {
      sellingPlans.forEach((plan) => {
        var _a2, _b, _c;
        const key = `${variant.id}-${plan.node.id}`;
        let hasSellingPlan = (_a2 = variant.sellingPlanGroups.edges.find((edge) => edge.node.id === `gid://shopify/SellingPlanGroup/${groupId}`)) == null ? void 0 : _a2.node.sellingPlans.edges.some((edge) => edge.node.id === plan.node.id);
        const metafieldNodes = ((_c = (_b = plan == null ? void 0 : plan.node) == null ? void 0 : _b.metafields) == null ? void 0 : _c.nodes) || [];
        const restrictedMetafield = metafieldNodes.find((m) => m.key === "restrictedVariants");
        const addedMetafield = metafieldNodes.find((m) => m.key === "addedVariants");
        if (metafieldNodes.length > 0) {
          const restrictedVariants = restrictedMetafield ? JSON.parse(restrictedMetafield.value) : [];
          const addedVariants = addedMetafield ? JSON.parse(addedMetafield.value) : [];
          if (restrictedVariants.includes(variant.id)) {
            hasSellingPlan = false;
          } else if (addedVariants.includes(variant.id)) {
            hasSellingPlan = true;
          }
        }
        initialCheckboxes[key] = hasSellingPlan || false;
      });
    });
    setVariantCheckboxes(initialCheckboxes);
    setOriginalVariantCheckboxes(initialCheckboxes);
    const initialAllVariantsChecked = sellingPlans.map(
      (plan) => tableData.every((variant) => initialCheckboxes[`${variant.id}-${plan.node.id}`])
    );
    setAllVariantsChecked(initialAllVariantsChecked);
    setIsModified(false);
  }, [tableData, sellingPlans, groupId]);
  const handleCheckboxChange = (variantId, planId, checked) => {
    setVariantCheckboxes((prev) => {
      const newCheckboxes = { ...prev, [`${variantId}-${planId}`]: checked };
      const allChecked = tableData.every((variant) => newCheckboxes[`${variant.id}-${planId}`]);
      setAllVariantsChecked((prev2) => {
        const newAllVariantsChecked = [...prev2];
        const planIndex = sellingPlans.findIndex((plan) => plan.node.id === planId);
        if (planIndex !== -1) {
          newAllVariantsChecked[planIndex] = allChecked;
        }
        return newAllVariantsChecked;
      });
      setIsModified(true);
      return newCheckboxes;
    });
  };
  const handleDiscardChanges = () => {
    setVariantCheckboxes(originalVariantCheckboxes);
    setIsModified(false);
  };
  const handleAllVariantsChange = (planIndex, checked) => {
    setAllVariantsChecked((prev) => {
      const newAllVariantsChecked = [...prev];
      newAllVariantsChecked[planIndex] = checked;
      return newAllVariantsChecked;
    });
    setVariantCheckboxes((prev) => {
      const newCheckboxes = { ...prev };
      tableData.forEach((variant) => {
        const key = `${variant.id}-${sellingPlans[planIndex].node.id}`;
        newCheckboxes[key] = checked;
      });
      return newCheckboxes;
    });
    setIsModified(true);
  };
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const transformedVariantData = transformShopifyData(variantCheckboxes);
      const variantData = {
        groupId,
        transformedVariantData
      };
      const formData = new FormData();
      formData.append("variantData", JSON.stringify(variantData));
      formData.append("productId", id);
      formData.append("appId", product.currentAppInstallation.app.id);
      fetcher.submit(formData, {
        method: "POST",
        action: `.`,
        encType: "multipart/form-data"
      });
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setTimeout(() => {
          navigate(-1);
        }, 1e3);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  const transformShopifyData = (data) => {
    let result = {};
    for (let key in data) {
      let [variantId, sellingPlanId] = key.split("-gid://shopify/SellingPlan/");
      sellingPlanId = `gid://shopify/SellingPlan/${sellingPlanId}`;
      if (!result[sellingPlanId]) {
        result[sellingPlanId] = {
          sellingPlanId,
          restrictedVariants: [],
          addedVariants: []
        };
      }
      if (data[key]) {
        result[sellingPlanId].addedVariants.push(variantId);
      } else {
        result[sellingPlanId].restrictedVariants.push(variantId);
      }
    }
    return Object.values(result);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx(
      VariantSellingPlanActions,
      {
        disabled: !isModified,
        handleDiscardChanges: () => setShowConfirmationModal(true),
        handleSaveChanges,
        isLoading,
        setIsLoading
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-full border border-muted rounded-md", children: /* @__PURE__ */ jsx(
      VariantPlanListTable,
      {
        sellingPlans,
        tableData,
        handleCheckboxChange,
        variantCheckboxes,
        handleAllVariantsChange,
        allVariantsChecked
      }
    ) }),
    /* @__PURE__ */ jsx(
      VariantSellingPlanActions,
      {
        disabled: !isModified,
        handleDiscardChanges: () => setShowConfirmationModal(true),
        handleSaveChanges,
        isLoading,
        setIsLoading
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showConfirmationModal,
        title: "Discard Changes",
        message: "Are you sure you want to discard all changes?",
        onConfirm: handleDiscardChanges,
        onCancel: () => {
          setShowConfirmationModal(false);
        }
      }
    )
  ] });
};
const VariantSellingPlanManager = ({ product }) => {
  return /* @__PURE__ */ jsx(Flex$1, { className: "mt-5", direction: "col", children: /* @__PURE__ */ jsx(VariantSellingPlanListing, { product }) });
};
function EditVariantPlans({ product }) {
  return /* @__PURE__ */ jsxs("div", { className: "position-relative", children: [
    /* @__PURE__ */ jsx(VariantPlanHeader, { product }),
    /* @__PURE__ */ jsx(VariantSellingPlanManager, { product })
  ] });
}
async function action$6({
  request,
  params
}) {
  var _a2, _b, _c, _d, _e;
  if (request.method !== "POST") {
    return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
  }
  try {
    const admin = await createPlanAPIUtils.authenticateRequest(request);
    if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    const formData = await request.formData();
    const productId = (_a2 = formData.get("productId")) == null ? void 0 : _a2.toString();
    const appGraphqlId = (_b = formData.get("appId")) == null ? void 0 : _b.toString();
    const variantData = (_c = formData.get("variantData")) == null ? void 0 : _c.toString();
    if (!variantData || !productId || !appGraphqlId) return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
    const variantDataJson = JSON.parse(variantData);
    const variables = generateRemoveVariantVariables(variantDataJson);
    const result = await createPlanAPIUtils.executeShopifyMutation(
      UPDATE_SELLING_PLAN_GROUP,
      admin,
      variables
    );
    const userErrors = ((_e = (_d = result == null ? void 0 : result.data) == null ? void 0 : _d.sellingPlanGroupCreate) == null ? void 0 : _e.userErrors) || [];
    if (userErrors.length > 0) {
      return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
    }
    return json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}
const generateRemoveVariantVariables = (variantData) => {
  const { groupId, transformedVariantData } = variantData;
  const graphqlGroupId = generateGraphQLId(Number(groupId), ShopifyObjectType.SellingPlanGroup);
  const sellingPlansToUpdate = prepareInputUpdateSellingPlans(transformedVariantData);
  return {
    variables: {
      id: graphqlGroupId,
      input: {
        sellingPlansToUpdate
      }
    }
  };
};
const prepareInputUpdateSellingPlans = (transformedVariantData) => {
  return transformedVariantData.map((plan) => ({
    id: plan.sellingPlanId,
    metafields: [
      {
        value: JSON.stringify(plan.restrictedVariants),
        type: "list.variant_reference",
        key: "restrictedVariants",
        namespace: "billion-grid-app"
      },
      {
        value: JSON.stringify(plan.addedVariants),
        type: "list.variant_reference",
        key: "addedVariants",
        namespace: "billion-grid-app"
      }
    ]
  }));
};
const SelectVariantPlansHome = () => {
  const isMounted = useIsMounted();
  const [product] = useAtom(productAtom);
  if (!isMounted) return null;
  if (!product) {
    return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Loader, { variant: "spinner", className: "h-8 w-8" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Need to load data here..." })
    ] });
  }
  return /* @__PURE__ */ jsx(EditVariantPlans, { product });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: SelectVariantPlansHome
}, Symbol.toStringTag, { value: "Module" }));
const CURRENT_APP_INSTALLATION_FRAGMENT = `#graphql
  fragment currentAppInstallation on AppInstallation {
    id
    app {
      id
    }
  }
`;
const CURRENT_APP_INSTALLATION = `#graphql
    ${CURRENT_APP_INSTALLATION_FRAGMENT}
    query CurrentAppInstallation {
        currentAppInstallation {
            ...currentAppInstallation
        }
    }
`;
const CURRENT_SHOP = `#graphql
   query CurrentShop {
    shop{
        currencyCode
        currencyFormats{
            moneyFormat
            moneyWithCurrencyFormat
        }
    }
}
`;
const SUBSCRIPTION_BILLING_CYCLES_QUERY = `#graphql
query subscriptionBillingCycles($subscriptionContractId: ID!,
$billingCyclesIndexRangeSelector:SubscriptionBillingCyclesIndexRangeSelector,
$billingCyclesDateRangeSelector:SubscriptionBillingCyclesDateRangeSelector
) {
  subscriptionBillingCycles(
    first: 50, 
    contractId: $subscriptionContractId,
    billingCyclesIndexRangeSelector:  $billingCyclesIndexRangeSelector
    billingCyclesDateRangeSelector:  $billingCyclesDateRangeSelector
    ) {
    edges {
      node {
        billingAttemptExpectedDate
        edited
        skipped
        status
        cycleIndex
        sourceContract {
            customer{
                firstName
                lastName
                email
                displayName
                addressesV2(first: 10) {
                edges{
                    cursor
                    node{
                        id
                        address1
                        address2
                        city
                        country
                        province
                        zip
                    }
                }
            }
            }
            deliveryPrice {
                amount
                currencyCode
            }
            deliveryMethod {
            ... on SubscriptionDeliveryMethodShipping {
              __typename
              shippingOption {
                code
                description
                presentmentTitle
                title
              }
            }
          }
          lines(first: 10) {
            edges {
              cursor
              node {
                variantTitle
                variantImage {
                  url(transform: {maxHeight: 48, maxWidth: 48})
                }
                title
                sku
                quantity
                lineDiscountedPrice {
                  amount
                  currencyCode
                }
                taxable
                currentPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
const SUBSCRIPTION_CONTRACT_QUERY = `#graphql
query SubscriptionContract(
    $subscriptionContractId: ID!
) {
   subscriptionContract(
    id: $subscriptionContractId
   ){
        id
        createdAt
        customAttributes{
            key
            value
        }
        note
        deliveryMethod{
            ... on SubscriptionDeliveryMethodShipping {
                address{
                    address1
                    address2
                    city
                    company
                    country
                    countryCode
                    firstName
                    lastName
                    name
                    phone
                    province
                    provinceCode
                    zip
                }
            }
        }
        lines(first: 10){
            edges{
                cursor
                node{
                    id
                    title
                    variantTitle
                    quantity
                    variantId
                    productId
                    lineDiscountedPrice{
                        amount
                        currencyCode
                    }
                    variantImage{
                        url(transform:  {
                           maxHeight: 48,
                           maxWidth: 48
                        })
                    }
                    customAttributes {
                        key
                        value
                    }
                }
            }
        }
        deliveryPolicy{
            interval
            intervalCount
        }
        billingPolicy{
            intervalCount
            interval
        }
        customer{
            id
            firstName
            lastName
            email
            displayName
            addressesV2(first: 10) {
                edges{
                    cursor
                    node{
                        address1
                        address2
                        city
                        country
                        province
                        zip
                        id
                        firstName
                        lastName
                        provinceCode
                        phone
                        company
                        countryCodeV2
                    }
                }
            }
            paymentMethods(first: 10) {
                edges{
                    cursor
                    node{
                        instrument{
                            ... on CustomerCreditCard {
                                firstDigits
                                source
                                brand
                                expiresSoon
                                expiryMonth
                                expiryYear
                                isRevocable
                                lastDigits
                                maskedNumber
                                name
                                virtualLastDigits
                            }
                            ... on CustomerPaypalBillingAgreement {
                                paypalAccountEmail
                                inactive
                                isRevocable
                            }
                            ... on CustomerShopPayAgreement {
                                __typename
                                expiresSoon
                                expiryMonth
                                expiryYear
                                inactive
                                isRevocable
                                lastDigits
                                maskedNumber
                                name
                            }

                        }
                        id
                        revokedAt
                        revokedReason
                    }
                }
            }
        }
        customerPaymentMethod{
            instrument{
                ... on CustomerCreditCard {
                    firstDigits
                    source
                    brand
                    expiresSoon
                    expiryMonth
                    expiryYear
                    isRevocable
                    lastDigits
                    maskedNumber
                    name
                    virtualLastDigits
                }
                ... on CustomerPaypalBillingAgreement {
                    paypalAccountEmail
                    inactive
                    isRevocable
                }
                ... on CustomerShopPayAgreement {
                    __typename
                    expiresSoon
                    expiryMonth
                    expiryYear
                    inactive
                    isRevocable
                    lastDigits
                    maskedNumber
                    name
                }

            }
        }
        discounts(first: 10) {
            edges{
                cursor
                node{
                    id
                    title
                    type
                    value{
                        ... on SubscriptionDiscountFixedAmountValue{
                            amount{
                                amount
                                currencyCode
                            }
                        }
                        ... on SubscriptionDiscountPercentageValue{
                            percentage
                        }
                    }   
                }

            }
        }
        billingAttempts(first: 10) {
            edges{
                node{
                    id
                    createdAt
                    completedAt
                    nextActionUrl
                    idempotencyKey
                    ready
                    paymentGroupId
                    paymentSessionId
                    originTime
                    errorCode
                    errorMessage
                    order{
                        id
                        customer{
                            firstName
                            lastName
                            email
                            displayName
                            addressesV2(first: 10) {
                                edges{
                                    cursor
                                    node{
                                        id
                                        address1
                                        address2
                                        city
                                        country
                                        province
                                        zip
                                    }
                                }
                            }
                        }
                        lineItems(first: 10) {
                            edges {
                                cursor
                                node {
                                    variantTitle
                                    title
                                    variant {
                                        image {
                                            url(transform: {maxHeight: 48, maxWidth: 48})
                                        }
                                    }
                                    product{
                                        featuredMedia{
                                            preview{
                                                image{
                                                    url(transform: {maxHeight: 48, maxWidth: 48})
                                                }
                                            }
                                        }
                                    }
                                    sku
                                    quantity
                                    originalTotalSet{
                                        presentmentMoney{
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                        capturable
                        currentTaxLines{
                            title
                            ratePercentage
                            priceSet {
                                presentmentMoney {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                        currentTotalPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        currentTotalTaxSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        currentSubtotalPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        shippingLine{
                            id
                            title
                        }
                        currentShippingPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        createdAt
                        name
                    }
                }
            }
        }
        orders(first: 10) {
            edges{
                cursor
                node{
                    id
                    customer{
                        firstName
                        lastName
                        email
                        displayName
                        addressesV2(first: 10) {
                            edges{
                                cursor
                                node{
                                    id
                                    address1
                                    address2
                                    city
                                    country
                                    province
                                    zip
                                }
                            }
                        }
                    }
                    lineItems(first: 10) {
                        edges {
                            cursor
                            node {
                                variantTitle
                                title
                                variant {
                                    image {
                                        url(transform: {maxHeight: 48, maxWidth: 48})
                                    }
                                }
                                product{
                                    featuredMedia{
                                        preview{
                                            image{
                                                url(transform: {maxHeight: 48, maxWidth: 48})
                                            }
                                        }
                                    }
                                }
                                sku
                                quantity
                                originalTotalSet{
                                    presentmentMoney{
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                    capturable
                    currentTaxLines{
                        title
                        ratePercentage
                        priceSet {
                            presentmentMoney {
                                amount
                                currencyCode
                            }
                        }
                    }
                    currentTotalPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    currentTotalTaxSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    currentSubtotalPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    shippingLine{
                        id
                        title
                    }
                    currentShippingPriceSet{
                        presentmentMoney{
                            amount
                            currencyCode
                        }
                    }
                    createdAt
                    name
                }
            }
        }
        status
        nextBillingDate
        createdAt
        updatedAt
    }
}`;
const BreadcrumbItem = ({
  href = "#",
  className,
  children
}) => /* @__PURE__ */ jsx(
  Link,
  {
    to: href,
    role: "button",
    className: cn("inline-flex items-center gap-2 text-sm", className),
    children
  }
);
const Breadcrumb = ({
  separator = "/",
  disableCurrent = true,
  children,
  className,
  separatorClassName,
  separatorVariant = "default"
}) => {
  const numOfItems = React.Children.count(children);
  return /* @__PURE__ */ jsx("div", { className: cn("inline-flex items-center gap-2.5", className), children: React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      React.cloneElement(child, {
        className: cn(
          "text-gray-700 last:text-gray-500 font-medium",
          disableCurrent && "last:pointer-events-none"
        )
      }),
      index < numOfItems - 1 && (separatorVariant === "default" ? /* @__PURE__ */ jsx(
        "span",
        {
          className: cn("text-sm text-gray-500", separatorClassName),
          children: separator
        }
      ) : /* @__PURE__ */ jsx("span", { className: "h-1 w-1 rounded-full bg-gray-300" }))
    ] });
  }) });
};
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = "Breadcrumb";
function PageHeader({
  title,
  breadcrumb,
  children,
  className
}) {
  return /* @__PURE__ */ jsx("header", { className: cn("mb-6 container xs:-mt-2 lg:mb-7", className), children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Title,
        {
          as: "h2",
          className: "mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]",
          children: title
        }
      ),
      /* @__PURE__ */ jsx(
        Breadcrumb,
        {
          separator: "",
          separatorVariant: "circle",
          className: "flex-wrap",
          children: breadcrumb.map((item) => /* @__PURE__ */ jsx(
            Breadcrumb.Item,
            {
              ...(item == null ? void 0 : item.href) && { href: item == null ? void 0 : item.href },
              children: item.name
            },
            item.name
          ))
        }
      )
    ] }),
    children
  ] }) });
}
var SubscriptionContractSubscriptionStatus = /* @__PURE__ */ ((SubscriptionContractSubscriptionStatus2) => {
  SubscriptionContractSubscriptionStatus2["ACTIVE"] = "ACTIVE";
  SubscriptionContractSubscriptionStatus2["CANCELLED"] = "CANCELLED";
  SubscriptionContractSubscriptionStatus2["EXPIRED"] = "EXPIRED";
  SubscriptionContractSubscriptionStatus2["FAILED"] = "FAILED";
  SubscriptionContractSubscriptionStatus2["PAUSED"] = "PAUSED";
  return SubscriptionContractSubscriptionStatus2;
})(SubscriptionContractSubscriptionStatus || {});
var SubscriptionBillingCycleScheduleEditInputScheduleEditReason = /* @__PURE__ */ ((SubscriptionBillingCycleScheduleEditInputScheduleEditReason2) => {
  SubscriptionBillingCycleScheduleEditInputScheduleEditReason2["BUYER_INITIATED"] = "BUYER_INITIATED";
  SubscriptionBillingCycleScheduleEditInputScheduleEditReason2["DEV_INITIATED"] = "DEV_INITIATED";
  SubscriptionBillingCycleScheduleEditInputScheduleEditReason2["MERCHANT_INITIATED"] = "MERCHANT_INITIATED";
  return SubscriptionBillingCycleScheduleEditInputScheduleEditReason2;
})(SubscriptionBillingCycleScheduleEditInputScheduleEditReason || {});
const SubscriptionStatusBadge = ({
  status
}) => {
  const statusColors2 = {
    [SubscriptionContractSubscriptionStatus.ACTIVE]: "success",
    [SubscriptionContractSubscriptionStatus.CANCELLED]: "danger",
    [SubscriptionContractSubscriptionStatus.EXPIRED]: "gray",
    [SubscriptionContractSubscriptionStatus.FAILED]: "warning",
    [SubscriptionContractSubscriptionStatus.PAUSED]: "info"
  };
  return /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-1 items-center", children: [
    /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, color: statusColors2[status] }),
    /* @__PURE__ */ jsx(Text, { className: "capitalize", children: status })
  ] });
};
const subscriptionContractAtom = atom();
const SubscriptionTopBlock = () => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) {
    return null;
  }
  const { status, customer: { displayName }, id } = subscriptionContract;
  const numbericSubscriptionId = extractNumericId(id);
  return /* @__PURE__ */ jsxs(Flex, { direction: "col", gap: "0", children: [
    /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxs(Title$1, { className: "text-md", children: [
        "Subscription #",
        numbericSubscriptionId
      ] }),
      /* @__PURE__ */ jsx(SubscriptionStatusBadge, { status })
    ] }),
    /* @__PURE__ */ jsx(Text, { className: "text-sm text-primary", children: displayName })
  ] });
};
const DropdownActionItem = ({ icon: Icon, label, onClick }) => {
  return /* @__PURE__ */ jsx(Dropdown.Item, { onClick, children: /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "2", children: [
    /* @__PURE__ */ jsx(Icon, {}),
    /* @__PURE__ */ jsx(Text, { children: label })
  ] }) });
};
const labelClasses = {
  size: {
    sm: "text-xs mb-1",
    md: "text-sm mb-1.5",
    lg: "text-sm mb-1.5",
    xl: "text-base mb-2"
  }
};
const inputClasses = {
  base: "block peer !w-full focus:outline-none transition duration-200 disabled:!bg-gray-100 disabled:!text-gray-500 disabled:placeholder:!text-gray-500 disabled:!cursor-not-allowed disabled:!border-muted",
  error: "!border-red not-read-only:hover:enabled:!border-red not-read-only:focus:enabled:!border-red not-read-only:focus:!ring-red",
  size: {
    sm: "py-1 !text-xs !h-8 !leading-[32px]",
    md: "py-2 !text-sm !h-10 !leading-[40px]",
    lg: "py-2 !text-base !h-12 !leading-[48px]",
    xl: "py-2.5 !text-base !h-14 !leading-[56px]"
  },
  rounded: {
    none: "!rounded-none",
    sm: "!rounded-sm",
    md: "!rounded-md",
    lg: "!rounded-lg",
    pill: "!rounded-full"
  },
  variant: {
    flat: "!border-0 focus:ring-2 placeholder:!opacity-90 read-only:focus:!ring-0 focus:!bg-transparent !bg-primary-lighter/70 focus:!ring-primary/30 !text-primary-dark",
    outline: "!bg-transparent focus:ring-[0.6px] !border !border-muted read-only:!border-muted read-only:focus:!ring-0 placeholder:!text-gray-500 hover:!border-primary focus:!border-primary focus:!ring-primary",
    text: "!border-0 focus:ring-2 !bg-transparent hover:!text-primary-dark focus:!ring-primary/30 !text-primary"
  }
};
const buttonClasses = {
  base: "!border-0 !bg-transparent !static [&>.selected-flag]:!absolute [&>.selected-flag]:!top-[1px] [&>.selected-flag]:!bottom-[1px] [&>.selected-flag]:!left-[1px] [&>.selected-flag.open]:!bg-transparent [&>.selected-flag:hover]:!bg-transparent [&>.selected-flag:focus]:!bg-transparent",
  size: {
    sm: "[&>.selected-flag]:!h-[30px]",
    md: "[&>.selected-flag]:!h-[38px]",
    lg: "[&>.selected-flag]:!h-[46px]",
    xl: "[&>.selected-flag]:!h-[54px]"
  }
};
const dropdownClasses = {
  base: "!shadow-xl !text-sm !max-h-[216px] !w-full !my-1.5 !bg-gray-0 [&>.no-entries-message]:!text-center [&>.divider]:!border-muted",
  rounded: {
    none: "!rounded-sm",
    sm: "!rounded",
    md: "!rounded-md",
    lg: "!rounded-lg",
    pill: "!rounded-xl"
  },
  searchBox: "!pr-2.5 !bg-gray-0 [&>.search-box]:!w-full [&>.search-box]:!m-0 [&>.search-box]:!px-3 [&>.search-box]:!py-1 [&>.search-box]:!text-sm [&>.search-box]:!capitalize [&>.search-box]:!h-9 [&>.search-box]:!leading-[36px] [&>.search-box]:!rounded-md [&>.search-box]:!bg-transparent [&>.search-box]:!border-muted [&>.search-box:focus]:!border-gray-400/70 [&>.search-box:focus]:!ring-0 [&>.search-box]:placeholder:!text-gray-500",
  highlightListColor: "[&>li.country.highlight]:!bg-gray-100 [&>li.country:hover]:!bg-gray-100"
};
const clearIconClasses = {
  base: "absolute right-2 group-hover/phone-number:visible group-hover/phone-number:translate-x-0 group-hover/phone-number:opacity-100",
  position: {
    sm: "top-[9px]",
    md: "top-3",
    lg: "top-4",
    xl: "top-5"
  }
};
const PhoneNumber = ({
  size = "md",
  rounded = "md",
  variant = "outline",
  label,
  helperText,
  error,
  clearable,
  onClear,
  enableSearch,
  labelClassName,
  inputClassName,
  buttonClassName,
  dropdownClassName,
  searchClassName,
  helperClassName,
  errorClassName,
  className,
  ...props
}) => {
  var _a2, _b;
  return /* @__PURE__ */ jsxs("div", { className: cn$1("rizzui-phone-number", className), children: [
    label ? /* @__PURE__ */ jsx("label", { className: cn$1("block", labelClasses.size[size], labelClassName), children: label }) : null,
    /* @__PURE__ */ jsxs("div", { className: "group/phone-number relative", children: [
      /* @__PURE__ */ jsx(
        PhoneInput,
        {
          inputClass: cn$1(
            inputClasses.base,
            inputClasses.size[size],
            inputClasses.rounded[rounded],
            inputClasses.variant[variant],
            error && inputClasses.error,
            inputClassName
          ),
          buttonClass: cn$1(
            buttonClasses.base,
            buttonClasses.size[size],
            // @ts-ignore
            ((_a2 = props.inputProps) == null ? void 0 : _a2.disabled) && "pointer-events-none",
            // @ts-ignore
            ((_b = props.inputProps) == null ? void 0 : _b.readOnly) && "pointer-events-none",
            buttonClassName
          ),
          dropdownClass: cn$1(
            dropdownClasses.base,
            dropdownClasses.rounded[rounded],
            dropdownClasses.highlightListColor,
            dropdownClassName
          ),
          searchClass: cn$1(dropdownClasses.searchBox, searchClassName),
          enableSearch,
          disableSearchIcon: true,
          ...props
        }
      ),
      clearable ? /* @__PURE__ */ jsx(
        FieldClearButton,
        {
          size,
          onClick: onClear,
          className: cn$1(clearIconClasses.base, clearIconClasses.position[size])
        }
      ) : null
    ] }),
    !error && helperText ? /* @__PURE__ */ jsx(FieldHelperText, { size, className: helperClassName, children: helperText }) : null,
    error ? /* @__PURE__ */ jsx(FieldError, { size, error, className: errorClassName }) : null
  ] });
};
const EditAddressModal = ({ modalState, setModalState, defaultAddress }) => {
  const [address, setAddress] = useState({
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
  const fetcher = useFetcher();
  const [originalAddress, setOriginalAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode
  }));
  const stateOptions = address.country ? State.getStatesOfCountry(address.countryCode).map((state) => ({
    label: state.name,
    value: state.isoCode
  })) : [];
  useEffect(() => {
    if (defaultAddress) {
      setAddress((prev) => ({ ...prev, ...defaultAddress }));
      setOriginalAddress({ ...defaultAddress });
    }
  }, [defaultAddress]);
  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
    console.log("Updated Address:", address);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateAddress");
    formData.append("address", JSON.stringify(address));
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  const isAddressEqual = (a, b) => {
    const keys = [
      "firstName",
      "lastName",
      "company",
      "country",
      "countryCode",
      "address1",
      "address2",
      "city",
      "province",
      "provinceCode",
      "zip",
      "phone"
    ];
    return keys.every((key) => (a[key] || "") === (b[key] || ""));
  };
  useEffect(() => {
    var _a2, _b;
    console.log("fetcherdata", fetcher.data);
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setIsLoading(false);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[525px] max-h-[400px] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "m-auto px-7 pt-6 pb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Shipping Address" }),
      /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "First Name",
          placeholder: "Enter first name",
          value: (address == null ? void 0 : address.firstName) || "",
          onChange: (e) => handleChange("firstName", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Last Name",
          placeholder: "Enter last name",
          value: (address == null ? void 0 : address.lastName) || "",
          onChange: (e) => handleChange("lastName", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
        Input,
        {
          label: "Company Name",
          placeholder: "Enter company name",
          value: (address == null ? void 0 : address.company) || "",
          onChange: (e) => handleChange("company", e.target.value)
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
        Select$1,
        {
          label: "Country",
          placeholder: "Select a country",
          searchable: true,
          options: countryOptions,
          value: address.country,
          onChange: (option) => handleChange("country", option.value)
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(
        Select$1,
        {
          label: "State/Province",
          options: stateOptions,
          searchable: true,
          placeholder: "Select State",
          value: stateOptions.find((s) => s.value === address.provinceCode) || null,
          onChange: (selectedOption) => handleChange("province", (selectedOption == null ? void 0 : selectedOption.value) || ""),
          disabled: !address.country
        }
      ) }),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Address Line 1",
          placeholder: "Enter address line 1",
          value: (address == null ? void 0 : address.address1) || "",
          onChange: (e) => handleChange("address1", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Address Line 2",
          placeholder: "Enter address line 2",
          value: (address == null ? void 0 : address.address2) || "",
          onChange: (e) => handleChange("address2", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "City",
          placeholder: "Enter city",
          value: address.city || "",
          onChange: (e) => handleChange("city", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Zip Code",
          placeholder: "Enter zip code",
          value: address.zip || "",
          onChange: (e) => handleChange("zip", e.target.value),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        PhoneNumber,
        {
          label: "Phone",
          placeholder: "Enter phone number",
          value: address.phone,
          onChange: (phone) => handleChange("phone", phone)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
        setIsLoading(false);
        setModalState(false);
      }, children: "Cancel" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          color: "primary",
          onClick: handleUpdate,
          isLoading,
          loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
          disabled: isLoading || !originalAddress || isAddressEqual(address, originalAddress),
          children: "Update"
        }
      )
    ] })
  ] }) });
};
const CopyToClipboard = ({ text, className }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      onClick: handleCopy,
      className,
      "aria-label": "Copy to clipboard",
      children: copied ? /* @__PURE__ */ jsx(FaCheck, { className: "text-green-500" }) : /* @__PURE__ */ jsx(FaRegCopy, {})
    }
  );
};
const EditAttrModal = ({
  isEditAttrModalOpen,
  setIsEditAttrModalOpen,
  customAttributes
}) => {
  const [attributes, setAttributes] = useState(customAttributes);
  const fetcher = useFetcher();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { key: "", value: "" }]);
    setErrors((prev) => [...prev, {}]);
  };
  const handleRemove = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChange = (index, field, value) => {
    setAttributes(
      (prev) => prev.map(
        (item, i) => i === index ? { ...item, [field]: value } : item
      )
    );
    setErrors(
      (prev) => prev.map(
        (err, i) => i === index ? { ...err, [field]: void 0 } : err
      )
    );
  };
  const handleUpdate = () => {
    const newErrors = attributes.map((attr) => ({
      key: !attr.key.trim() ? "Name is required" : void 0,
      value: !attr.value.trim() ? "Value is required" : void 0
    }));
    const hasErrors = newErrors.some((err) => err.key || err.value);
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateAttribute");
    formData.append("attributes", JSON.stringify(attributes));
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  const areAttributesEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((attr, i) => attr.key === b[i].key && attr.value === b[i].value);
  };
  useEffect(() => {
    setAttributes(customAttributes);
    setErrors(customAttributes.map(() => ({})));
  }, [customAttributes]);
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setIsLoading(false);
        setIsEditAttrModalOpen(false);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: isEditAttrModalOpen,
      onClose: () => setIsEditAttrModalOpen(false),
      containerClassName: "min-w-[500px]",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Order Attributes" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setIsEditAttrModalOpen(false),
              children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          attributes.length > 0 ? attributes.map((attr, index) => {
            var _a2, _b;
            return /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Name",
                  className: "w-[45%]",
                  value: attr.key,
                  onChange: (e) => handleChange(index, "key", e.target.value),
                  error: (_a2 = errors[index]) == null ? void 0 : _a2.key
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Value",
                  className: "w-[45%]",
                  value: attr.value,
                  onChange: (e) => handleChange(index, "value", e.target.value),
                  error: (_b = errors[index]) == null ? void 0 : _b.value
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "text",
                  color: "danger",
                  className: "w-[10%]",
                  onClick: () => handleRemove(index),
                  children: /* @__PURE__ */ jsx(FaTrash, {})
                }
              )
            ] }, index);
          }) : null,
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              className: "font-bold text-primary",
              onClick: handleAddAttribute,
              children: "+ Add Order Attribute"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
          }, children: "Cancel" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: handleUpdate,
              isLoading,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: isLoading || areAttributesEqual(attributes, customAttributes),
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const EditOrderNoteModal = ({
  isEditOrderNoteModalOpen,
  setEditOrderNoteModalOpen,
  orderNoteDefault
}) => {
  const [orderNote, setOrderNote] = useState(orderNoteDefault || "");
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const canSave = orderNote.trim() !== "" && orderNote !== orderNoteDefault;
  const handleUpdate = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateOrderNote");
    formData.append("orderNote", orderNote);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    setOrderNote(orderNoteDefault || "");
  }, [orderNoteDefault]);
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setEditOrderNoteModalOpen(false);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: isEditOrderNoteModalOpen,
      onClose: () => setEditOrderNoteModalOpen(false),
      containerClassName: "min-w-[500px]",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Order Note" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setEditOrderNoteModalOpen(false),
              children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            label: "Message",
            placeholder: "Write your message...",
            value: orderNote,
            onChange: (e) => setOrderNote(e.target.value),
            maxLength: 5e3
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setEditOrderNoteModalOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: handleUpdate,
              isLoading,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: !canSave || isLoading,
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const ViewOrderNoteAndAttributeModal = ({
  modalState,
  setModalState,
  shippingAddress,
  customerAddress
}) => {
  const addressId = customerAddress == null ? void 0 : customerAddress.id;
  const adressNumericId = extractNumericId(addressId || "");
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) return null;
  const { customAttributes, note } = subscriptionContract;
  const [isEditAttrModalOpen, setIsEditAttrModalOpen] = useState(false);
  const [isEditOrderNoteModalOpen, setEditOrderNoteModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[525px] max-h-[400px] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "m-auto px-7 pt-6 pb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Address details" }),
        /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "[&_label>span]:font-medium", children: /* @__PURE__ */ jsxs(Flex, { direction: "col", className: "w-full", children: [
        /* @__PURE__ */ jsxs(Box$1, { children: [
          /* @__PURE__ */ jsxs(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaHashtag, {}),
            "Address ID"
          ] }),
          /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm ms-3 mt-2", children: [
            "#",
            adressNumericId,
            /* @__PURE__ */ jsx(CopyToClipboard, { text: adressNumericId, className: "" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "w-full col-span-1" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "w-full", children: [
          /* @__PURE__ */ jsxs(Box$1, { className: "flex w-full justify-between", children: [
            /* @__PURE__ */ jsxs(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FaHashtag, {}),
              "Order Attributes"
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "text",
                className: "font-bold text-primary",
                onClick: () => setIsEditAttrModalOpen(true),
                children: "Edit"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Box$1, { className: "ms-3 mt-2 space-y-1 w-full", children: customAttributes && customAttributes.length > 0 ? customAttributes.map((attr, index) => /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
              attr.key,
              ":"
            ] }),
            " ",
            attr.value
          ] }, index)) : /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "None" }) })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "w-full col-span-1" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "w-full", children: [
          /* @__PURE__ */ jsxs(Box$1, { className: "flex w-full justify-between", children: [
            /* @__PURE__ */ jsxs(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4] flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FaHashtag, {}),
              "Order Note"
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "text",
                className: "font-bold text-primary",
                onClick: () => setEditOrderNoteModalOpen(true),
                children: "Edit"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Box$1, { className: "ms-3 mt-2 space-y-1 w-full", children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: note ? note : "None" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      EditAttrModal,
      {
        isEditAttrModalOpen,
        setIsEditAttrModalOpen,
        customAttributes
      }
    ),
    /* @__PURE__ */ jsx(
      EditOrderNoteModal,
      {
        isEditOrderNoteModalOpen,
        setEditOrderNoteModalOpen,
        orderNoteDefault: note
      }
    )
  ] });
};
const ACTIONS = [
  { icon: PiPencil, label: "Edit Address", action: "edit_address" },
  { icon: FaBars, label: "View order note & attributes", action: "edit_orderNote" }
];
const SubscriptionActions$1 = ({
  customer
}) => {
  var _a2;
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isViewOrderNoteModalOpen, setIsViewOrderNoteModalOpen] = useState(false);
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) {
    return null;
  }
  const handleActionClick = (action2) => {
    if (action2 === "edit_address") {
      setIsEditAddressOpen(true);
    } else {
      setIsViewOrderNoteModalOpen(true);
    }
  };
  const { deliveryMethod: { address } } = subscriptionContract;
  const customerAddress = (_a2 = subscriptionContract.customer.addressesV2) == null ? void 0 : _a2.edges[0].node;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(Dropdown, { children: [
      /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs(Button, { as: "span", variant: "text", color: "primary", className: "text-primary font-bold text-md", children: [
        "Action ",
        /* @__PURE__ */ jsx(BsChevronDown, { className: "ml-2 w-5" })
      ] }) }),
      /* @__PURE__ */ jsx(Dropdown.Menu, { className: "min-w-[280px]", children: ACTIONS.map((action2, index) => /* @__PURE__ */ jsx(
        DropdownActionItem,
        {
          icon: action2.icon,
          label: action2.label,
          onClick: () => handleActionClick(action2.action)
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      EditAddressModal,
      {
        modalState: isEditAddressOpen,
        setModalState: setIsEditAddressOpen,
        defaultAddress: address
      }
    ),
    /* @__PURE__ */ jsx(
      ViewOrderNoteAndAttributeModal,
      {
        modalState: isViewOrderNoteModalOpen,
        setModalState: setIsViewOrderNoteModalOpen,
        shippingAddress: address,
        customerAddress
      }
    )
  ] });
};
const PaymentMethodButton = ({ brand, lastDigits, ...props }) => /* @__PURE__ */ jsx(Button, { variant: "outline", ...props, children: /* @__PURE__ */ jsxs(Flex, { gap: "1", align: "center", children: [
  /* @__PURE__ */ jsx(FaRegCreditCard, {}),
  /* @__PURE__ */ jsx(Text, { className: "capitalize", children: brand }),
  /* @__PURE__ */ jsxs(Text, { children: [
    "••••",
    lastDigits
  ] })
] }) });
const DiscountButton = ({ discountTitle, ...props }) => /* @__PURE__ */ jsx(Button, { variant: "outline", ...props, children: /* @__PURE__ */ jsxs(Flex, { gap: "1", align: "center", children: [
  /* @__PURE__ */ jsx(FaTag, {}),
  /* @__PURE__ */ jsx(Text, { className: "capitalize", children: discountTitle || "No Discount" })
] }) });
function CheckCircleIcon({ ...props }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M3.85 12a8.15 8.15 0 0110.697-7.744.85.85 0 10.53-1.615A9.841 9.841 0 0012 2.15c-5.44 0-9.85 4.41-9.85 9.85 0 5.44 4.41 9.85 9.85 9.85 5.44 0 9.85-4.41 9.85-9.85a.85.85 0 00-1.7 0 8.15 8.15 0 01-16.3 0zm15.752-4.4a.85.85 0 10-1.204-1.2l-6.348 6.376-2.43-2.598a.85.85 0 10-1.241 1.16l3.03 3.242a.85.85 0 001.223.02l6.97-7z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
const UpdatePaymentMethodModal = ({
  modalState,
  setModalState,
  activePaymentMethod,
  customer
}) => {
  var _a2, _b, _c, _d;
  const fetcher = useFetcher();
  const [isSaving, setIsSaving] = useState(false);
  const [emailLoadingId, setEmailLoadingId] = useState(null);
  const [selectedMethodId, setSelectedMethodId] = useState("");
  useEffect(() => {
    var _a3, _b2, _c2, _d2;
    const defaultId = (_d2 = (_c2 = (_b2 = (_a3 = customer == null ? void 0 : customer.paymentMethods) == null ? void 0 : _a3.edges) == null ? void 0 : _b2.find(
      (edge) => {
        var _a4, _b3;
        return edge.node.instrument.lastDigits === ((_a4 = activePaymentMethod == null ? void 0 : activePaymentMethod.instrument) == null ? void 0 : _a4.lastDigits) && edge.node.instrument.brand === ((_b3 = activePaymentMethod == null ? void 0 : activePaymentMethod.instrument) == null ? void 0 : _b3.brand);
      }
    )) == null ? void 0 : _c2.node) == null ? void 0 : _d2.id;
    if (defaultId) setSelectedMethodId(defaultId);
  }, [activePaymentMethod, customer, modalState]);
  const handleUpdate = (isUpdate = false, methodId) => {
    if (isUpdate) {
      setIsSaving(true);
    }
    const formData = new FormData();
    const action2 = isUpdate ? "updatePaymentMethod" : "sendUpdatePaymentMethodEmail";
    formData.append("action", action2);
    formData.append("paymentMethodId", selectedMethodId);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a3, _b2;
    console.log(fetcher.data);
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a3 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a3.success) {
        toast.success("Email Send successfully!");
        setModalState(false);
      } else {
        toast.error((_b2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b2.error);
      }
      setIsSaving(false);
      setEmailLoadingId(null);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      containerClassName: "min-w-[625px] max-h-[500px] overflow-y-auto",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto px-7 pt-6 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Update Payment Method" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setModalState(false),
              children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx(RadioGroup, { value: selectedMethodId, setValue: setSelectedMethodId, className: "flex flex-col gap-3", children: (_b = (_a2 = customer == null ? void 0 : customer.paymentMethods) == null ? void 0 : _a2.edges) == null ? void 0 : _b.map(({ node }) => /* @__PURE__ */ jsxs(
          AdvancedRadio,
          {
            name: "paymentMethod",
            value: node.id,
            inputClassName: "[&:checked~span_.icon]:block",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "relative", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx(Text, { className: "capitalize", children: node.instrument.brand }),
                    /* @__PURE__ */ jsxs(Text, { children: [
                      "•••• ",
                      node.instrument.lastDigits
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(CheckCircleIcon, { className: "icon hidden h-5 w-5 text-secondary" })
                ] }),
                /* @__PURE__ */ jsxs(Text, { className: "text-sm", children: [
                  "Expires ",
                  node.instrument.expiryMonth,
                  "/",
                  node.instrument.expiryYear
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "text",
                  className: "font-bold text-primary px-0",
                  onClick: () => {
                    setSelectedMethodId(node.id);
                    handleUpdate();
                  },
                  isLoading: emailLoadingId === node.id,
                  loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
                  children: "Request an update via email"
                }
              )
            ]
          },
          node.id
        )) }) }),
        /* @__PURE__ */ jsx(Flex, { direction: "col", className: "mt-3", children: /* @__PURE__ */ jsx(
          Alert,
          {
            color: "info",
            variant: "flat",
            icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-5 w-5" }),
            children: /* @__PURE__ */ jsx(Text, { children: "Shopify Payments manages all payment method details. If you need the customer to update their payment information, you can" })
          }
        ) }),
        (((_d = (_c = customer == null ? void 0 : customer.paymentMethods) == null ? void 0 : _c.edges) == null ? void 0 : _d.length) ?? 0) > 1 && /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setModalState(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: () => handleUpdate(true),
              isLoading: isSaving,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: !selectedMethodId || isSaving || selectedMethodId === (activePaymentMethod == null ? void 0 : activePaymentMethod.id),
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const AddDiscountModal = ({
  modalState,
  setModalState,
  discounts
}) => {
  var _a2, _b;
  const fetcher = useFetcher();
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const existingDiscount = (_b = (_a2 = discounts == null ? void 0 : discounts.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node;
  const canSave = discount.trim() !== "";
  const handleSubmit = (remove = false) => {
    setIsLoading(true);
    const formData = new FormData();
    if (remove && (existingDiscount == null ? void 0 : existingDiscount.id)) {
      formData.append("action", "removeDiscount");
      formData.append("discountId", existingDiscount.id);
    } else {
      formData.append("action", "updateDiscount");
      formData.append("discountCode", discount);
    }
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        toast.success("Discount updated successfully!");
        setModalState(false);
      } else {
        toast.error(fetcher.data.error || "Something went wrong");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[500px]", children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: existingDiscount ? "Remove Discount" : "Add Discount" }),
      /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
    ] }),
    existingDiscount ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs(Text, { className: "text-sm mb-4", children: [
        "Are you sure you want to remove the discount code ",
        /* @__PURE__ */ jsx("strong", { children: existingDiscount.title }),
        " from this address?"
      ] }),
      /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            color: "danger",
            onClick: () => handleSubmit(true),
            isLoading,
            loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
            children: "Remove Discount"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          label: "Discount",
          placeholder: "Enter discount code",
          value: discount,
          onChange: (e) => setDiscount(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            color: "primary",
            onClick: () => handleSubmit(false),
            isLoading,
            loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
            disabled: !canSave || isLoading,
            children: "Save"
          }
        )
      ] })
    ] })
  ] }) });
};
const SubscriptionDetailsHeader = () => {
  var _a2, _b, _c;
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  const [isUpdatePaymentMethodModalOpen, setIsUpdatePaymentMethodModalOpen] = useState(false);
  const [isAddDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  if (!subscriptionContract) return null;
  const { customer, customerPaymentMethod, discounts, deliveryMethod: { address } } = subscriptionContract;
  if (!address) return null;
  return /* @__PURE__ */ jsx(Flex, { direction: "col", gap: "2", className: "rounded-lg", children: /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-2 text-lg justify-between w-full p-3 [&>div:nth-child(3)]:hidden", children: [
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(FaLocationDot, { className: "mt-1" }),
        /* @__PURE__ */ jsxs(Box$1, { children: [
          address.address1 && /* @__PURE__ */ jsx(Text, { className: "font-bold", children: address.address1 }),
          address.address2 && /* @__PURE__ */ jsx(Text, { className: "font-bold", children: address.address2 }),
          (address.city || address.province || address.country || address.zip) && /* @__PURE__ */ jsxs(Text, { className: "font-bold", children: [
            [address.city, address.province, address.country].filter(Boolean).join(", "),
            " ",
            address.zip ? `- ${address.zip}` : ""
          ] }),
          address.company && /* @__PURE__ */ jsx(Text, { className: "font-bold", children: address.company }),
          address.phone && /* @__PURE__ */ jsxs(Text, { className: "font-bold", children: [
            "📞 ",
            address.phone
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Box$1, { className: "mt-3 flex gap-4", children: [
        customerPaymentMethod && /* @__PURE__ */ jsx(
          PaymentMethodButton,
          {
            brand: customerPaymentMethod.instrument.brand,
            lastDigits: customerPaymentMethod.instrument.lastDigits,
            onClick: () => setIsUpdatePaymentMethodModalOpen(true)
          }
        ),
        /* @__PURE__ */ jsx(
          DiscountButton,
          {
            discountTitle: (_c = (_b = (_a2 = discounts == null ? void 0 : discounts.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node) == null ? void 0 : _c.title,
            onClick: () => setIsDiscountModalOpen(true)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(SubscriptionActions$1, { customer }),
    /* @__PURE__ */ jsx(
      UpdatePaymentMethodModal,
      {
        modalState: isUpdatePaymentMethodModalOpen,
        setModalState: setIsUpdatePaymentMethodModalOpen,
        customer,
        activePaymentMethod: customerPaymentMethod
      }
    ),
    /* @__PURE__ */ jsx(
      AddDiscountModal,
      {
        modalState: isAddDiscountModalOpen,
        setModalState: setIsDiscountModalOpen,
        discounts
      }
    )
  ] }) });
};
function useTanStackTable({
  options: options2,
  tableData,
  columnConfig
}) {
  const [data, setData] = React.useState([...tableData]);
  const [columns] = React.useState(() => [...columnConfig]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const [expanded, setExpanded] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState(() => columns.map((c) => {
    return c.id;
  }));
  const dataIds = React.useMemo(() => data == null ? void 0 : data.map(({ id }) => id), [data]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowPinning, setRowPinning] = React.useState({
    top: [],
    bottom: []
  });
  const handleDragEndColumn = React.useCallback((event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder2) => {
        const oldIndex = columnOrder2.indexOf(active.id);
        const newIndex = columnOrder2.indexOf(over.id);
        return arraySwap(columnOrder2, oldIndex, newIndex);
      });
    }
  }, []);
  const handleDragEndRow = React.useCallback((event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);
        return arraySwap(prevData, oldIndex, newIndex);
      });
    }
  }, []);
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
      rowPinning,
      columnOrder,
      globalFilter,
      columnFilters
    },
    ...options2,
    getRowCanExpand: () => true,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onRowPinningChange: setRowPinning,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });
  return {
    table,
    dataIds,
    setData,
    sensors,
    tableData: data,
    rowPinning,
    columnOrder,
    globalFilter,
    setRowPinning,
    setColumnOrder,
    setGlobalFilter,
    handleDragEndRow,
    handleDragEndColumn
  };
}
const SubscriptionLineItemActions = ({ OtherAactions: OtherAactions2, node }) => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) return null;
  const { status } = subscriptionContract;
  const ACTIVE_ACTIONS = [
    {
      icon: FaRegCalendar,
      label: "Reschedule next charge",
      setState: OtherAactions2.setIsRescheduleModalOpen
    },
    {
      icon: FaPencil,
      label: "Edit frequency",
      setState: OtherAactions2.setIsEditOrderFrequencyModalOpen
    },
    {
      icon: FaPencil,
      label: "Edit subscription product",
      setState: (value) => {
        OtherAactions2.setIsEditSubscriptionProductModalOpen(value);
        OtherAactions2.setSubscriptionLine(node);
      }
    },
    {
      icon: FaArrowsRotate,
      label: "Swap Product",
      setState: (value) => {
        OtherAactions2.setIsSwapProductModalOpen(value);
        OtherAactions2.setSubscriptionLine(node);
      }
    },
    {
      icon: FaRegWindowClose,
      label: "Cancel subscription",
      setState: OtherAactions2.setIsCancelSubscriptionModalOpen
    },
    {
      icon: FaRegTrashCan,
      label: "Delete"
    },
    {
      icon: FaPencil,
      label: "Edit line Item properties",
      setState: (value) => {
        OtherAactions2.setIsEditLineItemAttributesModalOpen(value);
        OtherAactions2.setSubscriptionLine(node);
      }
    }
  ];
  const CANCELLED_ACTIONS = [
    {
      icon: FaPowerOff,
      label: "Reactivate subscription",
      setState: OtherAactions2.setIsReactiveSubscriptionModalOpen
    },
    {
      icon: FaRegTrashCan,
      label: "Delete"
    },
    {
      icon: FaPencil,
      label: "Edit line Item properties",
      setState: (value) => {
        OtherAactions2.setIsEditLineItemAttributesModalOpen(value);
        OtherAactions2.setSubscriptionLine(node);
      }
    }
  ];
  const ACTIONS2 = status === SubscriptionContractSubscriptionStatus.CANCELLED ? CANCELLED_ACTIONS : ACTIVE_ACTIONS;
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsxs(Button, { as: "span", variant: "text", color: "primary", className: "text-primary font-bold", children: [
      "Action ",
      /* @__PURE__ */ jsx(BsChevronDown, { className: "ml-2 w-5" })
    ] }) }),
    /* @__PURE__ */ jsx(Dropdown.Menu, { className: "min-w-[310px]", children: ACTIONS2.map((action2, index) => /* @__PURE__ */ jsx(
      DropdownActionItem,
      {
        icon: action2.icon,
        label: action2.label,
        onClick: () => action2.setState && action2.setState(true)
      },
      index
    )) })
  ] });
};
const columnHelper$2 = createColumnHelper();
const lineColumns = [
  columnHelper$2.display({
    id: "select",
    size: 50,
    header: ({ table }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select all rows",
        checked: table.getIsAllPageRowsSelected(),
        onChange: () => table.toggleAllPageRowsSelected()
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select row",
        checked: row.getIsSelected(),
        onChange: () => row.toggleSelected()
      }
    )
  }),
  columnHelper$2.display({
    id: "Product",
    size: 300,
    header: "Product",
    cell: ({ row }) => {
      const { id, title, variantTitle, variantImage, status } = row.original;
      return /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
        /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsx("img", { src: (variantImage == null ? void 0 : variantImage.url) || "", alt: title, width: 48, height: 48 }) }),
        /* @__PURE__ */ jsxs(Box$1, { children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              className: cn(
                status === SubscriptionContractSubscriptionStatus.CANCELLED && "line-through"
              ),
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            Text,
            {
              className: cn(
                status === SubscriptionContractSubscriptionStatus.CANCELLED && "line-through"
              ),
              children: variantTitle
            }
          )
        ] })
      ] });
    }
  }),
  columnHelper$2.display({
    id: "nextOrder",
    size: 120,
    header: "Next Order",
    cell: ({ row }) => {
      const { nextBillingDate, status, note } = row.original;
      return /* @__PURE__ */ jsxs(Box$1, { children: [
        /* @__PURE__ */ jsx(Text, { children: nextBillingDate }),
        status === SubscriptionContractSubscriptionStatus.CANCELLED && /* @__PURE__ */ jsxs(Box$1, { children: [
          /* @__PURE__ */ jsx(SubscriptionStatusBadge, { status }),
          /* @__PURE__ */ jsx("span", { children: note && /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(Text, { className: "text-xs", children: getTruncatedText(note, 4) }),
            /* @__PURE__ */ jsx(Tooltip, { content: note, children: /* @__PURE__ */ jsx(FaCircleInfo, {}) })
          ] }) })
        ] })
      ] });
    }
  }),
  columnHelper$2.display({
    id: "frequency",
    size: 180,
    header: "Frequency",
    cell: ({ row }) => /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: `Ships every ${row.original.deliveryPolicyIntervalCount} ${row.original.deliveryPolicyInterval.toLowerCase()}` }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: `Charges ${row.original.billingPolicyIntervalCount} ${row.original.billingPolicyInterval.toLowerCase()}` })
    ] })
  }),
  columnHelper$2.display({
    id: "price",
    size: 120,
    header: "Price",
    cell: ({ row }) => {
      const { lineDiscountedPrice: { amount, currencyCode }, quantity, shop: { currencyFormats: { moneyFormat } } } = row.original;
      const formatedPrice = formatPrice(amount, moneyFormat);
      return /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsxs(Text, { children: [
        quantity,
        " x ",
        formatedPrice,
        " ",
        currencyCode
      ] }) });
    }
  }),
  columnHelper$2.display({
    id: "action",
    size: 100,
    header: "Action",
    cell: ({ row }) => {
      return /* @__PURE__ */ jsx(
        SubscriptionLineItemActions,
        {
          OtherAactions: row.original.otherActions,
          node: row.original.node
        }
      );
    }
  })
];
function getColumnOptions(column) {
  var _a2;
  const isColumnDraggable = ((_a2 = column.columnDef.meta) == null ? void 0 : _a2.isColumnDraggable) ?? true;
  const canResize = column.getCanResize();
  const canPin = column.getCanPin();
  const isPinned = column.getIsPinned();
  const isLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
  const isRightPinned = isPinned === "right" && column.getIsFirstColumn("right");
  return {
    canPin,
    isPinned,
    canResize,
    isLeftPinned,
    isRightPinned,
    isColumnDraggable
  };
}
function getPercentage(partialValue, totalValue) {
  if (partialValue && totalValue) return 100 * partialValue / totalValue;
  return;
}
function useScrollPosition() {
  const containerRef = React.useRef(null);
  const [currentOffset, setCurrentOffset] = React.useState();
  const tableRef = React.useRef(null);
  const scroll = useScroll(containerRef);
  const tableSize = useSize(tableRef);
  const containerSize = useSize(containerRef);
  React.useEffect(() => {
    if (containerRef.current && tableSize) {
      setCurrentOffset(tableSize.width - containerRef.current.clientWidth);
    }
  }, [tableSize, containerRef]);
  const scrollPercentage = getPercentage(scroll == null ? void 0 : scroll.left, currentOffset) ?? 0;
  const isLeftScrollable = (tableSize == null ? void 0 : tableSize.width) !== (containerSize == null ? void 0 : containerSize.width) && scrollPercentage < 100;
  const isRightScrollable = (tableSize == null ? void 0 : tableSize.width) !== (containerSize == null ? void 0 : containerSize.width) && scrollPercentage > 0;
  return {
    containerRef,
    scrollPercentage,
    isLeftScrollable,
    isRightScrollable,
    tableRef
  };
}
const pinningStyles = {
  baseStyle: `before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:content-[""]`,
  variants: {
    classic: `[&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50`,
    modern: `[&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50`,
    minimal: `[&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50`,
    elegant: `[&_th.sticky-left]:bg-white [&_td.sticky-left]:bg-white [&_th.sticky-right]:bg-white [&_td.sticky-right]:bg-white`,
    retro: `[&_th.sticky-left]:bg-white [&_td.sticky-left]:bg-white [&_th.sticky-right]:bg-white [&_td.sticky-right]:bg-white`
  }
};
const { isEmpty } = pkg;
function MainTable({
  table,
  dataIds,
  variant = "classic",
  classNames,
  columnOrder,
  isLoading = false,
  showLoadingText = false,
  components,
  stickyHeader = false,
  width = ""
}) {
  const { containerRef, tableRef, isLeftScrollable, isRightScrollable } = useScrollPosition();
  if (!table) return null;
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-[128px] flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(Loader$1, { variant: "spinner", size: "xl" }),
      showLoadingText ? /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "-me-2 mt-4 font-medium text-gray-500", children: "Loading..." }) : null
    ] });
  }
  const headerParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable
  };
  const rowParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable
  };
  const mainRows = table.getIsSomeRowsPinned() ? table.getCenterRows() : table.getRowModel().rows;
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      Box$1,
      {
        ref: containerRef,
        className: cn(
          "custom-scrollbar w-full max-w-full overflow-x-auto scroll-smooth",
          stickyHeader && "max-h-[600px] overflow-y-auto",
          classNames == null ? void 0 : classNames.container
        ),
        children: /* @__PURE__ */ jsxs(
          Table,
          {
            ref: tableRef,
            variant,
            style: {
              width: width ? width : table.getTotalSize()
            },
            className: cn(
              pinningStyles.baseStyle,
              pinningStyles.variants[variant],
              classNames == null ? void 0 : classNames.tableClassName
            ),
            children: [
              /* @__PURE__ */ jsx(Fragment, { children: (components == null ? void 0 : components.header) ? components.header(headerParam) : /* @__PURE__ */ jsx(
                Table.Header,
                {
                  className: cn(
                    stickyHeader && "sticky top-0 z-10",
                    classNames == null ? void 0 : classNames.headerClassName
                  ),
                  children: table.getHeaderGroups().map((headerGroup) => {
                    const headerCellParam = {
                      columnOrder,
                      headerGroup,
                      isLeftScrollable,
                      isRightScrollable
                    };
                    return /* @__PURE__ */ jsx(
                      Table.Row,
                      {
                        className: classNames == null ? void 0 : classNames.rowClassName,
                        children: (components == null ? void 0 : components.headerCell) ? components.headerCell(headerCellParam) : /* @__PURE__ */ jsx(
                          TableHeadBasic,
                          {
                            headerGroup,
                            isLeftScrollable,
                            isRightScrollable,
                            className: classNames == null ? void 0 : classNames.headerCellClassName
                          }
                        )
                      },
                      headerGroup.id
                    );
                  })
                }
              ) }),
              /* @__PURE__ */ jsxs(Table.Body, { className: classNames == null ? void 0 : classNames.bodyClassName, children: [
                table.getTopRows().map((row) => /* @__PURE__ */ jsx(
                  PinnedRow,
                  {
                    row,
                    table,
                    isLeftScrollable,
                    isRightScrollable,
                    className: classNames == null ? void 0 : classNames.rowClassName,
                    tableCellClassName: classNames == null ? void 0 : classNames.cellClassName
                  },
                  row.id
                )),
                (components == null ? void 0 : components.bodyRow) ? components.bodyRow(rowParam) : /* @__PURE__ */ jsx(Fragment$1, { children: mainRows.map((row) => /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Table.Row, { className: classNames == null ? void 0 : classNames.rowClassName, onClick: () => {
                    if (typeof row.original.onRowClick === "function") {
                      row.original.onRowClick();
                    }
                  }, children: row.getVisibleCells().map((cell) => {
                    const bodyCellParam = {
                      cell,
                      columnOrder,
                      isLeftScrollable,
                      isRightScrollable
                    };
                    return /* @__PURE__ */ jsx(Fragment, { children: (components == null ? void 0 : components.bodyCell) ? components.bodyCell(bodyCellParam) : /* @__PURE__ */ jsx(
                      TableCellBasic,
                      {
                        cell,
                        isLeftScrollable,
                        isRightScrollable,
                        className: classNames == null ? void 0 : classNames.cellClassName
                      }
                    ) }, cell.id);
                  }) }),
                  (components == null ? void 0 : components.expandedComponent) && row.getIsExpanded() && /* @__PURE__ */ jsx(Table.Row, { className: classNames == null ? void 0 : classNames.expandedRowClassName, children: /* @__PURE__ */ jsx(
                    Table.Cell,
                    {
                      className: cn(
                        "!p-0",
                        classNames == null ? void 0 : classNames.expandedCellClassName
                      ),
                      colSpan: row.getVisibleCells().length,
                      children: components.expandedComponent(row)
                    }
                  ) })
                ] }, row.id)) }),
                table.getBottomRows().map((row) => /* @__PURE__ */ jsx(
                  PinnedRow,
                  {
                    row,
                    table,
                    isLeftScrollable,
                    isRightScrollable,
                    className: classNames == null ? void 0 : classNames.rowClassName,
                    tableCellClassName: classNames == null ? void 0 : classNames.cellClassName
                  },
                  row.id
                ))
              ] })
            ]
          }
        )
      }
    ),
    isEmpty(table.getRowModel().rows) && /* @__PURE__ */ jsxs(Box$1, { className: "py-5 text-center lg:py-8", children: [
      /* @__PURE__ */ jsx(Empty, {}),
      " ",
      /* @__PURE__ */ jsx(Text, { className: "mt-3", children: "No Data" })
    ] })
  ] });
}
function TableHeadBasic({
  headerGroup,
  isLeftScrollable,
  isRightScrollable,
  className
}) {
  if (!headerGroup) return null;
  return /* @__PURE__ */ jsx(Fragment$1, { children: headerGroup.headers.map((header) => {
    const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } = getColumnOptions(header.column);
    return /* @__PURE__ */ jsxs(
      Table.Head,
      {
        colSpan: header.colSpan,
        style: {
          left: isLeftPinned ? header.column.getStart("left") : void 0,
          right: isRightPinned ? header.column.getAfter("right") : void 0,
          width: header.getSize()
        },
        className: cn(
          "group",
          isPinned && canPin && "sticky z-10",
          !isPinned && canResize && "relative",
          isPinned && isLeftScrollable && "sticky-right",
          isPinned && isRightScrollable && "sticky-left",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs(Box$1, { className: "flex items-start", children: [
            header.isPlaceholder ? null : flexRender(
              header.column.columnDef.header,
              header.getContext()
            ),
            header.column.getCanSort() ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: header.column.getToggleSortingHandler(),
                className: "ms-1 inline-block",
                "aria-label": "Sort by column",
                children: {
                  asc: /* @__PURE__ */ jsx(PiCaretUpFill, { size: 14 }),
                  desc: /* @__PURE__ */ jsx(PiCaretDownFill, { size: 14 })
                }[header.column.getIsSorted()] ?? (header.column.columnDef.header !== "" && /* @__PURE__ */ jsx(PiCaretDownFill, { size: 14 }))
              }
            ) : null
          ] }),
          header.column.getCanResize() && /* @__PURE__ */ jsx(
            "div",
            {
              ...{
                onDoubleClick: () => header.column.resetSize(),
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler()
              },
              className: "absolute end-0 top-0 hidden h-full w-0.5 cursor-w-resize bg-gray-400 group-hover:block"
            }
          )
        ]
      },
      header.id
    );
  }) });
}
function TableCellBasic({
  cell,
  isLeftScrollable,
  isRightScrollable,
  className
}) {
  if (!cell) return null;
  const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } = getColumnOptions(cell.column);
  return /* @__PURE__ */ jsx(
    Table.Cell,
    {
      style: {
        left: isLeftPinned ? cell.column.getStart("left") : void 0,
        right: isRightPinned ? cell.column.getAfter("right") : void 0,
        width: cell.column.getSize()
      },
      className: cn(
        isPinned && canPin && "sticky z-10",
        !isPinned && canResize && "relative",
        isPinned && isLeftScrollable && "sticky-right",
        isPinned && isRightScrollable && "sticky-left",
        className
      ),
      children: flexRender(cell.column.columnDef.cell, cell.getContext())
    }
  );
}
function PinnedRow({
  row,
  table,
  isLeftScrollable,
  isRightScrollable,
  className,
  tableCellClassName
}) {
  const isTopPinned = row.getIsPinned() === "top";
  const isBottomPinned = row.getIsPinned() === "bottom";
  return /* @__PURE__ */ jsx(
    Table.Row,
    {
      className: cn(
        "sticky z-20 bg-white dark:bg-gray-50",
        isTopPinned && "-top-px shadow-[0px_2px_2px_0px_#0000000D]",
        isBottomPinned && "-bottom-0.5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]",
        className
      ),
      children: row.getVisibleCells().map((cell) => {
        return /* @__PURE__ */ jsx(
          TableCellBasic,
          {
            cell,
            isLeftScrollable,
            isRightScrollable,
            className: tableCellClassName
          },
          cell.id
        );
      })
    }
  );
}
const RescheduleBillingModal = ({
  modalState,
  setModalState,
  nextBillingDate
}) => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    nextBillingDate ? new Date(nextBillingDate) : null
  );
  const canSave = selectedDate && selectedDate.toISOString() !== nextBillingDate;
  const handleSubmit = () => {
    if (!selectedDate) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "rescheduleBillingDate");
    formData.append("nextBillingDate", selectedDate.toISOString());
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Billing date updated!");
        setModalState(false);
      } else {
        toast.error(((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error) || "Something went wrong");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      containerClassName: "min-w-[500px] overflow-visible z-[999] relative",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Reschedule Next Billing" }),
          /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
        ] }),
        /* @__PURE__ */ jsxs(Flex, { className: "relative w-full", children: [
          /* @__PURE__ */ jsx(FaCalendar, { className: "absolute left-3 top-[37px] text-muted w-4 h-4" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              label: "Select Date & Time",
              type: "date",
              value: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
              onChange: (e) => setSelectedDate(new Date(e.target.value)),
              className: "pl-10 w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: handleSubmit,
              isLoading,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: !canSave || isLoading,
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const EditOrderFrequencyModal = ({
  modalState,
  setModalState,
  billingPolicy
}) => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [intervalCount, setIntervalCount] = useState(billingPolicy.intervalCount);
  const [interval, setInterval] = useState(billingPolicy.interval);
  const canSave = intervalCount !== billingPolicy.intervalCount || interval !== billingPolicy.interval;
  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateOrderFrequency");
    formData.append("intervalCount", intervalCount.toString());
    formData.append("interval", interval);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Order frequency updated!");
        setModalState(false);
      } else {
        toast.error(((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error) || "Something went wrong");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[500px]", children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Order Frequency" }),
      /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsx(
        NumberInput,
        {
          label: "Billing Frequency",
          value: intervalCount,
          onChange: (val) => setIntervalCount(Number(val)),
          min: 1
        }
      ),
      /* @__PURE__ */ jsx(
        Select$1,
        {
          label: "Billing Interval",
          options: unitOptions,
          value: unitOptions.find((o) => o.value === interval),
          onChange: (opt) => setInterval(opt.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          color: "primary",
          onClick: handleSubmit,
          isLoading,
          loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
          disabled: !canSave || isLoading,
          children: "Save"
        }
      )
    ] })
  ] }) });
};
const cancellationReasons = [
  "This is too expensive",
  "This was created by accident",
  "I already have more than I need",
  "I need it sooner",
  "I no longer use this product",
  "I want a different product or variety",
  "Other reason"
];
const CancelSubscriptionModal = ({
  modalState,
  setModalState
}) => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const canSubmit = selectedReason && (selectedReason !== "Other reason" || customReason.trim() !== "");
  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateStatus");
    formData.append("reason", selectedReason === "Other reason" ? customReason : selectedReason);
    formData.append("sendCancellationEmail", sendEmail.toString());
    formData.append("status", SubscriptionContractSubscriptionStatus.CANCELLED);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2;
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        toast.success("Subscription cancelled successfully.");
        setModalState(false);
      } else {
        toast.error(((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.error) || "Something went wrong.");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[525px]", children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Cancel Subscription" }),
      /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
    ] }),
    /* @__PURE__ */ jsx(Text, { className: "mb-2", children: "Please select a reason for cancelling this subscription." }),
    /* @__PURE__ */ jsx(RadioGroup, { value: selectedReason, setValue: setSelectedReason, className: "space-y-2", children: cancellationReasons.map((reason) => /* @__PURE__ */ jsx(Radio, { name: "cancelReason", value: reason, label: reason }, reason)) }),
    selectedReason === "Other reason" && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
      Textarea,
      {
        placeholder: "Please provide your reason...",
        value: customReason,
        onChange: (e) => setCustomReason(e.target.value),
        className: "w-full",
        rows: 4
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          label: "Send a cancellation email",
          checked: sendEmail,
          onChange: (e) => setSendEmail(e.target.checked)
        }
      ),
      /* @__PURE__ */ jsx(Text, { className: "text-xs text-gray-500 mt-1", children: "An email will only be sent if the customer has no remaining active subscriptions. You can manage this email in your notifications." })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          color: "danger",
          onClick: handleSubmit,
          isLoading,
          loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
          disabled: !canSubmit || isLoading,
          children: "Cancel Subscription"
        }
      )
    ] })
  ] }) });
};
const ReactiveSubscriptionModal = ({
  modalState,
  setModalState
}) => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateStatus");
    formData.append("reason", "");
    formData.append("status", SubscriptionContractSubscriptionStatus.ACTIVE);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2;
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        toast.success("Subscription cancelled successfully.");
        setModalState(false);
      } else {
        toast.error(((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.error) || "Something went wrong.");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: () => setModalState(false), containerClassName: "min-w-[525px]", children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Reactivate subscription" }),
      /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
    ] }),
    /* @__PURE__ */ jsx(Text, { className: "mb-2", children: "Are you sure you want to reactivate this subscription?" }),
    /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          color: "primary",
          onClick: handleSubmit,
          isLoading,
          loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
          children: "Reactive"
        }
      )
    ] })
  ] }) });
};
const EditLineItemAttributeModal = ({
  modalState,
  setModalState,
  subscriptionLine
}) => {
  const lineItemAttributes = subscriptionLine == null ? void 0 : subscriptionLine.customAttributes;
  const [attributes, setAttributes] = useState(lineItemAttributes || []);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();
  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { key: "", value: "" }]);
    setErrors((prev) => [...prev, {}]);
  };
  const handleRemove = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChange = (index, field, value) => {
    setAttributes(
      (prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
    );
    setErrors(
      (prev) => prev.map((err, i) => i === index ? { ...err, [field]: void 0 } : err)
    );
  };
  const areAttributesEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((attr, i) => attr.key === b[i].key && attr.value === b[i].value);
  };
  const handleUpdate = () => {
    const newErrors = attributes.map((attr) => ({
      key: !attr.key.trim() ? "Name is required" : void 0,
      value: !attr.value.trim() ? "Value is required" : void 0
    }));
    if (newErrors.some((err) => err.key || err.value)) {
      setErrors(newErrors);
      return;
    }
    if (!(subscriptionLine == null ? void 0 : subscriptionLine.id)) {
      toast.error("Line item not found, please refresh the page and try again.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "updateLineItemAttribute");
    formData.append("lineId", subscriptionLine == null ? void 0 : subscriptionLine.id);
    formData.append("attributes", JSON.stringify(attributes));
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    setAttributes(lineItemAttributes || []);
    setErrors((lineItemAttributes || []).map(() => ({})));
  }, [lineItemAttributes]);
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Line item attributes updated!");
        setIsLoading(false);
        setModalState(false);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      containerClassName: "min-w-[500px]",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Line Item Attributes" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setModalState(false),
              children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Box$1, { className: "mb-3", children: /* @__PURE__ */ jsxs(Text, { children: [
          "Line item properties are used to record customized information about specific items within an order. Line item properties entered here will be included on orders generated from this subscription.",
          /* @__PURE__ */ jsx(Link, { to: "/", className: "text-primary font-bold", children: "Learn more" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          attributes.map((attr, index) => {
            var _a2, _b;
            return /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Name",
                  className: "w-[45%]",
                  value: attr.key,
                  onChange: (e) => handleChange(index, "key", e.target.value),
                  error: (_a2 = errors[index]) == null ? void 0 : _a2.key
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Value",
                  className: "w-[45%]",
                  value: attr.value,
                  onChange: (e) => handleChange(index, "value", e.target.value),
                  error: (_b = errors[index]) == null ? void 0 : _b.value
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "text",
                  color: "danger",
                  className: "w-[10%]",
                  onClick: () => handleRemove(index),
                  children: /* @__PURE__ */ jsx(FaTrash, {})
                }
              )
            ] }, index);
          }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              className: "font-bold text-primary",
              onClick: handleAddAttribute,
              children: "+ Add Line Item Attribute"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setModalState(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: handleUpdate,
              isLoading,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: isLoading || areAttributesEqual(attributes, lineItemAttributes || []),
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const SubscriptionProductFormSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5 animate-pulse p-4 w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "h-5 w-1/3 bg-gray-200 rounded-md" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/4 bg-gray-300 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full bg-gray-100 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/4 bg-gray-300 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full bg-gray-100 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/4 bg-gray-300 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full bg-gray-100 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/4 bg-gray-300 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full bg-gray-100 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-1/4 bg-gray-300 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full bg-gray-100 rounded-md" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 w-24 bg-gray-200 rounded-md" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-24 bg-gray-300 rounded-md" })
    ] })
  ] });
};
const EditSubscriptionProductModal = ({
  modalState,
  setModalState,
  subscriptionLine
}) => {
  const getFetcher = useFetcher();
  const updateFetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [formState, setFormState] = useState(null);
  const [initialState, setInitialState] = useState(null);
  const [variantOptions, setVariantOptions] = useState([]);
  const handleChange = (field, value) => {
    setFormState((prev) => prev ? { ...prev, [field]: value } : prev);
  };
  const handleUpdate = () => {
    if (!(formState == null ? void 0 : formState.id)) return;
    setIsSubmitLoading(true);
    const formData = new FormData();
    formData.append("action", "subscriptionLineUpdate");
    formData.append("updatedLine", JSON.stringify(formState));
    updateFetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    if (modalState && (subscriptionLine == null ? void 0 : subscriptionLine.productId)) {
      const formData = new FormData();
      formData.append("action", "getProductData");
      formData.append("productId", subscriptionLine.productId);
      getFetcher.submit(formData, {
        method: "POST",
        action: `.`,
        encType: "multipart/form-data"
      });
    }
  }, [modalState]);
  useEffect(() => {
    var _a2, _b, _c;
    if (getFetcher.state === "idle" && getFetcher.data) {
      if (getFetcher.data.success && getFetcher.data.product) {
        const product = getFetcher.data.product;
        const variants = product.variants.nodes || [];
        setVariantOptions(
          variants.map((v) => ({ label: v.title, value: v.id }))
        );
        if (!subscriptionLine) return;
        const updatedLine = {
          ...subscriptionLine,
          variantId: (_a2 = variants[0]) == null ? void 0 : _a2.id,
          variantTitle: (_b = variants[0]) == null ? void 0 : _b.title,
          quantity: subscriptionLine.quantity ?? 1,
          lineDiscountedPrice: {
            amount: ((_c = variants[0]) == null ? void 0 : _c.price) || "0",
            currencyCode: subscriptionLine.lineDiscountedPrice.currencyCode
          }
        };
        setFormState(updatedLine);
        setInitialState(updatedLine);
      } else {
        toast.error(getFetcher.data.error || "Failed to fetch product info");
      }
      setIsLoading(false);
    }
  }, [getFetcher.state, getFetcher.data]);
  useEffect(() => {
    if (updateFetcher.state === "idle" && updateFetcher.data) {
      if (updateFetcher.data.success) {
        toast.success("Subscription product updated!");
        setModalState(false);
      } else {
        toast.error(updateFetcher.data.error || "Something went wrong");
      }
      setIsSubmitLoading(false);
    }
  }, [updateFetcher.state, updateFetcher.data]);
  const hasChanged = JSON.stringify(formState) !== JSON.stringify(initialState);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setFormState(null),
      containerClassName: "min-w-[500px]",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3 relative min-h-[200px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Subscription Product" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setModalState(false),
              children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 })
            }
          )
        ] }),
        isLoading || !formState ? /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center items-center min-h-[200px]", children: /* @__PURE__ */ jsx(SubscriptionProductFormSkeleton, {}) }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Input, { label: "Product Name", value: (subscriptionLine == null ? void 0 : subscriptionLine.title) || "", disabled: true }),
            /* @__PURE__ */ jsx(
              Select$1,
              {
                label: "Variant",
                options: variantOptions,
                value: variantOptions.find((opt) => opt.value === formState.variantId),
                onChange: (opt) => {
                  handleChange("variantId", opt.value);
                  const selected = variantOptions.find((v) => v.value === opt.value);
                  handleChange("variantTitle", (selected == null ? void 0 : selected.label) || "");
                }
              }
            ),
            /* @__PURE__ */ jsx(Input, { label: "Variant Name", value: formState.variantTitle || "", disabled: true }),
            /* @__PURE__ */ jsx(
              NumberInput,
              {
                label: "Quantity",
                value: formState.quantity,
                onChange: (value) => handleChange("quantity", value)
              }
            ),
            /* @__PURE__ */ jsx(
              NumberInput,
              {
                label: "Recurring Price",
                value: parseFloat(formState.lineDiscountedPrice.amount),
                onChange: (value) => setFormState(
                  (prev) => prev ? {
                    ...prev,
                    lineDiscountedPrice: {
                      ...prev.lineDiscountedPrice,
                      amount: value
                    }
                  } : prev
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
            /* @__PURE__ */ jsx(Button, { variant: "text", onClick: () => setModalState(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                color: "primary",
                onClick: handleUpdate,
                isLoading: isSubmitLoading,
                loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
                disabled: !hasChanged || isLoading,
                children: "Save"
              }
            )
          ] })
        ] })
      ] })
    }
  );
};
const ProductItemSkeleton = () => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      className: "flex justify-between items-center border p-3 rounded-md animate-pulse space-x-4 w-full",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-sm" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32" }),
          /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24" }),
          /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-sm" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading..." })
      ]
    }
  );
};
const PriceRange = ({ priceRangeV2, ...props }) => {
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const { minVariantPrice, maxVariantPrice } = priceRangeV2;
  const isSamePrice = maxVariantPrice.amount === minVariantPrice.amount;
  const minPrice = formatPrice(minVariantPrice.amount, moneyWithCurrencyFormat);
  const maxPrice = formatPrice(maxVariantPrice.amount, moneyWithCurrencyFormat);
  return /* @__PURE__ */ jsxs("span", { ...props, children: [
    "Price: ",
    isSamePrice ? minPrice : `${minPrice} - ${maxPrice}`
  ] });
};
const SwapProductModal = ({
  modalState,
  setModalState,
  subscriptionLine
}) => {
  var _a2, _b, _c;
  const getFetcher = useFetcher();
  const submitFetcher = useFetcher();
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variantOptions, setVariantOptions] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  if (!subscriptionContract) return null;
  const { nextBillingDate } = subscriptionContract;
  const containerRef = useRef(null);
  useEffect(() => {
    if (modalState) {
      setStep(1);
      setProducts([]);
      setCursor(null);
      fetchProducts(null);
    }
  }, [modalState]);
  const fetchProducts = (cursorParam) => {
    setLoadingProducts(true);
    const formData = new FormData();
    formData.append("action", "getProducts");
    if (cursorParam) formData.append("cursor", cursorParam);
    getFetcher.submit(formData, { method: "POST", action: ".", encType: "multipart/form-data" });
  };
  useEffect(() => {
    var _a3, _b2;
    if (getFetcher.state === "idle" && ((_a3 = getFetcher.data) == null ? void 0 : _a3.success) && ((_b2 = getFetcher.data) == null ? void 0 : _b2.products)) {
      const newProducts = getFetcher.data.products.edges.map((edge) => edge.node);
      setProducts((prev) => [...prev, ...newProducts]);
      setCursor(getFetcher.data.products.pageInfo.endCursor || null);
      setHasNextPage(getFetcher.data.products.pageInfo.hasNextPage);
      setLoadingProducts(false);
    } else if (getFetcher.state === "idle" && getFetcher.data && !getFetcher.data.success) {
      toast.error(getFetcher.data.error || "Failed to fetch product info");
    }
  }, [getFetcher.state, getFetcher.data]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry2]) => {
      if (entry2.isIntersecting && hasNextPage && !loadingProducts) {
        fetchProducts(cursor);
      }
    }, { threshold: 1 });
    const current = containerRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [hasNextPage, loadingProducts, cursor]);
  const handleNext = () => {
    var _a3, _b2;
    if (!selectedProduct) return toast.error("Please select a product");
    const firstVariant = (_b2 = (_a3 = selectedProduct.variants) == null ? void 0 : _a3.nodes) == null ? void 0 : _b2[0];
    const options2 = selectedProduct.variants.nodes.filter((v) => v && v.title && v.id).map((v) => ({ label: v.title, value: v.id }));
    setVariantOptions(options2);
    setSelectedVariant((firstVariant == null ? void 0 : firstVariant.id) || null);
    setPrice(parseFloat((firstVariant == null ? void 0 : firstVariant.price) || "0"));
    setSku((firstVariant == null ? void 0 : firstVariant.sku) || "");
    setStep(2);
  };
  const handleSubmit = () => {
    if (!selectedProduct || !selectedVariant) return toast.error("Missing data");
    const formData = new FormData();
    formData.append("action", "subscriptionLineProductUpdate");
    const formState = {
      id: subscriptionLine == null ? void 0 : subscriptionLine.id,
      productId: selectedProduct == null ? void 0 : selectedProduct.id,
      variantId: selectedVariant,
      quantity
    };
    formData.append("updatedLine", JSON.stringify(formState));
    submitFetcher.submit(formData, { method: "POST", action: ".", encType: "multipart/form-data" });
  };
  useEffect(() => {
    if (submitFetcher.state === "idle" && submitFetcher.data) {
      if (submitFetcher.data.success) {
        toast.success("Product swapped successfully!");
        resetModal();
      } else {
        toast.error(submitFetcher.data.error || "Something went wrong");
      }
    }
  }, [submitFetcher.state, submitFetcher.data]);
  const resetModal = () => {
    setModalState(false);
    setStep(1);
    setProducts([]);
    setCursor(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setVariantOptions([]);
  };
  const currentVariant = selectedProduct == null ? void 0 : selectedProduct.variants.nodes.find(
    (v) => v.id === selectedVariant
  );
  console.log("selectedProduct", selectedProduct);
  console.log("currentVariant", currentVariant);
  return /* @__PURE__ */ jsx(Modal, { isOpen: modalState, onClose: resetModal, containerClassName: "min-w-[600px] max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-6", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", children: step === 1 ? "Swap Product" : "Edit Variant" }),
      /* @__PURE__ */ jsx(Button, { variant: "text", onClick: resetModal, children: /* @__PURE__ */ jsx(FaXmark, {}) })
    ] }),
    step === 1 ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      products.map((product, index) => {
        var _a3, _b2, _c2, _d, _e, _f;
        console.log("productssss", product);
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border p-3 rounded-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: ((_c2 = (_b2 = (_a3 = product.featuredMedia) == null ? void 0 : _a3.preview) == null ? void 0 : _b2.image) == null ? void 0 : _c2.url) || "/placeholder.png",
                alt: ((_f = (_e = (_d = product.featuredMedia) == null ? void 0 : _d.preview) == null ? void 0 : _e.image) == null ? void 0 : _f.altText) || product.title,
                className: "w-12 h-12 object-cover rounded"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold", children: product.title }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#606270] font-bold", children: product.priceRangeV2 && /* @__PURE__ */ jsx(
                PriceRange,
                {
                  priceRangeV2: product.priceRangeV2,
                  className: "text-sm font-bold"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-[#606270]", children: [
                "Product ID: ",
                extractNumericId(product.id)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { children: (selectedProduct == null ? void 0 : selectedProduct.id) === product.id ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-green-600 font-semibold", children: [
            /* @__PURE__ */ jsx(FaCheck$1, {}),
            " Selected"
          ] }) : /* @__PURE__ */ jsx(
            Button,
            {
              size: "md",
              onClick: () => setSelectedProduct(product),
              variant: "outline",
              children: "Select"
            }
          ) })
        ] }, product.id + index);
      }),
      /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w-full py-4 text-center", children: loadingProducts && /* @__PURE__ */ jsx(Flex, { gap: "2", direction: "col", className: "w-full", children: [...Array(3)].map((_, index) => /* @__PURE__ */ jsx(ProductItemSkeleton, {}, index)) }) }),
      /* @__PURE__ */ jsxs(Flex, { justify: "end", className: "sticky bottom-0 bg-white p-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: resetModal,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(Button, { onClick: handleNext, className: "ml-2", children: "Next" })
      ] })
    ] }) : selectedProduct && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 border p-3 rounded-md", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: ((_c = (_b = (_a2 = selectedProduct.featuredMedia) == null ? void 0 : _a2.preview) == null ? void 0 : _b.image) == null ? void 0 : _c.url) || "/placeholder.png",
            className: "w-14 h-14 rounded"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-[#2E3685]", children: selectedProduct.title }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-[#606270]", children: [
            "SKU: ",
            sku || "N/A"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#606270]", children: [
            "Product ID: ",
            extractNumericId(selectedProduct.id)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Select$1,
        {
          label: "Variant",
          options: variantOptions,
          value: variantOptions.find((opt) => opt.value === selectedVariant),
          onChange: (opt) => {
            setSelectedVariant(opt == null ? void 0 : opt.value);
            const variant = selectedProduct.variants.nodes.find((v) => v.id === (opt == null ? void 0 : opt.value));
            if (variant == null ? void 0 : variant.price) {
              setPrice(parseFloat(variant.price));
              setSku(variant.sku);
            }
          }
        }
      ),
      /* @__PURE__ */ jsx(NumberInput, { label: "Quantity", value: quantity, onChange: setQuantity }),
      /* @__PURE__ */ jsxs(Flex, { direction: "col", children: [
        /* @__PURE__ */ jsxs(Box$1, { children: [
          /* @__PURE__ */ jsx(Text, { className: "font-semibold", children: "Price" }),
          /* @__PURE__ */ jsx(Text, { children: formatPrice(price, moneyWithCurrencyFormat) })
        ] }),
        /* @__PURE__ */ jsxs(Box$1, { children: [
          /* @__PURE__ */ jsx(Text, { className: "font-semibold", children: "Next Billing Date" }),
          /* @__PURE__ */ jsx(Text, { children: formatDate$1(nextBillingDate, false) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { justify: "end", className: "pt-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setStep(1), children: "Back" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "ml-2",
            onClick: handleSubmit,
            isLoading: submitFetcher.state !== "idle",
            loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
            children: "Save"
          }
        )
      ] })
    ] })
  ] }) });
};
const SubscriptionLineItems = () => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isEditOrderFrequencyModalOpen, setIsEditOrderFrequencyModalOpen] = useState(false);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
  const [isReactiveSubscriptionModalOpen, setIsReactiveSubscriptionModalOpen] = useState(false);
  const [isEditLineItemAttributesModalOpen, setIsEditLineItemAttributesModalOpen] = useState(false);
  const [isEditSubscriptionProductModalOpen, setIsEditSubscriptionProductModalOpen] = useState(false);
  const [isSwapProductModalOpen, setIsSwapProductModalOpen] = useState(false);
  const [subscriptionLine, setSubscriptionLine] = useState(void 0);
  if (!subscriptionContract) return null;
  const { nextBillingDate } = subscriptionContract;
  const otherActions = {
    setIsRescheduleModalOpen,
    setIsEditOrderFrequencyModalOpen,
    setIsCancelSubscriptionModalOpen,
    setIsReactiveSubscriptionModalOpen,
    setIsEditLineItemAttributesModalOpen,
    setSubscriptionLine,
    setIsEditSubscriptionProductModalOpen,
    setIsSwapProductModalOpen
  };
  const tableData = useMemo(
    () => {
      var _a2;
      return transformShopifyContractLines(
        ((_a2 = subscriptionContract == null ? void 0 : subscriptionContract.lines) == null ? void 0 : _a2.edges) || [],
        subscriptionContract,
        otherActions
      );
    },
    [subscriptionContract == null ? void 0 : subscriptionContract.lines]
  );
  const { table, setData } = useTanStackTable({
    tableData,
    columnConfig: lineColumns,
    options: {
      initialState: { pagination: { pageIndex: 0, pageSize: 20 } },
      enableColumnResizing: false
    }
  });
  useEffect(() => {
    setData(tableData);
  }, [tableData, setData]);
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full", children: [
    /* @__PURE__ */ jsx(MainTable, { table, variant: "classic" }),
    /* @__PURE__ */ jsx(
      RescheduleBillingModal,
      {
        modalState: isRescheduleModalOpen,
        setModalState: setIsRescheduleModalOpen,
        nextBillingDate
      }
    ),
    /* @__PURE__ */ jsx(
      EditOrderFrequencyModal,
      {
        modalState: isEditOrderFrequencyModalOpen,
        setModalState: setIsEditOrderFrequencyModalOpen,
        billingPolicy: subscriptionContract.billingPolicy
      }
    ),
    /* @__PURE__ */ jsx(
      CancelSubscriptionModal,
      {
        modalState: isCancelSubscriptionModalOpen,
        setModalState: setIsCancelSubscriptionModalOpen
      }
    ),
    /* @__PURE__ */ jsx(
      ReactiveSubscriptionModal,
      {
        modalState: isReactiveSubscriptionModalOpen,
        setModalState: setIsReactiveSubscriptionModalOpen
      }
    ),
    /* @__PURE__ */ jsx(
      EditLineItemAttributeModal,
      {
        modalState: isEditLineItemAttributesModalOpen,
        setModalState: setIsEditLineItemAttributesModalOpen,
        subscriptionLine
      }
    ),
    /* @__PURE__ */ jsx(
      EditSubscriptionProductModal,
      {
        modalState: isEditSubscriptionProductModalOpen,
        setModalState: setIsEditSubscriptionProductModalOpen,
        subscriptionLine
      }
    ),
    /* @__PURE__ */ jsx(
      SwapProductModal,
      {
        modalState: isSwapProductModalOpen,
        setModalState: setIsSwapProductModalOpen,
        subscriptionLine
      }
    )
  ] });
};
const transformShopifyContractLines = (lines, subscriptionContract, otherActions) => {
  const { nextBillingDate, deliveryPolicy, billingPolicy, shop, status, note } = subscriptionContract;
  return lines.map(({ node }) => ({
    id: node.id ?? null,
    title: node.title ?? "Untitled",
    variantTitle: node.variantTitle,
    quantity: node.quantity,
    lineDiscountedPrice: {
      amount: node.lineDiscountedPrice.amount,
      currencyCode: node.lineDiscountedPrice.currencyCode
    },
    variantImage: node.variantImage ? { url: node.variantImage.url } : void 0,
    nextBillingDate: formatDate$1(nextBillingDate, false),
    deliveryPolicyInterval: (deliveryPolicy == null ? void 0 : deliveryPolicy.interval) || "N/A",
    deliveryPolicyIntervalCount: (deliveryPolicy == null ? void 0 : deliveryPolicy.intervalCount) || 0,
    billingPolicyInterval: (billingPolicy == null ? void 0 : billingPolicy.interval) || "N/A",
    billingPolicyIntervalCount: (billingPolicy == null ? void 0 : billingPolicy.intervalCount) || 0,
    shop,
    status,
    otherActions,
    note,
    node
  }));
};
const SubscriptionDetails = () => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6", children: [
    /* @__PURE__ */ jsx(SubscriptionDetailsHeader, {}),
    /* @__PURE__ */ jsx(Box$1, { className: "text-sm text-gray-600 w-full", children: /* @__PURE__ */ jsx(SubscriptionLineItems, {}) })
  ] });
};
const OrdersActions = ({ OtherAactions, billingCycle }) => {
  const ACTIONS2 = [
    {
      icon: PiPencil,
      label: "Reschedule",
      setState: (value) => {
        OtherAactions.setIsRescheduleModalOpen(value);
        OtherAactions.setSelectedUpcommingOrders(billingCycle);
      }
    },
    {
      icon: FaBars,
      label: "Process now"
    }
  ];
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxs(Button, { as: "span", variant: "text", color: "primary", className: "text-primary font-bold text-sm", children: [
      "Actions ",
      /* @__PURE__ */ jsx(BsChevronDown, { className: "ml-2 w-5" })
    ] }) }),
    /* @__PURE__ */ jsx(Dropdown.Menu, { className: "min-w-[280px]", onClick: (e) => e.stopPropagation(), children: ACTIONS2.map((action2, index) => /* @__PURE__ */ jsx(
      DropdownActionItem,
      {
        icon: action2.icon,
        label: action2.label,
        onClick: () => action2.setState && action2.setState(true)
      },
      index
    )) })
  ] });
};
const OrderItem$1 = ({ node, moneyWithCurrencyFormat }) => {
  var _a2;
  const formattedPrice = formatPrice(node.lineDiscountedPrice.amount, moneyWithCurrencyFormat);
  return /* @__PURE__ */ jsxs(Box$1, { className: "w-full flex gap-4", children: [
    /* @__PURE__ */ jsx("img", { src: ((_a2 = node.variantImage) == null ? void 0 : _a2.url) || "", alt: node.title, className: "w-12 h-12 object-cover rounded-md" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm font-semibold", children: node.title }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm text-gray-400", children: node.variantTitle }),
      /* @__PURE__ */ jsxs(Text, { className: "text-sm text-gray-400", children: [
        "SKU: ",
        node.sku
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs(Text, { children: [
      node.quantity,
      " x ",
      formattedPrice
    ] }) })
  ] });
};
const ShippingDetails$1 = ({ address, displayName, addressId }) => {
  if (!address) return null;
  return /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted w-full p-3", children: [
    /* @__PURE__ */ jsxs(Title$1, { as: "h6", className: "text-md font-semibold mb-3", children: [
      "Shipping Address (ID #",
      addressId,
      ")"
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: displayName }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: address.address1 }),
      address.address2 && /* @__PURE__ */ jsx(Text, { className: "text-sm", children: address.address2 }),
      /* @__PURE__ */ jsxs(Text, { className: "text-sm", children: [
        address.city,
        ", ",
        address.province,
        ", ",
        address.country,
        " - ",
        address.zip
      ] })
    ] })
  ] });
};
const UpcommingOrderDetails = ({ details }) => {
  var _a2, _b, _c;
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const { sourceContract: { lines: { edges }, deliveryMethod, deliveryPrice, customer } } = details;
  const formatedDeliveryPrice = formatPrice((deliveryPrice == null ? void 0 : deliveryPrice.amount) || 0, moneyWithCurrencyFormat);
  const totalPrice = calculateTotalDiscountedPrice(details.sourceContract.lines);
  const formatedTotalPrice = formatPrice(totalPrice, moneyWithCurrencyFormat);
  const { displayName, addressesV2 } = customer;
  const address = (_b = (_a2 = addressesV2 == null ? void 0 : addressesV2.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node;
  const addressId = extractNumericId((address == null ? void 0 : address.id) || "");
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full", children: [
    /* @__PURE__ */ jsx(Flex, { className: "w-[70%]", direction: "col", children: /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted w-full p-3 mb-2", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold mb-3", children: "Summary" }),
      /* @__PURE__ */ jsxs(Flex, { direction: "col", children: [
        edges.map((edge, index) => /* @__PURE__ */ jsx(OrderItem$1, { node: edge.node, moneyWithCurrencyFormat }, index)),
        /* @__PURE__ */ jsx("hr", { className: "my-2 text-gray-800 w-full" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "Shipping" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: (_c = deliveryMethod == null ? void 0 : deliveryMethod.shippingOption) == null ? void 0 : _c.title }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formatedDeliveryPrice })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-2 text-gray-800 w-full" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm font-bold", children: "Total" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm font-bold", children: formatedTotalPrice })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Flex, { className: "w-[30%]", children: /* @__PURE__ */ jsx(ShippingDetails$1, { address, displayName, addressId }) })
  ] });
};
const UpCommingOrderItem = ({ billingCycle, OtherAactions }) => {
  const billingAttemptExpectedDateFormatted = formatDate$1(billingCycle.billingAttemptExpectedDate, false);
  return /* @__PURE__ */ jsxs(Accordion, { className: "border-b last-of-type:border-b-0", children: [
    /* @__PURE__ */ jsx(Accordion.Header, { children: ({ open }) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full cursor-pointer items-center justify-between py-2 text-xl font-semibold", children: [
      /* @__PURE__ */ jsx(
        FaChevronDown,
        {
          className: `h-3 w-3 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`
        }
      ),
      /* @__PURE__ */ jsxs(Flex, { justify: "between", align: "center", children: [
        /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: billingAttemptExpectedDateFormatted }) }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, color: "info" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "Queued" })
        ] }),
        /* @__PURE__ */ jsx(
          OrdersActions,
          {
            OtherAactions,
            billingCycle
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Accordion.Body, { children: /* @__PURE__ */ jsx(UpcommingOrderDetails, { details: billingCycle }) })
  ] });
};
const UpCommingOrdersListData = ({ OtherAactions }) => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) return null;
  const { edges } = subscriptionContract.subscriptionBillingCycles;
  const unbilledCycles = edges.filter((edge) => edge.node.status === "UNBILLED");
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: unbilledCycles.map((edge, index) => /* @__PURE__ */ jsx(
    UpCommingOrderItem,
    {
      billingCycle: edge.node,
      OtherAactions
    },
    index
  )) });
};
const AccordionHeader = ({ open, title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full cursor-pointer items-center py-2 text-xl font-semibold", children: [
    /* @__PURE__ */ jsx(
      FaChevronDown,
      {
        className: `h-5 w-5 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}`
      }
    ),
    title
  ] });
};
const RescheduleNextOrder = ({
  modalState,
  setModalState,
  selectedUpcommingOrder
}) => {
  console.log("selectedUpcommingOrder", selectedUpcommingOrder);
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    (selectedUpcommingOrder == null ? void 0 : selectedUpcommingOrder.billingAttemptExpectedDate) ? new Date(selectedUpcommingOrder == null ? void 0 : selectedUpcommingOrder.billingAttemptExpectedDate) : null
  );
  const canSave = selectedDate && selectedDate.toISOString() !== (selectedUpcommingOrder == null ? void 0 : selectedUpcommingOrder.billingAttemptExpectedDate);
  useEffect(() => {
    if (selectedUpcommingOrder == null ? void 0 : selectedUpcommingOrder.billingAttemptExpectedDate) {
      setSelectedDate(new Date(selectedUpcommingOrder.billingAttemptExpectedDate));
    }
  }, [selectedUpcommingOrder]);
  const handleSubmit = () => {
    if (!selectedDate) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("action", "rescheduleBillingCycleDate");
    formData.append("date", formatToUtcHour(selectedDate.toISOString()));
    if (selectedUpcommingOrder) {
      formData.append("oldDate", String(selectedUpcommingOrder.billingAttemptExpectedDate));
      formData.append("index", String(selectedUpcommingOrder.cycleIndex));
    }
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Billing date updated!");
        setModalState(false);
      } else {
        toast.error(((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error) || "Something went wrong");
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      containerClassName: "min-w-[500px] overflow-visible z-[999] relative",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Reschedule Next Billing" }),
          /* @__PURE__ */ jsx(ActionIcon, { size: "sm", variant: "text", onClick: () => setModalState(false), children: /* @__PURE__ */ jsx(FaXmark, { className: "h-auto w-6", strokeWidth: 1.8 }) })
        ] }),
        /* @__PURE__ */ jsxs(Flex, { className: "relative w-full", children: [
          /* @__PURE__ */ jsx(FaCalendar, { className: "absolute left-3 top-[37px] text-muted w-4 h-4" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              label: "Select Date & Time",
              type: "datetime-local",
              value: selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 6e4).toISOString().slice(0, 16) : "",
              onChange: (e) => setSelectedDate(new Date(e.target.value)),
              className: "pl-10 w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { justify: "end", gap: "1", className: "mt-8 space-x-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setModalState(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              color: "primary",
              onClick: handleSubmit,
              isLoading,
              loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
              disabled: !canSave || isLoading,
              children: "Save"
            }
          )
        ] })
      ] })
    }
  );
};
const UpCommingOrdersList = () => {
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedUpcommingOrder, setSelectedUpcommingOrders] = useState(null);
  const OtherAactions = {
    setIsRescheduleModalOpen,
    setSelectedUpcommingOrders
  };
  return /* @__PURE__ */ jsxs("div", { className: "my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6 p-3", children: [
    /* @__PURE__ */ jsxs(Accordion, { className: "border-b last-of-type:border-b-0", defaultOpen: true, children: [
      /* @__PURE__ */ jsx(Accordion.Header, { children: ({ open }) => /* @__PURE__ */ jsx(
        AccordionHeader,
        {
          open,
          title: "Upcoming Orders"
        }
      ) }),
      /* @__PURE__ */ jsx(Accordion.Body, { children: /* @__PURE__ */ jsx(
        UpCommingOrdersListData,
        {
          OtherAactions
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      RescheduleNextOrder,
      {
        modalState: isRescheduleModalOpen,
        setModalState: setIsRescheduleModalOpen,
        selectedUpcommingOrder
      }
    )
  ] });
};
const OrderItem = ({ node, moneyWithCurrencyFormat }) => {
  var _a2, _b, _c, _d, _e, _f;
  const formattedPrice = formatPrice(node.originalTotalSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  return /* @__PURE__ */ jsxs(Box$1, { className: "w-full flex gap-4", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: ((_b = (_a2 = node.variant) == null ? void 0 : _a2.image) == null ? void 0 : _b.url) || ((_f = (_e = (_d = (_c = node == null ? void 0 : node.product) == null ? void 0 : _c.featuredMedia) == null ? void 0 : _d.preview) == null ? void 0 : _e.image) == null ? void 0 : _f.url) || "",
        alt: node.title,
        className: "w-12 h-12 object-cover rounded-md"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm font-semibold", children: node.title }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm text-gray-400", children: node.variantTitle }),
      /* @__PURE__ */ jsxs(Text, { className: "text-sm text-gray-400", children: [
        "SKU: ",
        node.sku
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs(Text, { children: [
      node.quantity,
      " x ",
      formattedPrice
    ] }) })
  ] });
};
const ShippingDetails = ({ address, displayName, addressId, className = "rounded-[10px] border border-muted w-full p-3" }) => {
  if (!address) return null;
  return /* @__PURE__ */ jsxs(Box$1, { className, children: [
    /* @__PURE__ */ jsxs(Title$1, { as: "h6", className: "text-md font-semibold mb-3", children: [
      "Shipping Address (ID #",
      addressId,
      ")"
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: displayName }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: address.address1 }),
      address.address2 && /* @__PURE__ */ jsx(Text, { className: "text-sm", children: address.address2 }),
      /* @__PURE__ */ jsxs(Text, { className: "text-sm", children: [
        address.city,
        ", ",
        address.province,
        ", ",
        address.country,
        " - ",
        address.zip
      ] })
    ] })
  ] });
};
const RecentOrderDetails = ({ details }) => {
  var _a2, _b;
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const {
    lineItems: { edges },
    currentShippingPriceSet,
    currentSubtotalPriceSet,
    currentTotalPriceSet,
    currentTotalTaxSet,
    shippingLine,
    customer
  } = details;
  const formattedDeliveryPrice = formatPrice(currentShippingPriceSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  const formattedTotalPrice = formatPrice(currentTotalPriceSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  const formattedSubtotalPrice = formatPrice(currentSubtotalPriceSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  const formattedTotalTaxPrice = formatPrice(currentTotalTaxSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  const { displayName, addressesV2 } = customer;
  const address = (_b = (_a2 = addressesV2 == null ? void 0 : addressesV2.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node;
  const addressId = extractNumericId((address == null ? void 0 : address.id) || "");
  return /* @__PURE__ */ jsxs(Flex, { className: "w-full", children: [
    /* @__PURE__ */ jsx(Flex, { className: "w-[70%]", direction: "col", children: /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted w-full p-3 mb-2", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold mb-3", children: "Summary" }),
      /* @__PURE__ */ jsxs(Flex, { direction: "col", children: [
        edges.map((edge, index) => /* @__PURE__ */ jsx(OrderItem, { node: edge.node, moneyWithCurrencyFormat }, index)),
        /* @__PURE__ */ jsx("hr", { className: "my-2 text-gray-800 w-full" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "SubTotal" }),
          /* @__PURE__ */ jsxs(Text, { className: "text-sm", children: [
            edges.length,
            " items"
          ] }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formattedSubtotalPrice })
        ] }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "Taxes" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formattedTotalTaxPrice })
        ] }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "Shipping" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: shippingLine == null ? void 0 : shippingLine.title }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formattedDeliveryPrice })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-2 text-gray-800 w-full" }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-sm font-bold", children: "Total" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm font-bold", children: formattedTotalPrice })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Flex, { className: "w-[30%]", children: /* @__PURE__ */ jsx(ShippingDetails, { address, displayName, addressId }) })
  ] });
};
const RecentOrderItem = ({ billingAttempt, moneyWithCurrencyFormat }) => {
  const formattedDate = formatDate$1(billingAttempt.createdAt, false);
  const formattedTotalPrice = formatPrice(billingAttempt.order.currentTotalPriceSet.presentmentMoney.amount, moneyWithCurrencyFormat);
  const { order, errorCode, errorMessage } = billingAttempt;
  return /* @__PURE__ */ jsxs(Accordion, { className: "border-b last-of-type:border-b-0", children: [
    /* @__PURE__ */ jsx(Accordion.Header, { children: ({ open }) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full cursor-pointer items-center justify-between py-2 text-xl font-semibold", children: [
      /* @__PURE__ */ jsx(FaChevronDown, { className: `h-3 w-3 transform transition-transform duration-300 ${open ? "rotate-0" : "-rotate-90"}` }),
      /* @__PURE__ */ jsxs(Flex, { justify: "between", align: "center", children: [
        /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formattedDate }) }),
        /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaShopify, { className: "text-primary" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm text-primary", children: order.name })
        ] }),
        /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formattedTotalPrice }) }),
        errorCode == null ? /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, color: "success" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: "Success" })
        ] }) : /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, color: "danger" }),
          /* @__PURE__ */ jsx(Text, { className: "text-sm", children: errorMessage })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Accordion.Body, { className: "mt-3", children: /* @__PURE__ */ jsx(RecentOrderDetails, { details: order }) })
  ] });
};
const RecentOrdersListData = ({ billingAttempts }) => {
  const { edges } = billingAttempts;
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: edges.map((edge, index) => /* @__PURE__ */ jsx(RecentOrderItem, { billingAttempt: edge.node, moneyWithCurrencyFormat }, index)) });
};
const RecentOrdersList = () => {
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  const { orders, billingAttempts } = subscriptionContract || {};
  return /* @__PURE__ */ jsx("div", { className: "my-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted lg:gap-y-6 p-3", children: /* @__PURE__ */ jsxs(Accordion, { className: "border-b last-of-type:border-b-0", defaultOpen: true, children: [
    /* @__PURE__ */ jsx(Accordion.Header, { children: ({ open }) => /* @__PURE__ */ jsx(AccordionHeader, { open, title: "Billing Attempts" }) }),
    /* @__PURE__ */ jsx(Accordion.Body, { children: billingAttempts && /* @__PURE__ */ jsx(RecentOrdersListData, { billingAttempts }) })
  ] }) });
};
const AdditionalDetails = () => {
  var _a2, _b;
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  console.log("subscriptionContract", subscriptionContract);
  if (!subscriptionContract) return null;
  const { displayName, addressesV2 } = subscriptionContract.customer;
  const address = (_b = (_a2 = addressesV2 == null ? void 0 : addressesV2.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node;
  const addressId = extractNumericId((address == null ? void 0 : address.id) || "");
  const shippingAddress = subscriptionContract.deliveryMethod.address;
  return /* @__PURE__ */ jsxs(Flex, { direction: "col", children: [
    /* @__PURE__ */ jsxs(Flex, { gap: "0", className: "flex w-full cursor-pointer flex-col rounded-[10px] border border-muted", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4 mt-4", children: /* @__PURE__ */ jsx(CustomerDetails, { customer: subscriptionContract.customer }) }),
      /* @__PURE__ */ jsx("hr", { className: "w-full" }),
      /* @__PURE__ */ jsxs("div", { className: "px-4 mt-4", children: [
        /* @__PURE__ */ jsx(ShippingDetails, { address: shippingAddress, displayName: shippingAddress.name || "", addressId, className: "" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            as: "span",
            className: "text-[#2e3685] p-0 font-bold",
            variant: "text",
            children: "Edit Address"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "w-full" }),
      /* @__PURE__ */ jsx("div", { className: "px-4 w-full mt-4", children: /* @__PURE__ */ jsx(PaymentMethod, { customerPaymentMethod: subscriptionContract.customerPaymentMethod }) })
    ] }),
    /* @__PURE__ */ jsx(OtherDetails, {})
  ] });
};
const OtherDetails = () => {
  var _a2;
  const [subscriptionContract] = useAtom(subscriptionContractAtom);
  if (!subscriptionContract) return null;
  const { id, customer, lines, createdAt } = subscriptionContract;
  const { productId, variantId } = (_a2 = lines.edges[0]) == null ? void 0 : _a2.node;
  const subscriptionId = extractNumericId(id);
  const customerId = extractNumericId((customer == null ? void 0 : customer.id) || "");
  const productIdNumeric = extractNumericId(productId || "");
  const variantIdNumeric = extractNumericId(variantId || "");
  const formatedDate = formatDate$1(createdAt || "", false);
  return /* @__PURE__ */ jsxs(Flex, { gap: "3", className: "flex w-full cursor-pointer flex-col rounded-[10px] border border-muted p-4", children: [
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4]", children: "Subscription ID" }),
      /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm", children: [
        "#",
        subscriptionId,
        " ",
        /* @__PURE__ */ jsx(CopyToClipboard, { text: subscriptionId, className: "" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4]", children: "Customer ID" }),
      /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm", children: [
        "#",
        customerId,
        " ",
        /* @__PURE__ */ jsx(CopyToClipboard, { text: customerId, className: "" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4]", children: "Product ID" }),
      /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm", children: [
        "#",
        productIdNumeric,
        " ",
        /* @__PURE__ */ jsx(CopyToClipboard, { text: productIdNumeric, className: "" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4]", children: "Variant ID" }),
      /* @__PURE__ */ jsxs(Text, { className: "flex items-center gap-2 text-sm", children: [
        "#",
        variantIdNumeric,
        " ",
        /* @__PURE__ */ jsx(CopyToClipboard, { text: variantIdNumeric, className: "" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase text-[#848BD4]", children: "Created Date" }),
      /* @__PURE__ */ jsx(Text, { className: "flex items-center text-sm", children: formatedDate })
    ] })
  ] });
};
const PaymentMethod = ({
  customerPaymentMethod
}) => {
  const { instrument: { brand, lastDigits, expiryMonth, expiryYear } } = customerPaymentMethod;
  return /* @__PURE__ */ jsxs(Flex, { gap: "1", align: "start", direction: "col", children: [
    /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase", children: "Payment Method" }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(Text, { className: "capitalize", children: brand }),
      /* @__PURE__ */ jsxs(Text, { children: [
        "••••",
        lastDigits
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Text, { className: "text-sm", children: [
      "Expires ",
      expiryMonth,
      "/",
      expiryYear
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        as: "span",
        className: "text-[#2e3685] p-0 font-bold",
        variant: "text",
        children: "Update Payment Method"
      }
    )
  ] });
};
const CustomerDetails = ({
  customer
}) => {
  const { displayName, email } = customer;
  useState(false);
  return /* @__PURE__ */ jsxs(Flex, { direction: "col", gap: "1", children: [
    /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "text-md font-semibold uppercase", children: "Customer" }),
    /* @__PURE__ */ jsx(Text, { className: "text-primary", children: displayName }),
    /* @__PURE__ */ jsxs(Text, { className: "text-black", children: [
      email,
      /* @__PURE__ */ jsx(CopyToClipboard, { text: email, className: "mt-3" })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/", target: "_blank", className: "my-3", children: "View in Shopify" })
  ] });
};
const pageHeader$3 = {
  breadcrumb: [
    {
      href: routes$1.subscriptions.dashboard,
      name: "Subscriptions"
    },
    {
      name: "Edit"
    }
  ]
};
function SubscriptionEditMain() {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Subscription", breadcrumb: pageHeader$3.breadcrumb, children: /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-3 lg:mt-0", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: routes$1.products.products,
        className: "w-full lg:w-auto"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-x-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 lg:col-span-8 xl:col-span-9", children: [
        /* @__PURE__ */ jsx(SubscriptionTopBlock, {}),
        /* @__PURE__ */ jsx(SubscriptionDetails, {}),
        /* @__PURE__ */ jsx(UpCommingOrdersList, {}),
        /* @__PURE__ */ jsx(RecentOrdersList, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block", children: /* @__PURE__ */ jsx(AdditionalDetails, {}) })
    ] }) })
  ] });
}
const CUSTOMER_PAYMENT_METHOD_SEND_UPDATE_EMAIL = `#graphql 
mutation sendCustomerPaymentUpdateEmail($customerPaymentMethodId: ID!) {
  customerPaymentMethodSendUpdateEmail(customerPaymentMethodId: $customerPaymentMethodId) {
    customer {
      id
    }
    userErrors {
      field
      message
    }
  }
}

`;
const SUBSCRIPTION_BILLING_CYCLE_SCHEDULE_EDIT = `#graphql 
mutation subscriptionBillingCycleScheduleEdit(
    $billingCycleInput: SubscriptionBillingCycleInput!, 
    $input: SubscriptionBillingCycleScheduleEditInput!, 
) {
  subscriptionBillingCycleScheduleEdit(
    billingCycleInput: $billingCycleInput, 
    input: $input
) {
    billingCycle {
      cycleIndex
      billingAttemptExpectedDate
    }
    userErrors {
      field
      message
    }
  }
}

`;
const UPDATE_SUBSCRIPTION_CONTRACT = `#graphql 
mutation subscriptionContractUpdate($contractId: ID!) {
  subscriptionContractUpdate(contractId: $contractId) {
    draft {
        id
    }
    userErrors {
      field
      message
    }
  }
}

`;
const SUBSCRIPTION_DRAFT_COMMIT = `#graphql 
mutation subscriptionDraftCommit($draftId: ID!) {
  subscriptionDraftCommit(draftId: $draftId) {
    contract {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;
const SUBSCRIPTION_DRAFT_DISCOUNT_CODE_APPLY = `#graphql 
mutation subscriptionDraftDiscountCodeApply($draftId: ID!, $discountCode: String!) {
  subscriptionDraftDiscountCodeApply(draftId: $draftId, redeemCode: $discountCode) {
    appliedDiscount {
        id
        rejectionReason
    }
    draft {
     id
    }
    userErrors {
      field
      message
    }
  }
}
`;
const SUBSCRIPTION_DRAFT_DISCOUNT_CODE_REMOVE = `#graphql 
mutation subscriptionDraftDiscountRemove($discountId: ID!, $draftId: ID!) {
  subscriptionDraftDiscountRemove(discountId: $discountId, draftId: $draftId) {
    discountRemoved {
        ... on SubscriptionManualDiscount {
            id
        }
        ... on SubscriptionAppliedCodeDiscount {
            id
        }
    }
    draft {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;
const SUBSCRIPTION_DRAFT_LINE_UPDATE = `#graphql 
mutation subscriptionDraftLineUpdate($draftId: ID!, $input: SubscriptionLineUpdateInput!, $lineId: ID!) {
  subscriptionDraftLineUpdate(draftId: $draftId, input: $input, lineId: $lineId) {
    draft {
      id
    }
    lineUpdated {
        id
    }
    userErrors {
      field
      message
    }
  }
}
`;
const SUBSCRIPTION_DRAFT_UPDATE = `#graphql 
mutation subscriptionDraftUpdate($draftId: ID!, $input: SubscriptionDraftInput!) {
  subscriptionDraftUpdate(draftId: $draftId, input: $input) {
    draft {
      id
    }
    userErrors {
      field
      message
    }
  }
}

`;
const FEATURED_MEDIA_FRAGMENT = `#graphql
  fragment featuredMedia on Media {
    alt
    id
    preview{
        image{
            altText
            url(transform: {maxHeight: 100, maxWidth: 100})
        }
    }
  }
`;
const SELLING_PLANS_FRAGMENT = `#graphql
  fragment SellingPlans on SellingPlan {
    description
    id
    name
    options
    position
    category
    createdAt
    metafields(namespace: "billion-grid-app", first: 10) 
    {
      nodes{
        value
        key
      }
    }                    
    inventoryPolicy {
      reserve
    }
    pricingPolicies {
      ... on SellingPlanFixedPricingPolicy {
        __typename
        adjustmentType
        adjustmentValue {
          ... on MoneyV2 {
            __typename
            amount
            currencyCode
          }
          ... on SellingPlanPricingPolicyPercentageValue {
            __typename
            percentage
          }
        }
      }
    }
    billingPolicy {
      ... on SellingPlanFixedBillingPolicy {
        remainingBalanceChargeExactTime
        remainingBalanceChargeTimeAfterCheckout
        checkoutCharge {
          type
          value {
            ... on MoneyV2 {
              __typename
              amount
              currencyCode
            }
            ... on SellingPlanCheckoutChargePercentageValue {
              __typename
              percentage
            }
          }
        }
        remainingBalanceChargeTrigger
      }
      ... on SellingPlanRecurringBillingPolicy {
        maxCycles
        minCycles
        anchors {
          cutoffDay
          day
          month
          type
        }
        createdAt
        interval
        intervalCount
      }
    }
    deliveryPolicy {
      ... on SellingPlanFixedDeliveryPolicy {
        cutoff
        fulfillmentExactTime
        anchors {
          cutoffDay
          day
          month
          type
        }
        fulfillmentTrigger
        intent
        preAnchorBehavior
      }
      ... on SellingPlanRecurringDeliveryPolicy {
        cutoff
        intent
        createdAt
        anchors {
          cutoffDay
          month
          day
          type
        }
        interval
        intervalCount
        preAnchorBehavior
      }
    }
  }
`;
const SELLING_PLAN_GROUP_FRAGMENT = `#graphql
  ${SELLING_PLANS_FRAGMENT}
  fragment sellingPlanGroup on SellingPlanGroup {
    appId
    createdAt
    id
    merchantCode
    name
    options
    position
    sellingPlans(first: 10) {
      edges{
          cursor
          node{
              ...SellingPlans
          }
      }
    }
  }
`;
const SEELING_PLAN_GROUPS_COUNT = `#graphql
  fragment sellingPlanGroupsCount on Count {
    count
    precision
  }
`;
const PRODUCT_LISTING_SINGLE_NODE_FRAGMENT = `#graphql
  ${SEELING_PLAN_GROUPS_COUNT}
  ${FEATURED_MEDIA_FRAGMENT}
  ${SELLING_PLAN_GROUP_FRAGMENT}
  fragment ProductNode on Product {
    id
    title
    descriptionHtml
    createdAt
    handle
    requiresSellingPlan
    status
    priceRangeV2{
      maxVariantPrice{
        amount
        currencyCode
      }
      minVariantPrice{
        amount
        currencyCode
      }
    }
    sellingPlanGroupsCount {
        ...sellingPlanGroupsCount
    }
    sellingPlanGroups(first: 3) {
      edges {
            cursor
            node {
              ...sellingPlanGroup
            }
      }
    }
    featuredMedia{
      ...featuredMedia
    }
    variantsCount{
      count
      precision
    }
    onlineStorePreviewUrl
    variants(first: 10){
      nodes{
       id
       sku
       title
       price
      }
    }
  }
`;
const PAGE_INFO_FRAGMENT = `#graphql
  fragment PageInfo on PageInfo {
    hasPreviousPage
    hasNextPage
    endCursor
    startCursor
  }
`;
const PRODUCTS_QUERY = `#graphql
 ${PAGE_INFO_FRAGMENT}
 ${PRODUCT_LISTING_SINGLE_NODE_FRAGMENT}
query products(
    $first: Int
    $after: String
    $before: String
    $last: Int
    $query: String
    $reverse: Boolean
    $savedSearchId: ID
    $sortKey: ProductSortKeys
) {
    products(
        first: $first
        after: $after
        before: $before
        last: $last
        query: $query
        reverse: $reverse
        savedSearchId: $savedSearchId
        sortKey: $sortKey
    ) {
        edges {
            cursor
            node {
               ...ProductNode
            }
        }
        pageInfo {
          ...PageInfo
        }
    }
}`;
const PRODUCT_VARIANTNODE_FRAGMENT = `#graphql
    fragment ProductVariantNode on ProductVariant {
        id
        title
        createdAt
        availableForSale
        sku
        price
        sellingPlanGroupsCount{
            count
            precision
        }
        image{
            id
            url(transform: {maxHeight: 100, maxWidth: 100})
        }
        sellingPlanGroups(first: 3) {
            edges{
                cursor
                node{
                    appId
                    id
                    name
                    options
                    position
                    sellingPlans(first: 20){
                        edges{
                            cursor
                            node{
                                id
                                name
                                options
                                position
                                metafields(first: 2, namespace: "billion-grid-app"){
                                    nodes{
                                        value
                                        key
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
`;
const PRODUCT_SINGLE_NODE_FRAGMENT = `#graphql
  ${SEELING_PLAN_GROUPS_COUNT}
  ${FEATURED_MEDIA_FRAGMENT}
  ${SELLING_PLAN_GROUP_FRAGMENT}
  ${PRODUCT_VARIANTNODE_FRAGMENT}
  fragment ProductNode on Product {
    id
    title
    descriptionHtml
    createdAt
    updatedAt
    handle
    requiresSellingPlan
    status
    sellingPlanGroupsCount {
        ...sellingPlanGroupsCount
    }
    sellingPlanGroups(first: 20) {
      edges {
            cursor
            node {
              ...sellingPlanGroup
            }
      }
    }
    featuredMedia{
      ...featuredMedia
    }
    variantsCount{
      count
      precision
    }
    onlineStorePreviewUrl
    variants(first: 100){
      nodes{
        ...ProductVariantNode
      }
    }
  }
`;
const PRODUCT_SINGLE_QUERY = `#graphql
 ${PRODUCT_SINGLE_NODE_FRAGMENT}
query product(
    $id: ID!
) {
    product(
        id: $id
    ) {
        ...ProductNode
    }
}`;
const handleUpdateAddress = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const addressString = formData.get("address");
  if (!addressString) {
    return json({ success: false, error: "Address data missing" });
  }
  const address = JSON.parse(addressString);
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateAddressVariables(subscriptionDraftId, address),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
async function performSubscriptionDraftUpdate(subscriptionId, admin, updateCallback) {
  try {
    const contractGraphqlId = generateGraphQLId(
      parseInt(subscriptionId),
      ShopifyObjectType.SubscriptionContract
    );
    const draftResult = await executeMutationWithErrors(
      UPDATE_SUBSCRIPTION_CONTRACT,
      admin,
      generateUpdateContractVarible(contractGraphqlId),
      "subscriptionContractUpdate"
    );
    const subscriptionDraftId = draftResult.draft.id;
    await updateCallback(subscriptionDraftId);
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_COMMIT,
      admin,
      generateSubscriptionDraftCommitVariables(subscriptionDraftId),
      "subscriptionDraftCommit"
    );
    return { success: true };
  } catch (error) {
    console.error("performSubscriptionDraftUpdate error:", error);
    return { success: false, error: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
  }
}
async function executeMutationWithErrors(mutation, admin, variables, dataKey, returnData = false) {
  var _a2, _b, _c;
  const result = await createPlanAPIUtils.executeShopifyMutation(mutation, admin, variables);
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2[dataKey]) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    const errorMessage = userErrors.map((err) => {
      var _a3;
      if ((_a3 = err.field) == null ? void 0 : _a3.length) {
        return `${err.message}`;
      }
      return err.message;
    }).join("\n");
    throw new Error(`Failed: ${errorMessage}`);
  }
  if (returnData) {
    return result.data;
  } else return (_c = result.data) == null ? void 0 : _c[dataKey];
}
const generateSubscriptionDraftCommitVariables = (draftId) => {
  return {
    variables: {
      draftId
    }
  };
};
const generateUpdateAddressVariables = (draftId, address) => {
  const { id, name, ...rest } = address;
  return {
    variables: {
      draftId,
      input: {
        deliveryMethod: {
          shipping: {
            address: {
              ...rest
            }
          }
        }
      }
    }
  };
};
const generateUpdateContractVarible = (contractId) => {
  return {
    variables: {
      contractId
    }
  };
};
const handleUpdateAttributes = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const attributesString = formData.get("attributes");
  if (!attributesString) {
    return json({ success: false, error: "Attributes data missing" });
  }
  const customAttributes = JSON.parse(attributesString);
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateAttributesVariables(subscriptionDraftId, customAttributes),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleUpdateOrderNote = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const note = formData.get("orderNote");
  if (!note) {
    return json({ success: false, error: "note data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateOrderNoteVariables(subscriptionDraftId, note),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleUpdateDiscount = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const discountCode = formData.get("discountCode");
  if (!discountCode) {
    return json({ success: false, error: "Discount code data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_DISCOUNT_CODE_APPLY,
      admin,
      generateUpdateDiscountVariables(subscriptionDraftId, discountCode),
      "subscriptionDraftUpdate"
    );
  });
  console.log(result);
  return json(result);
};
const handleRemoveDiscount = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const discountId = formData.get("discountId");
  if (!discountId) {
    return json({ success: false, error: "Discount Id data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_DISCOUNT_CODE_REMOVE,
      admin,
      generateRemoveDiscountVariables(subscriptionDraftId, discountId),
      "subscriptionDraftUpdate"
    );
  });
  console.log(result);
  return json(result);
};
const generateRemoveDiscountVariables = (draftId, discountId) => {
  const variables = {
    variables: {
      discountId,
      draftId
    }
  };
  console.log("variables", variables);
  return variables;
};
const generateUpdateDiscountVariables = (draftId, discountCode) => {
  return {
    variables: {
      draftId,
      discountCode
    }
  };
};
const handleUpdatePaymentMethod = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const paymentMethodId = formData.get("paymentMethodId");
  if (!paymentMethodId) {
    return json({ success: false, error: "note data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdatePaymentMethodVariables(subscriptionDraftId, paymentMethodId),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const generateUpdatePaymentMethodVariables = (draftId, paymentMethodId) => {
  return {
    variables: {
      draftId,
      input: {
        paymentMethodId
      }
    }
  };
};
const generateUpdateOrderNoteVariables = (draftId, note) => {
  return {
    variables: {
      draftId,
      input: {
        note
      }
    }
  };
};
const generateUpdateAttributesVariables = (draftId, customAttributes) => {
  return {
    variables: {
      draftId,
      input: {
        customAttributes
      }
    }
  };
};
const handleRescheduleNextOrderDate = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const nextBillingDate = formData.get("nextBillingDate");
  if (!nextBillingDate) {
    return json({ success: false, error: "nextBillingDate data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateNextBillingDateVariables(subscriptionDraftId, nextBillingDate),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleUpdateOrderFrequency = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const intervalCount = formData.get("intervalCount");
  const interval = formData.get("interval");
  if (!intervalCount || !interval) {
    return json({ success: false, error: "Some data missing" });
  }
  const billingPolicy = {
    intervalCount: Number(intervalCount),
    interval
  };
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateNextOrderFrequencyVariables(subscriptionDraftId, billingPolicy),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleUpdateStatus = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const status = formData.get("status");
  const note = formData.get("reason");
  if (!status && !note) {
    return json({ success: false, error: "Status data missing" });
  }
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_UPDATE,
      admin,
      generateUpdateStatusVariables(subscriptionDraftId, status, note),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleUpdateItemAttribute = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const lineId = formData.get("lineId");
  const attributesString = formData.get("attributes");
  if (!lineId && !attributesString) {
    return json({ success: false, error: "Line Id or Attributes data missing" });
  }
  const customAttributes = JSON.parse(attributesString);
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_LINE_UPDATE,
      admin,
      generateUpdateItemAttributeVariables(subscriptionDraftId, lineId, customAttributes),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const generateUpdateItemAttributeVariables = (draftId, lineId, customAttributes) => {
  const variables = {
    variables: {
      draftId,
      lineId,
      input: {
        customAttributes
      }
    }
  };
  console.log("generateUpdateItemAttributeVariables", JSON.stringify(variables));
  return variables;
};
const generateUpdateStatusVariables = (draftId, status, note) => {
  return {
    variables: {
      draftId,
      input: {
        status,
        note
      }
    }
  };
};
const generateUpdateNextOrderFrequencyVariables = (draftId, billingPolicy) => {
  const deliveryPolicy = billingPolicy;
  const variables = {
    variables: {
      draftId,
      input: {
        billingPolicy,
        deliveryPolicy
      }
    }
  };
  console.log("variables", JSON.stringify(variables));
  return variables;
};
const generateUpdateNextBillingDateVariables = (draftId, nextBillingDate) => {
  return {
    variables: {
      draftId,
      input: {
        nextBillingDate
      }
    }
  };
};
const handleUpdatePaymentMethodEmailSend = async (admin, formData) => {
  var _a2, _b, _c;
  const customerPaymentMethodId = formData.get("paymentMethodId");
  if (!customerPaymentMethodId) {
    return json({ success: false, error: "Payment method ID missing" });
  }
  const sendEmailMutation = CUSTOMER_PAYMENT_METHOD_SEND_UPDATE_EMAIL;
  const variables = generateUpdatePaymentMethodEmailSendVariables(customerPaymentMethodId);
  const result = await executeMutationWithErrors(sendEmailMutation, admin, variables, "");
  if (((_c = (_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.customerPaymentMethodSendUpdateEmail) == null ? void 0 : _b.userErrors) == null ? void 0 : _c.length) > 0) {
    return json({ success: false, error: "Failed to update payment method" });
  }
  return json({ success: true });
};
const generateUpdatePaymentMethodEmailSendVariables = (customerPaymentMethodId) => {
  return {
    variables: {
      customerPaymentMethodId
    }
  };
};
const handleGetProductData = async (admin, formData) => {
  const productId = formData.get("productId");
  if (!productId) {
    return json({ success: false, error: "Product ID missing" });
  }
  const gerProductQuery = PRODUCT_SINGLE_QUERY;
  const variables = generateGetProductVariables(productId);
  const result = await executeMutationWithErrors(gerProductQuery, admin, variables, "product", true);
  console.log("result here", result);
  return json({ success: true, product: result == null ? void 0 : result.product });
};
const generateGetProductVariables = (id) => {
  return {
    variables: {
      id
    }
  };
};
const handleSubscriptionLineUpdate = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const updatedLineString = formData.get("updatedLine");
  if (!updatedLineString) {
    return json({ success: false, error: "Line Id or Attributes data missing" });
  }
  const updatedLine = JSON.parse(updatedLineString);
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_LINE_UPDATE,
      admin,
      generateUpdateSubscritptionLine(subscriptionDraftId, updatedLine),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const handleSubscriptionLineProductUpdate = async (admin, formData, params) => {
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const updatedLineString = formData.get("updatedLine");
  if (!updatedLineString) {
    return json({ success: false, error: "Line Id or Attributes data missing" });
  }
  const updatedLine = JSON.parse(updatedLineString);
  const result = await performSubscriptionDraftUpdate(subscriptionId, admin, async (subscriptionDraftId) => {
    await executeMutationWithErrors(
      SUBSCRIPTION_DRAFT_LINE_UPDATE,
      admin,
      generateUpdateSubscritptionLineProuct(subscriptionDraftId, updatedLine),
      "subscriptionDraftUpdate"
    );
  });
  return json(result);
};
const generateUpdateSubscritptionLineProuct = (draftId, updatedLine) => {
  const { id, quantity, variantId } = updatedLine;
  const variables = {
    variables: {
      draftId,
      lineId: id,
      input: {
        quantity,
        productVariantId: variantId
      }
    }
  };
  return variables;
};
const generateUpdateSubscritptionLine = (draftId, updatedLine) => {
  const { id, quantity, variantId, lineDiscountedPrice: { amount } } = updatedLine;
  const variables = {
    variables: {
      draftId,
      lineId: id,
      input: {
        currentPrice: amount,
        quantity,
        productVariantId: variantId
      }
    }
  };
  return variables;
};
const handleGetProducts = async (admin, formData, params) => {
  var _a2, _b;
  const cursor = ((_a2 = formData.get("cursor")) == null ? void 0 : _a2.toString()) || "";
  const query = ((_b = formData.get("query")) == null ? void 0 : _b.toString()) || null;
  const gerProductQuery = PRODUCTS_QUERY;
  const variables = generateFetchProductVariables(query, cursor);
  const result = await executeMutationWithErrors(gerProductQuery, admin, variables, "product", true);
  return json({ success: true, products: result == null ? void 0 : result.products });
};
const generateFetchProductVariables = (query = "status:ACTIVE", cursor = "") => {
  const variables = {
    first: 10,
    ...typeof query === "string" && { query },
    ...cursor && { after: cursor }
  };
  return { variables };
};
const handleRescheduleBillingCycleDate = async (admin, formData, params) => {
  var _a2, _b;
  const subscriptionId = params.subscriptionId;
  if (!subscriptionId) {
    return json({ success: false, error: "Subscription ID missing" });
  }
  const index = formData.get("index");
  const date = formData.get("date");
  if (!date || !index) {
    return json({ success: false, error: "Date or Index missing" });
  }
  const variables = generateBillingCycleEditVariables(
    subscriptionId,
    index
  );
  const result = await executeMutationWithErrors(SUBSCRIPTION_BILLING_CYCLE_SCHEDULE_EDIT, admin, variables, "product", true);
  console.log("result handleRescheduleBillingCycleDate1", JSON.stringify(result));
  if (((_b = (_a2 = result == null ? void 0 : result.subscriptionBillingCycleScheduleEdit) == null ? void 0 : _a2.userErrors) == null ? void 0 : _b.length) > 0) {
    const errorMessages = result.subscriptionBillingCycleScheduleEdit.userErrors.map((err) => err.message).join(" | ");
    return json({ success: false, error: errorMessages });
  }
  return json({ success: true });
};
const generateBillingCycleEditVariables = (contractId, index, date, reason = SubscriptionBillingCycleScheduleEditInputScheduleEditReason.MERCHANT_INITIATED) => {
  const contractGraphqlId = generateGraphQLId(
    parseInt(contractId),
    ShopifyObjectType.SubscriptionContract
  );
  const variables = {
    variables: {
      billingCycleInput: {
        contractId: contractGraphqlId,
        selector: {
          index: parseInt(index)
        }
      },
      input: {
        billingDate: "2025-04-15T00:00:00Z",
        reason,
        skip: false
      }
    }
  };
  console.log("generateBillingCycleEditVariables", JSON.stringify(variables));
  return variables;
};
const updateSubscriptionUtils = {
  handleUpdateAddress,
  handleUpdateAttributes,
  handleUpdateOrderNote,
  handleUpdatePaymentMethodEmailSend,
  handleUpdatePaymentMethod,
  handleUpdateDiscount,
  handleRemoveDiscount,
  handleRescheduleNextOrderDate,
  handleUpdateOrderFrequency,
  handleUpdateStatus,
  handleUpdateItemAttribute,
  handleGetProductData,
  handleSubscriptionLineUpdate,
  handleGetProducts,
  handleSubscriptionLineProductUpdate,
  handleRescheduleBillingCycleDate
};
const loader$c = async ({
  request,
  params
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  const response = await authenticate.admin(updatedRequest);
  const { subscriptionId } = params;
  if (!response || !response.admin || !subscriptionId) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData$3(admin, parseInt(subscriptionId));
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    subscriptionContract: criticalData.subscriptionContract
  };
};
const loadCriticalData$3 = async (admin, subscriptionContractId) => {
  try {
    const variables = generateVariables$1(subscriptionContractId);
    const billingCycleVariables = generateBillingCycleVariables(subscriptionContractId);
    const [
      subscriptionContractResponse,
      appResponse,
      shopResponse,
      subscriptionBillingCyclesResponse
    ] = await Promise.all([
      admin.graphql(SUBSCRIPTION_CONTRACT_QUERY, variables),
      admin.graphql(CURRENT_APP_INSTALLATION),
      admin.graphql(CURRENT_SHOP),
      admin.graphql(SUBSCRIPTION_BILLING_CYCLES_QUERY, billingCycleVariables)
    ]);
    const [
      { data: { subscriptionContract } },
      { data: { currentAppInstallation } },
      { data: { shop } },
      { data: { subscriptionBillingCycles } }
    ] = await Promise.all([
      subscriptionContractResponse.json(),
      appResponse.json(),
      shopResponse.json(),
      subscriptionBillingCyclesResponse.json()
    ]);
    return { subscriptionContract: { ...subscriptionContract, currentAppInstallation, shop, subscriptionBillingCycles } };
  } catch (error) {
    console.error("Error loading critical data:", error);
    throw new Error("Failed to load critical subscriptionContractId data");
  }
};
const generateBillingCycleVariables = (subscriptionContractId) => {
  const graphqlProductId = generateGraphQLId(
    subscriptionContractId,
    ShopifyObjectType.SubscriptionContract
  );
  const currentIsoDate = (/* @__PURE__ */ new Date()).toISOString();
  const oneMonthLater = new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() + 1)).toISOString();
  return {
    variables: {
      subscriptionContractId: graphqlProductId,
      billingCyclesDateRangeSelector: {
        startDate: currentIsoDate,
        endDate: oneMonthLater
      }
    }
  };
};
const generateVariables$1 = (subscriptionContractId) => {
  const graphqlProductId = generateGraphQLId(
    subscriptionContractId,
    ShopifyObjectType.SubscriptionContract
  );
  return {
    variables: {
      subscriptionContractId: graphqlProductId
    }
  };
};
async function action$5({
  request,
  params
}) {
  var _a2;
  if (request.method !== "POST") {
    return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
  }
  try {
    const admin = await createPlanAPIUtils.authenticateRequest(request);
    if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    const formData = await request.formData();
    const action2 = (_a2 = formData.get("action")) == null ? void 0 : _a2.toString();
    if (!action2) return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
    let response;
    switch (action2) {
      case "updateAddress":
        response = await updateSubscriptionUtils.handleUpdateAddress(admin, formData, params);
        break;
      case "updateAttribute":
        response = await updateSubscriptionUtils.handleUpdateAttributes(admin, formData, params);
        break;
      case "updateOrderNote":
        response = await updateSubscriptionUtils.handleUpdateOrderNote(admin, formData, params);
        break;
      case "sendUpdatePaymentMethodEmail":
        response = await updateSubscriptionUtils.handleUpdatePaymentMethodEmailSend(admin, formData);
        break;
      case "updatePaymentMethod":
        response = await updateSubscriptionUtils.handleUpdatePaymentMethod(admin, formData, params);
        break;
      case "updateDiscount":
        response = await updateSubscriptionUtils.handleUpdateDiscount(admin, formData, params);
        break;
      case "removeDiscount":
        response = await updateSubscriptionUtils.handleRemoveDiscount(admin, formData, params);
        break;
      case "rescheduleBillingDate":
        response = await updateSubscriptionUtils.handleRescheduleNextOrderDate(admin, formData, params);
        break;
      case "updateOrderFrequency":
        response = await updateSubscriptionUtils.handleUpdateOrderFrequency(admin, formData, params);
        break;
      case "updateStatus":
        response = await updateSubscriptionUtils.handleUpdateStatus(admin, formData, params);
        break;
      case "updateLineItemAttribute":
        response = await updateSubscriptionUtils.handleUpdateItemAttribute(admin, formData, params);
        break;
      case "getProductData":
        response = await updateSubscriptionUtils.handleGetProductData(admin, formData);
        break;
      case "subscriptionLineUpdate":
        response = await updateSubscriptionUtils.handleSubscriptionLineUpdate(admin, formData, params);
        break;
      case "subscriptionLineProductUpdate":
        response = await updateSubscriptionUtils.handleSubscriptionLineProductUpdate(admin, formData, params);
        break;
      case "getProducts":
        response = await updateSubscriptionUtils.handleGetProducts(admin, formData, params);
        break;
      case "rescheduleBillingCycleDate":
        response = await updateSubscriptionUtils.handleRescheduleBillingCycleDate(admin, formData, params);
        break;
      default:
        response = json({ error: ERROR_MESSAGES.ACTION_NOT_FOUND }, { status: 500 });
        break;
    }
    console.log("response>>>>action", response);
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}
const SubscriptionSingle = () => {
  const { apiKey, subscriptionContract } = useLoaderData();
  const [, setShopObject] = useAtom(shopObject);
  const [, setSubscriptionContract] = useAtom(subscriptionContractAtom);
  useEffect(() => {
    if (subscriptionContract) {
      setShopObject(subscriptionContract.shop);
      setSubscriptionContract(subscriptionContract);
    }
  }, [subscriptionContract]);
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(SubscriptionEditMain, {});
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: SubscriptionSingle,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
function CustomDropdown({
  label,
  options: options2,
  onSelect,
  renderOption,
  variant = "outline",
  menuClassName
}) {
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx(Button, { as: "span", variant, children: label }) }),
    /* @__PURE__ */ jsx(Dropdown.Menu, { className: menuClassName, children: options2.map((option) => /* @__PURE__ */ jsx(Dropdown.Item, { onClick: () => onSelect(option.value), children: renderOption ? renderOption(option.value) : option.label }, String(option.value))) })
  ] });
}
var ConfigureSettings$1 = /* @__PURE__ */ ((ConfigureSettings2) => {
  ConfigureSettings2["MANAGE_PLANS"] = "manage_plans";
  ConfigureSettings2["MANAGE_VARIANTS_PLANS"] = "manage_variants_plans";
  return ConfigureSettings2;
})(ConfigureSettings$1 || {});
const ConfigureSettingsLabels$1 = {
  [
    "manage_plans"
    /* MANAGE_PLANS */
  ]: "Manage Plans",
  [
    "manage_variants_plans"
    /* MANAGE_VARIANTS_PLANS */
  ]: "Manage Variants Plans"
};
const ConfigureSettingsOptions$1 = Object.values(ConfigureSettings$1).map((status) => ({
  value: status,
  label: ConfigureSettingsLabels$1[status]
  // Use readable labels
}));
function ProductDetails({ productResponse }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 lg:gap-y-6 sm:p-[30px]", children: [
    /* @__PURE__ */ jsx(ProductDetailsHeader, { productResponse }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(ProductInformation, { productResponse })
  ] });
}
const ProductInformation = ({ productResponse }) => {
  var _a2, _b, _c;
  const { title, descriptionHtml, variants: { nodes } } = productResponse;
  return /* @__PURE__ */ jsxs(Flex, { direction: "col", children: [
    /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("img", { src: ((_c = (_b = (_a2 = productResponse.featuredMedia) == null ? void 0 : _a2.preview) == null ? void 0 : _b.image) == null ? void 0 : _c.url) || "", alt: title }),
      /* @__PURE__ */ jsx(Box$1, { children: /* @__PURE__ */ jsxs(Link, { to: `/merchant/products/${productResponse.id}`, children: [
        /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-base font-medium xl:text-lg", children: title }),
        /* @__PURE__ */ jsx("div", { className: "text-sm", dangerouslySetInnerHTML: { __html: descriptionHtml } })
      ] }) })
    ] }),
    nodes.length && /* @__PURE__ */ jsx(ProductVariantBlock, { productResponse })
  ] });
};
const ProductDetailsHeader = ({ productResponse }) => {
  return /* @__PURE__ */ jsx(Flex, { justify: "between", align: "center", direction: "col", children: /* @__PURE__ */ jsxs("div", { className: "w-full flex", children: [
    /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5",
            "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
          ),
          children: /* @__PURE__ */ jsx(PiArchiveThin, {})
        }
      ),
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-base font-medium xl:text-lg", children: messages.products.productDetails.title })
    ] }),
    /* @__PURE__ */ jsx(
      CustomDropdown,
      {
        label: "Configure",
        options: ConfigureSettingsOptions$1,
        onSelect: handleSelect,
        renderOption: renderConfigureOption$1,
        variant: "solid",
        menuClassName: "min-w-max whitespace-nowrap"
      }
    )
  ] }) });
};
const handleSelect = (value) => {
  console.log("Selected:", value);
};
function renderConfigureOption$1(value) {
  var _a2;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    value === "manage_plans" ? /* @__PURE__ */ jsx(PiPencil, {}) : /* @__PURE__ */ jsx(PiGear, {}),
    /* @__PURE__ */ jsx("span", { className: "ml-2", children: (_a2 = ConfigureSettingsOptions$1.find((opt) => opt.value === value)) == null ? void 0 : _a2.label })
  ] });
}
const ProductVariantBlock = ({ productResponse }) => {
  const { variants: { nodes } } = productResponse;
  return /* @__PURE__ */ jsxs(
    Accordion,
    {
      className: "border-b last-of-type:border-b-0",
      children: [
        /* @__PURE__ */ jsx(Accordion.Header, { className: "items-start", children: ({ open }) => /* @__PURE__ */ jsxs("div", { className: "flex cursor-pointer items-center pb-3 text-md font-semibold", children: [
          "Variants",
          /* @__PURE__ */ jsx(
            BsChevronDown,
            {
              className: cn(
                "h-4 w-4 -rotate-90 transform transition-transform duration-300 ms-2",
                open && "-rotate-0"
              )
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(Accordion.Body, { className: "mb-7", children: nodes.map((variant) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(VariantDetailColumns, { variant }) }, variant.id)) })
      ]
    }
  );
};
const getSellingPlanGroup = (sellingPlanGroups, planGroupName) => {
  for (const group of sellingPlanGroups) {
    if (group.node.merchantCode === planGroupName) {
      return group.node;
    }
  }
  return null;
};
const processOneTimeGroup = (sellingPlanGroup) => {
  var _a2;
  const sellingPlan = (_a2 = sellingPlanGroup.sellingPlans.edges[0]) == null ? void 0 : _a2.node;
  return {
    enable: !!sellingPlan,
    planName: (sellingPlan == null ? void 0 : sellingPlan.name) || "",
    groupId: sellingPlanGroup == null ? void 0 : sellingPlanGroup.id,
    sellingPlanId: sellingPlan == null ? void 0 : sellingPlan.id,
    // Combine all policy processors
    ...processPricingPolicy(sellingPlan),
    ...processInventoryPolicy(sellingPlan),
    ...processDeliveryPolicy(sellingPlan),
    ...processBillingPolicy(sellingPlan)
  };
};
const processPricingPolicy = (sellingPlan) => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
  return {
    pricingPolicyEnable: !!((_a2 = sellingPlan == null ? void 0 : sellingPlan.pricingPolicies) == null ? void 0 : _a2.length),
    pricingPolicyAdjustmentType: ((_c = (_b = sellingPlan == null ? void 0 : sellingPlan.pricingPolicies) == null ? void 0 : _b[0]) == null ? void 0 : _c.adjustmentType) || "FIXED_AMOUNT",
    pricingPolicyAdjustmentValue: ((_f = (_e = (_d = sellingPlan == null ? void 0 : sellingPlan.pricingPolicies) == null ? void 0 : _d[0]) == null ? void 0 : _e.adjustmentValue) == null ? void 0 : _f.percentage) || ((_i = (_h = (_g = sellingPlan == null ? void 0 : sellingPlan.pricingPolicies) == null ? void 0 : _g[0]) == null ? void 0 : _h.adjustmentValue) == null ? void 0 : _i.amount)
  };
};
const processInventoryPolicy = (sellingPlan) => {
  var _a2;
  return {
    inventoryPolicyEnable: !!(sellingPlan == null ? void 0 : sellingPlan.inventoryPolicy),
    inventoryPolicyReserve: ((_a2 = sellingPlan == null ? void 0 : sellingPlan.inventoryPolicy) == null ? void 0 : _a2.reserve) || "ON_FULFILLMENT"
  };
};
const processDeliveryPolicy = (sellingPlan) => {
  var _a2, _b, _c, _d, _e, _f, _g;
  return {
    deliveryPolicyEnable: !!(sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy),
    deliveryPolicyAnchorsCutoffDay: ((_a2 = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _a2.cutoff) || 0,
    deliveryPolicyAnchorsDay: 1,
    deliveryPolicyAnchorsMonth: 1,
    deliveryPolicyAnchorsType: "MONTHDAY",
    deliveryPolicyCutoff: ((_b = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _b.cutoff) || 0,
    deliveryPolicyFulfillmentExactTime: ((_c = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _c.fulfillmentExactTime) || null,
    deliveryPolicyFulfillmentTrigger: ((_d = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _d.fulfillmentTrigger) || "ANCHOR",
    deliveryPolicyIntent: ((_e = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _e.intent) || "FULFILLMENT_BEGIN",
    deliveryPolicyPreAnchorBehavior: ((_f = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _f.preAnchorBehavior) || "ASAP",
    preAnchorBehavior: ((_g = sellingPlan == null ? void 0 : sellingPlan.deliveryPolicy) == null ? void 0 : _g.preAnchorBehavior) || "ASAP"
  };
};
const processBillingPolicy = (sellingPlan) => {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  return {
    billingPolicyEnable: !!(sellingPlan == null ? void 0 : sellingPlan.billingPolicy),
    billingPolicyCheckoutChargeType: ((_b = (_a2 = sellingPlan == null ? void 0 : sellingPlan.billingPolicy) == null ? void 0 : _a2.checkoutCharge) == null ? void 0 : _b.type) || "PRICE",
    billingPolicyCheckoutChargeValue: ((_e = (_d = (_c = sellingPlan == null ? void 0 : sellingPlan.billingPolicy) == null ? void 0 : _c.checkoutCharge) == null ? void 0 : _d.value) == null ? void 0 : _e.percentage) || 0,
    billingPolicyRemainingBalanceChargeExactTime: ((_f = sellingPlan == null ? void 0 : sellingPlan.billingPolicy) == null ? void 0 : _f.remainingBalanceChargeExactTime) || "",
    billingPolicyRemainingBalanceChargeTimeAfterCheckout: ((_g = sellingPlan == null ? void 0 : sellingPlan.billingPolicy) == null ? void 0 : _g.remainingBalanceChargeTimeAfterCheckout) || "",
    billingPolicyRemainingBalanceChargeTrigger: ((_h = sellingPlan == null ? void 0 : sellingPlan.billingPolicy) == null ? void 0 : _h.remainingBalanceChargeTrigger) || "NO_REMAINING_BALANCE"
  };
};
const processPayPerShipmentGroup = (sellingPlanGroup) => {
  return {
    groupName: (sellingPlanGroup == null ? void 0 : sellingPlanGroup.name) || "Unnamed Group",
    id: sellingPlanGroup == null ? void 0 : sellingPlanGroup.id,
    sellingPlans: sellingPlanGroup.sellingPlans.edges.map(({ node }, index) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
      return {
        id: node.id,
        createdAt: (node == null ? void 0 : node.createdAt) || "",
        position: (node == null ? void 0 : node.position) || index + 1,
        planName: (node == null ? void 0 : node.name) || "Unnamed Plan",
        showDescription: !!node.description,
        category: node.category || "SUBSCRIPTION",
        descriptionContent: node.description || "",
        // Pricing Policy
        pricingPolicyEnable: !!((_a2 = node.pricingPolicies) == null ? void 0 : _a2.length),
        pricingPolicyAdjustmentType: ((_c = (_b = node.pricingPolicies) == null ? void 0 : _b[0]) == null ? void 0 : _c.adjustmentType) || "FIXED_AMOUNT",
        pricingPolicyAdjustmentValue: ((_f = (_e = (_d = node.pricingPolicies) == null ? void 0 : _d[0]) == null ? void 0 : _e.adjustmentValue) == null ? void 0 : _f.percentage) || 0,
        pricingPolicyAfterCycleEnable: false,
        pricingPolicyAfterCycle: 0,
        pricingPolicyAfterCycleAdjustmentType: "FIXED_AMOUNT",
        pricingPolicyAfterCycleAdjustmentValue: 0,
        // Inventory Policy
        inventoryPolicyEnable: !!node.inventoryPolicy,
        inventoryPolicyReserve: ((_g = node.inventoryPolicy) == null ? void 0 : _g.reserve) || "ON_FULFILLMENT",
        // Delivery Policy
        deliveryPolicyEnable: !!node.deliveryPolicy,
        deliveryPolicyAnchorsCutoffDay: ((_h = node.deliveryPolicy) == null ? void 0 : _h.cutoff) || 0,
        deliveryPolicyAnchorsDay: 1,
        deliveryPolicyAnchorsMonth: 1,
        deliveryPolicyAnchorsType: "WEEKDAY",
        // Assuming it's a weekly plan, update logic if needed
        deliveryPolicyCutoff: ((_i = node.deliveryPolicy) == null ? void 0 : _i.cutoff) || 0,
        deliveryPolicyFulfillmentExactTime: ((_j = node.deliveryPolicy) == null ? void 0 : _j.fulfillmentExactTime) || null,
        deliveryPolicyFulfillmentTrigger: ((_k = node.deliveryPolicy) == null ? void 0 : _k.fulfillmentTrigger) || "ANCHOR",
        deliveryPolicyIntent: ((_l = node.deliveryPolicy) == null ? void 0 : _l.intent) || "FULFILLMENT_BEGIN",
        deliveryPolicyPreAnchorBehavior: ((_m = node.deliveryPolicy) == null ? void 0 : _m.preAnchorBehavior) || "ASAP",
        // Recurring Delivery Policy
        deliveryRecurringPolicyEnable: !!((_n = node.deliveryPolicy) == null ? void 0 : _n.interval),
        preAnchorBehavior: ((_o = node.deliveryPolicy) == null ? void 0 : _o.preAnchorBehavior) || "ASAP",
        deliveryRecurringPolicyAnchorsCutoffDay: ((_p = node.deliveryPolicy) == null ? void 0 : _p.cutoff) || 0,
        deliveryRecurringPolicyAnchorsDay: 1,
        deliveryRecurringPolicyAnchorsMonth: 1,
        deliveryRecurringPolicyAnchorsType: "WEEKDAY",
        deliveryRecurringPolicyCutoff: ((_q = node.deliveryPolicy) == null ? void 0 : _q.cutoff) || 0,
        deliveryRecurringPolicyIntent: ((_r = node.deliveryPolicy) == null ? void 0 : _r.intent) || "FULFILLMENT_BEGIN",
        deliveryRecurringPolicyInterval: ((_s = node.deliveryPolicy) == null ? void 0 : _s.interval) || null,
        deliveryRecurringPolicyIntervalCount: ((_t = node.deliveryPolicy) == null ? void 0 : _t.intervalCount) || 0,
        deliveryRecurringPreAnchorBehavior: ((_u = node.deliveryPolicy) == null ? void 0 : _u.preAnchorBehavior) || "ASAP",
        // Recurring Billing Policy
        billingRecurringPolicyEnable: !!((_v = node.billingPolicy) == null ? void 0 : _v.interval),
        billingRecurringPolicyInterval: ((_w = node.billingPolicy) == null ? void 0 : _w.interval) || "WEEK",
        billingRecurringPolicyIntervalCount: ((_x = node.billingPolicy) == null ? void 0 : _x.intervalCount) || 0,
        billingRecurringPolicyMinCycles: ((_y = node.billingPolicy) == null ? void 0 : _y.minCycles) || 0,
        billingRecurringPolicyMaxCycles: ((_z = node.billingPolicy) == null ? void 0 : _z.maxCycles) || 0,
        billingRecurringPolicyAnchorsCutoffDay: 0,
        // Default, update as needed
        billingRecurringPolicyAnchorsDay: 1,
        billingRecurringPolicyAnchorsMonth: 1,
        billingRecurringPolicyAnchorsType: "WEEKDAY"
      };
    })
  };
};
const PlanHeader = ({
  planName,
  children,
  className
}) => /* @__PURE__ */ jsxs("div", { className: cn("flex gap-2", className), children: [
  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx(FaMoneyBill, { className: "text-green-600 text-xl" }),
    /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-gray-900", children: planName || "Unnamed Plan" })
  ] }),
  children
] });
const PlanDetails$1 = ({
  pricingPolicyAdjustmentValue,
  pricingPolicyAdjustmentType
}) => {
  const [shop] = useAtom(shopObject);
  const { currencyFormats: { moneyWithCurrencyFormat } } = shop;
  const formattedPrice = useMemo(() => {
    if (pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PRICE") {
      return formatPrice(pricingPolicyAdjustmentValue, moneyWithCurrencyFormat);
    }
    return null;
  }, [pricingPolicyAdjustmentValue, pricingPolicyAdjustmentType, moneyWithCurrencyFormat]);
  return /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center text-sm text-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx(FaClock, { className: "inline-block text-blue-500 mr-1" }),
      /* @__PURE__ */ jsx("strong", { children: "Plan Type:" }),
      " One-time Purchase"
    ] }),
    pricingPolicyAdjustmentType === "PERCENTAGE" && /* @__PURE__ */ jsxs("p", { className: "text-green-600 font-medium", children: [
      /* @__PURE__ */ jsx(FaGift, { className: "inline-block text-yellow-500 mr-1" }),
      /* @__PURE__ */ jsx("strong", { children: "Discount:" }),
      " ",
      pricingPolicyAdjustmentValue,
      "%"
    ] }),
    formattedPrice && /* @__PURE__ */ jsxs("p", { className: "text-green-600 font-medium", children: [
      /* @__PURE__ */ jsx(FaGift, { className: "inline-block text-yellow-500 mr-1" }),
      /* @__PURE__ */ jsx("strong", { children: pricingPolicyAdjustmentType === "FIXED_AMOUNT" || pricingPolicyAdjustmentType === "PERCENTAGE" ? "Discount:" : "Price:" }),
      " ",
      formattedPrice
    ] })
  ] }) });
};
const PlanActions$1 = ({
  OneTimeGroup
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();
  const handleMangePlanClick = () => {
    setIsModalOpen(true);
  };
  const handleConfirmDeletePlan = () => {
    setIsLoading(true);
    const { sellingPlanId, groupId } = OneTimeGroup;
    if (!groupId || !sellingPlanId) {
      toast.error("Somethink wrong Please try again ");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("sellingPlanId", sellingPlanId);
    formData.append("groupId", groupId);
    formData.append("action", "deleteOneTimePlan");
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: handleMangePlanClick,
        children: [
          /* @__PURE__ */ jsx(CheckCircleIcon, { className: "mr-1 text-blue-500" }),
          " Edit"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        color: "danger",
        onClick: () => setShowDeleteConfirmationModal(true),
        isLoading,
        loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
        children: [
          /* @__PURE__ */ jsx(FaTrash, { className: "mr-1 text-red-500" }),
          " Delete"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      OneTimeEditModal,
      {
        modalState: isModalOpen,
        setModalState: setIsModalOpen
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        isOpen: showDeleteConfirmationModal,
        title: "Delete Onetime",
        message: "Are you sure you want to delete Onetime Plan?",
        onConfirm: handleConfirmDeletePlan,
        onCancel: () => setShowDeleteConfirmationModal(false)
      }
    )
  ] });
};
const OneTimeEditModal = ({
  modalState,
  setModalState
}) => {
  const [productResponse] = useAtom(productAtom);
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  const fetcher = useFetcher();
  const [loader2, setLoader] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(defaultOneTimePlan);
  useEffect(() => {
    if (modalState && (createPlanPageState == null ? void 0 : createPlanPageState.oneTimeGroup)) {
      setCurrentPlan(createPlanPageState.oneTimeGroup);
    }
  }, [modalState]);
  const handleChange = (field, value) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value
    }));
    setCreatePlanPageState((prevState) => ({
      ...prevState,
      oneTimeGroup: {
        ...prevState.oneTimeGroup,
        [field]: value
      }
    }));
  };
  const handleSavePlan = async () => {
    setLoader(true);
    const { groupId } = currentPlan;
    if (!groupId) {
      toast.error("Please select a group.");
      setLoader(false);
      return;
    }
    const formData = new FormData();
    formData.append("plans", JSON.stringify(currentPlan));
    formData.append("groupId", groupId);
    formData.append("action", "updateOneTimePlan");
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setLoader(false);
      setModalState(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      overlayClassName: "backdrop-blur",
      containerClassName: "!w-[90%] sm:!w-[600px] !max-w-4xl !shadow-2xl",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto px-7 pt-6 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Plan" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setModalState(false),
              children: /* @__PURE__ */ jsx(
                FaXmark,
                {
                  className: "h-auto w-6",
                  strokeWidth: 1.8
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
          OneTimePlanForm,
          {
            currentPlan,
            onChange: handleChange,
            onSave: handleSavePlan,
            productTitle: (productResponse == null ? void 0 : productResponse.title) || "",
            tabListClassName: "w-[35%]",
            tabPanelClassName: "w-[79%]",
            saveButtonProps: { isLoading: loader2, loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }) }
          }
        ) })
      ] })
    }
  );
};
const OneTimePlansList = ({
  OneTimeGroup
}) => {
  const {
    planName,
    pricingPolicyAdjustmentValue,
    pricingPolicyAdjustmentType
  } = OneTimeGroup;
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 lg:gap-y-2 sm:p-[30px]", children: [
    /* @__PURE__ */ jsx(PlanHeader, { planName }),
    /* @__PURE__ */ jsx(
      PlanDetails$1,
      {
        pricingPolicyAdjustmentValue,
        pricingPolicyAdjustmentType
      }
    ),
    /* @__PURE__ */ jsx(PlanActions$1, { OneTimeGroup })
  ] });
};
var ConfigureSettings = /* @__PURE__ */ ((ConfigureSettings2) => {
  ConfigureSettings2["MANAGE_PLANS"] = "manage_plans";
  return ConfigureSettings2;
})(ConfigureSettings || {});
const ConfigureSettingsLabels = {
  [
    "manage_plans"
    /* MANAGE_PLANS */
  ]: "Manage Plans"
  // [ConfigureSettings.MANAGE_VARIANTS_PLANS]: "Manage Variant Plans",
};
const ConfigureSettingsOptions = Object.values(ConfigureSettings).map((status) => ({
  value: status,
  label: ConfigureSettingsLabels[status]
}));
const PayperShipmentPlansList = ({
  shipmentGroup,
  plansKey,
  setRefreshKey
}) => {
  if (!shipmentGroup) return null;
  const { groupName, sellingPlans, id } = shipmentGroup;
  const numericSellingPlanGroupId = extractNumericId(id);
  const sortedSellingPlans = [...sellingPlans].sort((a, b) => a.position - b.position);
  const [sellingPlansState, setSellingPlansState] = useState(sortedSellingPlans);
  const [hasChanges, setHasChanges] = useState(false);
  const [loader2, setLoader] = useState(false);
  const fetcher = useFetcher();
  const [productResponse, setProduct] = useAtom(productAtom);
  const navigate = useNavigate();
  const { productId } = useParams();
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sellingPlansState.findIndex(({ id: id2 }) => id2 === active.id);
    const newIndex = sellingPlansState.findIndex(({ id: id2 }) => id2 === over.id);
    setSellingPlansState(arrayMove(sellingPlansState, oldIndex, newIndex));
    setHasChanges(true);
  };
  const handleSaveChanges = () => {
    const productId2 = extractNumericId(productResponse.id);
    setLoader(true);
    const formData = new FormData();
    formData.append("plans", JSON.stringify(sellingPlansState));
    formData.append("groupId", id);
    formData.append("action", "updatePlanOrder");
    fetcher.submit(formData, {
      method: "POST",
      action: `/merchant/products/${productId2}`,
      encType: "multipart/form-data"
    });
  };
  const handleMangePlanClick = () => {
    const productId2 = extractNumericId(productResponse.id);
    navigate(`/merchant/products/${productId2}/plans?plansUpdate=yes`);
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setHasChanges(false);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setLoader(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full cursor-pointer flex-col gap-y-6 rounded-[10px] border border-muted p-4 lg:gap-y-2 sm:p-[30px]", children: [
    /* @__PURE__ */ jsx(PlanHeader, { className: "mb-4 flex-col", planName: groupName, children: /* @__PURE__ */ jsx(Text, { children: messages.products.subscriptionPlanDnD }) }),
    /* @__PURE__ */ jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items: sellingPlansState.map(({ id: id2 }) => id2), strategy: verticalListSortingStrategy, children: sellingPlansState.map((plan) => /* @__PURE__ */ jsx(
      SortablePlan,
      {
        id: plan.id,
        plan,
        shipmentGroup,
        setRefreshKey
      },
      plan.id
    )) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "text", onClick: handleMangePlanClick, children: [
          /* @__PURE__ */ jsx(FaGear, { className: "text-primary" }),
          /* @__PURE__ */ jsx(Text, { className: "ms-2 text-primary font-semibold", children: "Manage plans" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "flex items-center", to: `/merchant/products/${productId}/variant-plans?groupId=${numericSellingPlanGroupId}`, children: [
          /* @__PURE__ */ jsx(FaGear, { className: "text-primary" }),
          /* @__PURE__ */ jsx(Text, { className: "ms-2 text-primary font-semibold", children: "Manage variant plans" })
        ] })
      ] }),
      hasChanges && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSaveChanges,
          className: "px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600",
          isLoading: loader2,
          loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
          children: "Save Changes"
        }
      )
    ] })
  ] });
};
const SortablePlan = ({
  id,
  plan,
  shipmentGroup,
  setRefreshKey
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: "#EDEEF9"
  };
  return /* @__PURE__ */ jsx("div", { className: "p-4 rounded-lg mt-2", ref: setNodeRef, style, ...attributes, ...listeners, children: /* @__PURE__ */ jsx(
    PlanDetails,
    {
      sellingPlan: plan,
      shipmentGroup,
      setRefreshKey
    }
  ) });
};
const PlanDetails = ({
  sellingPlan,
  shipmentGroup,
  setRefreshKey
}) => {
  var _a2, _b, _c;
  const planName = sellingPlan.planName || "Unnamed Plan";
  const category = ((_a2 = sellingPlan.category) == null ? void 0 : _a2.charAt(0).toUpperCase()) + ((_b = sellingPlan.category) == null ? void 0 : _b.slice(1).toLowerCase()) || "Subscription";
  const deliveryInterval = sellingPlan.deliveryRecurringPolicyInterval || "MONTH";
  const deliveryCount = sellingPlan.deliveryRecurringPolicyIntervalCount || 1;
  const shipsEvery = `Ships every ${deliveryCount} ${deliveryInterval.toLowerCase()}${deliveryCount > 1 ? "s" : ""}.`;
  const discountValue = sellingPlan.pricingPolicyAdjustmentValue || 0;
  const discountType = ((_c = sellingPlan.pricingPolicyAdjustmentType) == null ? void 0 : _c.toLowerCase()) || "fixed amount";
  const discountText = `${discountValue}% ${discountType}`;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxs(Flex, { align: "center", direction: "row", gap: "2", justify: "between", children: [
      /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24px", height: "24px", viewBox: "0 0 25 25", fill: "none", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z", fill: "#121923" }) }),
        /* @__PURE__ */ jsx(Title$1, { className: "text-lg font-semibold", children: planName })
      ] }),
      /* @__PURE__ */ jsx(
        PlanActions,
        {
          sellingPlan,
          shipmentGroup,
          setRefreshKey
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Box$1, { className: "ms-8 mt-3", children: [
      /* @__PURE__ */ jsxs(Text, { className: "text-gray-600", children: [
        /* @__PURE__ */ jsx(FaRepeat, { className: "inline-block mr-1" }),
        category
      ] }),
      /* @__PURE__ */ jsxs(Text, { className: "text-blue-600", children: [
        /* @__PURE__ */ jsx(FaShip, { className: "inline-block mr-1" }),
        shipsEvery
      ] }),
      /* @__PURE__ */ jsxs(Text, { className: "text-green-600", children: [
        /* @__PURE__ */ jsx(FaTag, { className: "inline-block mr-1" }),
        discountText
      ] })
    ] })
  ] });
};
const PlanActions = ({
  sellingPlan,
  shipmentGroup,
  setRefreshKey
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(
      ActionIcon,
      {
        variant: "text",
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        },
        children: /* @__PURE__ */ jsx(FaPencil, { className: "mr-2 h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      PlanDropDowns,
      {
        sellingPlan,
        shipmentGroup,
        setRefreshKey
      }
    ),
    /* @__PURE__ */ jsx(
      SellingPlanEditModal,
      {
        modalState: isModalOpen,
        setModalState: setIsModalOpen,
        sellingPlan,
        shipmentGroup,
        setRefreshKey
      }
    )
  ] });
};
const SellingPlanEditModal = ({
  modalState,
  setModalState,
  sellingPlan,
  shipmentGroup,
  setRefreshKey
}) => {
  const [currentPlan, setCurrentPlan] = useState(sellingPlan);
  const [loader2, setLoader] = useState(false);
  const fetcher = useFetcher();
  const handleChange = (field, value) => {
    setCurrentPlan((prevPlan) => ({
      ...prevPlan,
      [field]: value
    }));
  };
  const handleSavePlan = async () => {
    setLoader(true);
    console.log("shipmentGroup", shipmentGroup);
    const formData = new FormData();
    formData.append("plans", JSON.stringify(currentPlan));
    formData.append("groupId", shipmentGroup.id);
    formData.append("action", "updatePayPerShipmentPlan");
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setLoader(false);
      setModalState(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: modalState,
      onClose: () => setModalState(false),
      overlayClassName: "backdrop-blur",
      containerClassName: "!w-[90%] sm:!w-[600px] !max-w-4xl !shadow-2xl",
      children: /* @__PURE__ */ jsxs("div", { className: "m-auto px-7 pt-6 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-7 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h3", children: "Edit Plan" }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              variant: "text",
              onClick: () => setModalState(false),
              onPointerDown: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsx(
                FaXmark,
                {
                  className: "h-auto w-6",
                  strokeWidth: 1.8
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
          OneTimePlanForm,
          {
            currentPlan,
            onChange: handleChange,
            onSave: handleSavePlan,
            productTitle: "",
            tabListClassName: "w-[35%]",
            tabPanelClassName: "w-[79%]",
            saveButtonProps: { isLoading: loader2, loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }) }
          }
        ) })
      ] })
    }
  );
};
const PlanDropDowns = ({
  sellingPlan,
  shipmentGroup,
  setRefreshKey
}) => {
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [product] = useAtom(productAtom);
  const handleConfirmDeletePlan = () => {
    var _a2;
    setIsLoading(true);
    const { sellingPlanGroups } = product;
    const groupId = shipmentGroup.id;
    const sellingPlanId = sellingPlan.id;
    if (!groupId || !sellingPlanId) {
      toast.error("Required data missing");
      setIsLoading(false);
      return;
    }
    const selectedSellingPlanGroup = ((_a2 = sellingPlanGroups.edges.find((edge) => edge.node.id === groupId)) == null ? void 0 : _a2.node) || null;
    if (!selectedSellingPlanGroup) {
      toast.error("Selling plan group not found");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("sellingPlanId", sellingPlanId);
    formData.append("groupId", groupId);
    const action2 = isSingleSellingPlan(selectedSellingPlanGroup) ? "deletePayPerShipmentPlanGroup" : "deletePayPerShipmentPlan";
    formData.append("action", action2);
    fetcher.submit(formData, {
      method: "POST",
      action: `.`,
      encType: "multipart/form-data"
    });
  };
  const isSingleSellingPlan = (sellingPlanGroup) => {
    return sellingPlanGroup.sellingPlans.edges.length === 1;
  };
  useEffect(() => {
    var _a2, _b;
    if (fetcher.state === "idle" && fetcher.data) {
      if ((_a2 = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _a2.success) {
        toast.success("Changes saved successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        toast.error((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.error);
      }
      setIsLoading(false);
    }
  }, [fetcher.state, fetcher.data]);
  return /* @__PURE__ */ jsxs(Dropdown, { placement: "bottom-end", className: "min-w-250", children: [
    /* @__PURE__ */ jsx(
      Dropdown.Trigger,
      {
        className: "flex items-center",
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ jsx(FaEllipsisVertical, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx(Dropdown.Menu, { className: "divide-y min-w-[210px]", children: /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
      /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsxs(Button, { className: "px-0 py-2", variant: "text", children: [
        /* @__PURE__ */ jsx(FaPencil, { className: "mr-2 h-4 w-4" }),
        "Edit Plan"
      ] }) }),
      /* @__PURE__ */ jsxs(Dropdown.Item, { children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            isLoading,
            loader: /* @__PURE__ */ jsx(Loader$1, { variant: "spinner" }),
            className: "px-0 py-2",
            variant: "text",
            onPointerDown: (e) => e.stopPropagation(),
            onClick: (e) => {
              e.stopPropagation();
              setShowDeleteConfirmationModal(true);
            },
            children: [
              /* @__PURE__ */ jsx(FaTrash, { className: "mr-2 h-4 w-4" }),
              "Delete"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationModal,
          {
            isOpen: showDeleteConfirmationModal,
            title: "Delete Plan",
            message: "Are you sure you want to delete Plan?",
            onConfirm: handleConfirmDeletePlan,
            onCancel: () => setShowDeleteConfirmationModal(false)
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsxs(Button, { className: "px-0 py-2", variant: "text", children: [
        /* @__PURE__ */ jsx(FaCopy, { className: "mr-2 h-4 w-4" }),
        "Checkout Link"
      ] }) }),
      /* @__PURE__ */ jsx("hr", { className: "my-3" }),
      /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsxs(Flex, { direction: "col", gap: "1", children: [
        /* @__PURE__ */ jsx(Text, { className: "font-semibold text-[#848BD4] text-lg uppercase", children: "Created on" }),
        /* @__PURE__ */ jsx(Text, { className: "text-left", children: formatDate$1(sellingPlan == null ? void 0 : sellingPlan.createdAt) })
      ] }) })
    ] }) })
  ] });
};
const PlansGroupsInformation = ({ productResponse }) => {
  const [filteredSellingPlans, setFilteredSellingPlans] = useState([]);
  useNavigate();
  const [createPlanPageState, setCreatePlanPageState] = useAtom(createPlanPageStates);
  useEffect(() => {
    var _a2;
    if (!productResponse) return;
    const { sellingPlanGroups, currentAppInstallation } = productResponse;
    const appIdGraphQL = ((_a2 = currentAppInstallation == null ? void 0 : currentAppInstallation.app) == null ? void 0 : _a2.id) || "";
    const appIdNumeric = extractNumericId(appIdGraphQL);
    if (sellingPlanGroups && sellingPlanGroups.edges) {
      const filteredPlans = sellingPlanGroups.edges.filter(
        (edge) => extractNumericId(edge.node.appId) === appIdNumeric
      );
      setFilteredSellingPlans(filteredPlans);
    }
  }, [productResponse]);
  const OneTimeGroups = getSellingPlanGroup(filteredSellingPlans, "Onetime Plan Group");
  const processedOneTimeGroup = OneTimeGroups ? processOneTimeGroup(OneTimeGroups) : null;
  const PayPerShipmentGroup = getSellingPlanGroup(filteredSellingPlans, "PayPerShipment Plan Group");
  const processedPayPerShipmentGroup = PayPerShipmentGroup ? processPayPerShipmentGroup(PayPerShipmentGroup) : null;
  const PrePaidShipmentGroup = getSellingPlanGroup(filteredSellingPlans, "PrePaid Plan Group");
  const processedPrePaidShipmentGroup = PrePaidShipmentGroup ? processPayPerShipmentGroup(PrePaidShipmentGroup) : null;
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const newState = {
      payPerShipmentGroup: {
        groupName: (processedPayPerShipmentGroup == null ? void 0 : processedPayPerShipmentGroup.groupName) || "",
        sellingPlansToUpdate: (processedPayPerShipmentGroup == null ? void 0 : processedPayPerShipmentGroup.sellingPlans) || [],
        groupId: processedPayPerShipmentGroup == null ? void 0 : processedPayPerShipmentGroup.id
      },
      oneTimeGroup: {
        groupName: (processedOneTimeGroup == null ? void 0 : processedOneTimeGroup.planName) || "",
        sellingPlansToCreate: [processedOneTimeGroup],
        groupId: processedOneTimeGroup == null ? void 0 : processedOneTimeGroup.groupId
      },
      prePaidSubscriptionsGroup: {
        groupName: (processedPrePaidShipmentGroup == null ? void 0 : processedPrePaidShipmentGroup.groupName) || "PrePaid Subscription Plan Group",
        sellingPlansToUpdate: (processedPrePaidShipmentGroup == null ? void 0 : processedPrePaidShipmentGroup.sellingPlans) || [],
        groupId: processedPrePaidShipmentGroup == null ? void 0 : processedPrePaidShipmentGroup.id
      }
    };
    if (JSON.stringify(createPlanPageState) !== JSON.stringify(newState)) {
      setCreatePlanPageState(newState);
    }
  }, [processedOneTimeGroup, processedPayPerShipmentGroup, processedPrePaidShipmentGroup]);
  return /* @__PURE__ */ jsx(Flex, { gap: "5", children: filteredSellingPlans.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-5", children: [
    processedOneTimeGroup && /* @__PURE__ */ jsx(
      OneTimePlansList,
      {
        OneTimeGroup: processedOneTimeGroup
      }
    ),
    processedPayPerShipmentGroup && /* @__PURE__ */ jsx(
      PayperShipmentPlansList,
      {
        plansKey: `payper-${refreshKey}`,
        shipmentGroup: processedPayPerShipmentGroup,
        setRefreshKey
      }
    ),
    processedPrePaidShipmentGroup && /* @__PURE__ */ jsx(
      PayperShipmentPlansList,
      {
        shipmentGroup: processedPrePaidShipmentGroup,
        plansKey: `prepaid-${refreshKey}`,
        setRefreshKey
      }
    )
  ] }) : /* @__PURE__ */ jsxs(Flex, { direction: "col", gap: "7", children: [
    /* @__PURE__ */ jsx(Text, { className: "mt-2", children: "No selling plans found." }),
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/merchant/products/${extractNumericId(productResponse == null ? void 0 : productResponse.id)}/plans`,
        className: "rounded-md text-sm font-bold flex items-center text-primary",
        children: [
          /* @__PURE__ */ jsx(PiGear, {}),
          /* @__PURE__ */ jsx(Text, { className: "ms-2", children: ConfigureSettingsLabels.manage_plans })
        ]
      }
    )
  ] }) });
};
const SubscriptionPlansHeader = ({ productResponse }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Flex, { justify: "between", align: "center", children: [
    /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5",
            "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
          ),
          children: /* @__PURE__ */ jsx(PiRepeatFill, {})
        }
      ),
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-base font-medium xl:text-lg", children: messages.products.subscriptionPlanTitle })
    ] }),
    /* @__PURE__ */ jsx(
      CustomDropdown,
      {
        label: "Configure",
        options: ConfigureSettingsOptions,
        onSelect: (value) => {
          if (value === ConfigureSettings.MANAGE_PLANS) {
            navigate(`/merchant/products/${extractNumericId(productResponse == null ? void 0 : productResponse.id)}/plans`);
          } else {
            navigate(`/merchant/products/${extractNumericId(productResponse == null ? void 0 : productResponse.id)}/variant-plans`);
          }
        },
        renderOption: renderConfigureOption,
        variant: "solid",
        menuClassName: "min-w-max whitespace-nowrap"
      }
    )
  ] });
};
function renderConfigureOption(value) {
  var _a2;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    value === ConfigureSettings.MANAGE_PLANS ? /* @__PURE__ */ jsx(PiPencil, {}) : /* @__PURE__ */ jsx(PiGear, {}),
    /* @__PURE__ */ jsx("span", { className: "ml-2", children: (_a2 = ConfigureSettingsOptions.find((opt) => opt.value === value)) == null ? void 0 : _a2.label })
  ] });
}
function SubscriptionPlansGroups({ productResponse }) {
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx(SubscriptionPlansHeader, { productResponse }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("div", { className: "my-6", children: /* @__PURE__ */ jsx(PlansGroupsInformation, { productResponse }) })
  ] });
}
const pageHeader$2 = {
  breadcrumb: [
    {
      href: routes$1.products.products,
      name: "Products"
    },
    {
      name: "Edit"
    }
  ]
};
function ProductEditMain({ productResponse }) {
  console.log("productResponse", productResponse);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: productResponse.title, breadcrumb: pageHeader$2.breadcrumb, children: /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-3 lg:mt-0", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: routes$1.products.products,
        className: "w-full lg:w-auto"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-x-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 lg:col-span-8 xl:col-span-9", children: [
        /* @__PURE__ */ jsx(ProductDetails, { productResponse }),
        /* @__PURE__ */ jsx(SubscriptionPlansGroups, { productResponse })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block", children: [
        /* @__PURE__ */ jsx(ProductSatusBlock, { productResponse }),
        /* @__PURE__ */ jsx(ProductInCollection, { productResponse }),
        /* @__PURE__ */ jsx(ProductChangeBlock, { productResponse })
      ] })
    ] }) })
  ] });
}
const ProductInCollection = ({ productResponse }) => {
  const options2 = [
    { label: "Apple 🍎", value: "apple" },
    { label: "Banana 🍌", value: "banana" },
    { label: "Cherry 🍒", value: "cherry" }
  ];
  const [value, setValue] = useState([]);
  return /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted p-4 mt-5", children: [
    /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-[#848BD4] font-medium xl:text-lg", children: "Billion Grid Collection" }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
      MultiSelect,
      {
        value,
        options: options2,
        label: "Multi Select",
        onChange: setValue
      }
    ) })
  ] });
};
const ProductSatusBlock = ({ productResponse }) => {
  const {
    status
  } = productResponse;
  return /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted p-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-[#848BD4] font-medium xl:text-lg", children: "Product Status" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Badge$1,
          {
            renderAsDot: true,
            color: status.toLowerCase() === "active" ? "success" : "danger",
            size: "md"
          }
        ),
        /* @__PURE__ */ jsx(Text, { children: productResponse.status })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-[#848BD4] font-medium xl:text-lg", children: "Online Store Status" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Badge$1,
          {
            renderAsDot: true,
            color: status.toLowerCase() === "active" ? "success" : "danger",
            size: "md"
          }
        ),
        /* @__PURE__ */ jsx(Text, { children: "Published" })
      ] })
    ] })
  ] });
};
const ProductChangeBlock = ({ productResponse }) => {
  const {
    createdAt,
    updatedAt
  } = productResponse;
  return /* @__PURE__ */ jsxs(Box$1, { className: "rounded-[10px] border border-muted p-4 mt-5", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-[#848BD4] font-medium xl:text-lg", children: "Last Updated" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formatDate$1(updatedAt) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h3", className: "text-[#848BD4] font-medium xl:text-lg", children: "Created At" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: formatDate$1(createdAt) }) })
    ] })
  ] });
};
const DELETE_SELLING_PLAN_GROUP = `#graphql
mutation sellingPlanGroupDelete($id: ID!) {
  sellingPlanGroupDelete(id: $id) {
    deletedSellingPlanGroupId
    userErrors {
      field
      message
    }
  }
}`;
const loader$b = async ({
  request,
  params
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  const response = await authenticate.admin(updatedRequest);
  const { productId } = params;
  if (!response || !response.admin || !productId) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData$2(admin, parseInt(productId));
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    product: criticalData.product
  };
};
const handleUpdatePlanOrder = async (admin, formData) => {
  var _a2, _b;
  const variables = generateReOrderVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.sellingPlanGroupCreate) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
const generateReOrderVariables = (formData) => {
  var _a2, _b;
  const plansString = (_a2 = formData.get("plans")) == null ? void 0 : _a2.toString();
  const groupId = (_b = formData.get("groupId")) == null ? void 0 : _b.toString();
  const sellingPlans = plansString ? JSON.parse(plansString) : [];
  const variables = createRecurringPlanUtils.createVariablesSellingPlanReorder(groupId, sellingPlans);
  return variables;
};
const generateUpdateOneTimeVariables = (formData) => {
  var _a2;
  const plansString = (_a2 = formData.get("plans")) == null ? void 0 : _a2.toString();
  if (!plansString) {
    return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
  }
  const sellingPlanGroup = JSON.parse(plansString);
  const variables = createOnetimePlanUtils.createGraphQLVariablesOneTimesUpdate(sellingPlanGroup);
  return variables;
};
const handleUpdateOneTimePlan = async (admin, formData) => {
  var _a2, _b;
  const variables = generateUpdateOneTimeVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.sellingPlanGroupUpdate) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
const generateDeleteGroupVariables = (formData) => {
  var _a2;
  const sellingPlanGroupId = (_a2 = formData.get("groupId")) == null ? void 0 : _a2.toString();
  return {
    variables: {
      id: sellingPlanGroupId
    }
  };
};
const handleDeleteOneTimePlan = async (admin, formData) => {
  var _a2, _b;
  const variables = generateDeleteGroupVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    DELETE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.sellingPlanGroupUpdate) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
const generateDeleteSellingPlanVariables = (formData, isDeleteGroup) => {
  if (isDeleteGroup) {
    return generateDeleteGroupVariables(formData);
  }
  const sellingPlanId = formData.get("sellingPlanId");
  const groupId = formData.get("groupId");
  return {
    variables: {
      id: groupId,
      input: {
        sellingPlansToDelete: [sellingPlanId]
      }
    }
  };
};
const handleDeletePayPerShipmentPlan = async (admin, formData, isDeleteGroup = false) => {
  var _a2, _b;
  const variables = generateDeleteSellingPlanVariables(formData, isDeleteGroup);
  console.log("variables for delete", variables);
  const query = isDeleteGroup ? DELETE_SELLING_PLAN_GROUP : UPDATE_SELLING_PLAN_GROUP;
  const result = await createPlanAPIUtils.executeShopifyMutation(
    query,
    admin,
    variables
  );
  console.log("result for delete", result);
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.sellingPlanGroupUpdate) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
const handleUpdatePayPerShipmentPlan = async (admin, formData) => {
  var _a2, _b;
  const variables = generateUpdatePlanVariables(formData);
  const result = await createPlanAPIUtils.executeShopifyMutation(
    UPDATE_SELLING_PLAN_GROUP,
    admin,
    variables
  );
  console.log("result", JSON.stringify(result));
  const userErrors = ((_b = (_a2 = result == null ? void 0 : result.data) == null ? void 0 : _a2.sellingPlanGroupCreate) == null ? void 0 : _b.userErrors) || [];
  if (userErrors.length > 0) {
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
const generateUpdatePlanVariables = (formData) => {
  var _a2, _b;
  const plansString = (_a2 = formData.get("plans")) == null ? void 0 : _a2.toString();
  const groupId = (_b = formData.get("groupId")) == null ? void 0 : _b.toString();
  const sellingPlans = plansString ? JSON.parse(plansString) : [];
  const variables = createRecurringPlanUtils.createVariablesSellingPlanUpdate(groupId, sellingPlans);
  return variables;
};
async function action$4({
  request,
  params
}) {
  var _a2;
  if (request.method !== "POST") {
    return json({ error: ERROR_MESSAGES.METHOD_NOT_ALLOWED }, { status: 405 });
  }
  try {
    const admin = await createPlanAPIUtils.authenticateRequest(request);
    if (!admin) return json({ error: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    const formData = await request.formData();
    const action2 = (_a2 = formData.get("action")) == null ? void 0 : _a2.toString();
    if (!action2) return json({ error: ERROR_MESSAGES.REQUIRED_PARAMS_MISSING }, { status: 400 });
    let response;
    switch (action2) {
      case "updatePlanOrder":
        response = await handleUpdatePlanOrder(admin, formData);
        break;
      case "updateOneTimePlan":
        response = await handleUpdateOneTimePlan(admin, formData);
        break;
      case "deleteOneTimePlan":
        response = await handleDeleteOneTimePlan(admin, formData);
        break;
      case "deletePayPerShipmentPlan":
        response = await handleDeletePayPerShipmentPlan(admin, formData);
        break;
      case "deletePayPerShipmentPlanGroup":
        response = await handleDeletePayPerShipmentPlan(admin, formData, true);
        break;
      case "updatePayPerShipmentPlan":
        response = await handleUpdatePayPerShipmentPlan(admin, formData);
        break;
      default:
        return json({ error: ERROR_MESSAGES.ACTION_NOT_FOUND }, { status: 402 });
    }
    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    return json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }, { status: 500 });
  }
}
const loadCriticalData$2 = async (admin, productId) => {
  try {
    const variables = generateVariables(productId);
    const [
      productResponse,
      appResponse,
      shopResponse
    ] = await Promise.all([
      admin.graphql(PRODUCT_SINGLE_QUERY, variables),
      admin.graphql(CURRENT_APP_INSTALLATION),
      admin.graphql(CURRENT_SHOP)
    ]);
    const [
      { data: { product } },
      { data: { currentAppInstallation } },
      { data: { shop } }
    ] = await Promise.all([
      productResponse.json(),
      appResponse.json(),
      shopResponse.json()
    ]);
    return { product: { ...product, currentAppInstallation, shop } };
  } catch (error) {
    console.error("Error loading critical data:", error);
    throw new Error("Failed to load critical product data");
  }
};
const generateVariables = (productId) => {
  const graphqlProductId = generateGraphQLId(
    productId,
    ShopifyObjectType.Product
  );
  return {
    variables: {
      id: graphqlProductId
    }
  };
};
const ProductEdit = () => {
  const { apiKey, product } = useLoaderData();
  const [, setProduct] = useAtom(productAtom);
  const [, setShopObject] = useAtom(shopObject);
  useEffect(() => {
    if (product) {
      setProduct(product);
      setShopObject(product.shop);
    }
  }, [product, setProduct]);
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  if (!product) {
    return /* @__PURE__ */ jsx("div", { children: "Product not found" });
  }
  return /* @__PURE__ */ jsx(
    ProductEditMain,
    {
      productResponse: product
    }
  );
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: ProductEdit,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const action$3 = async ({ request }) => {
  const { topic, shop, session } = await authenticate.webhook(request);
  switch (topic) {
    case "PRODUCTS_UPDATE":
      await request.json();
      console.log(`Received ${topic} webhook for ${shop}`);
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3
}, Symbol.toStringTag, { value: "Module" }));
const createWebhooksHandler = async (topic, shop, session) => {
  console.log(topic, shop, session);
};
const action$2 = async ({ request }) => {
  const { payload, session, topic, shop } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);
  createWebhooksHandler(topic, shop, session);
  const current = payload.current;
  if (session) {
    await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        scope: current.toString()
      }
    });
  }
  return new Response();
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);
  if (session) {
    await prisma.session.deleteMany({ where: { shop } });
  }
  return new Response();
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const SUBSCRIPTION_CONTRACTS_QUERY = `#graphql
 ${PAGE_INFO_FRAGMENT}
query SubscriptionContracts(
    $first: Int
    $after: String
    $before: String
    $last: Int
    $query: String
    $reverse: Boolean
) {
   subscriptionContracts(
      first: $first
      after: $after
      before: $before
      last: $last
      query: $query
      reverse: $reverse
   ){
        edges{
            cursor
            node{
                id
                lines(first: 10){
                    edges{
                        cursor
                        node{
                            variantTitle
                            quantity
                            lineDiscountedPrice{
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                deliveryPolicy{
                    interval
                    intervalCount
                }
                billingPolicy{
                    intervalCount
                    interval
                }
                customer{
                    firstName
                    lastName
                    email
                    displayName
                }
                status
                nextBillingDate
                createdAt
                updatedAt
            }
        }
        pageInfo{
            ...PageInfo
        }
    }
}`;
const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 250, label: "250" }
];
function TablePagination({
  table,
  showSelectedCount = false,
  className,
  onPageSizeChange,
  onPageChange,
  pageInfo
}) {
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;
  const handlePageSizeChange = (v) => {
    if (onPageSizeChange) {
      table.setPageSize(Number(v.value));
      onPageSizeChange(Number(v.value));
    }
  };
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      gap: "6",
      align: "center",
      justify: "between",
      className: cn("container", className),
      children: [
        /* @__PURE__ */ jsxs(Flex, { align: "center", className: "w-auto shrink-0", children: [
          /* @__PURE__ */ jsx(Text, { className: "hidden font-normal text-gray-600 md:block", children: "Rows per page" }),
          /* @__PURE__ */ jsx(
            Select$1,
            {
              size: "sm",
              variant: "flat",
              options,
              className: "w-13",
              value: table.getState().pagination.pageSize,
              onChange: handlePageSizeChange,
              suffixClassName: "[&>svg]:size-3",
              selectClassName: "font-semibold text-xs ring-0 shadow-sm h-7",
              optionClassName: "font-medium text-xs px-2 justify-center"
            }
          )
        ] }),
        showSelectedCount && /* @__PURE__ */ jsx(Box$1, { className: "hidden @2xl:block w-full", children: /* @__PURE__ */ jsxs(Text, { children: [
          table.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          table.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) }),
        (hasNextPage || hasPreviousPage) && /* @__PURE__ */ jsxs(Flex, { justify: "end", align: "center", children: [
          /* @__PURE__ */ jsxs(Text, { className: "hidden font-normal text-gray-600 3xl:block", children: [
            "Page ",
            table.getState().pagination.pageIndex + 1,
            " of",
            " ",
            table.getPageCount().toLocaleString()
          ] }),
          /* @__PURE__ */ jsxs(Grid, { gap: "2", columns: "2", children: [
            /* @__PURE__ */ jsx(
              ActionIcon,
              {
                size: "sm",
                rounded: "lg",
                variant: "outline",
                "aria-label": "Go to previous page",
                onClick: () => onPageChange == null ? void 0 : onPageChange(startCursor, "prev"),
                disabled: !hasPreviousPage,
                className: "text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none",
                children: /* @__PURE__ */ jsx(PiCaretLeftBold, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              ActionIcon,
              {
                size: "sm",
                rounded: "lg",
                variant: "outline",
                "aria-label": "Go to next page",
                onClick: () => onPageChange == null ? void 0 : onPageChange(endCursor, "next"),
                disabled: !hasNextPage,
                className: "text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none",
                children: /* @__PURE__ */ jsx(PiCaretRightBold, { className: "size-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const columnHelper$1 = createColumnHelper();
const contractColumns = [
  columnHelper$1.display({
    id: "select",
    size: 50,
    header: ({ table }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select all rows",
        checked: table.getIsAllPageRowsSelected(),
        onChange: () => table.toggleAllPageRowsSelected()
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select row",
        checked: row.getIsSelected(),
        onChange: () => row.toggleSelected()
      }
    )
  }),
  columnHelper$1.accessor("id", {
    id: "subscripitionId",
    size: 200,
    header: "Subscription ID",
    cell: ({ row }) => /* @__PURE__ */ jsx(Link, { to: `${row.original.id}`, className: "text-sm text-primary", children: row.original.id })
  }),
  columnHelper$1.display({
    id: "variantTitle",
    size: 200,
    header: "Product/Variant",
    cell: ({ row }) => /* @__PURE__ */ jsx(Text, { className: "text-sm", children: row.original.variantTitle })
  }),
  columnHelper$1.display({
    id: "price",
    size: 150,
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.lineDiscountedPrice;
      return /* @__PURE__ */ jsx(Text, { className: "text-sm", children: price });
    }
  }),
  columnHelper$1.display({
    id: "quantity",
    size: 100,
    header: "Quantity",
    cell: ({ row }) => /* @__PURE__ */ jsx(Text, { className: "text-sm", children: row.original.quantity })
  }),
  columnHelper$1.display({
    id: "deliveryPolicy",
    size: 200,
    header: "Delivery Policy",
    cell: ({ row }) => /* @__PURE__ */ jsxs(Box$1, { children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: `Ships every ${row.original.deliveryPolicyIntervalCount} ${row.original.deliveryPolicyInterval.toLowerCase()}` }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: `Charges ${row.original.billingPolicyIntervalCount} ${row.original.billingPolicyInterval.toLowerCase()}` })
    ] })
  }),
  columnHelper$1.display({
    id: "nextBillingDate",
    size: 250,
    header: "Next Charge Date",
    cell: ({ row }) => {
      const nextChargeDate = row.original.nextBillingDate;
      const convertedDate = formatDate$1(nextChargeDate);
      return /* @__PURE__ */ jsx(Box$1, { className: "flex flex-col", children: /* @__PURE__ */ jsx(Text, { className: "text-sm", children: convertedDate }) });
    }
  }),
  columnHelper$1.display({
    id: "customer",
    size: 250,
    header: "Customer",
    cell: ({ row }) => /* @__PURE__ */ jsxs(Box$1, { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: `${row.original.customerName}` }),
      /* @__PURE__ */ jsx(Text, { className: "text-sm", children: row.original.customerEmail })
    ] })
  }),
  columnHelper$1.display({
    id: "status",
    size: 250,
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors2 = {
        [SubscriptionContractSubscriptionStatus.ACTIVE]: "success",
        [SubscriptionContractSubscriptionStatus.CANCELLED]: "danger",
        [SubscriptionContractSubscriptionStatus.EXPIRED]: "gray",
        [SubscriptionContractSubscriptionStatus.FAILED]: "warning",
        [SubscriptionContractSubscriptionStatus.PAUSED]: "info"
      };
      return /* @__PURE__ */ jsxs(Box$1, { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, color: statusColors2[status] }),
        /* @__PURE__ */ jsx(Text, { className: "capitalize", children: status })
      ] });
    }
  }),
  columnHelper$1.display({
    id: "actions",
    size: 100,
    header: "Actions",
    cell: ({ row }) => {
      const subscripition = row.original;
      return /* @__PURE__ */ jsx(SubscriptionActions, { subscripition });
    }
  })
];
const SubscriptionActions = ({ subscripition }) => {
  const actionItems = [
    { icon: /* @__PURE__ */ jsx(BsCalendarDate, {}), label: "Reschedule next order" },
    { icon: /* @__PURE__ */ jsx(GoPencil, {}), label: "Edit frequency" },
    { icon: /* @__PURE__ */ jsx(GoPencil, {}), label: "Edit subscription product" },
    { icon: /* @__PURE__ */ jsx(MdOutlineCancel, {}), label: "Cancel" },
    { icon: /* @__PURE__ */ jsx(FaRegTrashAlt, {}), label: "Delete" }
  ];
  return /* @__PURE__ */ jsxs(Dropdown, { children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx(
      Button,
      {
        as: "span",
        color: "primary",
        variant: "text",
        children: /* @__PURE__ */ jsx(Text, { className: "text-primary text-sm", children: "Actions" })
      }
    ) }),
    /* @__PURE__ */ jsx(Dropdown.Menu, { className: "min-w-[285px]", children: actionItems.map(({ icon, label }, index) => /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "2", children: [
      icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: icon }),
      /* @__PURE__ */ jsx(Text, { children: label })
    ] }) }, index)) })
  ] });
};
function TableFooter({
  table,
  showDownloadButton = true,
  onExport
}) {
  const checkedItems = table.getSelectedRowModel().rows.map((row) => row.original);
  const meta = table.options.meta;
  if (checkedItems.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { as: "strong", children: checkedItems.length }),
      checkedItems.length >= 2 ? " Categories" : " Category",
      " selected",
      " ",
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "text",
          className: "underline",
          color: "danger",
          onClick: () => {
            var _a2;
            return (_a2 = meta == null ? void 0 : meta.handleMultipleDelete) == null ? void 0 : _a2.call(meta, checkedItems);
          },
          children: "Delete Them"
        }
      )
    ] }),
    showDownloadButton && /* @__PURE__ */ jsxs(
      Button,
      {
        size: "sm",
        onClick: onExport,
        className: "dark:bg-gray-300 dark:text-gray-800",
        children: [
          "Download ",
          checkedItems.length,
          " ",
          checkedItems.length > 1 ? "Items" : "Item"
        ]
      }
    )
  ] });
}
const usePaginationAndFilterHandlers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handlePageSizeChange = (newSize) => {
    searchParams.set("first", newSize.toString());
    navigate(`?${searchParams.toString()}`);
  };
  const handlePageChange = (cursor, action2) => {
    if (cursor) {
      searchParams.set("action", action2);
      searchParams.set("cursor", cursor);
    } else {
      searchParams.delete("action");
      searchParams.delete("cursor");
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handleStatusChange = (selectedStatus) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("status", queryFilter);
    } else {
      searchParams.delete("status");
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handlePublishedStatusChange = (selectedStatus) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("onlineStoreStatus", queryFilter);
    } else {
      searchParams.delete("onlineStoreStatus");
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handleUpdatedDateChange = (selectedStatus) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("updatedAt", queryFilter);
    } else {
      searchParams.delete("updatedAt");
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handleCreatedDateChange = (selectedStatus) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("createdAt", queryFilter);
    } else {
      searchParams.delete("createdAt");
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handleQuerySearch = (query, type = "query", SearchByOptions = []) => {
    if (SearchByOptions && SearchByOptions.length) {
      SearchByOptions.forEach((option) => searchParams.delete(option.value));
    }
    if (query) {
      searchParams.set(type, query);
    } else {
      searchParams.delete(type);
    }
    navigate(`?${searchParams.toString()}`);
  };
  const handleLastBillingAttemptErrorChange = (selectedStatus) => {
    const queryFilter = selectedStatus ? selectedStatus : null;
    if (queryFilter) {
      searchParams.set("lastBillingAttemptError", queryFilter);
    } else {
      searchParams.delete("lastBillingAttemptError");
    }
    navigate(`?${searchParams.toString()}`);
  };
  return {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handlePublishedStatusChange,
    handleQuerySearch,
    handleUpdatedDateChange,
    handleCreatedDateChange,
    handleLastBillingAttemptErrorChange
  };
};
function StatusField({
  placeholder = "Select status",
  dropdownClassName,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1,
    {
      inPortal: false,
      placeholder,
      selectClassName: "h-9 min-w-[150px]",
      dropdownClassName: cn("p-1.5 !z-0", dropdownClassName),
      optionClassName: "h-9",
      ...props
    }
  );
}
function FilterDrawerView({
  isOpen,
  drawerTitle,
  setOpenDrawer,
  children
}) {
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      size: "sm",
      isOpen: isOpen ?? false,
      onClose: () => setOpenDrawer(false),
      overlayClassName: "dark:bg-opacity-40 dark:backdrop-blur-md",
      containerClassName: "dark:bg-gray-100",
      className: "z-[9999]",
      children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "-mx-5 mb-6 flex items-center justify-between border-b border-muted px-5 pb-4", children: [
          /* @__PURE__ */ jsx(Title$1, { as: "h5", children: drawerTitle }),
          /* @__PURE__ */ jsx(
            ActionIcon,
            {
              size: "sm",
              rounded: "full",
              variant: "text",
              title: "Close Filter",
              onClick: () => setOpenDrawer(false),
              children: /* @__PURE__ */ jsx(PiXBold, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full", children }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "lg",
            onClick: () => setOpenDrawer(false),
            className: "mt-5 h-11 w-full text-sm",
            children: "Show Results"
          }
        )
      ] })
    }
  );
}
function ToggleColumns({
  table
}) {
  return /* @__PURE__ */ jsxs(Popover, { shadow: "sm", placement: "bottom-end", children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsx(
      ActionIcon,
      {
        variant: "outline",
        title: "Toggle Columns",
        className: "h-9 p-1",
        children: /* @__PURE__ */ jsx(PiTextColumns, { strokeWidth: 3, className: "size-6" })
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Content, { className: "z-0", children: /* @__PURE__ */ jsxs("div", { className: "p-2 text-left rtl:text-right", children: [
      /* @__PURE__ */ jsx(Title$1, { as: "h6", className: "mb-6 px-0.5 text-sm font-semibold", children: "Toggle Columns" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-6", children: table.getAllLeafColumns().map((column) => {
        return typeof column.columnDef.header === "string" && column.columnDef.header.length > 0 && /* @__PURE__ */ jsx(
          Checkbox,
          {
            label: /* @__PURE__ */ jsx(Fragment$1, { children: column.columnDef.header }),
            checked: column.getIsVisible(),
            onChange: column.getToggleVisibilityHandler()
          },
          column.id
        );
      }) })
    ] }) })
  ] });
}
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
var SubscriptionContractStatus = /* @__PURE__ */ ((SubscriptionContractStatus2) => {
  SubscriptionContractStatus2["ACTIVE"] = "active";
  SubscriptionContractStatus2["CANCELLED"] = "cancelled";
  SubscriptionContractStatus2["EXPIRED"] = "expired";
  SubscriptionContractStatus2["FAILED"] = "failed";
  SubscriptionContractStatus2["PAUSED"] = "paused";
  return SubscriptionContractStatus2;
})(SubscriptionContractStatus || {});
const statusLabels = {
  [
    "active"
    /* ACTIVE */
  ]: "Active",
  [
    "cancelled"
    /* CANCELLED */
  ]: "Cancelled",
  [
    "expired"
    /* EXPIRED */
  ]: "Expired",
  [
    "failed"
    /* FAILED */
  ]: "Failed",
  [
    "paused"
    /* PAUSED */
  ]: "Paused"
};
var SubscriptionContractLastBillingErrorType = /* @__PURE__ */ ((SubscriptionContractLastBillingErrorType2) => {
  SubscriptionContractLastBillingErrorType2["CUSTOMER_ERROR"] = "CUSTOMER_ERROR";
  SubscriptionContractLastBillingErrorType2["PAYMENT_ERROR"] = "PAYMENT_ERROR";
  SubscriptionContractLastBillingErrorType2["INVENTORY_ERROR"] = "INVENTORY_ERROR";
  SubscriptionContractLastBillingErrorType2["OTHER"] = "OTHER";
  return SubscriptionContractLastBillingErrorType2;
})(SubscriptionContractLastBillingErrorType || {});
const lastBillingErrorTypeLabels = {
  [
    "CUSTOMER_ERROR"
    /* CUSTOMER_ERROR */
  ]: "Customer Error",
  [
    "PAYMENT_ERROR"
    /* PAYMENT_ERROR */
  ]: "Payment Error",
  [
    "INVENTORY_ERROR"
    /* INVENTORY_ERROR */
  ]: "Inventory Error",
  [
    "OTHER"
    /* OTHER */
  ]: "Other"
};
function Filters$1({
  table,
  filtersHanlder
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;
  const { handleQuerySearch, handleStatusChange } = filtersHanlder;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);
  useState({});
  const [searchBy, setSearchBy] = useState("");
  useRef();
  const [placeholderMappingState, setPlaceholderMapping] = useState("Search for anything...");
  const SearchByOptions = [
    { label: "All", value: "all" },
    { label: "Customer Email", value: "customer_email" },
    { label: "Subscription ID", value: "id" },
    { label: "Product ID", value: "productId" },
    { label: "Variant ID", value: "variantId" }
  ];
  const clearFilters = () => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
    setSearchValue("");
    handleQuerySearch("");
    handleStatusChange(null);
    setSearchParams({});
  };
  const placeholderMapping = {
    "all": "Search for anything...",
    "customer_email": "johndoe@gmail.com",
    "id": "12345",
    "productId": "Product ID 12345",
    "variantId": "Variant Id 12345"
  };
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };
  return /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "between", className: "mb-4", children: [
    /* @__PURE__ */ jsxs(Box$1, { className: "flex items-center gap-3 flex-grow", children: [
      /* @__PURE__ */ jsx(
        Select$1,
        {
          placeholder: "Search By ",
          label: "",
          options: SearchByOptions,
          value: searchBy,
          onChange: (option) => {
            setSearchValue("");
            setPlaceholderMapping(placeholderMapping[option.value]);
            setSearchBy(option.value);
          },
          className: "w-[25%]"
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "search",
          placeholder: placeholderMappingState,
          value: searchValue,
          onClear: () => {
            clearFilters();
            setSearchValue("");
          },
          onChange: (e) => handleSearchValue(e.target.value),
          inputClassName: "h-9",
          clearable: true,
          prefix: /* @__PURE__ */ jsx(PiMagnifyingGlassBold, { className: "size-4" }),
          className: "w-[50%]"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          onClick: () => {
            SearchByOptions.forEach((option) => searchParams.delete(option.value));
            handleQuerySearch(debouncedSearch, searchBy, SearchByOptions);
          },
          className: "h-9",
          children: "Search"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      FilterDrawerView,
      {
        isOpen: openDrawer,
        drawerTitle: messages.products.filters.title,
        setOpenDrawer,
        children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: /* @__PURE__ */ jsx(FilterElements$1, { table, filtersHanlder }) })
      }
    ),
    /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "3", className: "w-auto", children: [
      isMultipleSelected ? /* @__PURE__ */ jsxs(
        Button,
        {
          color: "danger",
          variant: "outline",
          className: "h-[34px] gap-2 text-sm",
          onClick: () => {
          },
          children: [
            /* @__PURE__ */ jsx(PiTrash, { size: 18 }),
            "Delete"
          ]
        }
      ) : null,
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => setOpenDrawer(!openDrawer),
          className: "h-9 pe-3 ps-2.5",
          children: [
            /* @__PURE__ */ jsx(PiFunnel, { className: "me-1.5 size-[18px]", strokeWidth: 1.7 }),
            "Filters"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(Button, { variant: "flat", className: "h-9 bg-gray-200/70", onClick: clearFilters, children: [
        /* @__PURE__ */ jsx(PiTrashDuotone, { className: "me-1.5 h-[17px] w-[17px]" }),
        " Clear Filters"
      ] }),
      /* @__PURE__ */ jsx(ToggleColumns, { table })
    ] })
  ] });
}
function FilterElements$1({
  table,
  filtersHanlder
}) {
  const { handleStatusChange, handleUpdatedDateChange, handleCreatedDateChange, handleLastBillingAttemptErrorChange } = filtersHanlder;
  const [searchParams] = useSearchParams();
  const statusOptions2 = Object.values(SubscriptionContractStatus).map((status) => ({
    value: status,
    label: statusLabels[status]
  }));
  const lastBillingAttemptErrorOptions = Object.values(SubscriptionContractLastBillingErrorType).map((status) => ({
    value: status,
    label: lastBillingErrorTypeLabels[status]
  }));
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      StatusField,
      {
        options: statusOptions2,
        value: searchParams.get("status"),
        onChange: (value) => {
          handleStatusChange(value);
        },
        getOptionValue: (option) => option.value,
        getOptionDisplayValue: (option) => renderOptionDisplayValue$1(option.value),
        displayValue: (selected) => renderOptionDisplayValue$1(selected),
        dropdownClassName: "!z-20 h-auto top-15",
        className: "w-auto",
        label: `${messages.products.filters.status.title}`
      }
    ),
    /* @__PURE__ */ jsx(
      DatePicker,
      {
        selected: searchParams.get("updatedAt") ? new Date(searchParams.get("updatedAt")) : null,
        onChange: (date) => {
          const isoDate = date ? date.toISOString() : null;
          handleUpdatedDateChange(isoDate);
        },
        dateFormat: "yyyy-MM-dd'T'HH:mm:ss'Z'",
        placeholderText: "Select Updated Date",
        popperPlacement: "bottom-end",
        showMonthYearPicker: false,
        inputProps: {
          variant: "text",
          inputClassName: "rizzui-input-container flex items-center peer w-full transition duration-200 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
          label: "Select Updated Date"
        },
        className: "w-full"
      }
    ),
    /* @__PURE__ */ jsx(
      DatePicker,
      {
        selected: searchParams.get("createdAt") ? new Date(searchParams.get("createdAt")) : null,
        onChange: (date) => {
          const isoDate = date ? date.toISOString() : null;
          handleCreatedDateChange(isoDate);
        },
        dateFormat: "yyyy-MM-dd'T'HH:mm:ss'Z'",
        placeholderText: "Select Created Date",
        popperPlacement: "bottom-end",
        showMonthYearPicker: false,
        inputProps: {
          variant: "text",
          inputClassName: "rizzui-input-container flex items-center peer w-full transition duration-200 px-3.5 py-2 text-sm h-10 rounded-md border border-muted ring-muted bg-transparent",
          label: "Select Created Date"
        },
        className: "w-full"
      }
    ),
    /* @__PURE__ */ jsx(
      StatusField,
      {
        options: lastBillingAttemptErrorOptions,
        value: searchParams.get("lastBillingAttemptError"),
        onChange: (value) => {
          handleLastBillingAttemptErrorChange(value);
        },
        getOptionValue: (option) => option.value,
        getOptionDisplayValue: (option) => renderBillingAttemptError(option.value),
        displayValue: (selected) => renderBillingAttemptError(selected),
        dropdownClassName: "!z-20 h-auto top-15",
        className: "w-auto",
        label: `Billing Attempt Error`
      }
    )
  ] });
}
function renderBillingAttemptError(value) {
  switch (value) {
    case SubscriptionContractLastBillingErrorType.CUSTOMER_ERROR:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "warning", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-warning", children: "Customer Error" })
      ] });
    case SubscriptionContractLastBillingErrorType.INVENTORY_ERROR:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "danger", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-danger", children: "Inventory Error" })
      ] });
    case SubscriptionContractLastBillingErrorType.PAYMENT_ERROR:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "secondary", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-secondary", children: "Payment Error" })
      ] });
    case SubscriptionContractLastBillingErrorType.OTHER:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "secondary", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize", children: "Other Error" })
      ] });
  }
}
function renderOptionDisplayValue$1(value) {
  switch (value) {
    case SubscriptionContractStatus.ACTIVE:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "success", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-success", children: statusLabels[value] })
      ] });
    case SubscriptionContractStatus.CANCELLED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "warning", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-warning", children: statusLabels[value] })
      ] });
    case SubscriptionContractStatus.EXPIRED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "secondary", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-secondary", children: statusLabels[value] })
      ] });
    case SubscriptionContractStatus.FAILED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "danger", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-danger", children: statusLabels[value] })
      ] });
    case SubscriptionContractStatus.PAUSED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "info", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-info", children: statusLabels[value] })
      ] });
  }
}
function SubscriptionsTable({
  pageSize,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0 cursor-pointer"
  },
  paginationClassName,
  responseData
}) {
  const {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handleUpdatedDateChange,
    handleQuerySearch,
    handleLastBillingAttemptErrorChange,
    handleCreatedDateChange
  } = usePaginationAndFilterHandlers();
  useNavigate();
  console.log("responseData", responseData);
  const { response: { subscriptionContracts: { pageInfo } } } = responseData;
  const tableData = useMemo(() => responseData ? transformShopifyContract(responseData) : [], [responseData]);
  const { table, setData } = useTanStackTable({
    tableData,
    columnConfig: contractColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize
        }
      },
      enableColumnResizing: false
    }
  });
  table.getSelectedRowModel().rows.map((row) => row.original);
  function handleExportData() {
    console.log("handleExportData products table");
  }
  const filtersHanlder = {
    handleStatusChange,
    handleQuerySearch,
    handleUpdatedDateChange,
    handleCreatedDateChange,
    handleLastBillingAttemptErrorChange
  };
  useEffect(() => {
    setData(tableData);
  }, [tableData, setData]);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    !hideFilters && /* @__PURE__ */ jsx(Filters$1, { table, filtersHanlder }),
    /* @__PURE__ */ jsx(MainTable, { table, variant: "minimal", classNames }),
    !hideFooter && /* @__PURE__ */ jsx(TableFooter, { table, onExport: handleExportData }),
    !hidePagination && /* @__PURE__ */ jsx(
      TablePagination,
      {
        table,
        className: cn("py-4", paginationClassName),
        onPageSizeChange: handlePageSizeChange,
        pageInfo,
        onPageChange: (cursor, action2) => handlePageChange(cursor, action2)
      }
    )
  ] });
}
const transformShopifyContract = (responseData, navigate) => {
  const {
    response: {
      subscriptionContracts,
      shop: {
        currencyFormats: {
          moneyFormat
        }
      }
    }
  } = responseData;
  return subscriptionContracts.edges.map(({ node }) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return {
      id: extractNumericId(node.id),
      variantTitle: ((_a2 = node.lines.edges[0]) == null ? void 0 : _a2.node.variantTitle) || "Unknown Plan",
      quantity: ((_b = node.lines.edges[0]) == null ? void 0 : _b.node.quantity) || 1,
      lineDiscountedPrice: formatPrice(parseFloat((_d = (_c = node.lines.edges[0]) == null ? void 0 : _c.node.lineDiscountedPrice) == null ? void 0 : _d.amount), moneyFormat) || formatPrice(parseFloat("0.0"), moneyFormat),
      deliveryPolicyInterval: ((_e = node.deliveryPolicy) == null ? void 0 : _e.interval) || "N/A",
      deliveryPolicyIntervalCount: ((_f = node.deliveryPolicy) == null ? void 0 : _f.intervalCount) || 0,
      billingPolicyInterval: ((_g = node.billingPolicy) == null ? void 0 : _g.interval) || "N/A",
      billingPolicyIntervalCount: ((_h = node.billingPolicy) == null ? void 0 : _h.intervalCount) || 0,
      customerFirstName: ((_i = node.customer) == null ? void 0 : _i.firstName) || "Unknown",
      customerLastName: ((_j = node.customer) == null ? void 0 : _j.lastName) || "Unknown",
      customerName: ((_k = node.customer) == null ? void 0 : _k.displayName) || "Unknown",
      customerEmail: ((_l = node.customer) == null ? void 0 : _l.email) || "Unknown",
      status: node.status,
      moneyFormat,
      nextBillingDate: node.nextBillingDate,
      onRowClick: () => {
      }
    };
  });
};
const pageHeader$1 = {
  title: "Subscriptions",
  breadcrumb: [
    {
      href: routes$1.subscriptions.dashboard,
      name: "Products"
    },
    {
      name: "List"
    }
  ]
};
const SubscriptionsList = ({ responseData, first }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: pageHeader$1.title, breadcrumb: pageHeader$1.breadcrumb, children: /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-3 lg:mt-0", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: routes$1.subscriptions.dashboard,
        className: "w-full lg:w-auto"
      }
    ) }) }),
    /* @__PURE__ */ jsx(SubscriptionsTable, { responseData, pageSize: first })
  ] });
};
var ProductStatus = /* @__PURE__ */ ((ProductStatus2) => {
  ProductStatus2["ACTIVE"] = "ACTIVE";
  ProductStatus2["ARCHIVED"] = "ARCHIVED";
  ProductStatus2["DRAFT"] = "DRAFT";
  return ProductStatus2;
})(ProductStatus || {});
var ProductPublicationStatus = /* @__PURE__ */ ((ProductPublicationStatus2) => {
  ProductPublicationStatus2["APPROVED"] = "approved";
  ProductPublicationStatus2["REJECTED"] = "rejected";
  ProductPublicationStatus2["NEEDS_ACTION"] = "needs_action";
  ProductPublicationStatus2["AWAITING_REVIEW"] = "awaiting_review";
  ProductPublicationStatus2["PUBLISHED"] = "published";
  ProductPublicationStatus2["DEMOTED"] = "demoted";
  ProductPublicationStatus2["SCHEDULED"] = "scheduled";
  ProductPublicationStatus2["PROVISIONALLY_PUBLISHED"] = "provisionally_published";
  return ProductPublicationStatus2;
})(ProductPublicationStatus || {});
const ProductPublicationStatusLabels = {
  [
    "approved"
    /* APPROVED */
  ]: "Approved",
  [
    "rejected"
    /* REJECTED */
  ]: "Rejected",
  [
    "needs_action"
    /* NEEDS_ACTION */
  ]: "Needs Action",
  [
    "awaiting_review"
    /* AWAITING_REVIEW */
  ]: "Awaiting Review",
  [
    "published"
    /* PUBLISHED */
  ]: "Published",
  [
    "demoted"
    /* DEMOTED */
  ]: "Demoted",
  [
    "scheduled"
    /* SCHEDULED */
  ]: "Scheduled",
  [
    "provisionally_published"
    /* PROVISIONALLY_PUBLISHED */
  ]: "Provisionally Published"
};
Object.values(ProductPublicationStatus).map((status) => ({
  value: status,
  label: ProductPublicationStatusLabels[status]
}));
const ProductStatusLabels = {
  [
    "ACTIVE"
    /* ACTIVE */
  ]: "Active",
  [
    "ARCHIVED"
    /* ARCHIVED */
  ]: "Archived",
  [
    "DRAFT"
    /* DRAFT */
  ]: "Draft"
};
const statusOptions = Object.values(ProductStatus).map((status) => ({
  value: status,
  label: ProductStatusLabels[status]
}));
var PublishedStatus = /* @__PURE__ */ ((PublishedStatus2) => {
  PublishedStatus2["PUBLISHED"] = "published";
  PublishedStatus2["UNPUBLISHED"] = "unpublished";
  return PublishedStatus2;
})(PublishedStatus || {});
const PublishedStatusLabels = {
  [
    "published"
    /* PUBLISHED */
  ]: "Published",
  [
    "unpublished"
    /* UNPUBLISHED */
  ]: "Unpublished"
};
const publishedStatusOptions = Object.values(PublishedStatus).map((status) => ({
  value: status,
  label: PublishedStatusLabels[status]
  // Use readable labels
}));
var MainAppFilters = /* @__PURE__ */ ((MainAppFilters2) => {
  MainAppFilters2["QUERY"] = "query";
  MainAppFilters2["STORESTATUS"] = "onlineStoreStatus";
  MainAppFilters2["CUSTOMEREMAIL"] = "customerEmail";
  MainAppFilters2["ID"] = "id";
  MainAppFilters2["STATUS"] = "status";
  MainAppFilters2["UPDATEDATE"] = "updatedAt";
  MainAppFilters2["CREATEDATE"] = "createdAt";
  MainAppFilters2["LASTBILLINGATTEMPTERROR"] = "lastBillingAttemptError";
  return MainAppFilters2;
})(MainAppFilters || {});
const loader$a = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const url = new URL(request.url);
  const first = Number(url.searchParams.get("first")) || 10;
  const action2 = url.searchParams.get("action");
  const cursor = url.searchParams.get("cursor") || null;
  const after = action2 === "next" ? cursor : null;
  const before = action2 === "prev" ? cursor : null;
  const filters = {
    query: url.searchParams.get("query") || void 0,
    onlineStoreStatus: url.searchParams.get("onlineStoreStatus") || void 0,
    customerEmail: url.searchParams.get("customer_email") || void 0,
    id: url.searchParams.get("id") || void 0,
    status: url.searchParams.get("status") || void 0,
    updatedAt: url.searchParams.get("updatedAt") || void 0,
    createdAt: url.searchParams.get("createdAt") || void 0,
    lastBillingAttemptError: url.searchParams.get("lastBillingAttemptError") || void 0
  };
  const shopifyQuery = generateShopifyQuery$1(filters);
  console.log(shopifyQuery, "shopifyQuery");
  const updatedRequest = mergeQueryParams(request, authData.query);
  const response = await authenticate.admin(updatedRequest);
  if (!response || !response.admin) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData$1(admin, { first, after, before }, shopifyQuery);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    response: criticalData,
    first
  };
};
const generateShopifyQuery$1 = (filters) => {
  const queryParts = [];
  let queryFilter = "";
  console.log(filters, "filters>>>>>>>>>>>");
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;
    console.log("key", key, "value", value);
    console.log("key", MainAppFilters.CUSTOMEREMAIL);
    switch (key) {
      case MainAppFilters.CUSTOMEREMAIL:
        queryFilter = `email:${value}`;
      case MainAppFilters.ID:
        queryFilter = `id:${value}`;
        break;
      case MainAppFilters.STATUS:
        queryFilter = `status:${value}`;
        break;
      case MainAppFilters.UPDATEDATE:
        queryFilter = `updated_at:${value}`;
        break;
      case MainAppFilters.CREATEDATE:
        queryFilter = `created_at:${value}`;
        break;
      case MainAppFilters.LASTBILLINGATTEMPTERROR:
        queryFilter = `last_billing_attempt_error_type:${value}`;
        break;
    }
  });
  if (queryFilter) {
    queryParts.push(queryFilter);
  }
  console.log(queryParts, "queryParts");
  return queryParts.length ? queryParts.join(" ") : null;
};
const loadCriticalData$1 = async (admin, pagination, query) => {
  const variables = generatePaginationVariables$1(pagination, query);
  console.log("Fetch Subscripionts Variables", variables);
  const [
    response,
    appResponse,
    shopResponse
  ] = await Promise.all([
    admin.graphql(SUBSCRIPTION_CONTRACTS_QUERY, variables),
    admin.graphql(CURRENT_APP_INSTALLATION),
    admin.graphql(CURRENT_SHOP)
  ]);
  const [
    { data: { subscriptionContracts }, extensions },
    { data: { currentAppInstallation } },
    { data: { shop } }
  ] = await Promise.all([
    response.json(),
    appResponse.json(),
    shopResponse.json()
  ]);
  console.log(JSON.stringify(extensions));
  return { response: { subscriptionContracts, currentAppInstallation, shop } };
};
const generatePaginationVariables$1 = (pagination, query) => {
  const isGoingBack = !!pagination.before;
  let partialVariables = {
    reverse: true,
    query: query || void 0
  };
  if (isGoingBack) {
    partialVariables = {
      ...partialVariables,
      last: pagination.first,
      before: pagination.before
    };
  } else {
    partialVariables = {
      ...partialVariables,
      first: pagination.first,
      after: pagination.after
    };
  }
  return { variables: partialVariables };
};
const Subscriptions = () => {
  const { apiKey, response, first } = useLoaderData();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(SubscriptionsList, { responseData: response, first });
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Subscriptions,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};
const Analytics$1 = ({ Products: Products2 = [] }) => {
  const { apiKey } = useLoaderData();
  return /* @__PURE__ */ jsx(AppProvider, { isEmbeddedApp: false, apiKey, children: /* @__PURE__ */ jsx("h1", { children: "Selling Plan" }) });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Analytics$1,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};
const Analytics = ({ Products: Products2 = [] }) => {
  useLoaderData();
  return /* @__PURE__ */ jsx("h1", { children: "Analytics" });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Analytics,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
function replaceUnderscoreDash(str) {
  return str.replace(/[_-]/g, " ");
}
const statusColors$1 = {
  success: ["text-green-dark", "bg-green-dark"],
  warning: ["text-orange-dark", "bg-orange-dark"],
  danger: ["text-red-dark", "bg-red-dark"],
  default: ["text-gray-600", "bg-gray-600"]
};
const allStatus = {
  online: statusColors$1.success,
  offline: statusColors$1.default,
  pending: statusColors$1.warning,
  paid: statusColors$1.success,
  overdue: statusColors$1.danger,
  completed: statusColors$1.success,
  cancelled: statusColors$1.danger,
  publish: statusColors$1.success,
  unpublished: statusColors$1.danger,
  approved: statusColors$1.success,
  rejected: statusColors$1.danger,
  active: statusColors$1.success,
  deactivated: statusColors$1.danger,
  on_going: statusColors$1.warning,
  at_risk: statusColors$1.danger,
  delayed: statusColors$1.default,
  draft: statusColors$1.default,
  refunded: statusColors$1.default
};
function getStatusBadge(status) {
  const statusLower = status.toLowerCase();
  if (statusLower in allStatus) {
    return /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "2", className: "w-auto", children: [
      /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, className: allStatus[statusLower][1] }),
      /* @__PURE__ */ jsx(
        Text,
        {
          className: cn("font-medium capitalize", allStatus[statusLower][0]),
          children: replaceUnderscoreDash(statusLower)
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "2", className: "w-auto", children: [
    /* @__PURE__ */ jsx(Badge$1, { renderAsDot: true, className: "bg-gray-600" }),
    /* @__PURE__ */ jsx(Text, { className: "font-medium capitalize text-gray-600", children: replaceUnderscoreDash(statusLower) })
  ] });
}
function AvatarCard({
  src,
  name,
  className,
  description,
  avatarProps,
  nameClassName
}) {
  return /* @__PURE__ */ jsxs("figure", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ jsx(Avatar, { name, src, ...avatarProps }),
    /* @__PURE__ */ jsxs("figcaption", { className: "grid gap-0.5", children: [
      /* @__PURE__ */ jsx(
        Text,
        {
          className: cn(
            "font-lexend text-sm font-medium text-gray-900 dark:text-gray-700",
            nameClassName
          ),
          children: name
        }
      ),
      description && /* @__PURE__ */ jsx(Text, { className: "text-[13px] text-gray-500", children: description })
    ] })
  ] });
}
const statusColors = {
  subscription: ["text-blue-600", "bg-blue-600"],
  onetime: ["text-gray-600", "bg-gray-600"]
};
function getPurchaseTypeBadge(purchaseType) {
  const { oneTime, subscriptions } = purchaseType;
  if (!oneTime && !subscriptions) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Flex, { direction: subscriptions && oneTime ? "col" : "row", justify: "center", align: "center", gap: "2", className: "w-auto", children: [
    subscriptions && /* @__PURE__ */ jsx(Badge$1, { className: cn("px-2 py-1 text-white", statusColors.subscription[1]), children: replaceUnderscoreDash("Subscription") }),
    oneTime && /* @__PURE__ */ jsx(Badge$1, { className: cn("px-2 py-1 text-white", statusColors.onetime[1]), children: replaceUnderscoreDash("One-Time") })
  ] });
}
function formatDate(date, format = "DD MMM, YYYY") {
  if (!date) return "";
  return dayjs(date).format(format);
}
function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = "MMMM D, YYYY",
  timeFormat = "h:mm A"
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-1", className), children: [
    /* @__PURE__ */ jsx(
      "time",
      {
        dateTime: formatDate(date, "YYYY-MM-DD"),
        className: cn("font-medium text-gray-700", dateClassName),
        children: formatDate(date, dateFormat)
      }
    ),
    /* @__PURE__ */ jsx(
      "time",
      {
        dateTime: formatDate(date, "HH:mm:ss"),
        className: cn("text-[13px] text-gray-500", timeClassName),
        children: formatDate(date, timeFormat)
      }
    )
  ] });
}
const columnHelper = createColumnHelper();
const productsListColumns = [
  columnHelper.display({
    id: "select",
    size: 50,
    header: ({ table }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select all rows",
        checked: table.getIsAllPageRowsSelected(),
        onChange: () => table.toggleAllPageRowsSelected()
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ jsx(
      Checkbox,
      {
        className: "ps-3.5",
        "aria-label": "Select row",
        checked: row.getIsSelected(),
        onChange: () => row.toggleSelected()
      }
    )
  }),
  columnHelper.display({
    id: "product",
    size: 300,
    header: "Product",
    cell: ({ row }) => /* @__PURE__ */ jsx(
      AvatarCard,
      {
        src: row.original.image.url || "",
        name: row.original.title,
        description: `${row.original.variantsCount} variants`,
        avatarProps: {
          name: row.original.title,
          size: "lg",
          className: "rounded-lg"
        }
      }
    )
  }),
  columnHelper.display({
    id: "status",
    size: 150,
    header: "Shopify status",
    enableSorting: false,
    cell: ({ row }) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "Product" }),
        /* @__PURE__ */ jsx("span", { children: getStatusBadge(row.original.status) })
      ] }) });
    }
  }),
  columnHelper.display({
    id: "purchase_type",
    size: 150,
    header: "Purchase types",
    cell: ({ row }) => {
      const { purchaseType } = row.original;
      return getPurchaseTypeBadge(purchaseType);
    }
  }),
  columnHelper.display({
    id: "frquencies",
    size: 150,
    header: "Selling Plans ",
    cell: ({ row }) => /* @__PURE__ */ jsx(Text, { className: "text-sm", children: row.original.sellingPlanGroupsCount })
  }),
  columnHelper.display({
    id: "createdAt",
    size: 150,
    header: "Created At",
    cell: ({ row }) => /* @__PURE__ */ jsx(DateCell, { date: new Date(row.original.createdAt) })
  })
];
function Filters({
  table,
  filtersHanlder
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;
  const { handleQuerySearch, handleStatusChange, handlePublishedStatusChange } = filtersHanlder;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);
  useEffect(() => {
    handleQuerySearch(debouncedSearch);
  }, [debouncedSearch]);
  const clearFilters = () => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
    setSearchValue("");
    handleQuerySearch("");
    handleStatusChange(null);
    handlePublishedStatusChange("");
    setSearchParams({});
  };
  return /* @__PURE__ */ jsxs(Flex, { align: "center", justify: "between", className: "mb-4", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "search",
        placeholder: messages.products.filters.search.placeholder,
        value: searchValue,
        onClear: () => setSearchValue(""),
        onChange: (e) => setSearchValue(e.target.value),
        inputClassName: "h-9",
        clearable: true,
        prefix: /* @__PURE__ */ jsx(PiMagnifyingGlassBold, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      FilterDrawerView,
      {
        isOpen: openDrawer,
        drawerTitle: messages.products.filters.title,
        setOpenDrawer,
        children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: /* @__PURE__ */ jsx(FilterElements, { table, filtersHanlder }) })
      }
    ),
    /* @__PURE__ */ jsxs(Flex, { align: "center", gap: "3", className: "w-auto", children: [
      isMultipleSelected ? /* @__PURE__ */ jsxs(
        Button,
        {
          color: "danger",
          variant: "outline",
          className: "h-[34px] gap-2 text-sm",
          onClick: () => {
          },
          children: [
            /* @__PURE__ */ jsx(PiTrash, { size: 18 }),
            "Delete"
          ]
        }
      ) : null,
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => setOpenDrawer(!openDrawer),
          className: "h-9 pe-3 ps-2.5",
          children: [
            /* @__PURE__ */ jsx(PiFunnel, { className: "me-1.5 size-[18px]", strokeWidth: 1.7 }),
            "Filters"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(Button, { variant: "flat", className: "h-9 bg-gray-200/70", onClick: clearFilters, children: [
        /* @__PURE__ */ jsx(PiTrashDuotone, { className: "me-1.5 h-[17px] w-[17px]" }),
        " Clear Filters"
      ] }),
      /* @__PURE__ */ jsx(ToggleColumns, { table })
    ] })
  ] });
}
function FilterElements({
  table,
  filtersHanlder
}) {
  const { handleStatusChange, handlePublishedStatusChange } = filtersHanlder;
  const [searchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      StatusField,
      {
        options: statusOptions,
        value: searchParams.get("status"),
        onChange: (value) => {
          handleStatusChange(value);
        },
        getOptionValue: (option) => option.value,
        getOptionDisplayValue: (option) => renderOptionDisplayValue(option.value),
        displayValue: (selected) => renderOptionDisplayValue(selected),
        dropdownClassName: "!z-20 h-auto top-15",
        className: "w-auto",
        label: `${messages.products.filters.status.title}`
      }
    ),
    /* @__PURE__ */ jsx(
      StatusField,
      {
        options: publishedStatusOptions,
        value: searchParams.get("onlineStoreStatus"),
        onChange: (value) => {
          handlePublishedStatusChange(value);
        },
        getOptionValue: (option) => option.value,
        getOptionDisplayValue: (option) => renderPublishedStatusOption(option.value),
        displayValue: (selected) => renderPublishedStatusOption(selected),
        dropdownClassName: "!z-20 h-auto top-15",
        className: "w-auto",
        label: `${messages.products.filters.publishedStatus.title}`
      }
    )
  ] });
}
function renderPublishedStatusOption(value) {
  switch (value) {
    case PublishedStatus.PUBLISHED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "success", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-green-dark", children: PublishedStatusLabels[value] })
      ] });
    case PublishedStatus.UNPUBLISHED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "danger", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-red-dark", children: PublishedStatusLabels[value] })
      ] });
  }
}
function renderOptionDisplayValue(value) {
  switch (value) {
    case ProductStatus.ACTIVE:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "success", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-green-dark", children: ProductStatusLabels[value] })
      ] });
    case ProductStatus.ARCHIVED:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "warning", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-orange-dark", children: ProductStatusLabels[value] })
      ] });
    case ProductStatus.DRAFT:
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Badge$1, { color: "danger", renderAsDot: true }),
        /* @__PURE__ */ jsx(Text, { className: "ms-2 font-medium capitalize text-red-dark", children: ProductStatusLabels[value] })
      ] });
  }
}
function ProductsTable({
  pageSize,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0 cursor-pointer"
  },
  paginationClassName,
  responseData
}) {
  const {
    handlePageSizeChange,
    handlePageChange,
    handleStatusChange,
    handlePublishedStatusChange,
    handleQuerySearch
  } = usePaginationAndFilterHandlers();
  const navigate = useNavigate();
  const { response: { products: { pageInfo } } } = responseData;
  const tableData = useMemo(() => responseData ? transformShopifyProducts(responseData, navigate) : [], [responseData]);
  const { table, setData } = useTanStackTable({
    tableData,
    columnConfig: productsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize
        }
      },
      enableColumnResizing: false
    }
  });
  table.getSelectedRowModel().rows.map((row) => row.original);
  function handleExportData() {
    console.log("handleExportData products table");
  }
  const filtersHanlder = {
    handleStatusChange,
    handleQuerySearch,
    handlePublishedStatusChange
  };
  useEffect(() => {
    setData(tableData);
  }, [tableData, setData]);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    !hideFilters && /* @__PURE__ */ jsx(Filters, { table, filtersHanlder }),
    /* @__PURE__ */ jsx(MainTable, { table, variant: "modern", classNames }),
    !hideFooter && /* @__PURE__ */ jsx(TableFooter, { table, onExport: handleExportData }),
    !hidePagination && /* @__PURE__ */ jsx(
      TablePagination,
      {
        table,
        className: cn("py-4", paginationClassName),
        onPageSizeChange: handlePageSizeChange,
        pageInfo,
        onPageChange: (cursor, action2) => handlePageChange(cursor, action2)
      }
    )
  ] });
}
const transformShopifyProducts = (responseData, navigate) => {
  const { response: { products } } = responseData;
  return products.edges.map(({ node }) => {
    var _a2, _b, _c, _d, _e;
    return {
      id: node.id,
      // Ensure each row has a unique `id`
      title: node.title,
      handle: node.handle,
      createdAt: node.createdAt,
      requiresSellingPlan: node.requiresSellingPlan,
      status: node.status,
      image: {
        url: (_c = (_b = (_a2 = node.featuredMedia) == null ? void 0 : _a2.preview) == null ? void 0 : _b.image) == null ? void 0 : _c.url,
        alt: (_d = node.featuredMedia) == null ? void 0 : _d.alt
      },
      variantsCount: (_e = node == null ? void 0 : node.variantsCount) == null ? void 0 : _e.count,
      onlineStorePreviewUrl: node == null ? void 0 : node.onlineStorePreviewUrl,
      numericId: extractNumericId(node.id),
      purchaseType: getSellingPlanGroups(node, responseData),
      sellingPlanGroupsCount: getSellingPlanGroupsCount(node, responseData),
      onRowClick: () => navigate(`/merchant/products/${extractNumericId(node.id)}`)
    };
  });
};
const getSellingPlanGroupsCount = (node, responseData) => {
  var _a2, _b, _c;
  const appIdGraphQL = ((_c = (_b = (_a2 = responseData == null ? void 0 : responseData.response) == null ? void 0 : _a2.currentAppInstallation) == null ? void 0 : _b.app) == null ? void 0 : _c.id) || "";
  const appIdNumeric = extractNumericId(appIdGraphQL);
  const filteredPlans = node.sellingPlanGroups.edges.filter(
    (edge) => extractNumericId(edge.node.appId) === appIdNumeric
  );
  return filteredPlans.length;
};
const getSellingPlanGroups = (node, responseData) => {
  var _a2, _b, _c, _d, _e;
  if (!((_b = (_a2 = node == null ? void 0 : node.sellingPlanGroups) == null ? void 0 : _a2.edges) == null ? void 0 : _b.length)) {
    return { oneTime: false, subscriptions: false };
  }
  const appIdGraphQL = ((_e = (_d = (_c = responseData == null ? void 0 : responseData.response) == null ? void 0 : _c.currentAppInstallation) == null ? void 0 : _d.app) == null ? void 0 : _e.id) || "";
  const appIdNumeric = extractNumericId(appIdGraphQL);
  const filteredPlans = node.sellingPlanGroups.edges.filter(
    (edge) => extractNumericId(edge.node.appId) === appIdNumeric
  );
  const hasOneTimeGroup = Boolean(getSellingPlanGroup(filteredPlans, "Onetime Plan Group"));
  const hasSubscriptionGroups = Boolean(getSellingPlanGroup(filteredPlans, "PayPerShipment Plan Group")) || Boolean(getSellingPlanGroup(filteredPlans, "PrePaid Plan Group"));
  return {
    oneTime: hasOneTimeGroup,
    subscriptions: hasSubscriptionGroups
  };
};
const pageHeader = {
  title: "Products",
  breadcrumb: [
    {
      href: routes$1.products.products,
      name: "Products"
    },
    {
      name: "List"
    }
  ]
};
function Products({
  responseData,
  first
}) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(PageHeader, { title: pageHeader.title, breadcrumb: pageHeader.breadcrumb, children: /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-3 lg:mt-0", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: routes$1.products.products,
        className: "w-full lg:w-auto"
      }
    ) }) }),
    /* @__PURE__ */ jsx(ProductsTable, { responseData, pageSize: first })
  ] });
}
var ProductSortKeys = /* @__PURE__ */ ((ProductSortKeys2) => {
  ProductSortKeys2["ID"] = "ID";
  ProductSortKeys2["TITLE"] = "TITLE";
  ProductSortKeys2["VENDOR"] = "VENDOR";
  ProductSortKeys2["CREATED_AT"] = "CREATED_AT";
  ProductSortKeys2["UPDATED_AT"] = "UPDATED_AT";
  ProductSortKeys2["PUBLISHED_AT"] = "PUBLISHED_AT";
  ProductSortKeys2["BEST_SELLING"] = "BEST_SELLING";
  ProductSortKeys2["PRICE"] = "PRICE";
  return ProductSortKeys2;
})(ProductSortKeys || {});
const loader$7 = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const url = new URL(request.url);
  const first = Number(url.searchParams.get("first")) || 10;
  const action2 = url.searchParams.get("action");
  const cursor = url.searchParams.get("cursor") || null;
  const after = action2 === "next" ? cursor : null;
  const before = action2 === "prev" ? cursor : null;
  const filters = {
    status: url.searchParams.get("status") || void 0,
    query: url.searchParams.get("query") || void 0,
    onlineStoreStatus: url.searchParams.get("onlineStoreStatus") || void 0
  };
  const shopifyQuery = generateShopifyQuery(filters);
  const updatedRequest = mergeQueryParams(request, authData.query);
  const response = await authenticate.admin(updatedRequest);
  if (!response || !response.admin) {
    throw new Error("Authentication failed: Admin data missing");
  }
  const { admin } = response;
  const criticalData = await loadCriticalData(admin, { first, after, before }, shopifyQuery);
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    response: criticalData,
    first
  };
};
const loadCriticalData = async (admin, pagination, query) => {
  const variables = generatePaginationVariables(pagination, query);
  const [
    response,
    appResponse,
    shopResponse
  ] = await Promise.all([
    admin.graphql(PRODUCTS_QUERY, variables),
    admin.graphql(CURRENT_APP_INSTALLATION),
    admin.graphql(CURRENT_SHOP)
  ]);
  const [
    { data: { products } },
    { data: { currentAppInstallation } },
    { data: { shop } }
  ] = await Promise.all([
    response.json(),
    appResponse.json(),
    shopResponse.json()
  ]);
  return { response: { products, currentAppInstallation, shop } };
};
const generateShopifyQuery = (filters) => {
  const queryParts = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;
    switch (key) {
      case MainAppFilters.QUERY:
        queryParts.push(`${value}`);
        break;
      case MainAppFilters.STORESTATUS:
      default:
        queryParts.push(`published_status:"${value}"`);
        break;
    }
  });
  return queryParts.length ? queryParts.join(" ") : null;
};
const generatePaginationVariables = (pagination, query) => {
  const isGoingBack = !!pagination.before;
  let partialVariables = {
    reverse: true,
    sortKey: ProductSortKeys.PUBLISHED_AT,
    query: query || void 0
  };
  if (isGoingBack) {
    partialVariables = {
      ...partialVariables,
      last: pagination.first,
      before: pagination.before
    };
  } else {
    partialVariables = {
      ...partialVariables,
      first: pagination.first,
      after: pagination.after
    };
  }
  return { variables: partialVariables };
};
const Home$1 = () => {
  const { apiKey, response, first } = useLoaderData();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(Products, { responseData: response, first });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home$1,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const authData = await getAuthCookie(cookieHeader);
  if (!authData) {
    throw redirect("/auth/login");
  }
  const updatedRequest = mergeQueryParams(request, authData.query);
  await authenticate.admin(updatedRequest);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};
const Home = () => {
  useLoaderData();
  return /* @__PURE__ */ jsx("h1", { children: "Home" });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request }) => {
  await authenticate.admin(request);
  const url = new URL(request.url);
  const queryString = url.searchParams.toString();
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");
  const subscriptionId = url.searchParams.get("id");
  if (shop && host && subscriptionId) {
    const cookieData = {
      shop,
      host,
      query: queryString
    };
    const cookieHeader = await setAuthCookie(cookieData);
    return redirect(`/merchant/subscriptions/${subscriptionId}`, {
      headers: {
        "Set-Cookie": cookieHeader
      }
    });
  } else {
    throw redirect("/auth/login");
  }
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const Polaris = {
  ActionMenu: {
    Actions: {
      moreActions: "More actions"
    },
    RollupActions: {
      rollupButton: "View actions"
    }
  },
  ActionList: {
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search",
      placeholder: "Search actions"
    }
  },
  Avatar: {
    label: "Avatar",
    labelWithInitials: "Avatar with initials {initials}"
  },
  Autocomplete: {
    spinnerAccessibilityLabel: "Loading",
    ellipsis: "{content}…"
  },
  Badge: {
    PROGRESS_LABELS: {
      incomplete: "Incomplete",
      partiallyComplete: "Partially complete",
      complete: "Complete"
    },
    TONE_LABELS: {
      info: "Info",
      success: "Success",
      warning: "Warning",
      critical: "Critical",
      attention: "Attention",
      "new": "New",
      readOnly: "Read-only",
      enabled: "Enabled"
    },
    progressAndTone: "{toneLabel} {progressLabel}"
  },
  Banner: {
    dismissButton: "Dismiss notification"
  },
  Button: {
    spinnerAccessibilityLabel: "Loading"
  },
  Common: {
    checkbox: "checkbox",
    undo: "Undo",
    cancel: "Cancel",
    clear: "Clear",
    close: "Close",
    submit: "Submit",
    more: "More"
  },
  ContextualSaveBar: {
    save: "Save",
    discard: "Discard"
  },
  DataTable: {
    sortAccessibilityLabel: "sort {direction} by",
    navAccessibilityLabel: "Scroll table {direction} one column",
    totalsRowHeading: "Totals",
    totalRowHeading: "Total"
  },
  DatePicker: {
    previousMonth: "Show previous month, {previousMonthName} {showPreviousYear}",
    nextMonth: "Show next month, {nextMonth} {nextYear}",
    today: "Today ",
    start: "Start of range",
    end: "End of range",
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    },
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    daysAbbreviated: {
      monday: "Mo",
      tuesday: "Tu",
      wednesday: "We",
      thursday: "Th",
      friday: "Fr",
      saturday: "Sa",
      sunday: "Su"
    }
  },
  DiscardConfirmationModal: {
    title: "Discard all unsaved changes",
    message: "If you discard changes, you’ll delete any edits you made since you last saved.",
    primaryAction: "Discard changes",
    secondaryAction: "Continue editing"
  },
  DropZone: {
    single: {
      overlayTextFile: "Drop file to upload",
      overlayTextImage: "Drop image to upload",
      overlayTextVideo: "Drop video to upload",
      actionTitleFile: "Add file",
      actionTitleImage: "Add image",
      actionTitleVideo: "Add video",
      actionHintFile: "or drop file to upload",
      actionHintImage: "or drop image to upload",
      actionHintVideo: "or drop video to upload",
      labelFile: "Upload file",
      labelImage: "Upload image",
      labelVideo: "Upload video"
    },
    allowMultiple: {
      overlayTextFile: "Drop files to upload",
      overlayTextImage: "Drop images to upload",
      overlayTextVideo: "Drop videos to upload",
      actionTitleFile: "Add files",
      actionTitleImage: "Add images",
      actionTitleVideo: "Add videos",
      actionHintFile: "or drop files to upload",
      actionHintImage: "or drop images to upload",
      actionHintVideo: "or drop videos to upload",
      labelFile: "Upload files",
      labelImage: "Upload images",
      labelVideo: "Upload videos"
    },
    errorOverlayTextFile: "File type is not valid",
    errorOverlayTextImage: "Image type is not valid",
    errorOverlayTextVideo: "Video type is not valid"
  },
  EmptySearchResult: {
    altText: "Empty search results"
  },
  Frame: {
    skipToContent: "Skip to content",
    navigationLabel: "Navigation",
    Navigation: {
      closeMobileNavigationLabel: "Close navigation"
    }
  },
  FullscreenBar: {
    back: "Back",
    accessibilityLabel: "Exit fullscreen mode"
  },
  Filters: {
    moreFilters: "More filters",
    moreFiltersWithCount: "More filters ({count})",
    filter: "Filter {resourceName}",
    noFiltersApplied: "No filters applied",
    cancel: "Cancel",
    done: "Done",
    clearAllFilters: "Clear all filters",
    clear: "Clear",
    clearLabel: "Clear {filterName}",
    addFilter: "Add filter",
    clearFilters: "Clear all",
    searchInView: "in:{viewName}"
  },
  FilterPill: {
    clear: "Clear",
    unsavedChanges: "Unsaved changes - {label}"
  },
  IndexFilters: {
    searchFilterTooltip: "Search and filter",
    searchFilterTooltipWithShortcut: "Search and filter (F)",
    searchFilterAccessibilityLabel: "Search and filter results",
    sort: "Sort your results",
    addView: "Add a new view",
    newView: "Custom search",
    SortButton: {
      ariaLabel: "Sort the results",
      tooltip: "Sort",
      title: "Sort by",
      sorting: {
        asc: "Ascending",
        desc: "Descending",
        az: "A-Z",
        za: "Z-A"
      }
    },
    EditColumnsButton: {
      tooltip: "Edit columns",
      accessibilityLabel: "Customize table column order and visibility"
    },
    UpdateButtons: {
      cancel: "Cancel",
      update: "Update",
      save: "Save",
      saveAs: "Save as",
      modal: {
        title: "Save view as",
        label: "Name",
        sameName: "A view with this name already exists. Please choose a different name.",
        save: "Save",
        cancel: "Cancel"
      }
    }
  },
  IndexProvider: {
    defaultItemSingular: "Item",
    defaultItemPlural: "Items",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} are selected",
    selected: "{selectedItemsCount} selected",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}"
  },
  IndexTable: {
    emptySearchTitle: "No {resourceNamePlural} found",
    emptySearchDescription: "Try changing the filters or search term",
    onboardingBadgeText: "New",
    resourceLoadingAccessibilityLabel: "Loading {resourceNamePlural}…",
    selectAllLabel: "Select all {resourceNamePlural}",
    selected: "{selectedItemsCount} selected",
    undo: "Undo",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural}",
    selectItem: "Select {resourceName}",
    selectButtonText: "Select",
    sortAccessibilityLabel: "sort {direction} by"
  },
  Loading: {
    label: "Page loading bar"
  },
  Modal: {
    iFrameTitle: "body markup",
    modalWarning: "These required properties are missing from Modal: {missingProps}"
  },
  Page: {
    Header: {
      rollupActionsLabel: "View actions for {title}",
      pageReadyAccessibilityLabel: "{title}. This page is ready"
    }
  },
  Pagination: {
    previous: "Previous",
    next: "Next",
    pagination: "Pagination"
  },
  ProgressBar: {
    negativeWarningMessage: "Values passed to the progress prop shouldn’t be negative. Resetting {progress} to 0.",
    exceedWarningMessage: "Values passed to the progress prop shouldn’t exceed 100. Setting {progress} to 100."
  },
  ResourceList: {
    sortingLabel: "Sort by",
    defaultItemSingular: "item",
    defaultItemPlural: "items",
    showing: "Showing {itemsCount} {resource}",
    showingTotalCount: "Showing {itemsCount} of {totalItemsCount} {resource}",
    loading: "Loading {resource}",
    selected: "{selectedItemsCount} selected",
    allItemsSelected: "All {itemsLength}+ {resourceNamePlural} in your store are selected",
    allFilteredItemsSelected: "All {itemsLength}+ {resourceNamePlural} in this filter are selected",
    selectAllItems: "Select all {itemsLength}+ {resourceNamePlural} in your store",
    selectAllFilteredItems: "Select all {itemsLength}+ {resourceNamePlural} in this filter",
    emptySearchResultTitle: "No {resourceNamePlural} found",
    emptySearchResultDescription: "Try changing the filters or search term",
    selectButtonText: "Select",
    a11yCheckboxDeselectAllSingle: "Deselect {resourceNameSingular}",
    a11yCheckboxSelectAllSingle: "Select {resourceNameSingular}",
    a11yCheckboxDeselectAllMultiple: "Deselect all {itemsLength} {resourceNamePlural}",
    a11yCheckboxSelectAllMultiple: "Select all {itemsLength} {resourceNamePlural}",
    Item: {
      actionsDropdownLabel: "Actions for {accessibilityLabel}",
      actionsDropdown: "Actions dropdown",
      viewItem: "View details for {itemName}"
    },
    BulkActions: {
      actionsActivatorLabel: "Actions",
      moreActionsActivatorLabel: "More actions"
    }
  },
  SkeletonPage: {
    loadingLabel: "Page loading"
  },
  Tabs: {
    newViewAccessibilityLabel: "Create new view",
    newViewTooltip: "Create view",
    toggleTabsLabel: "More views",
    Tab: {
      rename: "Rename view",
      duplicate: "Duplicate view",
      edit: "Edit view",
      editColumns: "Edit columns",
      "delete": "Delete view",
      copy: "Copy of {name}",
      deleteModal: {
        title: "Delete view?",
        description: "This can’t be undone. {viewName} view will no longer be available in your admin.",
        cancel: "Cancel",
        "delete": "Delete view"
      }
    },
    RenameModal: {
      title: "Rename view",
      label: "Name",
      cancel: "Cancel",
      create: "Save",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    DuplicateModal: {
      title: "Duplicate view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    },
    CreateViewModal: {
      title: "Create new view",
      label: "Name",
      cancel: "Cancel",
      create: "Create view",
      errors: {
        sameName: "A view with this name already exists. Please choose a different name."
      }
    }
  },
  Tag: {
    ariaLabel: "Remove {children}"
  },
  TextField: {
    characterCount: "{count} characters",
    characterCountWithMaxLength: "{count} of {limit} characters used"
  },
  TooltipOverlay: {
    accessibilityLabel: "Tooltip: {label}"
  },
  TopBar: {
    toggleMenuLabel: "Toggle menu",
    SearchField: {
      clearButtonLabel: "Clear",
      search: "Search"
    }
  },
  MediaCard: {
    dismissButton: "Dismiss",
    popoverButton: "Actions"
  },
  VideoThumbnail: {
    playButtonA11yLabel: {
      "default": "Play video",
      defaultWithDuration: "Play video of length {duration}",
      duration: {
        hours: {
          other: {
            only: "{hourCount} hours",
            andMinutes: "{hourCount} hours and {minuteCount} minutes",
            andMinute: "{hourCount} hours and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hours, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hours, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hours, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hours, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hours and {secondCount} seconds",
            andSecond: "{hourCount} hours and {secondCount} second"
          },
          one: {
            only: "{hourCount} hour",
            andMinutes: "{hourCount} hour and {minuteCount} minutes",
            andMinute: "{hourCount} hour and {minuteCount} minute",
            minutesAndSeconds: "{hourCount} hour, {minuteCount} minutes, and {secondCount} seconds",
            minutesAndSecond: "{hourCount} hour, {minuteCount} minutes, and {secondCount} second",
            minuteAndSeconds: "{hourCount} hour, {minuteCount} minute, and {secondCount} seconds",
            minuteAndSecond: "{hourCount} hour, {minuteCount} minute, and {secondCount} second",
            andSeconds: "{hourCount} hour and {secondCount} seconds",
            andSecond: "{hourCount} hour and {secondCount} second"
          }
        },
        minutes: {
          other: {
            only: "{minuteCount} minutes",
            andSeconds: "{minuteCount} minutes and {secondCount} seconds",
            andSecond: "{minuteCount} minutes and {secondCount} second"
          },
          one: {
            only: "{minuteCount} minute",
            andSeconds: "{minuteCount} minute and {secondCount} seconds",
            andSecond: "{minuteCount} minute and {secondCount} second"
          }
        },
        seconds: {
          other: "{secondCount} seconds",
          one: "{secondCount} second"
        }
      }
    }
  }
};
const polarisTranslations = {
  Polaris
};
const polarisStyles = "/assets/styles-Cg-8NA1P.css";
function loginErrorMessage(loginErrors) {
  if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.MissingShop) {
    return { shop: "Please enter your shop domain to log in" };
  } else if ((loginErrors == null ? void 0 : loginErrors.shop) === LoginErrorType.InvalidShop) {
    return { shop: "Please enter a valid shop domain to log in" };
  }
  return {};
}
const links$1 = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$4 = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return { errors, polarisTranslations };
};
const action = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return {
    errors
  };
};
function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;
  return /* @__PURE__ */ jsx(AppProvider$1, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ jsx(Page, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsxs(FormLayout, { children: [
    /* @__PURE__ */ jsx(Text$2, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ jsx(
      TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ jsx(Button$2, { submit: true, children: "Log in" })
  ] }) }) }) }) });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Auth,
  links: links$1,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request }) => {
  const url = new URL(request.url);
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  } else throw redirect("/auth/login");
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{ rel: "stylesheet", href: polarisStyles }];
const loader$1 = async ({ request }) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};
function App() {
  const { apiKey } = useLoaderData();
  return /* @__PURE__ */ jsx(AppProvider, { isEmbeddedApp: false, apiKey, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function ErrorBoundary() {
  return boundary.error(useRouteError());
}
const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: App,
  headers,
  links,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function AdditionalPage() {
  return /* @__PURE__ */ jsxs(Page, { children: [
    /* @__PURE__ */ jsx(TitleBar, { title: "Additional page" }),
    /* @__PURE__ */ jsxs(Layout, { children: [
      /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ jsxs(Text$2, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ jsx(
            Link$1,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: true,
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsxs(Text$2, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ jsx(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ jsx(Code, { children: "<NavMenu>" }),
          " component found in ",
          /* @__PURE__ */ jsx(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ jsx(Text$2, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ jsx(List, { children: /* @__PURE__ */ jsx(List.Item, { children: /* @__PURE__ */ jsx(
          Link$1,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: true,
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ jsx(
    Box$2,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ jsx("code", { children })
    }
  );
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdditionalPage
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request }) => {
  const url = new URL(request.url);
  const queryString = url.searchParams.toString();
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");
  if (shop && host) {
    const cookieData = {
      shop,
      host,
      query: queryString
    };
    const cookieHeader = await setAuthCookie(cookieData);
    return redirect$1("/merchant/home", {
      headers: {
        "Set-Cookie": cookieHeader
      }
    });
  } else {
    throw redirect$1("/auth/login");
  }
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dx6uN-0j.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/components-DCDtNDXQ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CAlZ-3uK.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/components-DCDtNDXQ.js", "/assets/index-hoEkgPmj.js", "/assets/routes-C5ziuI-K.js", "/assets/index-CZBhWrIY.js", "/assets/index-xIj4AxVg.js", "/assets/dayjs.min-CiIypPr9.js", "/assets/modal-bge_ITEm.js"], "css": ["/assets/root-CSXic_Zd.css"] }, "routes/merchant.products_.$productId_.variant-plans": { "id": "routes/merchant.products_.$productId_.variant-plans", "parentId": "root", "path": "merchant/products/:productId/variant-plans", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.products_._productId_.variant-plans-Cl0rNcZF.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/ConfirmationModal-2v7BHoQs.js", "/assets/flex-CRP9ZW6z.js", "/assets/shopAtom-DHlAgFdS.js", "/assets/index-CZBhWrIY.js", "/assets/components-DCDtNDXQ.js", "/assets/VariantDetailColumns-BVbtcIaz.js", "/assets/index-xIj4AxVg.js", "/assets/modal-bge_ITEm.js"], "css": [] }, "routes/merchant.subscriptions_.$subscriptionId": { "id": "routes/merchant.subscriptions_.$subscriptionId", "parentId": "root", "path": "merchant/subscriptions/:subscriptionId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.subscriptions_._subscriptionId-pU506j-y.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/routes-C5ziuI-K.js", "/assets/sortable.esm-BLq9_7uD.js", "/assets/index-CZBhWrIY.js", "/assets/index-BvWictZX.js", "/assets/index-xIj4AxVg.js", "/assets/shopAtom-DHlAgFdS.js", "/assets/index-B2HYwkQ5.js", "/assets/index-hoEkgPmj.js", "/assets/components-DCDtNDXQ.js", "/assets/check-circle-hkLajME9.js", "/assets/index-Z-KbNkSr.js", "/assets/SellingPlanFormUtils-D_WkLg4x.js"], "css": ["/assets/merchant.subscriptions_-Bbgo5x5y.css"] }, "routes/merchant.products_.$productId_.plans": { "id": "routes/merchant.products_.$productId_.plans", "parentId": "root", "path": "merchant/products/:productId/plans", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.products_._productId_.plans-ByX8wZZm.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/ConfirmationModal-2v7BHoQs.js", "/assets/index-xIj4AxVg.js", "/assets/plansAtom-BDG5N9ri.js", "/assets/index-CZBhWrIY.js", "/assets/index-hoEkgPmj.js", "/assets/shopAtom-DHlAgFdS.js", "/assets/flex-CRP9ZW6z.js", "/assets/SellingPlanFormUtils-D_WkLg4x.js", "/assets/datepicker-Bhj_Xp2q.js", "/assets/messages-BV2XNudo.js", "/assets/components-DCDtNDXQ.js", "/assets/modal-bge_ITEm.js"], "css": ["/assets/datepicker-DdjxYr1F.css"] }, "routes/merchant.products_.$productId": { "id": "routes/merchant.products_.$productId", "parentId": "root", "path": "merchant/products/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.products_._productId-N4WvGop6.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/routes-C5ziuI-K.js", "/assets/sortable.esm-BLq9_7uD.js", "/assets/messages-BV2XNudo.js", "/assets/index-CZBhWrIY.js", "/assets/index-hoEkgPmj.js", "/assets/VariantDetailColumns-BVbtcIaz.js", "/assets/index-B2HYwkQ5.js", "/assets/components-DCDtNDXQ.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/sellingPlansGroupUtils-DNlCIa3o.js", "/assets/shopAtom-DHlAgFdS.js", "/assets/ConfirmationModal-2v7BHoQs.js", "/assets/plansAtom-BDG5N9ri.js", "/assets/index-xIj4AxVg.js", "/assets/check-circle-hkLajME9.js", "/assets/modal-bge_ITEm.js", "/assets/SellingPlanFormUtils-D_WkLg4x.js", "/assets/datepicker-Bhj_Xp2q.js"], "css": ["/assets/datepicker-DdjxYr1F.css"] }, "routes/webhooks.app.product_update": { "id": "routes/webhooks.app.product_update", "parentId": "root", "path": "webhooks/app/product_update", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks.app.product_update-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/webhooks.app.scopes_update": { "id": "routes/webhooks.app.scopes_update", "parentId": "root", "path": "webhooks/app/scopes_update", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks.app.scopes_update-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/webhooks.app.uninstalled": { "id": "routes/webhooks.app.uninstalled", "parentId": "root", "path": "webhooks/app/uninstalled", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks.app.uninstalled-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/merchant.subscriptions": { "id": "routes/merchant.subscriptions", "parentId": "root", "path": "merchant/subscriptions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.subscriptions-CutIbM_P.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/sortable.esm-BLq9_7uD.js", "/assets/routes-C5ziuI-K.js", "/assets/index-Z-KbNkSr.js", "/assets/use-debounce-DCREou93.js", "/assets/index-BvWictZX.js", "/assets/index-CZBhWrIY.js", "/assets/index-B2HYwkQ5.js", "/assets/components-DCDtNDXQ.js", "/assets/index-hoEkgPmj.js", "/assets/messages-BV2XNudo.js", "/assets/datepicker-Bhj_Xp2q.js"], "css": ["/assets/datepicker-DdjxYr1F.css"] }, "routes/merchant.sellingPlans": { "id": "routes/merchant.sellingPlans", "parentId": "root", "path": "merchant/sellingPlans", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.sellingPlans-C5azcpGk.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/AppProxyProvider-DYw7hmfI.js", "/assets/components-DCDtNDXQ.js", "/assets/AppProvider-BEiu9rhW.js", "/assets/context-CAJJeJco.js"], "css": [] }, "routes/merchant.analytics": { "id": "routes/merchant.analytics", "parentId": "root", "path": "merchant/analytics", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.analytics-BnjX8ePM.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/components-DCDtNDXQ.js"], "css": [] }, "routes/merchant.products": { "id": "routes/merchant.products", "parentId": "root", "path": "merchant/products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.products-CpkxYIyJ.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/shopifyIdUtils-PhKRAdsZ.js", "/assets/routes-C5ziuI-K.js", "/assets/sortable.esm-BLq9_7uD.js", "/assets/index-Z-KbNkSr.js", "/assets/use-debounce-DCREou93.js", "/assets/index-hoEkgPmj.js", "/assets/index-CZBhWrIY.js", "/assets/dayjs.min-CiIypPr9.js", "/assets/messages-BV2XNudo.js", "/assets/components-DCDtNDXQ.js", "/assets/sellingPlansGroupUtils-DNlCIa3o.js"], "css": [] }, "routes/merchant.home": { "id": "routes/merchant.home", "parentId": "root", "path": "merchant/home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/merchant.home-Cvs5Jf_T.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/components-DCDtNDXQ.js"], "css": [] }, "routes/subscriptions": { "id": "routes/subscriptions", "parentId": "root", "path": "subscriptions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/subscriptions-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-BmmjlTN3.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/styles-D0k8EK8i.js", "/assets/components-DCDtNDXQ.js", "/assets/AppProvider-BEiu9rhW.js", "/assets/Page-CQ2VeFbq.js", "/assets/context-CAJJeJco.js"], "css": [] }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/app": { "id": "routes/app", "parentId": "root", "path": "app", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/app-BePZRiZS.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/AppProxyProvider-DYw7hmfI.js", "/assets/styles-D0k8EK8i.js", "/assets/components-DCDtNDXQ.js", "/assets/AppProvider-BEiu9rhW.js", "/assets/context-CAJJeJco.js"], "css": [] }, "routes/app.additional": { "id": "routes/app.additional", "parentId": "routes/app", "path": "additional", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.additional-7UoKJsDz.js", "imports": ["/assets/index-DngLVFUg.js", "/assets/Page-CQ2VeFbq.js", "/assets/context-CAJJeJco.js"], "css": [] }, "routes/app._index": { "id": "routes/app._index", "parentId": "routes/app", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app._index-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-ee068dd4.js", "version": "ee068dd4" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": true, "v3_singleFetch": false, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/merchant.products_.$productId_.variant-plans": {
    id: "routes/merchant.products_.$productId_.variant-plans",
    parentId: "root",
    path: "merchant/products/:productId/variant-plans",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/merchant.subscriptions_.$subscriptionId": {
    id: "routes/merchant.subscriptions_.$subscriptionId",
    parentId: "root",
    path: "merchant/subscriptions/:subscriptionId",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/merchant.products_.$productId_.plans": {
    id: "routes/merchant.products_.$productId_.plans",
    parentId: "root",
    path: "merchant/products/:productId/plans",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/merchant.products_.$productId": {
    id: "routes/merchant.products_.$productId",
    parentId: "root",
    path: "merchant/products/:productId",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/webhooks.app.product_update": {
    id: "routes/webhooks.app.product_update",
    parentId: "root",
    path: "webhooks/app/product_update",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/webhooks.app.scopes_update": {
    id: "routes/webhooks.app.scopes_update",
    parentId: "root",
    path: "webhooks/app/scopes_update",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/webhooks.app.uninstalled": {
    id: "routes/webhooks.app.uninstalled",
    parentId: "root",
    path: "webhooks/app/uninstalled",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/merchant.subscriptions": {
    id: "routes/merchant.subscriptions",
    parentId: "root",
    path: "merchant/subscriptions",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/merchant.sellingPlans": {
    id: "routes/merchant.sellingPlans",
    parentId: "root",
    path: "merchant/sellingPlans",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/merchant.analytics": {
    id: "routes/merchant.analytics",
    parentId: "root",
    path: "merchant/analytics",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/merchant.products": {
    id: "routes/merchant.products",
    parentId: "root",
    path: "merchant/products",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/merchant.home": {
    id: "routes/merchant.home",
    parentId: "root",
    path: "merchant/home",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/subscriptions": {
    id: "routes/subscriptions",
    parentId: "root",
    path: "subscriptions",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route16
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route19
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
