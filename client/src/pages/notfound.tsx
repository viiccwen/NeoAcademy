import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";

export default function NotFound() {
    return (
      <div className="flex flex-col w-full justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">404 Not Found</h1>
        <Button LinkTo="/" variant="default" className="mt-5 text-xl">Go Back <Undo2 className="w-3" /></Button>
      </div>
    );
  }
  