import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GitHubButton, GoogleButton } from "@/components/customs/user/oauth-button";
import { cn } from "@/lib/utils";

export default function Login() {
  return (
    <div className="flex w-full justify-center items-center h-screen">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl">Login</h1>
            <h2 className={cn("text-sm text-gray-500", "animate-fade-up animate-delay-0")}>Discover, Learn, Excel – The Neo Way.</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("flex flex-col w-full gap-4 mt-5", "animate-fade  animate-delay-500")}>
            <GoogleButton text="Login with Google" />
            <GitHubButton text="Login with GitHub" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
