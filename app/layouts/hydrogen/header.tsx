'use client';

import { Link } from "@remix-run/react";
import HamburgerButton from "../hamburger-button";
import Sidebar from "./sidebar";
import Logo from "app/packages/components/logo";
import SearchWidget from "app/packages/components/search/search";
import HeaderMenuRight from "../header-menu-right";
import StickyHeader from "../sticky-header";

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          to={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>

        <SearchWidget />
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
