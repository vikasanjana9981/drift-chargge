import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Button } from "rizzui";
function EnvatoIcon({
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
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_10156_2589)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M14.9779 0.430692C14.3344 0.114562 11.0696 0.475693 8.71609 2.7336C5.00803 6.43603 5.09691 11.3141 5.09691 11.3141C5.09691 11.3141 4.97428 11.8159 4.45227 11.088C3.30925 9.63108 3.90776 6.27966 3.97526 5.81278C4.06976 5.15464 3.65013 5.13551 3.47575 5.35264C-0.65531 11.088 3.07525 15.7838 5.51766 17.2745C8.37746 19.0194 14.0183 19.0182 16.265 14.0682C19.064 7.90418 15.7846 0.825573 14.9779 0.430692Z",
            fill: "currentColor"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_10156_2589", children: /* @__PURE__ */ jsx(
          "rect",
          {
            width: "18",
            height: "18",
            fill: "currentColor",
            transform: "translate(0.5 0.332031)"
          }
        ) }) })
      ]
    }
  );
}
function SettingsDrawer() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "custom-scrollbar overflow-y-auto scroll-smooth h-[calc(100%-138px)]", children: /* @__PURE__ */ jsx("div", { className: "px-5 py-6", children: "Settings Drawer" }) }),
    /* @__PURE__ */ jsx(SettingsFooterButton, {})
  ] });
}
function SettingsFooterButton() {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam",
      target: "_blank",
      className: "grid grid-cols-1 border-t border-muted px-6 pt-4",
      children: /* @__PURE__ */ jsxs(Button, { size: "lg", as: "span", className: "text-base font-semibold", children: [
        /* @__PURE__ */ jsx(EnvatoIcon, { className: "me-2 h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "", children: "Purchase for $24" })
      ] })
    }
  );
}
export {
  SettingsDrawer as default
};
//# sourceMappingURL=settings-drawer-CbXAT9n4.js.map
