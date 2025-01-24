import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResultCardProps {
  label: string;
  value: string;
  tooltip?: string;
  className?: string;
}

export const ResultCard = ({
  label,
  value,
  tooltip,
  className,
}: ResultCardProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-white shadow-md border border-gray-100",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600">{label}</div>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="cursor-help">
                <InfoIcon className="h-4 w-4 text-calculator-accent hover:text-calculator-accent/80" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-white text-gray-900 border border-gray-200 p-2 max-w-[300px] z-50"
            >
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="text-xl font-bold text-calculator-primary mt-1">
        {value}
      </div>
    </div>
  );
};