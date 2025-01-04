"use client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/user";

type compType = {
  title: string;
  href: string;
};

const components: compType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Analytics",
    href: "/analytics",
  },
];

interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  const Logout = useLogout();

  return (
    <div
      className={cn(
        "flex items-center justify-between backdrop-blur-md",
        props.className
      )}
    >
      {/* Logo - Always visible */}
      <div className="flex-shrink-0 flex">
        <Link to="/">
          <img src="#" alt="Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Navbar - Centered, hidden on small screens */}
      <div className="hidden md:transform md:-translate-x-1/2 md:block md:absolute md:left-1/2 md:z-50">
        <NavigationMenu>
          <NavigationMenuList>
            {components.map((comp, index) => (
              <NavigationMenuItem key={index}>
                <Link to={comp.href}>
                  <NavigationMenuLink
                    className={cn(
                      "text-md font-medium text-gray-200 duration-300 rounded-md p-3 hover:text-white hover:bg-slate-800"
                    )}
                  >
                    {comp.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login */}
      <div className="hidden md:flex items-center space-x-4">
        <Button
          LinkTo="/create"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          New Quiz
        </Button>
        <Button onClick={Logout} className="bg-red-600 hover:bg-red-700">
          <LogOut className="w-5 text-white" />
        </Button>
      </div>

      {/* Sidebar - Hidden on large screens */}
      <div className="md:hidden">
        <button className="p-2 text-white bg-gray-800 rounded-md">
          {/* Sidebar toggle button */}
          Sidebar
        </button>
      </div>
    </div>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
