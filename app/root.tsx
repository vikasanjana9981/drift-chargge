import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";

import globalCss from './tailwind.css?url';
import { LinksFunction } from "@remix-run/node";
import Sidebar from "./layouts/hydrogen/sidebar";
import Header from "./layouts/hydrogen/header";
import { JotaiProvider, ThemeProvider } from "./shared/theme-provider";
import GlobalDrawer from "./shared/drawer-views/container";
import GlobalModal from "./shared/modal-views/container";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./packages/components/remixPregress";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalCss },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend+Deca:wght@100..900&display=swap",
  },
];
export default function App() {
  const matches = useMatches();
  const isAuthRoute = matches.some((match) => match.pathname.startsWith("/auth"));
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body className="font-[Inter]">
        <main className="flex min-h-screen flex-grow">
          {isAuthRoute ? (
            <Outlet />
          ) : (
            <ThemeProvider>
              <ProgressBar />
              <JotaiProvider>
                <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
                <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
                  <Header />
                  <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
                    <Outlet />
                    <Toaster />
                  </div>
                </div>
                <GlobalDrawer />
                <GlobalModal />
              </JotaiProvider>
            </ThemeProvider>
          )}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html >
  );
}
