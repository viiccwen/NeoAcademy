"use client";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookMarked, Brain, LogOut, Map, Menu } from "lucide-react";
import { useLogout } from "@/hooks/user";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

type compType = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const components: compType[] = [
  { title: "測驗", href: "/dashboard", icon: BookMarked },
  { title: "路徑", href: "/roadmap", icon: Map },
  { title: "分析", href: "/analytics", icon: Brain },
];

interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  const Logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center justify-between backdrop-blur-md px-4 py-3 w-full",
        props.className
      )}
    >
      {/* Logo - Always visible */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={Logo} alt="Logo" width={120} className="sm:w-[150px]" />
        </Link>
      </div>

      {/* mobile Drawer trigger */}
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="p-2">
              <Menu className="w-6 h-6 text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-gray-900 p-4 h-[80vh] rounded-t-lg">
            <div className="flex flex-col h-full">
              {/* Drawer head - Logo */}
              <div className="py-4 border-b border-gray-800">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img src={Logo} alt="Logo" width={120} />
                </Link>
              </div>
              {/* Drawer nav */}
              <div className="flex-1 py-4">
                {components.map((comp) => (
                  <Link
                    key={comp.href}
                    to={comp.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-slate-800 rounded-md p-3 mb-2"
                  >
                    {comp.icon && <comp.icon className="w-5 h-5" />}
                    <span>{comp.title}</span>
                  </Link>
                ))}
              </div>
              {/* Drawer logout */}
              <div className="pt-4 border-t border-gray-800">
                <Button
                  onClick={Logout}
                  className="w-full flex items-center gap-3 justify-start bg-transparent hover:bg-red-700 text-gray-200 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                  <span>登出</span>
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* pc nav */}
      <div className="hidden md:flex md:items-center md:gap-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {components.map((comp) => (
              <NavigationMenuItem key={comp.href}>
                <Link to={comp.href}>
                  <NavigationMenuLink
                    className={cn(
                      "text-md font-medium text-gray-200 hover:text-white hover:bg-slate-800 rounded-md p-3 transition-colors"
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

      {/* pc logout */}
      <div className="hidden md:flex items-center">
        <Button onClick={Logout} className="bg-transparent hover:bg-red-700">
          <LogOut className="w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};