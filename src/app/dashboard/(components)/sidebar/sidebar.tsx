import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  lable: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  lable,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center p-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-semibold tracking-widest`}
        >
          {lable}
        </span>
      </div>
    </Link>
  );
};
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={`${sidebarClassNames}`}>
      {/* Top Section */}

      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`font-extrabold text-xl ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          SafiStock
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 " />
        </button>
      </div>

      {/* Middle Content */}
      <div className="flex-grow mt-8">
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={Layout}
          href="/dashboard"
          lable="Dashboard"
        />
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={Archive}
          href="/invertory"
          lable="Invertory"
        />
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={Clipboard}
          href="/products"
          lable="Products"
        />
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={User}
          href="/users"
          lable="Users"
        />
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={Settings}
          href="/settings"
          lable="Settings"
        />
        <SidebarLinks
          isCollapsed={isSidebarCollapsed}
          icon={CircleDollarSign}
          href="/expenses"
          lable="Expenses"
        />
      </div>

      {/* Footer at the Bottom */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
        <p className="text-center text-xs font-semibold text-gray-500 mb-4">
          &copy; {new Date().getFullYear()} Safi Stock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
