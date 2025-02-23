import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/user";
import { Home, LogOut } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
interface NavBarProps {
  className?: string;
}

export const NavBar = (props: NavBarProps) => {
  const { isAuth } = useUserStore();
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
          <img src={Logo} alt="Logo" width={150} />
        </Link>
      </div>

      {/* Login */}
      <div className="flex items-center space-x-4 animate-fade animate-delay-500">
        {isAuth ? (
          <>
            <Button
              asChild
              className="px-6 py-2 bg-transparent hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Link to="/dashboard">
                <Home className="w-5" />
              </Link>
            </Button>
            <Button
              onClick={Logout}
              className="px-6 py-2 bg-transparent hover:bg-red-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <LogOut className="w-5 text-white" />
            </Button>
          </>
        ) : (
          <Button
            asChild
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Link to="/login">登入</Link>
          </Button>
        )}
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
