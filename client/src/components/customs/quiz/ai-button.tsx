import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AIButtonProps {
  className?: string;
  type: "button" | "submit";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const AIButton = ({
  className,
  type,
  text,
  disabled,
  onClick,
}: AIButtonProps) => {
  return (
    <Button
      type={type}
      variant="outline"
      className={cn(
        "group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border-0 bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 px-6 text-white transition-all hover:scale-105 hover:shadow-lg active:scale-100",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="animate-pulse">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="relative font-medium">{text}</span>
    </Button>
  );
};

export const AISmallButton = ({
  onClick,
  disabled,
}: Partial<AIButtonProps>) => {
  return (
    <Button
      variant="outline"
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-0 bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 p-0 text-white transition-all hover:scale-105 hover:shadow-lg active:scale-100"
      aria-label="Generate with AI"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="animate-pulse">
        <Sparkles className="h-4 w-4" />
      </span>
    </Button>
  );
};
